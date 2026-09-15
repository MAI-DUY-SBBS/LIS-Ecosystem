import { roomService, qrService } from "../../../lib/room/container";

type CreateRoomRequest = {
  roomName?: unknown;
  teacherIdentity?: unknown;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as CreateRoomRequest;

    if (
      typeof body.roomName !== "string" ||
      typeof body.teacherIdentity !== "string"
    ) {
      return Response.json(
        {
          error:
            "roomName and teacherIdentity are required",
        },
        { status: 400 },
      );
    }

    const room = await roomService.createRoom(
      body.roomName,
      body.teacherIdentity,
    );

    const requestUrl = new URL(request.url);

    const roomUrl = new URL(
      `/room/${room.room_id}`,
      requestUrl.origin,
    ).toString();

    const qrCode =
      await qrService.generateQR(roomUrl);

    return Response.json({
      room_id: room.room_id,
      room_name: room.room_name,
      teacher_identity: room.teacher_identity,
      created_at: room.created_at,
      status: room.status,
      room_url: roomUrl,
      qr_code: qrCode,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create room",
      },
      { status: 400 },
    );
  }
}
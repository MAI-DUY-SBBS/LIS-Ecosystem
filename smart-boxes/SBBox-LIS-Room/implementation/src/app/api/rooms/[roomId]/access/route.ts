import { roomService, qrService } from "../../../../../lib/room/container";

type AccessRouteContext = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function GET(
  request: Request,
  context: AccessRouteContext,
) {
  try {
    const { roomId } = await context.params;

    const normalizedRoomId = roomId.trim();

    if (!normalizedRoomId) {
      return Response.json(
        {
          error: "Room ID is required",
        },
        { status: 400 },
      );
    }

    const room =
      await roomService.getRoom(normalizedRoomId);

    if (!room) {
      return Response.json(
        {
          error: "Room not found",
        },
        { status: 404 },
      );
    }

    if (room.status !== "active") {
      return Response.json(
        {
          error: "Room is not active",
        },
        { status: 400 },
      );
    }

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
      room_url: roomUrl,
      qr_code: qrCode,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load room access",
      },
      { status: 400 },
    );
  }
}
import { membershipService } from "../../../../../lib/room/container";

type JoinRoomRequest = {
  studentIdentity?: unknown;
};

type JoinRoomRouteProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: JoinRoomRouteProps,
) {
  try {
    const { roomId } = await params;

    if (!roomId.trim()) {
      return Response.json(
        {
          error: "Room ID is required",
        },
        { status: 400 },
      );
    }

    const body =
      (await request.json()) as JoinRoomRequest;

    if (typeof body.studentIdentity !== "string") {
      return Response.json(
        {
          error: "studentIdentity is required",
        },
        { status: 400 },
      );
    }

    const requestUrl = new URL(request.url);

    const accessLink = new URL(
      `/room/${roomId}`,
      requestUrl.origin,
    ).toString();

    const membership =
      await membershipService.joinRoom(
        accessLink,
        body.studentIdentity,
      );

    return Response.json({
      room_id: membership.room_id,
      student_identity: membership.student_identity,
      joined_at: membership.joined_at,
      status: membership.status,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to join room",
      },
      { status: 400 },
    );
  }
}
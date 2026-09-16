import { messageService } from "../../../../../lib/room/container";

type CreateMessageRequest = {
  teacherIdentity?: unknown;
  content?: unknown;
};

type MessageRouteProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: MessageRouteProps,
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
      (await request.json()) as CreateMessageRequest;

    if (typeof body.teacherIdentity !== "string") {
      return Response.json(
        {
          error: "teacherIdentity is required",
        },
        { status: 400 },
      );
    }

    if (typeof body.content !== "string") {
      return Response.json(
        {
          error: "content is required",
        },
        { status: 400 },
      );
    }

    const message =
      await messageService.createMessage(
        roomId,
        body.teacherIdentity,
        body.content,
      );

    return Response.json(
      {
        message_id: message.message_id,
        room_id: message.room_id,
        teacher_identity: message.teacher_identity,
        content: message.content,
        created_at: message.created_at,
        status: message.status,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create message",
      },
      { status: 400 },
    );
  }
}

export async function GET(
  request: Request,
  { params }: MessageRouteProps,
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

    const messages =
      await messageService.listMessages(roomId);

    return Response.json({
      room_id: roomId,
      messages,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to list messages",
      },
      { status: 400 },
    );
  }
}
import type { RoomMessage } from "./types";

import type { RoomMessageRepository } from "./message-repository";

export class MessageService {
  constructor(
    private readonly messageRepository: RoomMessageRepository,
  ) {}

  async createMessage(
    roomId: string,
    teacherIdentity: string,
    content: string,
  ): Promise<RoomMessage> {
    const normalizedRoomId = roomId.trim();
    const normalizedTeacherIdentity =
      teacherIdentity.trim();
    const normalizedContent = content.trim();

    if (!normalizedRoomId) {
      throw new Error("Room ID is required");
    }

    if (!normalizedTeacherIdentity) {
      throw new Error("Teacher identity is required");
    }

    if (!normalizedContent) {
      throw new Error("Message content is required");
    }

    const message: RoomMessage = {
      message_id: crypto.randomUUID(),
      room_id: normalizedRoomId,
      teacher_identity: normalizedTeacherIdentity,
      content: normalizedContent,
      created_at: new Date().toISOString(),
      status: "active",
    };

    return this.messageRepository.createMessage(message);
  }

  async getMessage(
    messageId: string,
  ): Promise<RoomMessage | null> {
    return this.messageRepository.getMessage(
      messageId,
    );
  }

  async listMessages(
    roomId: string,
  ): Promise<RoomMessage[]> {
    return this.messageRepository.listMessages(
      roomId,
    );
  }

  async removeMessage(
    messageId: string,
  ): Promise<RoomMessage | null> {
    return this.messageRepository.removeMessage(
      messageId,
    );
  }
}
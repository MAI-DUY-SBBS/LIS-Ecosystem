import type { RoomMessage } from "./types";

export interface RoomMessageRepository {
  createMessage(
    message: RoomMessage,
  ): Promise<RoomMessage>;

  getMessage(
    messageId: string,
  ): Promise<RoomMessage | null>;

  listMessages(
    roomId: string,
  ): Promise<RoomMessage[]>;

  removeMessage(
    messageId: string,
  ): Promise<RoomMessage | null>;
}
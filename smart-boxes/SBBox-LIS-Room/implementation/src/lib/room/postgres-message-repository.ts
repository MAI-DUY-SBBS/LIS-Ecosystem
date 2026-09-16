import { neon } from "@neondatabase/serverless";

import type { RoomMessage } from "./types";
import type { RoomMessageRepository } from "./message-repository";

type MessageRow = {
  message_id: string;
  room_id: string;
  teacher_identity: string;
  content: string;
  created_at: string;
  status: "active" | "removed";
};

export class PostgresRoomMessageRepository
  implements RoomMessageRepository
{
  private readonly sql: ReturnType<typeof neon>;

  constructor(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }

    this.sql = neon(databaseUrl);
  }

  async createMessage(
    message: RoomMessage,
  ): Promise<RoomMessage> {
    const rows = (await this.sql`
      INSERT INTO room_messages (
        message_id,
        room_id,
        teacher_identity,
        content,
        created_at,
        status
      )
      VALUES (
        ${message.message_id},
        ${message.room_id},
        ${message.teacher_identity},
        ${message.content},
        ${message.created_at},
        ${message.status}
      )
      RETURNING
        message_id,
        room_id,
        teacher_identity,
        content,
        created_at::text AS created_at,
        status
    `) as unknown as MessageRow[];

    return this.toMessage(rows[0]);
  }

  async getMessage(
    messageId: string,
  ): Promise<RoomMessage | null> {
    const rows = (await this.sql`
      SELECT
        message_id,
        room_id,
        teacher_identity,
        content,
        created_at::text AS created_at,
        status
      FROM room_messages
      WHERE message_id = ${messageId}
      LIMIT 1
    `) as unknown as MessageRow[];

    if (rows.length === 0) {
      return null;
    }

    return this.toMessage(rows[0]);
  }

  async listMessages(
    roomId: string,
  ): Promise<RoomMessage[]> {
    const rows = (await this.sql`
      SELECT
        message_id,
        room_id,
        teacher_identity,
        content,
        created_at::text AS created_at,
        status
      FROM room_messages
      WHERE room_id = ${roomId}
      ORDER BY created_at ASC
    `) as unknown as MessageRow[];

    return rows.map((row) => this.toMessage(row));
  }

  async removeMessage(
    messageId: string,
  ): Promise<RoomMessage | null> {
    const rows = (await this.sql`
      UPDATE room_messages
      SET status = 'removed'
      WHERE message_id = ${messageId}
      RETURNING
        message_id,
        room_id,
        teacher_identity,
        content,
        created_at::text AS created_at,
        status
    `) as unknown as MessageRow[];

    if (rows.length === 0) {
      return null;
    }

    return this.toMessage(rows[0]);
  }

  private toMessage(
    row: MessageRow | undefined,
  ): RoomMessage {
    if (!row) {
      throw new Error("Message record was not returned");
    }

    return {
      message_id: row.message_id,
      room_id: row.room_id,
      teacher_identity: row.teacher_identity,
      content: row.content,
      created_at: row.created_at,
      status: row.status,
    };
  }
}
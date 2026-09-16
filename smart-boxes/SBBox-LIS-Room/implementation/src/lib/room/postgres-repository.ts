import { neon } from "@neondatabase/serverless";

import type { Room } from "./types";
import type { RoomRepository } from "./repository";

type RoomRow = {
  room_id: string;
  room_name: string;
  teacher_identity: string;
  created_at: string;
  status: "active" | "archived";
};

export class PostgresRoomRepository
  implements RoomRepository
{
  private readonly sql: ReturnType<typeof neon>;

  constructor(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }

    this.sql = neon(databaseUrl);
  }

  async createRoom(room: Room): Promise<Room> {
    const rows = (await this.sql`
      INSERT INTO rooms (
        room_id,
        room_name,
        teacher_identity,
        created_at,
        status
      )
      VALUES (
        ${room.room_id},
        ${room.room_name},
        ${room.teacher_identity},
        ${room.created_at},
        ${room.status}
      )
      RETURNING
        room_id,
        room_name,
        teacher_identity,
        created_at::text AS created_at,
        status
    `) as unknown as RoomRow[];

    return rows[0] as Room;
  }

  async getRoom(
    roomId: string,
  ): Promise<Room | null> {
    const rows = (await this.sql`
      SELECT
        room_id,
        room_name,
        teacher_identity,
        created_at::text AS created_at,
        status
      FROM rooms
      WHERE room_id = ${roomId}
      LIMIT 1
    `) as unknown as RoomRow[];

    return rows[0] as Room | undefined ?? null;
  }

  async listRooms(): Promise<Room[]> {
    const rows = (await this.sql`
      SELECT
        room_id,
        room_name,
        teacher_identity,
        created_at::text AS created_at,
        status
      FROM rooms
      ORDER BY created_at ASC
    `) as unknown as RoomRow[];

    return rows as Room[];
  }

  async archiveRoom(
    roomId: string,
  ): Promise<Room | null> {
    const rows = (await this.sql`
      UPDATE rooms
      SET status = 'archived'
      WHERE room_id = ${roomId}
      RETURNING
        room_id,
        room_name,
        teacher_identity,
        created_at::text AS created_at,
        status
    `) as unknown as RoomRow[];

    return rows[0] as Room | undefined ?? null;
  }
}
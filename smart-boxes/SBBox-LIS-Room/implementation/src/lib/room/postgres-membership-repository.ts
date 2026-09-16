import { neon } from "@neondatabase/serverless";

import type { RoomMembership } from "./types";
import type { RoomMembershipRepository } from "./membership-repository";

type MembershipRow = {
  room_id: string;
  student_identity: string;
  joined_at: string;
  status: "active" | "removed";
};

export class PostgresRoomMembershipRepository
  implements RoomMembershipRepository
{
  private readonly sql: ReturnType<typeof neon>;

  constructor(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }

    this.sql = neon(databaseUrl);
  }

  async createMembership(
    membership: RoomMembership,
  ): Promise<RoomMembership> {
    const rows = (await this.sql`
      INSERT INTO room_memberships (
        room_id,
        student_identity,
        joined_at,
        status
      )
      VALUES (
        ${membership.room_id},
        ${membership.student_identity},
        ${membership.joined_at},
        ${membership.status}
      )
      RETURNING
        room_id,
        student_identity,
        joined_at::text AS joined_at,
        status
    `) as unknown as MembershipRow[];

    return this.toMembership(rows[0]);
  }

  async getMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null> {
    const rows = (await this.sql`
      SELECT
        room_id,
        student_identity,
        joined_at::text AS joined_at,
        status
      FROM room_memberships
      WHERE room_id = ${roomId}
        AND student_identity = ${studentIdentity}
      LIMIT 1
    `) as unknown as MembershipRow[];

    if (rows.length === 0) {
      return null;
    }

    return this.toMembership(rows[0]);
  }

  async listMemberships(
    roomId: string,
  ): Promise<RoomMembership[]> {
    const rows = (await this.sql`
      SELECT
        room_id,
        student_identity,
        joined_at::text AS joined_at,
        status
      FROM room_memberships
      WHERE room_id = ${roomId}
      ORDER BY joined_at ASC
    `) as unknown as MembershipRow[];

    return rows.map((row) => this.toMembership(row));
  }

  async removeMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null> {
    const rows = (await this.sql`
      UPDATE room_memberships
      SET status = 'removed'
      WHERE room_id = ${roomId}
        AND student_identity = ${studentIdentity}
      RETURNING
        room_id,
        student_identity,
        joined_at::text AS joined_at,
        status
    `) as unknown as MembershipRow[];

    if (rows.length === 0) {
      return null;
    }

    return this.toMembership(rows[0]);
  }

  private toMembership(
    row: MembershipRow | undefined,
  ): RoomMembership {
    if (!row) {
      throw new Error("Membership record was not returned");
    }

    return {
      room_id: row.room_id,
      student_identity: row.student_identity,
      joined_at: row.joined_at,
      status: row.status,
    };
  }
}
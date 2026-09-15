import type { RoomMembership } from "./types";
import type { RoomMembershipRepository } from "./membership-repository";

export class InMemoryRoomMembershipRepository
  implements RoomMembershipRepository
{
  private memberships = new Map<string, RoomMembership>();

  async createMembership(
    membership: RoomMembership,
  ): Promise<RoomMembership> {
    const key = `${membership.room_id}:${membership.student_identity}`;

    this.memberships.set(key, membership);

    return membership;
  }

  async getMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null> {
    const key = `${roomId}:${studentIdentity}`;

    return this.memberships.get(key) ?? null;
  }

  async listMemberships(
    roomId: string,
  ): Promise<RoomMembership[]> {
    return Array.from(this.memberships.values()).filter(
      (membership) => membership.room_id === roomId,
    );
  }

  async removeMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null> {
    const key = `${roomId}:${studentIdentity}`;

    const membership = this.memberships.get(key);

    if (!membership) {
      return null;
    }

    const removedMembership: RoomMembership = {
      ...membership,
      status: "removed",
    };

    this.memberships.set(key, removedMembership);

    return removedMembership;
  }
}
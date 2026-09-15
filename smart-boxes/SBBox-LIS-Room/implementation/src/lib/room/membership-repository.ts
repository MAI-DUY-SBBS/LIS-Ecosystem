import type { RoomMembership } from "./types";

export interface RoomMembershipRepository {
  createMembership(
    membership: RoomMembership,
  ): Promise<RoomMembership>;

  getMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null>;

  listMemberships(
    roomId: string,
  ): Promise<RoomMembership[]>;

  removeMembership(
    roomId: string,
    studentIdentity: string,
  ): Promise<RoomMembership | null>;
}
import type {
  Room,
  RoomMembership,
} from "./types";

import type { RoomRepository } from "./repository";
import type { RoomMembershipRepository } from "./membership-repository";

export class MembershipService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly membershipRepository: RoomMembershipRepository,
  ) {}

  async joinRoom(
    accessLink: string,
    studentIdentity: string,
  ): Promise<RoomMembership> {
    const normalizedAccessLink = accessLink.trim();
    const normalizedStudentIdentity = studentIdentity.trim();

    if (!normalizedAccessLink) {
      throw new Error("Access link is required");
    }

    if (!normalizedStudentIdentity) {
      throw new Error("Student identity is required");
    }

    const roomId = this.extractRoomId(normalizedAccessLink);

    if (!roomId) {
      throw new Error("Invalid room access link");
    }

    const room = await this.roomRepository.getRoom(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.status !== "active") {
      throw new Error("Room is not active");
    }

    const existingMembership =
      await this.membershipRepository.getMembership(
        roomId,
        normalizedStudentIdentity,
      );

    if (existingMembership) {
      return existingMembership;
    }

    const membership: RoomMembership = {
      room_id: roomId,
      student_identity: normalizedStudentIdentity,
      joined_at: new Date().toISOString(),
      status: "active",
    };

    return this.membershipRepository.createMembership(membership);
  }

  private extractRoomId(accessLink: string): string | null {
    try {
      const url = new URL(accessLink);
      const segments = url.pathname
        .split("/")
        .filter(Boolean);

      if (segments.length !== 2) {
        return null;
      }

      if (segments[0] !== "room") {
        return null;
      }

      return segments[1];
    } catch {
      return null;
    }
  }
}
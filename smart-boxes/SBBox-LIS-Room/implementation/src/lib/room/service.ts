import type { Room } from "./types";
import type { RoomRepository } from "./repository";

export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async createRoom(
    roomName: string,
    teacherIdentity: string,
  ): Promise<Room> {
    const normalizedRoomName = roomName.trim();
    const normalizedTeacherIdentity = teacherIdentity.trim();

    if (!normalizedRoomName) {
      throw new Error("Room name is required");
    }

    if (!normalizedTeacherIdentity) {
      throw new Error("Teacher identity is required");
    }

    const room: Room = {
      room_id: crypto.randomUUID(),
      room_name: normalizedRoomName,
      teacher_identity: normalizedTeacherIdentity,
      created_at: new Date().toISOString(),
      status: "active",
    };

    return this.roomRepository.createRoom(room);
  }

  async getRoom(roomId: string): Promise<Room | null> {
    return this.roomRepository.getRoom(roomId);
  }

  async listRooms(): Promise<Room[]> {
    return this.roomRepository.listRooms();
  }

  async archiveRoom(roomId: string): Promise<Room | null> {
    return this.roomRepository.archiveRoom(roomId);
  }
}
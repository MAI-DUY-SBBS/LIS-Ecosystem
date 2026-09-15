import type { Room } from "./types";
import type { RoomRepository } from "./repository";

export class InMemoryRoomRepository implements RoomRepository {
  private rooms = new Map<string, Room>();

  async createRoom(room: Room): Promise<Room> {
    this.rooms.set(room.room_id, room);
    return room;
  }

  async getRoom(roomId: string): Promise<Room | null> {
    return this.rooms.get(roomId) ?? null;
  }

  async listRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async archiveRoom(roomId: string): Promise<Room | null> {
    const room = this.rooms.get(roomId);

    if (!room) {
      return null;
    }

    const archivedRoom: Room = {
      ...room,
      status: "archived",
    };

    this.rooms.set(roomId, archivedRoom);

    return archivedRoom;
  }
}
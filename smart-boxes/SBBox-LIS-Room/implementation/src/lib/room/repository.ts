import type { Room } from "./types";

export interface RoomRepository {
  createRoom(room: Room): Promise<Room>;

  getRoom(roomId: string): Promise<Room | null>;

  listRooms(): Promise<Room[]>;

  archiveRoom(roomId: string): Promise<Room | null>;
}
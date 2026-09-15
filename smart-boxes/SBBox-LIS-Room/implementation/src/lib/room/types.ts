export type RoomStatus = "active" | "archived";

export interface Room {
  room_id: string;
  room_name: string;
  teacher_identity: string;
  created_at: string;
  status: RoomStatus;
}
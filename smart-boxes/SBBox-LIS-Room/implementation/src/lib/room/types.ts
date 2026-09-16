export type RoomStatus = "active" | "archived";

export interface Room {
  room_id: string;
  room_name: string;
  teacher_identity: string;
  created_at: string;
  status: RoomStatus;
}

export type MembershipStatus = "active" | "removed";

export interface RoomMembership {
  room_id: string;
  student_identity: string;
  joined_at: string;
  status: MembershipStatus;
}

export type MessageStatus = "active" | "removed";

export interface RoomMessage {
  message_id: string;
  room_id: string;
  teacher_identity: string;
  content: string;
  created_at: string;
  status: MessageStatus;
}
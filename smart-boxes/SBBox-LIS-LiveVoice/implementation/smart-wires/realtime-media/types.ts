export type RealtimeConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting"
  | "failed";

export type RealtimeParticipantRole =
  | "teacher"
  | "student";

export interface RealtimeParticipant {
  participantId: string;
  identity: string;
  role: RealtimeParticipantRole;
  roomId: string;
  mediaSessionId: string;
  joinedAt: string;
}

export interface RealtimeAudioTrack {
  trackId: string;
  participantId: string;
  mediaSessionId: string;
  kind: "audio";
  publishedAt: string;
}

export interface RealtimeConnection {
  connectionId: string;
  participantId: string;
  mediaSessionId: string;
  status: RealtimeConnectionStatus;
  connectedAt?: string;
  disconnectedAt?: string;
}

export interface RealtimeMediaSession {
  mediaSessionId: string;
  roomId: string;
  status: "created" | "active" | "ended";
  createdAt: string;
  endedAt?: string;
}
export type VoiceSessionStatus =
  | "IDLE"
  | "LIVE"
  | "COMPLETED";

export interface VoiceSession {
  voiceSessionId: string;
  roomId: string;
  teacherIdentity: string;
  status: VoiceSessionStatus;
  startedAt: string;
  endedAt?: string;
}

export interface AudioSegment {
  audioSegmentId: string;
  voiceSessionId: string;
  roomId: string;
  teacherIdentity: string;
  segmentStart: string;
  segmentEnd: string;
  durationSeconds: number;
  createdAt: string;
}

export interface AudioArtifact {
  audioArtifactId: string;
  audioSegmentId: string;
  voiceSessionId: string;
  roomId: string;
  storageReference: string;
  createdAt: string;
}
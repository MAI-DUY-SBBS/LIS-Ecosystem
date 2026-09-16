import { PostgresRoomRepository } from "./postgres-repository";

import { PostgresRoomMembershipRepository } from "./postgres-membership-repository";

import { QRService } from "./qr-service";

import { MembershipService } from "./membership-service";

import { RoomService } from "./service";

const roomRepository = new PostgresRoomRepository();

const roomMembershipRepository =
  new PostgresRoomMembershipRepository();

export const roomService = new RoomService(
  roomRepository,
);

export const membershipService = new MembershipService(
  roomRepository,
  roomMembershipRepository,
);

export const qrService = new QRService();
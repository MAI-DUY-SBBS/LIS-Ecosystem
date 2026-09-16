import { PostgresRoomRepository } from "./postgres-repository";

import { PostgresRoomMembershipRepository } from "./postgres-membership-repository";

import { PostgresRoomMessageRepository } from "./postgres-message-repository";

import { QRService } from "./qr-service";

import { MembershipService } from "./membership-service";

import { MessageService } from "./message-service";

import { RoomService } from "./service";

const roomRepository =
  new PostgresRoomRepository();

const roomMembershipRepository =
  new PostgresRoomMembershipRepository();

const roomMessageRepository =
  new PostgresRoomMessageRepository();

export const roomService =
  new RoomService(roomRepository);

export const membershipService =
  new MembershipService(
    roomRepository,
    roomMembershipRepository,
  );

export const messageService =
  new MessageService(
    roomMessageRepository,
  );

export const qrService =
  new QRService();
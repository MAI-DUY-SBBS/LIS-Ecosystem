import { InMemoryRoomRepository } from "./in-memory-repository";
import { InMemoryRoomMembershipRepository } from "./in-memory-membership-repository";

import { QRService } from "./qr-service";

import { MembershipService } from "./membership-service";
import { RoomService } from "./service";

const roomRepository = new InMemoryRoomRepository();

const roomMembershipRepository =
  new InMemoryRoomMembershipRepository();

export const roomService = new RoomService(roomRepository);

export const membershipService = new MembershipService(
  roomRepository,
  roomMembershipRepository,
);

export const qrService = new QRService();
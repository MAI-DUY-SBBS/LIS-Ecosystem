import { InMemoryRoomRepository } from "./in-memory-repository";
import { QRService } from "./qr-service";

import { RoomService } from "./service";

const roomRepository = new InMemoryRoomRepository();

export const roomService = new RoomService(roomRepository);

export const qrService = new QRService();
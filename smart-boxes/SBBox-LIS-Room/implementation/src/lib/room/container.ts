import { InMemoryRoomRepository } from "./in-memory-repository";
import { RoomService } from "./service";

const roomRepository = new InMemoryRoomRepository();

export const roomService = new RoomService(roomRepository);
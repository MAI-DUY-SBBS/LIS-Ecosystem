import QRCode from "qrcode";

export class QRService {
  async generateQR(roomUrl: string): Promise<string> {
    const normalizedRoomUrl = roomUrl.trim();

    if (!normalizedRoomUrl) {
      throw new Error("Room URL is required");
    }

    return QRCode.toDataURL(normalizedRoomUrl);
  }
}
"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  MessageSquareText,
  QrCode,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { HorizonPanel } from "@/components/lis/HorizonPanel";

type TeacherPageProps = {
  params: Promise<{
    roomId: string;
  }>;
};

type RoomMessage = {
  message_id: string;
  room_id: string;
  teacher_identity: string;
  content: string;
  created_at: string;
  status: "active" | "removed";
};

type MessagesResponse = {
  room_id?: string;
  messages?: RoomMessage[];
  error?: string;
};

type RoomAccessResponse = {
  room_id?: string;
  room_name?: string;
  teacher_identity?: string;
  room_url?: string;
  qr_code?: string;
  error?: string;
};

const UNIVERSITY_LOGO =
  "https://i.postimg.cc/SsmtVkXG/Screenshot-2026-09-17-at-00-22-09.png";

export default function TeacherPage({
  params,
}: TeacherPageProps) {
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomTeacherIdentity, setRoomTeacherIdentity] =
    useState("");

  const [teacherIdentity, setTeacherIdentity] =
    useState("");

  const [messageContent, setMessageContent] =
    useState("");

  const [messages, setMessages] =
    useState<RoomMessage[]>([]);

  const [studentRoomUrl, setStudentRoomUrl] =
    useState("");

  const [qrCode, setQrCode] =
    useState("");

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [loadingAccess, setLoadingAccess] =
    useState(false);

  const [copyStatus, setCopyStatus] =
    useState("");

  const [messageStatus, setMessageStatus] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function resolveRoom() {
      try {
        const resolvedParams = await params;
        const resolvedRoomId =
          resolvedParams.roomId;

        setRoomId(resolvedRoomId);

        await loadMessages(resolvedRoomId);
        await loadRoomAccess(resolvedRoomId);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to resolve room",
        );
      }
    }

    resolveRoom();
  }, [params]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      loadMessages(roomId);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [roomId]);

  async function loadRoomAccess(
    resolvedRoomId: string,
  ) {
    setLoadingAccess(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/rooms/${resolvedRoomId}/access`,
        {
          cache: "no-store",
        },
      );

      const data =
        (await response.json()) as RoomAccessResponse;

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to load student access",
        );
      }

      if (
        typeof data.room_url !== "string" ||
        typeof data.qr_code !== "string"
      ) {
        throw new Error(
          "Invalid student access response",
        );
      }

      setStudentRoomUrl(data.room_url);
      setQrCode(data.qr_code);

      if (typeof data.room_name === "string") {
        setRoomName(data.room_name);
      }

      if (
        typeof data.teacher_identity === "string"
      ) {
        setRoomTeacherIdentity(
          data.teacher_identity,
        );

        if (!teacherIdentity) {
          setTeacherIdentity(
            data.teacher_identity,
          );
        }
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load student access",
      );
    } finally {
      setLoadingAccess(false);
    }
  }

  async function loadMessages(
    resolvedRoomId: string,
  ) {
    setLoadingMessages(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/rooms/${resolvedRoomId}/messages`,
        {
          cache: "no-store",
        },
      );

      const data =
        (await response.json()) as MessagesResponse;

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to load messages",
        );
      }

      setMessages(
        Array.isArray(data.messages)
          ? data.messages
          : [],
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load messages",
      );
    } finally {
      setLoadingMessages(false);
    }
  }

  async function copyStudentLink() {
    if (!studentRoomUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        studentRoomUrl,
      );

      setCopyStatus(
        "Student link copied successfully",
      );

      window.setTimeout(() => {
        setCopyStatus("");
      }, 2000);
    } catch {
      setCopyStatus(
        "Unable to copy student link",
      );
    }
  }

  async function sendMessage() {
    const normalizedTeacherIdentity =
      teacherIdentity.trim();

    const normalizedContent =
      messageContent.trim();

    if (
      !roomId ||
      !normalizedTeacherIdentity ||
      !normalizedContent
    ) {
      return;
    }

    setMessageStatus("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/rooms/${roomId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teacherIdentity:
              normalizedTeacherIdentity,
            content: normalizedContent,
          }),
        },
      );

      const data =
        (await response.json()) as RoomMessage & {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to send message",
        );
      }

      setMessageContent("");

      setMessageStatus(
        "Message sent successfully",
      );

      await loadMessages(roomId);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send message",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            HEADER
           ===================================================== */}
        <header className="mb-8">
          <div className="lis-surface overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

              {/* University / LIS Brand */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  <img
                    src={UNIVERSITY_LOGO}
                    alt="ĐHSPKT Nam Định"
                    className="h-11 w-11 object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                      ĐHSPKT Nam Định
                    </h1>

                    <span className="hidden text-slate-300 sm:inline">
                      /
                    </span>

                    <span className="text-sm font-semibold text-indigo-600">
                      LIS Room
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-medium tracking-wide text-slate-500">
                    Learning Intelligence Infrastructure
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 sm:self-auto">
                <span className="h-2 w-2 animate-lis-pulse rounded-full bg-emerald-500" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                  LIS Room · Active
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            ROOM IDENTITY
           ===================================================== */}
        <section className="animate-lis-slide-up">
          <div className="lis-surface overflow-hidden rounded-2xl">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Teacher Workspace
                </span>
              </div>
            </div>

            <div className="grid gap-5 px-5 py-5 sm:px-6 md:grid-cols-3">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Learning Room
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {roomName || "Learning Room"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Teacher
                </p>

                <p className="mt-2 text-sm font-medium text-slate-700">
                  {roomTeacherIdentity ||
                    teacherIdentity ||
                    "Resolving teacher..."}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Room ID
                </p>

                <p className="mt-2 break-all font-mono text-xs text-slate-500">
                  {roomId || "Resolving room..."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STUDENT ACCESS
           ===================================================== */}
        <section className="mt-6 animate-lis-slide-up">
          <div className="lis-surface overflow-hidden rounded-2xl">

            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-500" />

                  <h2 className="text-base font-semibold text-slate-900">
                    Student Access
                  </h2>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Share the learning room with students
                  through a link or QR code.
                </p>
              </div>

              <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                Access
              </span>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_280px]">

              {/* Student Link */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Student Room Link
                </p>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="break-all font-mono text-xs text-slate-600">
                      {loadingAccess
                        ? "Loading student access..."
                        : studentRoomUrl ||
                          "Student link unavailable"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copyStudentLink}
                    disabled={!studentRoomUrl}
                    className="lis-focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copyStatus ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}

                    {copyStatus
                      ? "Copied"
                      : "Copy Link"}
                  </button>
                </div>

                {copyStatus && (
                  <p className="mt-3 text-xs font-medium text-emerald-600">
                    {copyStatus}
                  </p>
                )}

                {studentRoomUrl && (
                  <a
                    href={studentRoomUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="lis-focus-ring mt-4 inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    Open Student Room
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {/* QR */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-indigo-500" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    QR Access
                  </p>
                </div>

                {qrCode ? (
                  <div className="mt-4 flex justify-center">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <img
                        src={qrCode}
                        alt="QR code for joining the student learning room"
                        className="h-48 w-48 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
                    <p className="text-xs text-slate-400">
                      {loadingAccess
                        ? "Generating QR..."
                        : "QR unavailable"}
                    </p>
                  </div>
                )}

                <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400">
                  Students can scan this QR code
                  to enter the learning room.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TEACHER MESSAGE
           ===================================================== */}
        <section className="mt-6 animate-lis-slide-up">
          <div className="lis-surface overflow-hidden rounded-2xl">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-indigo-500" />

                <h2 className="text-base font-semibold text-slate-900">
                  Teacher Message
                </h2>
              </div>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Send a learning message to everyone
                in this room.
              </p>
            </div>

            <div className="p-5 sm:p-6">

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Teacher Identity
                </label>

                <input
                  type="text"
                  value={teacherIdentity}
                  onChange={(event) =>
                    setTeacherIdentity(
                      event.target.value,
                    )
                  }
                  placeholder="Example: Teacher 001"
                  className="lis-focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-300 focus:border-indigo-300"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Learning Message
                </label>

                <textarea
                  value={messageContent}
                  onChange={(event) =>
                    setMessageContent(
                      event.target.value,
                    )
                  }
                  placeholder="Write a learning message..."
                  rows={5}
                  className="lis-focus-ring w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-300 focus:border-indigo-300"
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  Message → Learning Room
                </p>

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={
                    !roomId ||
                    !teacherIdentity.trim() ||
                    !messageContent.trim()
                  }
                  className="lis-focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-100 transition-all duration-200 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </div>

              {messageStatus && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <Check className="h-4 w-4 text-emerald-600" />

                  <p className="text-xs font-medium text-emerald-700">
                    {messageStatus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            MESSAGE STREAM
           ===================================================== */}
        <section className="mt-6 animate-lis-slide-up">
          <div className="lis-surface overflow-hidden rounded-2xl">

            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-indigo-500" />

                  <h2 className="text-base font-semibold text-slate-900">
                    Message Stream
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Learning messages stored in the
                  LIS Room.
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-lis-pulse rounded-full bg-emerald-500" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Auto-refresh · 3 seconds
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  roomId && loadMessages(roomId)
                }
                disabled={
                  !roomId || loadingMessages
                }
                className="lis-focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${
                    loadingMessages
                      ? "animate-spin"
                      : ""
                  }`}
                />

                {loadingMessages
                  ? "Loading..."
                  : "Refresh"}
              </button>
            </div>

            <div className="space-y-3 p-5 sm:p-6">
              {messages.length === 0 &&
                !loadingMessages && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center">
                    <MessageSquareText className="mx-auto h-5 w-5 text-slate-300" />

                    <p className="mt-3 text-sm font-medium text-slate-500">
                      No messages yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Your learning messages will
                      appear here.
                    </p>
                  </div>
                )}

              {messages.map((message) => (
                <article
                  key={message.message_id}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-100 hover:shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {message.teacher_identity}
                        </p>

                        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">
                          Teacher Message
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400">
                      {new Date(
                        message.created_at,
                      ).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {message.content}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-500">
                      Active
                    </span>

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            message.content,
                          );
                        } catch {
                          // Clipboard access is optional.
                        }
                      }}
                      className="lis-focus-ring inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400 transition-colors hover:text-indigo-600"
                    >
                      <Copy className="h-3 w-3" />
                      Copy message
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ERROR
           ===================================================== */}
        {errorMessage && (
          <section className="mt-6 animate-lis-scale-in">
            <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
                System Notice
              </p>

              <p className="mt-2 text-sm font-semibold text-red-700">
                {errorMessage}
              </p>
            </div>
          </section>
        )}

        {/* =====================================================
            HORIZON
           ===================================================== */}
        <HorizonPanel />

        {/* =====================================================
            FOOTER
           ===================================================== */}
        <footer className="mt-10 border-t border-slate-200 pt-5 pb-4">
          <div className="flex flex-col gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>
              ĐHSPKT Nam Định · LIS-Ecosystem
            </span>

            <span>
              SBBox-LIS-Room · v0.1 development
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
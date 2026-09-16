"use client";

import {
  Check,
  Copy,
  ExternalLink,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { HorizonPanel } from "@/components/lis/HorizonPanel";

const UNIVERSITY_LOGO =
  "https://i.postimg.cc/SsmtVkXG/Screenshot-2026-09-17-at-00-22-09.png";

type RoomPageProps = {
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

type JoinRoomResponse = {
  room_id?: string;
  student_identity?: string;
  joined_at?: string;
  status?: string;
  error?: string;
};

export default function RoomPage({
  params,
}: RoomPageProps) {
  const [roomId, setRoomId] = useState("");
  const [studentIdentity, setStudentIdentity] =
    useState("");
  const [membershipStatus, setMembershipStatus] =
    useState("");

  const [messages, setMessages] =
    useState<RoomMessage[]>([]);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [copiedMessageId, setCopiedMessageId] =
    useState("");

  useEffect(() => {
    async function resolveRoom() {
      try {
        const resolvedParams = await params;
        const resolvedRoomId =
          resolvedParams.roomId;

        setRoomId(resolvedRoomId);

        await loadMessages(resolvedRoomId);
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

  async function joinRoom() {
    const normalizedStudentIdentity =
      studentIdentity.trim();

    if (
      !normalizedStudentIdentity ||
      !roomId
    ) {
      return;
    }

    setMembershipStatus("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/rooms/${roomId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentIdentity:
              normalizedStudentIdentity,
          }),
        },
      );

      const data =
        (await response.json()) as JoinRoomResponse;

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to join room",
        );
      }

      setMembershipStatus(
        `Joined successfully · ${data.status ?? "active"}`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to join room",
      );
    }
  }

  async function copyMessage(
    message: RoomMessage,
  ) {
    setErrorMessage("");

    try {
      await navigator.clipboard.writeText(
        message.content,
      );

      setCopiedMessageId(message.message_id);

      window.setTimeout(() => {
        setCopiedMessageId((current) =>
          current === message.message_id
            ? ""
            : current,
        );
      }, 2000);
    } catch {
      setErrorMessage(
        "Unable to copy message",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <img
                  src={UNIVERSITY_LOGO}
                  alt="ĐHSPKT Nam Định"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                  ĐHSPKT Nam Định
                </p>

                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                  Learning Intelligence Infrastructure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Student Room
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Learning Space
              </p>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              LIS Room
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Learning Communication Space
            </p>
          </div>
        </header>

        <section className="lis-surface animate-lis-slide-up rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Room Identity
                </p>
              </div>

              <p className="mt-2 break-all font-mono text-sm font-semibold text-slate-800">
                {roomId || "Resolving room..."}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-slate-600">
                Room Active
              </span>
            </div>
          </div>
        </section>

        <section className="lis-surface mt-5 animate-lis-slide-up rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Student Membership
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Join this learning room
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Enter your student identity to connect
                to this learning space.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Student identity
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={studentIdentity}
                onChange={(event) =>
                  setStudentIdentity(
                    event.target.value,
                  )
                }
                placeholder="Example: Student 001"
                className="lis-focus-ring min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                onClick={joinRoom}
                disabled={
                  !studentIdentity.trim() ||
                  !roomId
                }
                className="lis-focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check className="h-4 w-4" />
                Join Room
              </button>
            </div>
          </div>

          {membershipStatus && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <Check className="h-3.5 w-3.5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Membership
                </p>

                <p className="mt-0.5 text-sm font-semibold text-emerald-800">
                  {membershipStatus}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="lis-surface mt-5 animate-lis-slide-up rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <MessageSquareText className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                  Learning Communication
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Message Stream
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Messages from the teacher in this LIS
                  Room.
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Automatically checking for new
                  messages.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                roomId &&
                loadMessages(roomId)
              }
              disabled={
                !roomId || loadingMessages
              }
              className="lis-focus-ring inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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

          <div className="mt-6 max-h-[680px] overflow-y-auto overscroll-contain pr-2 sm:max-h-[720px]">
            <div className="space-y-3">
              {messages.length === 0 &&
                !loadingMessages && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <MessageSquareText className="mx-auto h-7 w-7 text-slate-300" />

                    <p className="mt-3 text-sm font-medium text-slate-500">
                      No messages yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Teacher messages will appear here.
                    </p>
                  </div>
                )}

              {messages.map((message) => (
                <article
                  key={message.message_id}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-100 hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <MessageSquareText className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {message.teacher_identity}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {new Date(
                              message.created_at,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        copyMessage(message)
                      }
                      className="lis-focus-ring inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {copiedMessageId ===
                      message.message_id ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {message.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lis-surface mt-5 rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <MessageSquareText className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Student Interaction
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-700">
                Reply to Teacher
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Student messaging will become available
                in a future LIS upgrade.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />

              <p className="text-xs font-semibold text-slate-500">
                Student Message — Future Upgrade
              </p>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              The next version can extend the same
              Learning Communication Stream into
              two-way teacher–student interaction.
            </p>
          </div>
        </section>

        {errorMessage && (
          <section className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-500">
              Error
            </p>

            <p className="mt-2 text-sm font-semibold text-red-800">
              {errorMessage}
            </p>
          </section>
        )}

        <section className="lis-surface mt-5 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />

            <h2 className="text-sm font-semibold text-slate-800">
              Student Room Status
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Room identity resolved
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Learning room route active
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Student membership connected
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Message stream connected
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Auto-refresh connected
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Message copy connected
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-500">
              <span className="h-3.5 w-3.5 text-center">
                ○
              </span>
              Student message — future upgrade
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-500">
              <span className="h-3.5 w-3.5 text-center">
                ○
              </span>
              AI Message — future upgrade
            </div>
          </div>
        </section>

        <HorizonPanel />

        <footer className="mt-auto flex flex-col gap-3 pt-10 pb-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            LIS-Ecosystem · SBBox-LIS-Room · v0.1
            development
          </div>

          <div className="flex items-center gap-1.5">
            <span>Knowledge</span>
            <span>·</span>
            <span>Relations</span>
            <span>·</span>
            <span>Grammar</span>
            <span>·</span>
            <span>Reasoning</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";

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
  const [studentIdentity, setStudentIdentity] = useState("");
  const [membershipStatus, setMembershipStatus] =
    useState("");

  const [teacherIdentity, setTeacherIdentity] =
    useState("");
  const [messageContent, setMessageContent] =
    useState("");

  const [messages, setMessages] =
    useState<RoomMessage[]>([]);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [messageStatus, setMessageStatus] =
    useState("");

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  useEffect(() => {
    async function resolveRoom() {
      try {
        const resolvedParams = await params;
        const resolvedRoomId = resolvedParams.roomId;

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

    if (!normalizedStudentIdentity || !roomId) {
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
        `Joined successfully · ${data.status}`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to join room",
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
      setMessageStatus("Message sent successfully");

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
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Learning Intelligence Infrastructure
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            LIS Room
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Learning Communication Space
          </p>
        </header>

        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Room ID
          </p>

          <p className="mt-2 break-all font-mono text-sm">
            {roomId || "Resolving room..."}
          </p>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Student Access
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Enter your student identity to join this
            learning room.
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Student identity
            </label>

            <input
              type="text"
              value={studentIdentity}
              onChange={(event) =>
                setStudentIdentity(event.target.value)
              }
              placeholder="Example: Student 001"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <button
            onClick={joinRoom}
            disabled={
              !studentIdentity.trim() || !roomId
            }
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Join Room
          </button>

          {membershipStatus && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Membership
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {membershipStatus}
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Teacher Message
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Send a learning message to everyone in this
            room.
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Teacher identity
            </label>

            <input
              type="text"
              value={teacherIdentity}
              onChange={(event) =>
                setTeacherIdentity(event.target.value)
              }
              placeholder="Example: Teacher 001"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <textarea
              value={messageContent}
              onChange={(event) =>
                setMessageContent(event.target.value)
              }
              placeholder="Write a learning message..."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={
              !roomId ||
              !teacherIdentity.trim() ||
              !messageContent.trim()
            }
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Message
          </button>

          {messageStatus && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Message Status
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {messageStatus}
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Message Stream
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Messages stored in the LIS Room.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Automatically checking for new messages.
              </p>
            </div>

            <button
              onClick={() =>
                roomId && loadMessages(roomId)
              }
              disabled={
                !roomId || loadingMessages
              }
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loadingMessages
                ? "Loading..."
                : "Refresh"}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {messages.length === 0 &&
              !loadingMessages && (
                <div className="rounded-xl bg-slate-50 p-6">
                  <p className="text-sm text-slate-500">
                    No messages yet.
                  </p>
                </div>
              )}

            {messages.map((message) => (
              <article
                key={message.message_id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold">
                    {message.teacher_identity}
                  </p>

                  <p className="text-xs text-slate-500">
                    {new Date(
                      message.created_at,
                    ).toLocaleString()}
                  </p>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                  {message.content}
                </p>
              </article>
            ))}
          </div>
        </section>

        {errorMessage && (
          <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Error
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {errorMessage}
            </p>
          </section>
        )}

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            LIS Room Status
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>✓ Room identity resolved</p>
            <p>✓ Learning room route active</p>
            <p>✓ Student membership connected</p>
            <p>✓ Message API connected</p>
            <p>✓ Message persistence connected</p>
            <p>✓ Message stream connected</p>
            <p>✓ Message stream auto-refresh connected</p>
            <p>○ AI Message — future upgrade</p>
          </div>
        </section>

        <footer className="mt-auto pt-12 text-sm text-slate-500">
          LIS-Ecosystem · SBBox-LIS-Room · v0.1 development
        </footer>
      </div>
    </main>
  );
}
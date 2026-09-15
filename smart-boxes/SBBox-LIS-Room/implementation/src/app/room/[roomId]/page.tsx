"use client";

import { useState } from "react";

type RoomPageProps = {
  params: Promise<{
    roomId: string;
  }>;
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
  const [membershipStatus, setMembershipStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function joinRoom() {
    const normalizedStudentIdentity =
      studentIdentity.trim();

    if (!normalizedStudentIdentity) {
      return;
    }

    setMembershipStatus("");
    setErrorMessage("");

    try {
      const resolvedParams = await params;
      const resolvedRoomId = resolvedParams.roomId;

      setRoomId(resolvedRoomId);

      const response = await fetch(
        `/api/rooms/${resolvedRoomId}/join`,
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
            Enter your student identity to join this learning room.
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
              className="w-full rounded-xl border border-slate-300
                         px-4 py-3 outline-none
                         focus:border-slate-500"
            />
          </div>

          <button
            onClick={joinRoom}
            disabled={!studentIdentity.trim()}
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3
                       text-sm font-medium text-white
                       disabled:cursor-not-allowed
                       disabled:opacity-40"
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

          {errorMessage && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Unable to join
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {errorMessage}
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Learning Communication
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Teacher announcements and learning messages
            will appear here.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm text-slate-500">
              No messages yet.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Room Status
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>✓ Room identity resolved</p>
            <p>✓ Learning room route active</p>
            <p>✓ Student membership capability connected</p>
            <p>○ Persistent room data — coming next</p>
            <p>○ Teacher announcements — coming next</p>
          </div>
        </section>

        <footer className="mt-auto pt-12 text-sm text-slate-500">
          LIS-Ecosystem · SBBox-LIS-Room · v0.1 development
        </footer>
      </div>
    </main>
  );
}
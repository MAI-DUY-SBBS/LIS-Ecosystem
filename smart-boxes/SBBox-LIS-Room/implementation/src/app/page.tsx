"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CreateRoomResponse = {
  room_id?: string;
  room_name?: string;
  teacher_identity?: string;
  created_at?: string;
  status?: string;
  room_url?: string;
  qr_code?: string;
  error?: string;
};

export default function Home() {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");
  const [teacherIdentity, setTeacherIdentity] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [creatingRoom, setCreatingRoom] =
    useState(false);

  async function createRoom() {
    const normalizedRoomName =
      roomName.trim();

    const normalizedTeacherIdentity =
      teacherIdentity.trim();

    if (
      !normalizedRoomName ||
      !normalizedTeacherIdentity
    ) {
      return;
    }

    setErrorMessage("");
    setCreatingRoom(true);

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: normalizedRoomName,
          teacherIdentity:
            normalizedTeacherIdentity,
        }),
      });

      const data =
        (await response.json()) as CreateRoomResponse;

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to create room",
        );
      }

      if (
        typeof data.room_id !== "string"
      ) {
        throw new Error(
          "Invalid room response from server",
        );
      }

      router.push(
        `/teacher/${data.room_id}`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create room",
      );
      setCreatingRoom(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Learning Intelligence Infrastructure
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            LIS Room
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            A learning communication space
            for teachers and students.
          </p>
        </header>

        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Create Room
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Create a learning communication room
            for your class.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Room name
              </label>

              <input
                type="text"
                value={roomName}
                onChange={(event) =>
                  setRoomName(event.target.value)
                }
                placeholder="Example: Mathematics 11A1"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Teacher identity
              </label>

              <input
                type="text"
                value={teacherIdentity}
                onChange={(event) =>
                  setTeacherIdentity(
                    event.target.value,
                  )
                }
                placeholder="Example: Dr. Mai Duy"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              />
            </div>

            <button
              onClick={createRoom}
              disabled={
                creatingRoom ||
                !roomName.trim() ||
                !teacherIdentity.trim()
              }
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {creatingRoom
                ? "Creating Room..."
                : "Create Room"}
            </button>

            {errorMessage && (
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">
                  Unable to create room
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">
            Teacher Entry
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            After creating a room, you will enter
            the Teacher Console. From there you can
            send messages and share the Student Room
            link or QR code with your class.
          </p>
        </section>

        <footer className="mt-auto pt-12 text-sm text-slate-500">
          LIS-Ecosystem · SBBox-LIS-Room · v0.1 development
        </footer>
      </div>
    </main>
  );
}
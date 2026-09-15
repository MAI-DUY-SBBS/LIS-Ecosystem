"use client";

import { useState } from "react";

export default function Home() {
  const [roomName, setRoomName] = useState("");
  const [teacherIdentity, setTeacherIdentity] = useState("");
  const [roomUrl, setRoomUrl] = useState("");

  function createRoom() {
    if (!roomName.trim() || !teacherIdentity.trim()) {
      return;
    }

    const roomId = crypto.randomUUID();

    const url = `${window.location.origin}/room/${roomId}`;

    setRoomUrl(url);
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
            A lightweight learning communication space
            for teachers and students.
          </p>
        </header>

        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Create Room
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Create a learning communication room for your class.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Room name
              </label>

              <input
                type="text"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                placeholder="Example: Mathematics 11A1"
                className="w-full rounded-xl border border-slate-300
                           px-4 py-3 outline-none
                           focus:border-slate-500"
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
                  setTeacherIdentity(event.target.value)
                }
                placeholder="Example: Dr. Mai Duy"
                className="w-full rounded-xl border border-slate-300
                           px-4 py-3 outline-none
                           focus:border-slate-500"
              />
            </div>

            <button
              onClick={createRoom}
              disabled={!roomName.trim() || !teacherIdentity.trim()}
              className="rounded-xl bg-slate-900 px-5 py-3
                         text-sm font-medium text-white
                         disabled:cursor-not-allowed
                         disabled:opacity-40"
            >
              Create Room
            </button>
          </div>
        </section>

        {roomUrl && (
          <section className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Room Created
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Your learning room is ready.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Room name
              </p>

              <p className="mt-1 font-semibold">
                {roomName}
              </p>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Teacher
              </p>

              <p className="mt-1 font-semibold">
                {teacherIdentity}
              </p>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Room URL
              </p>

              <p className="mt-1 break-all text-sm text-slate-700">
                {roomUrl}
              </p>
            </div>
          </section>
        )}

        <footer className="mt-auto pt-12 text-sm text-slate-500">
          LIS-Ecosystem · SBBox-LIS-Room · v0.1 development
        </footer>
      </div>
    </main>
  );
}
type RoomPageProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function RoomPage({
  params,
}: RoomPageProps) {
  const { roomId } = await params;

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
            {roomId}
          </p>
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
            <p>○ Persistent room data — coming next</p>
            <p>○ Student membership — coming next</p>
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
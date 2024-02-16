export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#15182b] min-h-[100dvh] text-white p-4">
      <section className="flex items-start gap-10 max-w-6xl mx-auto mt-10">{children}</section>
    </main>
  );
}

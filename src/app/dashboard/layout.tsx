import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobfinder",
  description: "Create your first program here",
};

export default function Layout({ children, userProgram, programDetail }: { children: React.ReactNode; userProgram: React.ReactNode; programDetail: React.ReactNode }) {
  return (
    <main className="bg-[#15182b] min-h-[100dvh] text-white p-4">
      <section className="flex items-start gap-10 max-w-6xl mx-auto mt-10">{children}</section>
    </main>
  );
}

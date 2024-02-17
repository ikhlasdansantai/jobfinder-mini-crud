"use client";
import { useEffect, useState } from "react";
import ProgramLoading from "@/components/layouts/programLoading";
import Link from "next/link";
import CreateProgramLayout from "@/components/layouts/create-program-layout";
import { useFetch } from "@/hooks/useFetch";

export default function DashboardPage() {
  const [programBody, setProgramBody] = useState<any>({
    name: "",
    location: "",
    description: "development...",
    userId: "1b0363fa-922f-4a38-beeb-083817495be7",
  });
  const [programDatas, setProgramDatas] = useState<any>("");

  const GetAllUserProgram = async () => {
    const fetchProgram = await useFetch({
      url: "/api/user/programs",
      method: "GET",
    });
    setProgramDatas(fetchProgram.data);
  };

  const CreateProgram = async () => {
    const fetchProgram = await useFetch({ url: "/api/user/program", method: "POST", reqBody: programBody });
    alert(fetchProgram.message);
    GetAllUserProgram();
  };

  useEffect(() => {
    GetAllUserProgram();
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full">
      <CreateProgramLayout programBody={programBody} setProgramBody={setProgramBody} onClick={CreateProgram} />
      {programDatas ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programDatas.map((program: any) => (
            <Link href={`/dashboard/program/${program.id}`} key={program.id} className="card bg-[#1f273a] rounded-lg p-4 hover:border hover:border-white transition-all duration-150">
              <h2 className="text-lg">{program.name}</h2>
              <p className="text-xs">{program.location ? program.location : "Indonesia"}</p>
              <ul className="buttons text-xs rounded-md flex gap-2 mt-4">
                <li className="bg-[#15182b] p-2">Design</li>
                <li className="bg-[#15182b] p-2">Web Dev</li>
              </ul>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <ProgramLoading />
          <ProgramLoading />
          <ProgramLoading />
        </div>
      )}
    </section>
  );
}

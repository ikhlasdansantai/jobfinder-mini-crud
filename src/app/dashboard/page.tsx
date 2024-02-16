"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageOffIcon } from "lucide-react";
import ProgramLoading from "@/components/layouts/programLoading";
import Link from "next/link";

export default function DashboardPage() {
  const [programBody, setProgramBody] = useState<any>({
    name: "",
    location: "",
  });
  const [programDatas, setProgramDatas] = useState<any>("");

  const getAllUserProgram = async () => {
    const response = await fetch("/api/user/programs", { method: "GET" });
    const results = await response.json();
    setProgramDatas(results.data);
  };

  const createProgram = async () => {
    const response = await fetch("/api/user/program", {
      method: "POST",
      body: JSON.stringify({
        name: programBody.name,
        description: "development...",
        userId: "1b0363fa-922f-4a38-beeb-083817495be7",
        location: programBody.location,
      }),
    });
    console.log(programBody);
    getAllUserProgram();
  };

  useEffect(() => {
    getAllUserProgram();
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full">
      <CreateProgram programBody={programBody} setProgramBody={setProgramBody} onClick={createProgram} />
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

function CreateProgram({ onClick, programBody, setProgramBody }: { onClick: any; programBody: any; setProgramBody: any }) {
  const [open, setOpen] = useState(false);
  const handleChange = (e: any) => {
    setProgramBody({ ...programBody, [e.name]: e.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="bg-white text-slate-800 block ml-auto">
          Buat Program
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onChange={(e) => handleChange(e.target)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Judul Program
            </Label>
            <Input id="name" name="name" placeholder="Software Engineer" className="col-span-3" min={3} max={25} required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Lokasi
            </Label>
            <Input id="location" name="location" placeholder="Bandung" className="col-span-3" min={3} max={25} required />
          </div>
        </form>
        <DialogFooter>
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function DetailProgramPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<any>("");
  const [programBody, setProgramBody] = useState<any>({
    name: "",
    location: "",
  });
  const findProgramById = async () => {
    const response = await fetch(`/api/user/program/${id}`);
    const results = await response.json();
    if (results.data === null) {
      alert(results.message);
      router.push("/dashboard");
    }
    setData(results.data);
  };

  useEffect(() => {
    const findProgramById = async () => {
      const response = await fetch(`/api/user/program/${id}`);
      const results = await response.json();
      if (results.data === null) {
        alert(results.message);
        router.push("/dashboard");
      }
      setData(results.data);
    };
    findProgramById();
  }, []);

  const router = useRouter();

  const updateProgram = async () => {
    const response = await fetch(`/api/user/program/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: programBody.name,
        location: programBody.location,
        userId: "1b0363fa-922f-4a38-beeb-083817495be7",
      }),
    });
    const results = await response.json();
    alert(results.message);
    findProgramById();
  };

  const deleteProgram = async () => {
    const response = await fetch(`/api/user/program/${id}`, { method: "DELETE" });
    const results = await response.json();
    alert(results.message);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-12 bg-[#1f273a] p-8 rounded-lg max-w-[50%] mx-auto">
      {data && (
        <>
          <div className="prog__detail__header flex justify-between items-start">
            <div className="left">
              <h2>{data.name}</h2>
              <p className="text-slate-500">{data.description}</p>
            </div>
            <p>Posted by {data.author}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 bg-[#15182b] p-4 rounded-lg">
            <div className="box">
              <h5>Experience</h5>
              <p className="text-xs text-slate-500">Expert</p>
            </div>
            <div className="box">
              <h5>Location</h5>
              <p className="text-xs text-slate-500">Bandung, Indonesia</p>
            </div>
            <div className="box">
              <h5>Salary Range</h5>
              <p className="text-xs text-slate-500">dirahasiakan</p>
            </div>
          </div>
          <div className="prog__detail__body space-y-10">
            <div className="prog__overview">
              <h5>Company Overview</h5>
              <p className="text-slate-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio sequi aliquid error aperiam quam sint repellendus unde, molestiae dolore nesciunt.</p>
            </div>
            <div className="prog__overview">
              <h5>Job Requirements</h5>
              <ul className="text-slate-500 mt-2 space-y-2">
                <li className="flex items-center">
                  <Check className="text-blue-400 mr-2" />
                  <p>4 Years of experience</p>
                </li>
                <li className="flex items-center">
                  <Check className="text-blue-400 mr-2" />
                  <p>Understanding of Nextjs, React and Tailwind</p>
                </li>
              </ul>
            </div>
          </div>
          <EditProgram data={data} programBody={programBody} setProgramBody={setProgramBody} handleUpdateProgram={updateProgram} handleDeleteProgram={deleteProgram} />
        </>
      )}
    </div>
  );
}

function EditProgram({ data, programBody, setProgramBody, handleUpdateProgram, handleDeleteProgram }: any) {
  const handleChange = (e: any) => {
    setProgramBody({ ...programBody, [e.name]: e.value });
  };
  return (
    <div className="prog__detail__footer flex items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"custom__primary"} size="lg">
            Edit this Job
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
          </SheetHeader>
          <form onChange={(e) => handleChange(e.target)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" placeholder={data?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" name="location" placeholder={data?.location} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Detail
              </Label>
              <Input id="username" placeholder="under construction" className="col-span-3" disabled={true} />
            </div>
          </form>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleUpdateProgram} type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <DeleteProgram handleDeleteProgram={handleDeleteProgram} />
    </div>
  );
}

function DeleteProgram({ handleDeleteProgram }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"lg"} variant={"destructive"}>
          Delete This Job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProgram}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreateProgramLayout({ onClick, programBody, setProgramBody }: { onClick: any; programBody: any; setProgramBody: any }) {
  const [open, setOpen] = useState(false);
  const handleChange = (e: any) => setProgramBody({ ...programBody, [e.name]: e.value });

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
            <Input id="name" name="name" placeholder="Software Engineer" className="col-span-3" minLength={3} maxLength={25} required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Lokasi
            </Label>
            <Input id="location" name="location" placeholder="Bandung" className="col-span-3" minLength={3} maxLength={25} required />
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

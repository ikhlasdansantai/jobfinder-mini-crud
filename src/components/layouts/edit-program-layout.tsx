import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeleteProgramLayout from "@/components/layouts/delete-program-layout";

export default function EditProgramLayout({ data, programBody, setProgramBody, handleUpdateProgram, handleDeleteProgram }: any) {
  const handleChange = (e: any) => setProgramBody({ ...programBody, [e.name]: e.value });

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
      <DeleteProgramLayout handleDeleteProgram={handleDeleteProgram} />
    </div>
  );
}

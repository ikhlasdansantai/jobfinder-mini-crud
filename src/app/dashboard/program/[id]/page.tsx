"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import EditProgramLayout from "@/components/layouts/edit-program-layout";

export default function DetailProgramPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<any>("");
  const [programBody, setProgramBody] = useState<any>({
    name: "",
    location: "",
    userId: "1b0363fa-922f-4a38-beeb-083817495be7",
  });
  const FindProgramById = async () => {
    const fetchProgram = await useFetch({ url: `/api/user/program/${id}`, method: "GET" });
    if (fetchProgram.data === null) {
      alert(fetchProgram.message);
      router.push("/dashboard");
    }
    setData(fetchProgram.data);
  };

  useEffect(() => {
    FindProgramById();
  }, []);

  const router = useRouter();

  const UpdateProgram = async () => {
    const fetchProgram = await useFetch({
      url: `/api/user/program/${id}`,
      method: "PATCH",
      reqBody: programBody,
    });
    alert(fetchProgram.message);
    FindProgramById();
  };

  const DeleteProgram = async () => {
    const fetchProgram = await useFetch({ url: `/api/user/program/${id}`, method: "DELETE" });
    alert(fetchProgram.message);
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
          <EditProgramLayout data={data} programBody={programBody} setProgramBody={setProgramBody} handleUpdateProgram={UpdateProgram} handleDeleteProgram={DeleteProgram} />
        </>
      )}
    </div>
  );
}

import { db } from "@/lib/db";
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const getProgramById = await db.jobProgram.findFirst({ where: { id } });
  const findMatchUser = await db.user.findFirst({ where: { id: getProgramById?.userId } });

  if (!getProgramById) return Response.json({ status: 404, message: "Not Found", data: getProgramById });
  return Response.json({ status: 200, message: "OK", data: { ...getProgramById, author: findMatchUser?.name } });
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const getProgramById = await db.jobProgram.findFirst({ where: { id } });

  if (!getProgramById) return Response.json({ status: 404, message: "Not Found", data: getProgramById });

  await db.jobProgram.delete({ where: { id } });

  const findMatchUser = await db.user.findFirst({ where: { id: getProgramById?.userId }, include: { jobPrograms: true } });
  return Response.json({ status: 200, message: "Delete Success!", data: { ...findMatchUser } });
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const { name, description, userId, location, image } = await req.json();
  const getProgramById = await db.jobProgram.findFirst({ where: { id } });

  if (!getProgramById) return Response.json({ status: 404, message: "Program Not Found", data: null });

  await db.jobProgram.update({ where: { id }, data: { name, description, userId, location, image } });
  const findProgramUpdate = await db.jobProgram.findFirst({ where: { id } });

  return Response.json({ status: 400, message: "Edit Success!", data: { ...findProgramUpdate } });
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const { name, description, userId, location, image } = await req.json();
  const getProgramById = await db.jobProgram.findFirst({ where: { id } });

  if (!getProgramById) return Response.json({ status: 404, message: "Program Not Found", data: null });
  if (!(name && description && userId && location && image)) {
    return Response.json({ status: 400, message: "Field Must Be Filled!!", data: null });
  }

  await db.jobProgram.update({ where: { id }, data: { name, description, userId, location, image } });
  const findProgramUpdate = await db.jobProgram.findFirst({ where: { id } });

  return Response.json({ status: 400, message: "Edit Success!", data: { ...findProgramUpdate } });
};

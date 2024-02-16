import { db } from "@/lib/db";

export const GET = async (req: Request) => {
  return Response.json({ status: 400, message: "Bad Request" });
};

export const POST = async (req: Request) => {
  const { name, description, userId, location, image } = await req.json();
  const getUserById = await db.user.findFirst({ where: { id: userId } });
  if (!getUserById) return Response.json({ status: 404, message: "Can't Find User", data: null });

  await db.jobProgram.create({
    data: {
      name,
      description,
      userId,
      location,
      image,
    },
  });

  const findMatchUser = await db.user.findFirst({ where: { id: userId }, include: { jobPrograms: true } });
  return Response.json({ status: 200, message: "Program Created!", data: findMatchUser });
};

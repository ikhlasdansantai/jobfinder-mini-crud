import { db } from "@/lib/db";

export const GET = async () => {
  const getAllPrograms = await db.jobProgram.findMany({ include: { user: true } });
  return Response.json({ status: 200, message: "Success", data: getAllPrograms });
};

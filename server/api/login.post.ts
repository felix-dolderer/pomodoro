import { users } from "../db/schema";
import { db } from "../db/connection";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const hanko = event.context.hanko;
  if (!hanko || !hanko.sub) {
    return { status: 401, body: { message: "Unauthorized" } };
  }

  const body = await readBody(event);
  if (!body) {
    return { status: 400, body: { message: "Invalid body" } };
  }

  const userDataSchema = z
    .object({ id: z.string(), email: z.string() })
    .strip();
  const userData = userDataSchema.safeParse(body);

  if (!userData.success) {
    return { status: 400, body: { message: "Invalid body" } };
  }

  if (userData.data.id !== hanko.sub) {
    return { status: 401, body: { message: "Unauthorized" } };
  }

  const dbUser = await db
    .insert(users)
    .values({
      id: userData.data.id,
      email: userData.data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: userData.data.email, updatedAt: new Date() },
    })
    .returning();
  return dbUser;
});

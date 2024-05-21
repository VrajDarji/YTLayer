import db from "@/database/drizzle";
import { users } from "@/database/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  console.log("FROM LIB : ",userId);
  const profile = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return profile;
};

export default currentProfile;

import db from "@/database/drizzle";
import { users } from "@/database/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const intialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-up");
  }
  const profile = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });
  if (profile) {
    return profile;
  }

  const newUser = {
    id: user.id,
    name: user.firstName + " " + user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
  };
  const newProfile = await db.insert(users).values(newUser);
  return newProfile;
};

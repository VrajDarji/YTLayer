import { intialProfile } from "@/lib/intialProfile";
import IntialModal from "@/components/modals/IntialModal";
import db from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { channels } from "@/database/schema";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const profile: any = await intialProfile();
  if (!profile) {
    window.location.reload();
    return redirect("/sign-in");
  }
  const channel = await db.query.channels.findFirst({
    where: eq(channels.userId, profile?.id),
  });
  if (channel) {
    return redirect(`/channels/${channel.id}`);
  }
  return (
    <>
      <IntialModal />
      {/* <UserButton afterSignOutUrl="/" /> */}
    </>
  );
}

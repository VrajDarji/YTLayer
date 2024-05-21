import Nav from "@/components/Nav";
import currentProfile from "@/lib/currentProfile";
import db from "@/database/drizzle";
import { eq, or } from "drizzle-orm";
import { channels, dbMembers, members } from "@/database/schema";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { channelId: string };
}) => {
  const profile = await currentProfile();
  const memberRole = await db.query.members.findFirst({
    where: eq(members.userId, profile?.id as string),
  });
  const role = memberRole?.role;

  const Channels = await db.query.channels.findMany({
    where: or(
      eq(channels.id, params.channelId),
      eq(channels.userId, profile?.id as string)
    ),
  });
  const Members = await db.query.members.findMany({
    where: eq(members.channelId, Channels[0]?.id),
  });
  
  return (
    <div>
      <Nav Channels={Channels} Members={Members} role={role} />
      {children}
    </div>
  );
};

export default layout;

import Nav from "@/components/Nav";
import currentProfile from "@/lib/currentProfile";
import db from "@/database/drizzle";
import { eq, or } from "drizzle-orm";
import { channels, dbMembers, members } from "@/database/schema";
import Head from "next/head";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { channelId: string };
}): Promise<Metadata> {
  const profile = await currentProfile();
  const Channels = await db.query.channels.findMany({
    where: or(
      eq(channels.id, params.channelId),
      eq(channels.userId, profile?.id as string)
    ),
  });
  const channelName = Channels?.[0]?.name || "";
  return {
    title: `YTLayer - ${channelName}`,
  };
}

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
  console.log(Channels?.[0]?.name);

  return (
    <>
      <Head>
        <title>YTLayer - {Channels?.[0]?.name}</title>
      </Head>
      <body>
        <div>
          <Nav Channels={Channels} Members={Members} role={role} />
          {children}
        </div>
      </body>
    </>
  );
};

export default layout;

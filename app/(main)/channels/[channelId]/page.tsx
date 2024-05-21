import getReport from "@/action/getReport";
import getVideoStats from "@/action/getVideoStats";
import UserInfo from "@/components/MainLayout/UserInfo";
import VideoTable from "@/components/MainLayout/VideoTable";
import db from "@/database/drizzle";
import { DBChannel, channels } from "@/database/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const Page = async ({ params }: { params: { channelId: string } }) => {
  const cUser = await currentUser();
  const user = {
    id: cUser?.id as string,
    firstName: cUser?.firstName as string,
    lastName: cUser?.lastName as string,
    email: cUser?.emailAddresses?.[0].emailAddress as string,
    imageUrl: cUser?.imageUrl as string,
  };
  const channel = await db.query.channels.findFirst({
    where: eq(channels.id, params.channelId),
  });
  const reportApi = await getReport();
  const videoStats = await getVideoStats();
  console.log(videoStats.VideoStats);

  return (
    <div className="py-12 px-6 flex flex-col gap-y-4">
      <UserInfo
        report={reportApi}
        user={user}
        channelStats={channel as DBChannel}
      />
      <VideoTable
        Videos={videoStats.VideoStats}
        channelId={channel?.id as string}
      />
    </div>
  );
};

export default Page;

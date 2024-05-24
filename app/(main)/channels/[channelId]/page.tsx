import getReport from "@/action/getReport";
import getVideoStats from "@/action/getVideoStats";
import UserInfo from "@/components/MainLayout/UserInfo";
import VideoTable from "@/components/MainLayout/VideoTable";
import CalendarFormYTLayer from "@/components/ui/CalenderFromYTLayer";
import db from "@/database/drizzle";
import { DBChannel, channels } from "@/database/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import VideoTableClient from "./components/client";
import { VideoColumnProps } from "./components/columns";
import { VideoStats } from "@/types";

const Page = async ({ params }: { params: { channelId: string } }) => {
  const channel = await db.query.channels.findFirst({
    where: eq(channels.id, params.channelId),
  });
  const reportApi = await getReport();
  const videoStats: VideoStats[] = (await getVideoStats()).VideoStats;
  const formattedVideoStats: VideoColumnProps[] = videoStats.map((e) => ({
    id: e.id,
    video: {
      title: e.snippet.localized.title,
      description: e.snippet.localized.description,
      thumbnailUrl: e.snippet.thumbnails.standard.url,
    },
    views: e.statistics.viewCount,
    comments: e.statistics.commentCount,
    Stats: {
      likes: e.statistics.likeCount,
      dislikes: e.statistics.dislikeCount,
    },
  }));
  console.log(formattedVideoStats);

  return (
    <div className="py-12 px-6 flex flex-col gap-y-4">
      <UserInfo report={reportApi} channelStats={channel as DBChannel} />
      {/* <VideoTable
        Videos={videoStats.VideoStats}
        channelId={channel?.id as string}
      /> */}
      <VideoTableClient data={formattedVideoStats} />
    </div>
  );
};

export default Page;

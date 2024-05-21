import React from "react";
import getVideoDetails from "@/action/getVideoDetails";
import VideoPlayer from "@/components/VideoPage/VideoPlayer";
import Link from "next/link";
const page = async ({ params }: { params: { videoId: string } }) => {
  const VideoDetails = (await getVideoDetails(params.videoId)).VideoStats?.[0];
  console.log(VideoDetails);
  const statistics = [
    { tag: "views", values: VideoDetails?.statistics?.viewCount },
    { tag: "likes", values: VideoDetails?.statistics?.likeCount },
    { tag: "dislikes", values: VideoDetails?.statistics?.dislikeCount },
    { tag: "comments", values: VideoDetails?.statistics?.commentCount },
    { tag: "favourites", values: VideoDetails?.statistics?.favoriteCount },
    {
      tag: "ratings",
      values: VideoDetails?.contentDetails?.contentRating?.ytRating || "NO",
    },
  ];
  return (
    <div className="grid grid-cols-4 w-full py-8 px-6 gap-x-4">
      <div className="col-span-3 flex flex-col gap-y-4">
        <VideoPlayer videoId={VideoDetails?.id as string} />
        <div className="flex flex-col gap-y-4 px-4 py-6">
          <p className="text-2xl font-medium">
            {VideoDetails?.snippet?.localized?.title}
          </p>
          <p className="p-3 rounded-md bg-gray-200">
            {VideoDetails?.snippet?.localized?.description}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full grid grid-cols-2 gap-4 min-h-max">
          {statistics.map((stat) => (
            <div
              key={stat.values}
              className="w-full aspect-square rounded-md bg-gray-200 flex flex-col items-center justify-center"
            >
              {stat.values}
              {stat.tag}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.topicDetails?.relevantTopicIds?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.topicDetails?.topicCategories?.map((ids) => (
            <Link key={ids} href={ids}>
              {ids}
            </Link>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.topicDetails?.topicIds?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.suggestions?.editorSuggestions?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.suggestions?.processingErrors?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.suggestions?.processingHints?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.suggestions?.processingWarnings?.map((ids) => (
            <div key={ids}>{ids}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {VideoDetails?.suggestions?.tagSuggestions?.map((ids) => (
            <div key={ids.tag}>{ids.tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default page;

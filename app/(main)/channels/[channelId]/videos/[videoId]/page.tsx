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
          <p className="p-3 rounded-md bg-gray-200 dark:bg-zinc-800">
            {VideoDetails?.snippet?.localized?.description}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full grid grid-cols-2 gap-4 min-h-max">
          {statistics.map((stat) => (
            <div
              key={stat.values}
              className="w-full aspect-square rounded-md bg-gray-200 dark:bg-zinc-800 flex flex-col gap-y-4 items-center justify-center"
            >
              <p className="font-bold text-3xl">{stat.values}</p>
              <p>{stat.tag}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          {VideoDetails?.topicDetails?.relevantTopicIds && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Relevant Topics Ids
              </p>
              <div>
                {VideoDetails?.topicDetails?.relevantTopicIds?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.topicDetails?.topicCategories && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Topic Categories
              </p>
              <div>
                {VideoDetails?.topicDetails?.topicCategories?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.topicDetails?.topicIds && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Topics Ids
              </p>
              <div>
                {VideoDetails?.topicDetails?.topicIds?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.suggestions?.editorSuggestions && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Editor Suggestions
              </p>
              <div>
                {VideoDetails?.suggestions?.editorSuggestions?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.suggestions?.processingErrors && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Processing Errors
              </p>
              <div>
                {VideoDetails?.suggestions?.processingErrors?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.suggestions?.processingHints && (
            <div className="flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black  dark:border-white">
                Processing Hints
              </p>
              <div>
                {VideoDetails?.suggestions?.processingHints?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.suggestions?.processingWarnings && (
            <div className="flex flex-col bg-gray-200 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Processing Warnings
              </p>
              <div>
                {VideoDetails?.suggestions?.processingWarnings?.map((ids) => (
                  <div key={ids} className="flex flex-row gap-x-4 items-center">
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <Link
                      href={ids}
                      className="w-full text-wrap truncate underline text-indigo-500 dark:text-indigo-400"
                    >
                      <p>{ids}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {VideoDetails?.suggestions?.tagSuggestions && (
            <div className="flex flex-col bg-gray-200 rounded-md p-6 gap-y-4 w-full">
              <p className="text-2xl py-2 font-bold border-b-2 border-black dark:border-white">
                Tag Suggestion
              </p>
              <div>
                {VideoDetails?.suggestions?.tagSuggestions?.map((ids) => (
                  <div
                    key={ids.tag}
                    className="flex flex-row gap-x-4 items-center"
                  >
                    <div className="h-2 aspect-square bg-black dark:bg-white rounded-full" />
                    <p>{ids.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default page;

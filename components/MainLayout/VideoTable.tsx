"use client";
import React from "react";
import { VideoStats } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface VideoProps {
  Videos: VideoStats[];
  channelId: string;
}

const VideoTable: React.FC<VideoProps> = ({ Videos, channelId }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full gap-y-3 rounded-md border-2 shadow-md p-3">
      <h1 className="text-3xl w-full border-b-2 py-2 px-6">Video Details</h1>
      <div className="flex flex-col gap-x-1 w-full">
        {Videos.map((video) => {
          const likeCount = Number(video.statistics.likeCount);
          const dislikeCount = Number(video.statistics.dislikeCount);
          const likePercentage =
            likeCount + dislikeCount === 0
              ? 0
              : ((likeCount / (likeCount + dislikeCount)) * 100).toFixed(2);
          const dislikePercentage =
            likeCount + dislikeCount === 0
              ? 0
              : ((dislikeCount / (likeCount + dislikeCount)) * 100).toFixed(2);
          return (
            <Link
              href={`/channels/${channelId}/videos/${video.id}`}
              key={video.id}
              className="grid grid-cols-6 p-4 border-b gap-x-4 max-h-40 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-sm"
            >
              <div className="w-full aspect-video relative">
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  fill
                  className="absolute"
                />
              </div>
              <div className="flex flex-col col-span-3">
                <p className="">{video.snippet.title}</p>
                <p className="truncate">
                  {video.snippet.localized.description}
                </p>
              </div>
              <div className="flex h-full items-center">{video.statistics.viewCount} views</div>
              <div className="flex flex-col gap-y-1 justify-center">
                <div className="flex flex-row gap-x-4 items-center">
                  <div className="w-20 h-1 rounded-sm bg-gray-600 relative">
                    <div
                      className={`absolute top-0 right-0 bg-emerald-500 h-1 z-10 rounded-sm`}
                      style={{ width: `${likePercentage}%` }}
                    ></div>
                    <div
                      className={`absolute top-0 left-0 bg-rose-500 h-1 z-10 rounded-sm`}
                      style={{ width: `${dislikePercentage}%` }}
                    ></div>
                  </div>
                  <p>{likePercentage} %</p>
                </div>
                <p>{video.statistics.likeCount} likes</p>
                <p>{video.statistics.dislikeCount} dislikes</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoTable;

"use client";
import { DBChannel } from "@/database/schema";
import { Channel } from "@/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface UserInfoProps {
  channelStats: DBChannel;
  report: {
    views: number;
    likes: number;
    dislikes: number;
    estimatedMinutesWatched: number;
    averageViewDuration: number;
    comments: number;
    subscribers: number;
  };
}
const info = [
  "views",
  "likes",
  "dislikes",
  "estimatedMinutesWatched",
  "averageViewDuration",
  "comments",
  "subscribers",
];
const UserInfo: React.FC<UserInfoProps> = ({ channelStats, report }) => {
  return (
    <div className="p-4 rounded-md border-2 flex flex-col gap-y-4 items-center shadow-md bg-opacity-30  backdrop-filter">
      {/* Add Channel Stats From here */}
      <div className="w-full grid grid-cols-4 gap-2">
        <div className="p-3 py-4 border-2 rounded-md flex flex-col items-center justify-center gap-y-2">
          <Image
            src={channelStats.imageUrl}
            width={80}
            height={80}
            alt=""
            className="rounded-full object-cover"
          />
          <p className="text-lg font-semibold">{channelStats.name}</p>
          <p>id : {channelStats.id}</p>
        </div>
        {info.map((name) => {
          return (
            <div
              key={name}
              className="border-2 min-h-[200px] rounded-md p-3 flex flex-col gap-y-2 justify-center items-center"
            >
              {/* @ts-ignore */}
              <p className="text-4xl font-bold">{report[name]}</p>
              <p>{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserInfo;

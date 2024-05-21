"use client";
import { DBChannel } from "@/database/schema";
import { Channel } from "@/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface UserInfoProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
  };
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
const UserInfo: React.FC<UserInfoProps> = ({ user, channelStats, report }) => {
  const [isHidden, setIshidden] = useState(false);
  return (
    <div className="p-4 rounded-md border-2 flex flex-col gap-y-4 items-center shadow-md bg-opacity-30  backdrop-filter">
      {!isHidden && (
        <div className="w-full flex flex-row">
          <div className="w-full flex flex-row items-center gap-x-4">
            <div className="h-full aspect-square overflow-hidden flex items-center justify-center">
              <Image
                src={user.imageUrl}
                alt={user.firstName as string}
                width={50}
                height={50}
                className=" rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">Welcome...</p>
              <p className="text-4xl font-bold tracking-wide">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
          <div className="mr-auto flex items-center justify-center min-w-max px-5">
            <button
              className="flex flex-row gap-x-2 px-5 rounded-3xl text-base border-2 py-2 items-center "
              onClick={() => setIshidden(true)}
            >
              <Eye size={18} /> <p>Hide Info</p>
            </button>
          </div>
        </div>
      )}
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

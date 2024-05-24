"use client";

import CellAction from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export type VideoColumnProps = {
  id: string;
  video: {
    thumbnailUrl: string;
    title: string;
    description: string;
  };
  views: string;
  comments: string;
  Stats: {
    likes: string;
    dislikes: string;
  };
};

export const columns: ColumnDef<VideoColumnProps>[] = [
  {
    accessorKey: "video",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Video
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-x-6">
          <Image
            src={row.original.video.thumbnailUrl}
            alt=""
            width={240}
            height={135}
          />
          <div className="flex flex-col gap-y-4">
            <p>{row.original.video.title}</p>
            <p className="truncate">{row.original.video.description}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Stats",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes vs Dislikes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <p>{row.original.Stats.likes}</p>
        <p>{row.original.Stats.dislikes}</p>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import ChannelSwitch from "./ui/ChannelSwitch";
import MainNav from "./ui/MainNav";
import { ModeToggle } from "./ui/ModeToggle";
import { channels, dbMembers, members, DBChannel } from "@/database/schema";


const Nav = async ({
  Channels,
  Members,
  role,
}: {
  Channels: DBChannel[];
  Members: dbMembers[];
  role: "member" | "creator" | "manager" | "editor" | undefined;
}) => {

  return (
    <div className="h-16 border-b-2 shadow-md w-full flex px-3 py-2 items-center gap-x-8 z-10 cursor-pointer sticky top-0 dark:bg-[#09090B] bg-white">
      <ChannelSwitch Channels={Channels} Members={Members} role={role} />
      <div>
        <MainNav />
      </div>
      <div className="ml-auto flex flex-row gap-x-3 px-3">
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Nav;

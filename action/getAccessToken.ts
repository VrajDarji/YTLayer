import currentProfile from "@/lib/currentProfile";
import { clerkClient } from "@clerk/nextjs";
const getAccessToken = async () => {
  const profile = await currentProfile();
  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    profile?.id as string,
    "oauth_google"
  );
  return clerkResponse[0].token;
};

export default getAccessToken;

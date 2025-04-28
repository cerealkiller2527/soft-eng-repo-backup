import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return { userId: null, username: null, role: null };
  }

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role as string | null;
  const username = user.username;

  return { userId, role, username };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

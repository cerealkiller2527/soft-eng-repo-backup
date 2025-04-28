import { initTRPC, TRPCError } from "@trpc/server";
import PrismaClient from "../bin/prisma-client";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { z } from "zod";
import { t } from "../app";

export const loginRouter = t.router({
  verifyClerkUser: t.procedure
    .input(
      z.object({
        sessionId: z.string(),
        sessionToken: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { sessionId } = input;

      const authorization = ctx.req.headers.authorization;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No Authorization token.");
      }

      const token = authorization.replace("Bearer ", "");

      try {
        const session = await clerkClient.sessions.verifySession(
          input.sessionId,
          input.sessionToken,
        );
        const userId = session.userId;
        const user = await clerkClient.users.getUser(userId);
        const email = user.emailAddresses[0].emailAddress;

        const existing = await PrismaClient.user.findFirst({
          where: { email },
        });

        if (!existing) {
          await PrismaClient.user.create({
            data: {
              username: user.username ?? "",
              password: "", // default since Clerk handles auth
              email: email,
            },
          });
        }

        return { success: true };
      } catch (err) {
        console.error("Failed to verify session", err);
        throw new Error("Unauthorized");
      }
    }),
});

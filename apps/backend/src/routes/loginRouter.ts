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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { sessionId } = input;

      if (!ctx.req.auth) {
        throw new Error("Unauthorized: No Clerk auth info.");
      }

      const { sessionId: authSessionId } = ctx.req.auth;

      if (!authSessionId || authSessionId !== sessionId) {
        throw new Error("Unauthorized: Session mismatch.");
      }

      return { success: true };
    }),
});

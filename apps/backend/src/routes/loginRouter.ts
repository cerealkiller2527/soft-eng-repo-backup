import { initTRPC, TRPCError } from "@trpc/server";
import PrismaClient from "../bin/prisma-client";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { z } from "zod";
import { t } from "../app.ts";

export const loginRouter = t.router({
  verifyClerkUser: t.procedure
    .input(
      z.object({
        sessionId: z.string(),
        sessionToken: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
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

  getCurrentUser: t.procedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    try {
      const user = await clerkClient.users.getUser(ctx.userId);
      return {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user info",
      });
    }
  }),

  addLogin: t.procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { username, password, email } = input;
      const user = await PrismaClient.user.create({
        data: {
          username: username,
          password: password,
          email: email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to stored User",
        });
      }

      console.log("Successfully created an user: ", user.username);
      return {
        message: "Create user successful",
        user: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      };
    }),
});

export type loginRouter = typeof loginRouter;

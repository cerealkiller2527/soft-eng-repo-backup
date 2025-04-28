import { TRPCError } from "@trpc/server";
import { Context } from "../context";

export const isAuthed = async ({ ctx, next }: { ctx: Context; next: any }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
};

export const hasRole =
  (allowedRoles: string[]) =>
  async ({ ctx, next }: { ctx: Context; next: any }) => {
    if (!ctx.role || !allowedRoles.includes(ctx.role)) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  };

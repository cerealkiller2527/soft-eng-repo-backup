import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { isAuthed, hasRole } from "./middleware/middleware";

const t = initTRPC.context<Context>().create();

export const protectedProcedure = t.procedure.use(isAuthed);

export const adminProcedure = t.procedure.use(hasRole(["admin"]));

export { t };

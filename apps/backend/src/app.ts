import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { clerkClient } from '@clerk/clerk-sdk-node';
import { employeeRouter } from "./routes/employeeRouter";
import { serviceRouter } from "./routes/serviceRouter";
import { loginRouter } from "./routes/loginRouter.ts";
import { searchRouter } from "./routes/search.ts";
import { csvRouter } from "./routes/csvRouter.ts";
import express from "express";
import logger from "morgan";
import { directoriesRouter } from "./routes/directoriesRouter.ts";
import { mapEditorRouter } from "./routes/mapEditorRouter.ts";
import { mapInfoRouter } from "./routes/mapInfoRouter.ts";

// created for each request
const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    try {
        const session = await clerkClient.sessions.getSession(req);

        return {
            userId: session ? session.userId : null,
        };
    } catch (error) {
        console.error("Error fetching Clerk session:", error);
        return { userId: null }; //
    }
};

export type Context = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  employee: employeeRouter,
  service: serviceRouter,
  login: loginRouter,
  csv: csvRouter,
  directories: directoriesRouter,
  search: searchRouter,
  mapEditor: mapEditorRouter,
  mapInfoRouter: mapInfoRouter,
});

const app = express();

app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
);

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
export type AppRouter = typeof appRouter;
export { appRouter };

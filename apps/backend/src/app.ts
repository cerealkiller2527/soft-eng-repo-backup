import "dotenv/config";
import { t } from "./trpc.ts";
import { initTRPC } from "@trpc/server";
import { createContext } from "./context";
import { clerkMiddleware } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import logger from "morgan";

export type Context = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<Context>().create();

import { employeeRouter } from "./routes/employeeRouter";
import { serviceRouter } from "./routes/serviceRouter";
import { loginRouter } from "./routes/loginRouter.ts";
import { searchRouter } from "./routes/search.ts";
import { csvRouter } from "./routes/csvRouter.ts";
import { directoriesRouter } from "./routes/directoriesRouter.ts";
import { mapEditorRouter } from "./routes/mapEditorRouter.ts";
import { mapInfoRouter } from "./routes/mapInfoRouter.ts";

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

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
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
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

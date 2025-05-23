import "dotenv/config";
import { t } from "./trpc.ts";
import { createContext } from "./context";
import { clerkMiddleware } from "@clerk/express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import express from "express";
import logger from "morgan";
import { employeeRouter } from "./routes/employeeRouter";
import { serviceRouter } from "./routes/serviceRouter";
import { searchRouter } from "./routes/search.ts";
import { csvRouter } from "./routes/csvRouter.ts";
import { directoriesRouter } from "./routes/directoriesRouter.ts";
import { mapEditorRouter } from "./routes/mapEditorRouter.ts";
import { mapInfoRouter } from "./routes/mapInfoRouter.ts";
import { dbImportRouter } from "./routes/dbImportRouter.ts";
import { pathfindingRouter } from "./routes/pathfindingRouter.ts";
import { chatRouter } from "./routes/chatRouter.ts";

const appRouter = t.router({
  employee: employeeRouter,
  service: serviceRouter,
  csv: csvRouter,
  directories: directoriesRouter,
  search: searchRouter,
  chat: chatRouter,
  mapEditor: mapEditorRouter,
  mapInfoRouter: mapInfoRouter,
  dbEditor: dbImportRouter,
  pathfinding: pathfindingRouter,
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

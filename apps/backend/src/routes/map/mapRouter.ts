// Combine all routers
import {searchRouter} from "./search.ts";
import {mapInfoRouter} from "./mapInfoRouter.ts";
import {mapEditorRouter} from "./mapEditorRouter.ts";
import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const mapRouter = t.mergeRouters(
    mapEditorRouter,
    mapInfoRouter,
    searchRouter,
);
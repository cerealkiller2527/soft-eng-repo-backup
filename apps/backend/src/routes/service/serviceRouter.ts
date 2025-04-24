import { initTRPC } from "@trpc/server";
const t = initTRPC.create();

import { languageRouter } from "./languageRouter.ts";
import { equipmentDeliveryRouter } from "./equipmentDeliveryRouter.ts";
import { securityRouter } from "./securityRouter.ts";
import { externalTransportationRouter } from "./externalTransportationRouter.ts";
import { audiovisualRouter } from "./audiovisualRouter.ts";
import { csvExportRouter } from "../csv/csvExportRouter.ts";
import { csvImportRouter } from "../csv/csvImportRouter.ts";

export const serviceRouter = t.mergeRouters(
  languageRouter,
  equipmentDeliveryRouter,
  securityRouter,
  externalTransportationRouter,
  audiovisualRouter,
);

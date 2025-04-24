import { initTRPC } from "@trpc/server";
const t = initTRPC.create();

import { languageRouter } from "./service/languageRouter.ts";
import { equipmentDeliveryRouter } from "./service/equipmentDeliveryRouter.ts";
import { securityRouter } from "./service/securityRouter.ts";
import { externalTransportationRouter } from "./service/externalTransportationRouter.ts";
import { audiovisualRouter } from "./service/audiovisualRouter.ts";
import { csvExportRouter } from "./csvExportRouter.ts";
import { csvImportRouter } from "./csvImportRouter.ts";

export const serviceRouter = t.mergeRouters(
  languageRouter,
  equipmentDeliveryRouter,
  securityRouter,
  externalTransportationRouter,
  audiovisualRouter,
);

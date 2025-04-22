import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

import { languageRouter } from './languageRouter';
import { equipmentDeliveryRouter } from './equipmentDeliveryRouter';
import { securityRouter } from './securityRouter';
import { externalTransportationRouter } from './externalTransportationRouter';
import { audiovisualRouter } from './audiovisualRouter';
import {csvExportRouter} from "./csvExportRouter.ts";
import {csvImportRouter} from "./csvImportRouter.ts";

export const serviceRouter = t.mergeRouters(
    languageRouter,
    equipmentDeliveryRouter,
    securityRouter,
    externalTransportationRouter,
    audiovisualRouter
);

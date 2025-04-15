import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

import { languageRouter } from './languageRouter';
import { equipmentDeliveryRouter } from './equipmentDeliveryRouter';
import { securityRouter } from './securityRouter';
import { externalTransportationRouter } from './externalTransportationRouter';
import { audiovisualRouter } from './audiovisualRouter';

export const serviceRouter = t.router({
    languageRouter: languageRouter,
    equipmentDeliveryRouter: equipmentDeliveryRouter,
    securityRouter: securityRouter,
    externalTransportationRouter: externalTransportationRouter,
    audiovisualRouter: audiovisualRouter,
});

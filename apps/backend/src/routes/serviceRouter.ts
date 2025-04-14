import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

import { languageRouter } from './languageRouter';
import { equipmentDeliveryRouter } from './equipmentDeliveryRouter';

export const serviceRouter = t.router({
    languageRouter: languageRouter,
    equipmentDeliveryRouter: equipmentDeliveryRouter,
});

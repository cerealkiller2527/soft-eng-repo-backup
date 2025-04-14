import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

import { languageRouter } from './languageRouter';

export const serviceRouter = t.router({
    languageRouter: languageRouter,
});
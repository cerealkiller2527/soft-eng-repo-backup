import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { mapInfoRouter } from './routes/mapInfoRouter';
import { serviceRouter } from './routes/serviceRouter';

import express from 'express';
import logger from 'morgan';

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    service: serviceRouter,
    mapInfo: mapInfoRouter,
});
const app = express();
app.use(
    logger('dev', {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    })
);

app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

export default app;
export type appRouter = typeof appRouter;

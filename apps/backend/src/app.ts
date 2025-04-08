import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { employeeRouter } from './routes/employeeRouter';
import { serviceRouter } from './routes/serviceRouter';
import {loginRouter} from "./routes/loginRouter.ts";
import express from 'express';

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    employee: employeeRouter,
    service: serviceRouter,
    login: loginRouter,
});
const app = express();
app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

export default app;

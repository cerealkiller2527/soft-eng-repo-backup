import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { employeeRouter } from './routes/employeeRouter';
import { serviceRouter } from './routes/serviceRouter';
import { loginRouter } from './routes/loginRouter.ts';
import { csvRouter } from './routes/csvRouter.ts';
import { directoryRouter } from './routes/directoryRouter';
import express from 'express';
import logger from 'morgan';

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

// Add middleware for logging all requests
const loggerMiddleware = t.middleware(
    async ({ path, next }: { path: string; next: () => Promise<any> }) => {
        console.log(`TRPC Request: ${path}`);
        try {
            return await next();
        } catch (error) {
            console.error(`TRPC Error in ${path}:`, error);
            throw error;
        } finally {
            console.log(`TRPC Response: ${path} completed`);
        }
    }
);

// Create procedure with logger middleware
const procedure = t.procedure.use(loggerMiddleware);

// Apply to all routers
const appRouter = t.router({
    employee: employeeRouter,
    service: serviceRouter,
    login: loginRouter,
    csv: csvRouter,
    directory: directoryRouter,
});

const app = express();
app.use(
    logger('dev', {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg: string) => console.info(msg),
        },
    })
);

// Add error handling for debugging
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express Error:', err);
    next(err);
});

app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

export default app;
export type appRouter = typeof appRouter;

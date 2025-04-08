import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';

import { employeeRouter } from './routes/employeeRouter';
import { serviceRouter } from './routes/serviceRouter';
import { loginRouter } from './routes/loginRouter';
import healthcheckRouter from './routes/healthcheck';
import highscoreRouter from './routes/score';
import serviceassignedto from './routes/serviceassigned';
import searchRouter from './routes/search';

import { API_ROUTES } from 'common/src/constants';

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    employee: employeeRouter,
    service: serviceRouter,
    login: loginRouter,
});

const app: Express = express(); // Setup the backend

// serve favicon.ico
app.use(express.static(path.join(__dirname, '..', 'public')));

// Setup generic middleware
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser
app.use(logger('dev'));

// Setup tRPC router
app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

// Setup other routers
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.SCORE, highscoreRouter);
app.use(API_ROUTES.EMPLOYEE, employeeRouter);
app.use(API_ROUTES.SERVICEREQ, serviceRouter);
app.use(API_ROUTES.ASSIGNED, serviceassignedto);
app.use(API_ROUTES.SEARCH, searchRouter);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    // Have the next (generic error handler) process a 404 error
    next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response) => {
    // Provide the error message
    res.statusMessage = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Reply with the error
    res.status(err.status || 500);
});

// Export the backend, so that www.ts can start it
export default app;

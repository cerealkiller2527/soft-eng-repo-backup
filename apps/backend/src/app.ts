import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import healthcheckRouter from './routes/healthcheck';
import highscoreRouter from './routes/score.ts';
import serviceRouter from './routes/serviceRouter.ts';
import employeeRouter from './routes/employeeRouter.ts';
import serviceassignedto from './routes/serviceassigned.ts';
import departmentRouter from './routes/departmentRouter.ts';
import searchRouter from './routes/search.ts';
import csvExportRouter from './routes/csvExportRouter';
import csvImportRouter from './routes/csvImportRouter.ts';

import { API_ROUTES } from 'common/src/constants';

import path from 'path';

const app: Express = express(); // Setup the backend

// serve favicon.ico
app.use(express.static(path.join(__dirname, '..', 'public')));

// Setup generic middlewear
app.use(
    logger('dev', {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    })
); // This records all HTTP requests

app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.SCORE, highscoreRouter);
app.use(API_ROUTES.EMPLOYEE, employeeRouter);
app.use(API_ROUTES.SERVICEREQ, serviceRouter);
app.use(API_ROUTES.DEPARTMENT, departmentRouter);
app.use(API_ROUTES.ASSIGNED, serviceassignedto);
app.use(API_ROUTES.SEARCH, searchRouter);

app.use(API_ROUTES.CSV_EXPORT, csvExportRouter);
app.use(API_ROUTES.CSV_IMPORT, csvImportRouter);

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

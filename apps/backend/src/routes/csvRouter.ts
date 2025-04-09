import { initTRPC } from '@trpc/server';
import { csvExportRouter } from './csvExportRouter';
import { csvImportRouter } from './csvImportRouter';

export const t = initTRPC.create();

// Combine the CSV export and import routers
export const csvRouter = t.mergeRouters(csvExportRouter, csvImportRouter);

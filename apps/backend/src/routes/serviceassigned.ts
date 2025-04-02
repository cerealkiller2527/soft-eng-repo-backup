import express, { Router, Request, Response } from 'express';
import { Status, RequestType } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

export default router;

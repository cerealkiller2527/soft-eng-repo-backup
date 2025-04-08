import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';
export const t = initTRPC.create();
export const loginRouter = t.router({
    checkLogin: t.procedure
        .input(
            z.object({
                username: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { username, password } = input;
            const user = await PrismaClient.user.findUnique({
                where: { username: username },
            });

            if (!user) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User not found.',
                });
            }

            if (user.password !== password) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Invalid password.',
                });
            }

            console.log('Successfully logged in: ', user.username);
            return {
                message: 'Login successful',
                user: {
                    username: user.username,
                    email: user.email,
                },
            };
        }),
    addLogin: t.procedure
        .input(
            z.object({
                username: z.string(),
                password: z.string(),
                email: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { username, password, email } = input;
            const user = await PrismaClient.user.create({
                data: {
                    username: username,
                    password: password,
                    email: email,
                },
            });
            if (!user) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Unable to stored User',
                });
            }

            console.log('Successfully created an user: ', user.username);
            return {
                message: 'Create user successful',
                user: {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                },
            };
        }),
});
// export type definition of API
export type loginRouter = typeof loginRouter;

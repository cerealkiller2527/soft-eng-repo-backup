import { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await PrismaClient.user.findUnique({
            where: { username },
        });

        if (!user) {
            res.status(400).send({ message: 'User not found.' });
            return;
        }

        if (user.password !== password) {
            res.status(400).send({ message: 'Invalid password.' });
        }

        console.log('Successfully logged in: ', user.username);
        res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Error fetching login:', err);
        res.sendStatus(500);
    }
});

export default router;

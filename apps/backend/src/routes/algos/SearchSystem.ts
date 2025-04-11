import { Algorithm } from './Algorithm.ts';
import { pNode } from './pNode.ts';
import PrismaClient from '../../bin/prisma-client.ts';

export class SearchSystem {
    algorithm: Algorithm;

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    changeAlgorithm(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    path(startDescription: string, endDescription: string) {
        return this.algorithm.findPath(startDescription, endDescription);
    }
}

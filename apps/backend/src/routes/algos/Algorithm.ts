import { pNode } from './pNode.ts';
import PrismaClient from '../../bin/prisma-client.ts';

export abstract class Algorithm {
    abstract findPath(startDesc: string, endDesc: string): Promise<number[][]>;

    static async getNodeFromDescription(description: string): Promise<pNode> {
        /**
         * queries database for node with given description
         * @param description string that matches a description of a node in the database
         * @return a new pNode with all fields filled, or a node with id -1 if no node was found
         */

        const node = await PrismaClient.node.findFirst({
            where: { description: description },
        });

        if (!node) {
            return new pNode(-1);
        } else {
            return new pNode(node.id, node.x, node.y, node.description);
        }
    }
}

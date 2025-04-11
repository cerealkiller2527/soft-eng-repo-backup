import {Algorithm} from "./Algorithm.ts";
import {pNode} from "./pNode.ts";
import {BFS} from "./BFS.ts";
import PrismaClient from "../../bin/prisma-client.ts";


export class SearchSystem {
    algorithm: Algorithm;

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    changeAlgorithm(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    async getNodeFromDescription(description: string) {
        // query database for node with description
        // will return a node with all required fields filled

        const node = await PrismaClient.node.findFirst({
            where: { description: description },
        });

        if (!node) {
            return new pNode(-1);
        } else {
            return new pNode(node.x, node.y, node.id, node.description);
        }
    }

    path(startDescription: string, endDescription: string) {
        return this.algorithm.findPath(startDescription, endDescription);
    }
}
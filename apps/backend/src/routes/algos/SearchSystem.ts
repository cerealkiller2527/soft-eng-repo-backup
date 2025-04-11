import {Algorithm} from "./Algorithm.ts";
import {pNode} from "./pNode.ts";
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
            return new pNode(node.x, node.y, node.id, node.description);
        }
    }

    path(startDescription: string, endDescription: string) {
        return this.algorithm.findPath(startDescription, endDescription);
    }
}
import { pNode } from "./pNode.ts";
import PrismaClient from "../../bin/prisma-client.ts";

export abstract class Algorithm {
  abstract findPath(startId: number, endId: number): Promise<pNode[]>;

  static async createNodeFromId(id: number) {
    const node = await PrismaClient.node.findUnique({
      where: { id: id },
    });
    if (!node) {
      console.error("Node not found");
      return new pNode(-1);
    }
    return new pNode(id, node!.long, node!.lat, node!.description, -1);
  }
}

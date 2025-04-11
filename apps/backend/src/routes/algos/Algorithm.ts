import {pNode} from "./pNode.ts";


export interface Algorithm {


    findPath(startDesc: string, endDesc: string): number[][];
}
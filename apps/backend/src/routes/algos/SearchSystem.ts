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

    async path(location: string, endDescription: string, driving: boolean) {
        let startDescription: string;
        let parkingDescription: string;
        let parkingPath: pNode[] = [];
        let parkingReturnPath: pNode[] = []

        // find location
        if(location === "chestnut hill" || location == "chestnut") {
            startDescription = "1drop off";
            parkingDescription = "1parking";
        }else if(location === "20 patriot" || location === "22 patriot" || location === "patriot place") {
            startDescription = "120/122drop off";
            parkingDescription = "120/122parking";
        }else {
            console.error("Unrecognized location", location);
            return [new pNode(-1)];
        }

        // if driving, get path to parking
        if(driving){
            parkingPath = await this.algorithm.findPath(startDescription, parkingDescription)
            parkingReturnPath = parkingPath.reverse()
        }

        const path = await this.algorithm.findPath(startDescription, endDescription);


        return [...parkingPath, ...parkingReturnPath, ...path];
    }
}

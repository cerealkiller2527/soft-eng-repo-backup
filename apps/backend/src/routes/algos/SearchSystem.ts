import { Algorithm } from "./Algorithm.ts";
import { pNode } from "./pNode.ts";
import PrismaClient from "../../bin/prisma-client.ts";

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
    let parkingReturnPath: pNode[] = [];
    console.log(location, endDescription, driving);

    if (location === "Chestnut Hill Medical Center" || location == "chestnut") {
      startDescription = "Chestnut Drop Off";
      parkingDescription = "Chestnut Parking";
    } else if (location === "20 Patriot Place") {
      startDescription = "20 Patriot Dropoff";
      parkingDescription = "20 Patriot Parking";
    } else if (location === "22 Patriot Place") {
      startDescription = "22 Patriot Dropoff";
      parkingDescription = "22 Patriot Parking";
    } else if (location === "Faulkner Hospital" || location === "faulkner") {
      startDescription = "Faulkner Drop Off";
      parkingDescription = "Faulkner Parking";
    } else {
      console.error("Unrecognized location", location);
      return [new pNode(-1)];
    }

    // if driving, get path to parking
    if (driving) {
      parkingPath = await this.algorithm.findPath(
        startDescription,
        parkingDescription,
      );
    }

    const path = await this.algorithm.findPath(
      startDescription,
      endDescription,
    );

    return [...parkingPath.reverse(), ...path];
  }
}

import fs from 'fs';
import Papa from 'papaparse';
import {nodeType, PrismaClient, RequestType} from '../.prisma/client';
import {nodeTypeSchema,
        NodeCreateInputSchema,
        LocationUncheckedCreateInputSchema,
        EdgeUncheckedCreateInputSchema,
        EmployeeCreateInputSchema} from "../prisma/generated/zod"
import {nodeCSVRow,
        edgeCSVRow,
        employeeCSVRow,
        serviceRequestRow} from "./CSVTypes.ts";
import { z } from 'zod';

const prisma = new PrismaClient();

export async function seedNodes(path: string) {
    const nodesFile = fs.readFileSync(path, "utf-8");
    const { data: nodes } = Papa.parse<Record<string, any>>(nodesFile, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: {
            lat: true,
            long: true,
            floor: true,
            outside: true
        }
    });

    const nodesSeeded = await Promise.all(
        nodes.map(async (node) => {
            try {
                const parsedInfo = nodeCSVRow.parse(node);
                const parsedNode: z.infer<typeof NodeCreateInputSchema> = {
                    type: nodeTypeSchema.parse(parsedInfo.type),
                    description: parsedInfo.description.trim(),
                    lat: parsedInfo.lat,
                    long: parsedInfo.long,
                    outside: parsedInfo.outside,
                };
                const thisNode = await prisma.node.create({ data: parsedNode });

                const thisBuilding = await prisma.building.findFirst({
                    where: {
                        name: { contains: parsedInfo.building, mode: "insensitive" }
                    }
                });

                if (!thisBuilding) {
                    console.error("Error finding building:", parsedInfo.building);
                }

                const thisDept = await prisma.department.findFirst({
                    where: {
                        name: thisNode.description,
                        Location: {
                            some: {
                                buildingId: thisBuilding?.id ?? -1,
                                floor: parsedInfo.floor
                            }
                        }
                    }
                });



                if (thisDept) {
                    const thisLocation = await prisma.location.findFirst({
                        where: {
                            buildingId: thisBuilding?.id ?? -1,
                            floor: parsedInfo.floor,
                            departmentId: thisDept.id
                        }
                    });

                    await prisma.location.update({
                        where: { id: thisLocation?.id },
                        data: { nodeID: thisNode.id }
                    });
                } else {
                    // console.log("No dept. found: creating location for node:", thisNode.description)
                    const newLocation: z.infer<typeof LocationUncheckedCreateInputSchema> = {
                        floor: parsedInfo.floor,
                        buildingId: thisBuilding?.id ?? -1,
                        nodeID: thisNode.id,
                        suite: "-1"
                    };
                    await prisma.location.create({ data: newLocation });
                }
                return thisNode;
            } catch (e) {
                console.error('Error parsing node:', node, e);
            }
        })
    );

    return nodesSeeded;
}



export async function seedEdges(path: string) {
    // seed edges
    const edgesFile = fs.readFileSync(path, "utf-8");

    const {data: edges} = Papa.parse<Record<string, any>>(edgesFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: {
                floor: true
            }
        }
    );

    const edgesSeeded = await Promise.all(
        edges.map(async (edge) => {
            try {
                const parsedEdge = edgeCSVRow.parse(edge)
                const edgesNodeIds = await findNodesFromEdgeInfo(parsedEdge)
                const dbEdge = EdgeUncheckedCreateInputSchema.parse(edgesNodeIds);
                await prisma.edge.create({data: dbEdge});
            } catch (e) {
                console.log("error parsing edges: ", e)
            }
        })
    )

    return edgesSeeded;

}

async function findNodesFromEdgeInfo(parsedEdge: z.infer<typeof edgeCSVRow>) {

    let floors = [];
    if (parsedEdge.floor != -1){
        floors.push(parsedEdge.floor)
    }else{
        floors.push(...[1, 2, 3, 4])
    }

    const toNode = await prisma.node.findFirst({
        where: {
            description: parsedEdge.toNode,
            Location: {
                some: {
                    floor: { in: floors },
                    building: {
                        name: {
                            contains: parsedEdge.building,
                            mode: "insensitive"
                        }
                    }
                }
            }
        }
    });

    if(!toNode){
        console.log('no node with desc: ', parsedEdge.toNode)
    }

    const fromNode = await prisma.node.findFirst({
        where: {
            description: parsedEdge.fromNode,
            Location: {
                some: {
                    floor: { in: floors },
                    building: {
                        name: {
                            contains: parsedEdge.building,
                            mode: "insensitive"
                        }
                    }
                }
            }
        }
    });

    if(!fromNode){
        console.log('no node with desc: ', parsedEdge.fromNode)
    }

    // console.log(parsedEdge.toNode, ": ", toNode?.id, parsedEdge.fromNode, ": ", fromNode?.id)
    return {
        toNodeId: toNode?.id,
        fromNodeId: fromNode?.id
    }
}


export async function seedEmployeesAndReturn(path: string){
    const employeesFile = fs.readFileSync(path, "utf-8");

    const {data: csvEmployees} = Papa.parse<Record<string, any>>(employeesFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false
        });


    const parsedEmployees = []

    // validate employees and store
    for (const employee of csvEmployees){
        parsedEmployees.push(employeeCSVRow.parse(employee))
    }

    const employees = parsedEmployees.map((employeeRow) => {
        const services = employeeRow.services.split(";").map(service => RequestType[service.trim() as keyof typeof RequestType])
        const languages = employeeRow.languages.split(";").map(language => language.trim())

        const employeeInput: z.infer<typeof EmployeeCreateInputSchema> = {
            name: employeeRow.employee,
            employeeType: employeeRow.type,
            canService: services,
            language: languages
        }

        return employeeInput;
    })

    return prisma.employee.createManyAndReturn({data: employees})
}


export async function seedServiceRequests(path: string){
    const srFile = fs.readFileSync(path, "utf-8");

    const {data: srData} = Papa.parse<Record<string, any>>(srFile,
        {
        header: true,
        skipEmptyLines: false,
        dynamicTyping: false
    });

    const parsedSRs = [];

    for (const sr of srData){
        parsedSRs.push(serviceRequestRow.parse(sr))
    }

    const srInput = parsedSRs.map((csvSR) => {
        const requestType = RequestType[csvSR.requestType as keyof typeof RequestType];



    })
}
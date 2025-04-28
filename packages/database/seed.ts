import {Prisma, PrismaClient, RequestType} from './.prisma/client';
import Papa from "papaparse";
import fs from "fs";
import z from "zod";
import {
    DepartmentCreateInputSchema,
    BuildingCreateInputSchema,
    LocationUncheckedCreateInputSchema,
    ServiceCreateInputSchema,
    DepartmentServicesUncheckedCreateInputSchema,
    NodeCreateInputSchema,
    nodeTypeSchema,
    EdgeUncheckedCreateInputSchema} from "./prisma/generated/zod"
import {departmentCSVRow, nodeCSVRow, edgeCSVRow} from "./seedFiles/CSVTypes.ts";

const prisma = new PrismaClient();


async function main() {
    // drop all data from database
    await prisma.audioVisual.deleteMany();
    await prisma.externalTransportation.deleteMany();
    await prisma.equipmentDelivery.deleteMany();
    await prisma.language.deleteMany();
    await prisma.security.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.edge.deleteMany();
    await prisma.departmentServices.deleteMany();
    await prisma.service.deleteMany();
    await prisma.department.deleteMany();
    await prisma.node.deleteMany();
    await prisma.location.deleteMany();
    await prisma.building.deleteMany();
    await prisma.user.deleteMany();

    console.log('Existing data purged.');

    // seed admin user
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.com',
        },
    });

    console.log(`Created admin user: ${admin.username}`);

    // seed buildings

    const buildingsFile = fs.readFileSync("./seedFiles/buildings.csv", "utf-8");
    const { data: buildingRows } = Papa.parse<Record<string, any>>(buildingsFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping:
                {
                    id: true // we want ID to be a number and not a string
                }
        }
    );

    const parsedBuildings = [];
    for (const row of buildingRows){
        try{
            const parsed = BuildingCreateInputSchema.parse(row)
            parsedBuildings.push(parsed)
        } catch (e) {
            console.error("Error in parsing building inputs: ", e)
        }

    }

   await prisma.building.createManyAndReturn({data: parsedBuildings})


    // seed departments (with locations and services)

    const deptsFile = fs.readFileSync("./seedFiles/departments.csv", "utf-8");
    const { data: deptRows } = Papa.parse<Record<string, any>>(deptsFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping:
                {
                    floor: true // we want ID to be a number and not a string
                }
        }
    )


    for (const row of deptRows) {
        try {
            const parsed = departmentCSVRow.parse(row)

            // pull department data
            const deptData: z.infer<typeof DepartmentCreateInputSchema> = {
                name: parsed.name,
                phoneNumber: parsed.phoneNumber,
                description: parsed.description
            }

            // create department
            const thisDept = await prisma.department.create({data: deptData})

            // find building in DB
            const thisBuilding = await prisma.building.findFirst({
                where: {
                    name: {
                        contains: parsed.buildingName,
                        mode: "insensitive"
                    }
                }
            });

            if (thisBuilding === null){
                console.error("error in finding building: ", parsed.buildingName, " as a substring of building name")
                break
            }

            // create location object
            const locData: z.infer<typeof LocationUncheckedCreateInputSchema> = {
                floor: parsed.floor,
                suite: parsed.suite,
                buildingId: thisBuilding?.id ?? -1, // building id of -1 if not found
                departmentId: thisDept.id
            }

            // create location in DB
            await prisma.location.create({data: locData})


            // create services from the department description
            let services: string[] = parsed.services?.split(";") ?? [];
            services = services.map(service => service.trim());


            for (const service of services){ // go thru every service
                if (service != ''){
                    // create service zodject
                    const zService: z.infer<typeof ServiceCreateInputSchema> = {
                        name: service
                    }

                    // create Service in DB
                    const thisService = await prisma.service.create({data: zService});

                    // create DepartmentServices zodject
                    const zDepartmentServices: z.infer<typeof DepartmentServicesUncheckedCreateInputSchema> = {
                        departmentID: thisDept.id,
                        serviceID: thisService.id
                    }

                    // create DepartmentServices in DB
                    await prisma.departmentServices.create({data: zDepartmentServices})
                }
            }

        } catch (e) {
            console.error("Error in parsing department inputs: ", e)
        }
    }


    // seed nodes with locations and edges
    const chestnutNodesFile = fs.readFileSync("./seedFiles/nodes/chestnut.csv", "utf-8");

    const { data: chestnutNodes } = Papa.parse<Record<string, any>>(chestnutNodesFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping:
                {
                    lat: true,
                    long: true,
                    floor: true
                }
        }
    );



    const nodesSeeded = await Promise.all(
        chestnutNodes.map(async (node) => {
            try {
                const parsedInfo = nodeCSVRow.parse(node);
                const parsedNode: z.infer<typeof NodeCreateInputSchema> = {
                    type: nodeTypeSchema.parse(parsedInfo.type),
                    description: parsedInfo.description,
                    lat: parsedInfo.lat,
                    long: parsedInfo.long
                }
                const thisNode = await prisma.node.create({ data: parsedNode });

                // find building in DB
                const thisBuilding = await prisma.building.findFirst({
                    where: {
                        name: {
                            contains: parsedInfo.building,
                            mode: "insensitive"
                        }
                    }
                });

                if (thisBuilding === null){
                    console.error("error in finding building: ", parsedInfo.building, " as a substring of building name")
                }

                const parsedLocation: z.infer<typeof LocationUncheckedCreateInputSchema> = {
                    floor: parsedInfo.floor,
                    buildingId: thisBuilding?.id ?? -1,
                    nodeID: thisNode.id
                }

                await prisma.location.create({data: parsedLocation})

                return thisNode;
            } catch (e) {
                console.log('error parsing node ', node, '. Error: ', e);
            }
        })
    );

    // seed edges
    const edgesFile = fs.readFileSync("./seedFiles/edges.csv", "utf-8");

    const {data: edges} = Papa.parse<Record<string, any>>(edgesFile,
        {
            header: true,
            skipEmptyLines: true,
        }
    );

    const edgesSeeded = await Promise.all(
        edges.map(async (edge) => {
            try {
                const parsedEdge = edgeCSVRow.parse(edge)
                const edgesNodeIds = edgeFromTo(parsedEdge.fromNode, parsedEdge.toNode)
                const dbEdge = EdgeUncheckedCreateInputSchema.parse(edgesNodeIds);
                await prisma.edge.create({data: dbEdge});
            } catch (e) {
                console.log("error parsing edges: ", e)
            }


        })
    )

    function edgeFromTo(startDesc: string, endDesc: string) {
        const startIndex = descToI(startDesc);
        const endIndex = descToI(endDesc);
        return {
            fromNodeId: nodesSeeded[startIndex]?.id, toNodeId: nodesSeeded[endIndex]?.id,
        }
    }


    function descToI(description: string) {
        for(let i = 0; i < nodesSeeded.length; i++) {
            if(nodesSeeded[i]?.description === description) {
                return i;
            }
        }
        console.error("error seeding node paths, searched for node with description that does not exist: |" + description + "| does not exist");
        return -1;
    }






    // create employees
    await Promise.all(
        Array.from({ length: 5 }).map((_, i) =>
            prisma.employee.create({
                data: {
                    name: `Transport Employee ${i + 1}`,
                    employeeType: 'Transport',
                    canService: [RequestType.EXTERNALTRANSPORTATION],
                    language: ['English'],
                },
            })
        )
    );


}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
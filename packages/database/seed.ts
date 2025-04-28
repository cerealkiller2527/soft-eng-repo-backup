import {nodeType, Prisma, PrismaClient, RequestType} from './.prisma/client';
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
import {departmentCSVRow, edgeCSVRow} from "./seedFiles/CSVTypes.ts";

import {seedEdges, seedNodes} from "./seedFiles/seedHelperFunctions.ts"

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

    // seeds nodes and connects them to departments via location by matching node description to department name
    // will work as long as department names are unique on each floor of each building (eg, "Radiology" can exist
    // as a department in both floor 3 and 4 of 22 patriot place, but cannot have duplicates on each floor).
    const seededChestnutNodes = await seedNodes("./seedFiles/chestnut/chestnut_nodes.csv");
    const seededPat20Flr1Nodes = await seedNodes("./seedFiles/pat20floor1/pat20floor1_nodes.csv");
    const seededPat22Flr1Nodes = await seedNodes("./seedFiles/nodes/pat22floor1.csv");
    // const seededPat22Flr3Nodes = await seedNodes("./seedFiles/nodes/pat22floor3.csv");
    // const seededPt22Flr4Nodes = await seedNodes("./seedFiles/nodes/pat22floor4.csv");

    const seededChestnutEdges = await seedEdges("./seedFiles/chestnut/chestnut_edges.csv");
    const seededPat20Flr1Edges = await seedEdges("./seedFiles/pat20floor1/pat20floor1_edges.csv")
    const seededPat22Flr1Edges = await seedEdges("./seedFiles/pat22floor1/pat22floor1_edges.csv")


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

    console.log("seed done!")


}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
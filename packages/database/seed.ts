import {PrismaClient, RequestType, Status, nodeType, Priority, Prisma} from './.prisma/client';
import Papa from "papaparse";
import fs from "fs";
import z from "zod";
import {DepartmentCreateInputSchema, BuildingCreateInputSchema, LocationUncheckedCreateInputSchema} from "./prisma/generated/zod"
import {departmentCSVRow} from "./seedFiles/CSVTypes.ts";

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

    const prismaBuildings = await prisma.building.createManyAndReturn({data: parsedBuildings})


    // seed departments (with locations)

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

            const locData: z.infer<typeof LocationUncheckedCreateInputSchema> = {
                floor: parsed.floor,
                suite: parsed.suite,
                buildingId: thisBuilding?.id ?? -1, // building id of -1 if not found
                departmentId: thisDept.id
            }

            await prisma.location.create({data: locData})


        } catch (e) {
            console.error("Error in parsing department inputs: ", e)
        }
    }










}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
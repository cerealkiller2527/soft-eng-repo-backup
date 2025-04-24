import {PrismaClient, RequestType, Status, nodeType, Priority, Prisma} from './.prisma/client';
import Papa from "papaparse";
import fs from "fs";

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
    const buildingsFile = fs.readFileSync("./seedFiles/buildings.csv", "utf-8")
    const buildings = Papa.parse(buildingsFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            transformHeader: header => header.trim(),
        }
    ).data;


    const prismaBuildings = await prisma.building.createManyAndReturn({
        data: JSON.parse(JSON.stringify(buildings))
    })

    // seed nodes
    const chestnutFile = fs.readFileSync("./seedFiles/nodes/chestnut.csv", "utf-8")
    const chestnutNodes = Papa.parse(chestnutFile,
        {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: {
                lat: true,
                long: true,
                floor: true
            },
            transformHeader: header => header.trim(),
        }
    ).data;


    const prismaChestnutNodes = await prisma.node.createManyAndReturn({
        data: JSON.parse(JSON.stringify(chestnutNodes))
    })






    //
    // // seed departments
    // const deptsFile = fs.readFileSync("./seedFiles/departments.csv", "utf-8")
    // const depts = Papa.parse(deptsFile,
    //     {
    //         header: true,
    //         skipEmptyLines: true,
    //         dynamicTyping: {
    //             floor: true,
    //         },
    //         transformHeader: header => header.trim()
    //     }
    // ).data;
    //
    // const deptsJSON = JSON.parse(JSON.stringify(depts));
    //
    // // remove buildingName data from prisma query
    //
    // console.log(updatedData)

    // const prismaDepts = prisma.department.createManyAndReturn({
    //     data: updatedData
    // })

    // console.log(deptsJSON)

}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
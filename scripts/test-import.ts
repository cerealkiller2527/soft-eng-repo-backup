import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { PrismaClient } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // Delete all existing data in correct order
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
    await prisma.location.deleteMany();
    await prisma.department.deleteMany();
    await prisma.node.deleteMany();
    await prisma.building.deleteMany();

    console.log('Existing data purged.');
}

async function testImportCSV() {
    const filePath = path.resolve(__dirname, 'department_directory_814.csv');
    const fileStream = fs.createReadStream(filePath);

    try {
        const response = await fetch('http://localhost:3000/api/csv/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: fileStream,
        });

        if (!response.ok) {
            console.log(`Failed to import CSV: ${response.statusText}`);
            return;
        }

        console.log('CSV imported successfully!');
    } catch (err) {
        console.error('Error during import:', err);
    }
}

main();
testImportCSV();
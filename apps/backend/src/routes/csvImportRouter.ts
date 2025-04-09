import { Router } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

function parseCSVLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current);
    return values.map((v) => v.trim());
}

router.post('/', async (req, res) => {
    try {
        let data = '';

        // Read
        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', async () => {
            const lines = data.split('\n').filter((line) => line.trim() !== '');
            const headers = parseCSVLine(lines[0]);

            // Header-to-field map
            const headerMap: Record<string, string> = {
                'Department ID': 'departmentID',
                'Department Name': 'departmentName',
                'Phone Number': 'phoneNumber',
                'Location ID': 'locationID',
                Floor: 'floor',
                Suite: 'suite',
                'Building ID': 'buildingID',
                'Building Name': 'buildingName',
                'Building Address': 'buildingAddress',
                'Building Phone Number': 'buildingPhoneNumber',
                'Service ID': 'serviceID',
                Services: 'serviceName',
            };

            const clean = (value: string): string => {
                return value?.replace(/^"|"$/g, '').trim();
            };

            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);

                const record: any = {};
                headers.forEach((header, j) => {
                    const key = headerMap[header];
                    if (key) {
                        record[key] = clean(values[j]);
                    }
                });

                try {
                    console.log('Processing record:', record);

                    // Building
                    const buildingId = parseInt(record.buildingID, 10);
                    if (isNaN(buildingId)) {
                        console.error('Invalid building ID:', record.buildingID);
                        return res.status(400).json({ error: 'Invalid building ID' });
                    }

                    const building = await PrismaClient.building.upsert({
                        where: { id: buildingId },
                        update: {
                            address: record.buildingAddress,
                            phoneNumber: record.buildingPhoneNumber?.replace(/\D/g, ''),
                        },
                        create: {
                            id: buildingId,
                            name: record.buildingName,
                            address: record.buildingAddress,
                            phoneNumber: record.buildingPhoneNumber?.replace(/\D/g, ''),
                        },
                    });

                    // Department
                    const departmentId = parseInt(record.departmentID, 10);
                    const department = await PrismaClient.department.upsert({
                        where: { id: departmentId },
                        update: {
                            phoneNumber: record.phoneNumber.replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                        create: {
                            id: departmentId,
                            name: record.departmentName,
                            phoneNumber: record.phoneNumber.replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                    });

                    // Service
                    const serviceId = parseInt(record.serviceID, 10);
                    const service = await PrismaClient.service.upsert({
                        where: { id: serviceId },
                        update: {},
                        create: {
                            id: serviceId,
                            name: record.serviceName,
                        },
                    });

                    // DepartmentService join
                    await PrismaClient.departmentServices.create({
                        data: {
                            departmentID: department.id,
                            serviceID: service.id,
                        },
                    });
                } catch (err) {
                    console.error('Error processing record:', record, err);
                    return res.status(500).json({ error: 'Failed to import record' });
                }
            }

            res.status(200).json({ message: 'CSV imported successfully' });
        });
    } catch (err) {
        console.error('Error during import:', err);
        res.status(500).json({ error: 'Failed to import CSV' });
    }
});

export default router;

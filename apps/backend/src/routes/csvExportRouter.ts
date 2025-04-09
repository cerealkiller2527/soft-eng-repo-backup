import { Router, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (_, res: Response) => {
    try {
        const departments = await PrismaClient.department.findMany({
            include: {
                Location: true,
                building: true,
                DepartmentServices: {
                    include: { service: true },
                },
            },
        });

        const headers = [
            'Department ID',
            'Department Name',
            'Phone Number',
            'Location ID',
            'Floor',
            'Suite',
            'Building ID',
            'Building Name',
            'Building Address',
            'Building Phone Number',
            'Service ID',
            'Services',
        ];

        const rows = departments.map((dept) => {
            console.log('Processing department:', dept);

            const serviceNames = dept.DepartmentServices.map((ds) => ds.service.name).join('; ');

            const locationIds = dept.Location.map((loc) => loc.id).join('; ');
            const floors = dept.Location.map((loc) => loc.floor).join('; ');
            const suites = dept.Location.map((loc) => loc.suite).join('; ');
            const departmentServiceIds = dept.DepartmentServices.map((ds) => ds.serviceID).join(
                '; '
            );

            const buildingId = dept.building?.id || '';
            const buildingPhoneNumber = dept.building?.phoneNumber || '';

            console.log('Building ID:', buildingId);
            console.log('Building Phone Number:', buildingPhoneNumber);

            return [
                `${dept.id}`,
                `"${dept.name}"`,
                `"${dept.phoneNumber}"`,
                `${locationIds}`,
                `${floors}`,
                `"${suites}"`,
                `${buildingId}`,
                `"${dept.building.name}"`,
                `"${dept.building.address}"`,
                `"${buildingPhoneNumber}"`,
                `${departmentServiceIds}`,
                `"${serviceNames}"`,
            ].join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=department_directory.csv');
        res.status(200).send(csv);
    } catch (err) {
        console.error('Error exporting CSV:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;

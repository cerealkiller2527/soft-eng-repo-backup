import { PrismaClient, RequestType, Status } from './.prisma/client';

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

    // Create building
    const building = await prisma.building.create({
        data: {
            name: "Brigham and Women's Health Care Center",
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
            phoneNumber: '1-800-BWH-9999',
        }
    });

    // Create nodes first
    await prisma.node.createMany({
        data: [
            { description: '1top stairs', x: 272, y: 110 },
            { description: '1b', x: 272, y: 130 },
            { description: '1a', x: 190, y: 130 },
            { description: '1c', x: 190, y: 239 },
            { description: '1d', x: 163, y: 239 },
            { description: '1e', x: 163, y: 360 },
            { description: '1f', x: 275, y: 360 },
            { description: '1bottom entrance', x: 275, y: 390 },
            { description: '1bottom entrance outside', x: 275, y: 450 },
            { description: '1g', x: 275, y: 315 },
            { description: '1h', x: 357, y: 315 },
            { description: '1bottom stairs', x: 357, y: 300 },
            { description: '1right entrance', x: 400, y: 315 },
            { description: '1right entrance outside', x: 450, y: 315 },
            { description: 'reception', x: 25, y: 25 },
            { description: 'Placeholder Node 1 (Suite 204B)', x: -1, y: -1 },
            { description: 'Placeholder Node 2 (Suite 317 Pharmacy)', x: -1, y: -1 },
            { description: 'Placeholder Node 3 (Suite 560)', x: -1, y: -1 },
            { description: 'Placeholder Node 4 (Suite 102B)', x: -1, y: -1 },
            { description: 'Placeholder Node 5 (Suite 200)', x: -1, y: -1 },
        ]
    });

    // Get all created nodes
    const allNodes = await prisma.node.findMany();

    // Create locations with unique nodeIDs
    await prisma.location.createMany({
        data: [
            { suite: '301', floor: 3, nodeID: allNodes[0].id },
            { suite: '540', floor: 5, nodeID: allNodes[1].id },
            { suite: '210', floor: 2, nodeID: allNodes[2].id },
            { suite: '317', floor: 3, nodeID: allNodes[3].id },
            { suite: '575', floor: 5, nodeID: allNodes[4].id },
            { suite: '428', floor: 4, nodeID: allNodes[5].id },
            { suite: '530', floor: 5, nodeID: allNodes[6].id },
            { suite: '303', floor: 3, nodeID: allNodes[7].id },
            { suite: '320', floor: 3, nodeID: allNodes[8].id },
            { suite: '201', floor: 2, nodeID: allNodes[9].id },
            { suite: '202', floor: 2, nodeID: allNodes[10].id },
            { suite: '402', floor: 4, nodeID: allNodes[11].id },
            { suite: '100', floor: 1, nodeID: allNodes[12].id },
            { suite: '130', floor: 1, nodeID: allNodes[13].id },
            { suite: '422', floor: 4, nodeID: allNodes[14].id },
            { suite: '204B', floor: 2, nodeID: allNodes[15].id },
            { suite: '317', floor: 3, nodeID: allNodes[16].id },
            { suite: '560', floor: 5, nodeID: allNodes[17].id },
            { suite: '102B', floor: 1, nodeID: allNodes[18].id },
            { suite: '200', floor: 2, nodeID: allNodes[19].id },
        ]
    });

    // Create employees for external transportation
    const employees = await Promise.all(
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

    // Create service requests for external transportation
    await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
                const request = await prisma.serviceRequest.create({
                    data: {
                    type: RequestType.EXTERNALTRANSPORTATION,
                        status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                    description: `Additional notes for transport request ${i + 1}`,
                        employeeID: i < 5 ? employees[i % employees.length].id : null,
                    },
            });

                        await prisma.externalTransportation.create({
                            data: {
                                id: request.id,
                    fromWhere: `Location A${i}`,
                    toWhere: `Location B${i}`,
                    transportType: 'Wheelchair Van',
                                patientName: `Patient ${i + 1}`,
                    pickupTime: new Date(Date.now() + 1000 * 60 * (i + 1) * 30),
                }
            });
        })
    );

    const rawDepartmentData = [
        {
            name: 'Allergy and Clinical Immunology',
            description: 'Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency',
            phoneNumber: '(617) 732-9850',
            floor: 3,
            suite: '301',
        },
        {
            name: 'Backup Child Care Center',
            description: 'Backup childcare for employees',
            phoneNumber: '(617) 732-9543',
            floor: 2,
            suite: '210',
        },
        {
            name: 'Brigham Dermatology Associates (BDA)',
            description: 'Medical and surgical dermatology',
            phoneNumber: '(617) 732-9080',
            floor: 3,
            suite: '317',
        },
        {
            name: 'Brigham Obstetrics and Gynecology Group (BOGG)',
            description: 'Gynecology, obstetrics',
            phoneNumber: '(617) 732-9100',
            floor: 5,
            suite: '575',
        },
        {
            name: 'Brigham Physicians Group (BPG)',
            description: 'Adult primary care',
            phoneNumber: '(617) 732-9900',
            floor: 4,
            suite: '428',
        },
        {
            name: 'Brigham Psychiatric Specialties',
            description: 'Psychiatry, psychology, social work',
            phoneNumber: '(617) 732-9811',
            floor: 3,
            suite: '303',
        },
        {
            name: 'Center for Pain Medicine',
            description: 'Multidisciplinary pain management',
            phoneNumber: '(617) 732-9060',
            floor: 3,
            suite: '320',
        },
        {
            name: "Crohn's and Colitis Center",
            description: "Crohn's disease, inflammatory bowel disease, infusion services, microscopic colitis, pulmonary, rheumatology, ulcerative colitis",
            phoneNumber: "(617) 732-6389",
            floor: 2,
            suite: '201',
        },
        {
            name: "Endoscopy Center",
            description: "Bacterial overgrowth breath test, colonoscopy, H. Pylori breath test, lactose malabsorption breath test, upper endoscopy",
            phoneNumber: "(617) 732-7426",
            floor: 2,
            suite: '202',
        },
        {
            name: "Gretchen S. and Edward A. Fish Center for Women's Health",
            description: "Cardiology, dermatology, endocrinology, gastroenterology, hematology, infectious diseases, mental health, general neurology, nutrition, primary care, pulmonary, sleep medicine, women's health",
            phoneNumber: "(617) 732-9300",
            floor: 4,
            suite: '402',
        },
        {
            name: "Laboratory",
            description: "Blood work, lab services",
            phoneNumber: "(617) 732-9841",
            floor: 1,
            suite: '130',
        },
        {
            name: "Multi-Specialty Clinic",
            description: "Orthopedic surgery, vascular surgery, dermatology, pain medicine, travel medicine",
            phoneNumber: "(617) 732-9500",
            floor: 1,
            suite: '130',
        },
        {
            name: "Osher Clinical Center for Integrative Health",
            description: "Acupuncture, health coaching, chiropractic, integrative medicine, massage therapy, neurology, echocardiography, pulmonary",
            phoneNumber: "(617) 732-9700",
            floor: 4,
            suite: '422',
        },
        {
            name: "Patient Financial Services",
            description: "Patient financial counseling",
            phoneNumber: "(617) 732-9677",
            floor: 2,
            suite: '204B',
        },
        {
            name: "Pharmacy",
            description: "Outpatient pharmacy services",
            phoneNumber: "(617) 732-9040",
            floor: 3,
            suite: '317',
        },
        {
            name: "Radiology",
            description: "Bone density, Breast imaging/Mammography, ultrasound, X-Ray",
            phoneNumber: "(617) 732-9801",
            floor: 5,
            suite: '560',
        },
        {
            name: "Radiology, MRI/CT scan",
            description: "CT scan, MRI, X-Ray",
            phoneNumber: "(617) 732-9821",
            floor: 1,
            suite: '102B',
        },
        {
            name: "Rehabilitation Services",
            description: "Orthopedic, sports, neurologic and vestibular Physical Therapy, pelvic floor therapy, occupational therapy, speech language pathology",
            phoneNumber: "(617) 732-9525",
            floor: 2,
            suite: '200',
        },
    ];

    // Create unique services based on splitting descriptions
    const uniqueServiceNames = new Set<string>();
    rawDepartmentData.forEach(dept => {
        const servicesList = (dept.description ?? dept.name).split(',').map(s => s.trim()).filter(s => s);
        servicesList.forEach(serviceName => uniqueServiceNames.add(serviceName));
    });

    const serviceData = Array.from(uniqueServiceNames).map(name => ({ name }));

    await prisma.service.createMany({
        data: serviceData,
        skipDuplicates: true, // Avoid errors if a service name somehow repeats
    });

    // Fetch all services (including potentially pre-existing ones if skipDuplicates was used)
    const allServices = await prisma.service.findMany();
    const serviceNameToIdMap = new Map(allServices.map(s => [s.name, s.id]));

    // Create departments
    const departments = await Promise.all(
        rawDepartmentData.map((dept) =>
            prisma.department.create({
                data: {
                    name: dept.name,
                    description: dept.description,
                    phoneNumber: dept.phoneNumber,
                    buildingID: building.id,
                },
            })
        )
    );

    // Get all locations to facilitate linking
    const allLocations = await prisma.location.findMany();

    // Link locations to departments (Simplified Logic - Last Write Wins for Shared Suites)
    await Promise.all(
        departments.map(async (departmentEntry) => {
            // Find the corresponding raw data entry to get suite/floor info
            const deptRawData = rawDepartmentData.find(d => d.name === departmentEntry.name && d.phoneNumber === departmentEntry.phoneNumber);
            if (!deptRawData) {
                console.warn(`Could not find raw data for department: ${departmentEntry.name} to link location.`);
                return;
            }

            // Update any location matching the floor and suite
            // Note: If multiple departments share a floor/suite, the last one processed will set the departmentId
            const updateResult = await prisma.location.updateMany({
                where: {
                    floor: deptRawData.floor,
                    suite: deptRawData.suite,
                },
                data: {
                    departmentId: departmentEntry.id,
                },
            });

            if (updateResult.count === 0) {
                console.warn(`No location found for Floor ${deptRawData.floor}, Suite ${deptRawData.suite} (Department: ${deptRawData.name})`);
            }
        })
    );

    // Create department-service relationships (Revised for split services)
    const departmentServiceLinks: { departmentID: number; serviceID: number }[] = [];
    departments.forEach(dept => {
        // Find the raw data again to get the original description to split
        const deptRawData = rawDepartmentData.find(d => d.name === dept.name && d.phoneNumber === dept.phoneNumber);
        if (deptRawData) {
            const servicesForDept = (deptRawData.description ?? deptRawData.name).split(',').map(s => s.trim()).filter(s => s);
            servicesForDept.forEach(serviceName => {
                const serviceId = serviceNameToIdMap.get(serviceName);
                if (serviceId) {
                    departmentServiceLinks.push({ departmentID: dept.id, serviceID: serviceId });
                } else {
                    console.warn(`Could not find service ID for service name: "${serviceName}" in department "${dept.name}"`);
                }
            });
        }
    });

    if (departmentServiceLinks.length > 0) {
        await prisma.departmentServices.createMany({
            data: departmentServiceLinks,
            skipDuplicates: true, // Should not be necessary if logic is correct, but safe
        });
    }

    // Create edges
    const edges = await prisma.edge.createMany({
        data: [
            { fromNodeId: allNodes[0].id, toNodeId: allNodes[1].id },
            { fromNodeId: allNodes[1].id, toNodeId: allNodes[2].id },
            { fromNodeId: allNodes[2].id, toNodeId: allNodes[3].id },
            { fromNodeId: allNodes[3].id, toNodeId: allNodes[4].id },
            { fromNodeId: allNodes[4].id, toNodeId: allNodes[5].id },
            { fromNodeId: allNodes[5].id, toNodeId: allNodes[6].id },
            { fromNodeId: allNodes[6].id, toNodeId: allNodes[7].id },
            { fromNodeId: allNodes[7].id, toNodeId: allNodes[8].id },
            { fromNodeId: allNodes[8].id, toNodeId: allNodes[9].id },
            { fromNodeId: allNodes[9].id, toNodeId: allNodes[10].id },
            { fromNodeId: allNodes[10].id, toNodeId: allNodes[11].id },
            { fromNodeId: allNodes[11].id, toNodeId: allNodes[12].id },
            { fromNodeId: allNodes[12].id, toNodeId: allNodes[13].id },
            { fromNodeId: allNodes[13].id, toNodeId: allNodes[14].id },
        ]
    });

    console.log('Seed complete!');
}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

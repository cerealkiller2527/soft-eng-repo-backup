import { PrismaClient, RequestType, Status, nodeType, Priority } from './.prisma/client';

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
    await prisma.node.deleteMany();
    await prisma.building.deleteMany();
    await prisma.user.deleteMany();

    console.log('Existing data purged.');

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin', // Insecure, use hashed in production
            email: 'admin@admin.com',
        },
    });

    console.log(`Created admin user: ${admin.username}`);

    // Create building
    const building = await prisma.building.create({
        data: {
            name: "Brigham and Women's Health Care Center",
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
            phoneNumber: '1-800-BWH-9999',
        },
    });

    // Create nodes (used instead of location)
    const nodeData = [
        { description: '1top stairs', lat: 42.1, long: -71.1, suite: '301', floor: 3 },
        { description: '1b', lat: 42.2, long: -71.2, suite: '540', floor: 5 },
        { description: '1a', lat: 42.3, long: -71.3, suite: '210', floor: 2 },
        { description: '1c', lat: 42.4, long: -71.4, suite: '317', floor: 3 },
        { description: '1d', lat: 42.5, long: -71.5, suite: '575', floor: 5 },
        { description: '1e', lat: 42.6, long: -71.6, suite: '428', floor: 4 },
        { description: '1f', lat: 42.7, long: -71.7, suite: '530', floor: 5 },
        { description: '1bottom entrance', lat: 42.8, long: -71.8, suite: '303', floor: 3 },
        { description: '1bottom entrance outside', lat: 42.9, long: -71.9, suite: '320', floor: 3 },
        { description: '1g', lat: 43.0, long: -72.0, suite: '201', floor: 2 },
        { description: '1h', lat: 43.1, long: -72.1, suite: '202', floor: 2 },
        { description: '1bottom stairs', lat: 43.2, long: -72.2, suite: '402', floor: 4 },
        { description: '1right entrance', lat: 43.3, long: -72.3, suite: '100', floor: 1 },
        { description: '1right entrance outside', lat: 43.4, long: -72.4, suite: '130', floor: 1 },
        { description: 'reception', lat: 43.5, long: -72.5, suite: '422', floor: 4 },
        { description: 'Placeholder Node 1 (Suite 204B)', lat: 43.6, long: -72.6, suite: '204B', floor: 2 },
        { description: 'Placeholder Node 2 (Suite 317 Pharmacy)', lat: 43.7, long: -72.7, suite: '317', floor: 3 },
        { description: 'Placeholder Node 3 (Suite 560)', lat: 43.8, long: -72.8, suite: '560', floor: 5 },
        { description: 'Placeholder Node 4 (Suite 102B)', lat: 43.9, long: -72.9, suite: '102B', floor: 1 },
        { description: 'Placeholder Node 5 (Suite 200)', lat: 44.0, long: -73.0, suite: '200', floor: 2 },
    ];

    const createdNodes = await Promise.all(
        nodeData.map((n) =>
            prisma.node.create({
                data: {
                    type: nodeType.Location,
                    description: n.description,
                    lat: n.lat,
                    long: n.long,
                    suite: n.suite,
                    floor: n.floor,
                    buildingId: building.id,
                },
            })
        )
    );

    // Create employees
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

    // Create external transportation service requests
    await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const serviceRequest = await prisma.serviceRequest.create({
                data: {
                    type: RequestType.EXTERNALTRANSPORTATION,
                    status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                    description: `Additional notes for transport request ${i + 1}`,
                    assignedEmployeeID: i < 5 ? employees[i % employees.length].id : null,
                    fromEmployee: 'admin',
                    priority: Priority.Medium,
                },
            });

            await prisma.externalTransportation.create({
                data: {
                    id: serviceRequest.id,
                    fromWhere: `Location A${i}`,
                    toWhere: `Location B${i}`,
                    transportType: 'Wheelchair Van',
                    patientName: `Patient ${i + 1}`,
                    pickupTime: new Date(Date.now() + 1000 * 60 * (i + 1) * 30),
                },
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

    // Link nodes to departments based on floor/suite
    await Promise.all(
        departments.map(async (dept, i) => {
            const deptData = rawDepartmentData[i];

            await prisma.node.updateMany({
                where: {
                    floor: deptData.floor,
                    suite: deptData.suite,
                },
                data: {
                    departmentId: dept.id,
                },
            });
        })
    );

    // Parse and create services
    const servicesList: { name: string; departmentIndex: number }[] = [];

    rawDepartmentData.forEach((dept, index) => {
        let services = dept.description
            ?.split(',')
            .flatMap((s) =>
                s.includes(' and ') &&
                !s.toLowerCase().includes('allergy') &&
                !s.toLowerCase().includes('crohn')
                    ? s.split(' and ')
                    : [s]
            )
            .map((s) => s.trim());

        services?.forEach((name) => {
            if (name && name.length > 1) {
                servicesList.push({ name, departmentIndex: index });
            }
        });
    });

    const createdServices = await Promise.all(
        servicesList.map((s) =>
            prisma.service.create({
                data: { name: s.name },
            })
        )
    );

    const deptServices = servicesList.map((s, i) => ({
        departmentID: departments[s.departmentIndex].id,
        serviceID: createdServices[i].id,
    }));

    await prisma.departmentServices.createMany({
        data: deptServices,
        skipDuplicates: true,
    });

    // Create edges
    const edges = await prisma.edge.createMany({
        data: [
            { fromNodeId: createdNodes[0].id, toNodeId: createdNodes[1].id },
            { fromNodeId: createdNodes[1].id, toNodeId: createdNodes[2].id },
            { fromNodeId: createdNodes[2].id, toNodeId: createdNodes[3].id },
            { fromNodeId: createdNodes[3].id, toNodeId: createdNodes[4].id },
            { fromNodeId: createdNodes[4].id, toNodeId: createdNodes[5].id },
            { fromNodeId: createdNodes[5].id, toNodeId: createdNodes[6].id },
            { fromNodeId: createdNodes[6].id, toNodeId: createdNodes[7].id },
            { fromNodeId: createdNodes[7].id, toNodeId: createdNodes[8].id },
            { fromNodeId: createdNodes[8].id, toNodeId: createdNodes[9].id },
            { fromNodeId: createdNodes[9].id, toNodeId: createdNodes[10].id },
            { fromNodeId: createdNodes[10].id, toNodeId: createdNodes[11].id },
            { fromNodeId: createdNodes[11].id, toNodeId: createdNodes[12].id },
            { fromNodeId: createdNodes[12].id, toNodeId: createdNodes[13].id },
            { fromNodeId: createdNodes[13].id, toNodeId: createdNodes[14].id },
        ]
    });

    console.log('✅ Seed complete!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

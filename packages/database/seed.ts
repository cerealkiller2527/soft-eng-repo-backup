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
    await prisma.user.deleteMany();

    console.log('Existing data purged.');

    // Seed admin user
    // WARNING: Storing plain text passwords is insecure. Hash passwords in real applications.
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin', // Plain text - insecure!
            email: 'admin@admin.com',
        }
    });
    console.log(`Created admin user: ${admin.username}`);

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
            // Chestnut Hill
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

            // Patriot Place Floor 1
            /**
             * arranged in rough grid
             * a through e, a is bottom part of the map, e is top
             */
            // A
            { description: '1left entrance outside', x: 42.092500, y: -71.266366 },
            { description: '1left entrance', x: 42.092517, y: -71.266300 },
            { description: '1a1', x: 42.092543, y: -71.266254 },
            { description: '1a2', x: 42.092605, y: -71.266194 },
            { description: '1a3', x: 42.092619, y: -71.266139 },
            { description: '1a4', x: 42.092583, y: -71.266126 },
            { description: '1a5', x: 42.092609, y: -71.266041 },
            { description: '1middle stairs', x: 42.092651, y: -71.266064 },
            { description: '1a6', x: 42.092651, y: -71.266064 },
            { description: '1a7', x: 42.092663, y: -71.265888 },
            { description: '1a8', x: 42.092717, y: -71.265898 },
            { description: '1urology/cardiology', x: 42.092720, y: -71.265919 },
            { description: '1a9', x: 42.092666, y: -71.265790 },
            { description: '1a10', x: 42.092680, y: -71.265739 },
            { description: '1right stairs', x: 42.092690, y: -71.265615 },
            { description: '1elevator', x: 42.092717, y: -71.265685 },
            { description: '1a11', x: 42.092694, y: -71.265939 },
            { description: '1a12', x: 42.092739, y: -71.265955 },
            // B
            { description: '1radiology', x: 42.092710, y: -71.266262 },
            { description: '1b17', x: 42.092734, y: -71.266173 },
            { description: '1b1', x: 42.092680, y: -71.266249 },
            { description: '1b2', x: 42.092705, y: -71.266140 },
            { description: '1b3', x: 42.092731, y: -71.266147 },
            { description: '1b4', x: 42.092742, y: -71.266117 },
            { description: '1blood/urgent', x: 42.092761, y: -71.266043 },
            { description: '1b5', x: 42.092749, y: -71.265954 },
            { description: '1b6', x: 42.092774, y: -71.265858 },
            { description: '1b7', x: 42.092786, y: -71.265820 },
            { description: '1b8', x: 42.092803, y: -71.265870 },
            { description: '1b9', x: 42.092791, y: -71.265787 },
            { description: '1b10', x: 42.092803, y: -71.265754 },
            { description: '1b11', x: 42.092803, y: -71.265754 },
            { description: '1b12', x: 42.092803, y: -71.265754 },
            { description: '1b13', x: 42.092821, y: -71.265723 },
            { description: '1b14', x: 42.092821, y: -71.265723 },
            { description: '1b15', x: 42.092835, y: -71.265595 },
            { description: '1right entrance', x: 42.092835, y: -71.265595 },
            { description: '1right entrance outside', x: 42.092835, y: -71.265595 },
            { description: '1b16', x: 42.092864, y: -71.265632 },
            // C
            { description: '1c1', x: 42.092778, y: -71.266254 },
            { description: '1pharmacy', x: 42.092788, y: -71.266211 },
            { description: '1c2', x: 42.092836, y: -71.266267 },
            { description: '1c3', x: 42.092846, y: -71.266212 },
            { description: '1c4', x: 42.092860, y: -71.266150 },
            { description: '1c5', x: 42.092839, y: -71.266153 },
            { description: '1c6', x: 42.092874, y: -71.266087 },
            { description: '1c7', x: 42.092848, y: -71.266089 },
            { description: '1c8', x: 42.092869, y: -71.265967 },
            // D
            { description: '1d1', x: 42.092817, y: -71.266270 },
            { description: '1d2', x: 42.092821, y: -71.266236 },
            { description: '1d3', x: 42.092837, y: -71.266243 },
            { description: '1d4', x: 42.092860, y: -71.266254 },
            { description: '1d5', x: 42.092892, y: -71.266017 },
            { description: '1d6', x: 42.092892, y: -71.266017 },
            { description: '1d7', x: 42.092871, y: -71.265968 },
            { description: '1d8', x: 42.092871, y: -71.265968 },
            { description: '1d9', x: 42.092871, y: -71.265968 },
            { description: '1d10', x: 42.092852, y: -71.265911 },
            { description: '1d11', x: 42.092892, y: -71.266017 },
            // E
            { description: '1e1', x: 42.092886, y: -71.266333 },
            { description: '1e2', x: 42.092917, y: -71.266278 },
            { description: '1e3', x: 42.092940, y: -71.266120 },
            { description: '1e4', x: 42.092920, y: -71.266343 },
            { description: '1e5', x: 42.092930, y: -71.266360 },
            { description: '1e6', x: 42.092947, y: -71.266384 },
            { description: '1e7', x: 42.092963, y: -71.266393 },
            { description: '1top stairs', x: 42.092960, y: -71.266427 },

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

    // Create one service per department using the full description/name
    const services = await Promise.all(
        rawDepartmentData.map((dept) =>
            prisma.service.create({
                data: {
                    name: dept.description ?? dept.name, // Use full description or name
                },
            })
        )
    );

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

    // Create department-service relationships (Simplified: One service per department)
    const departmentServiceLinks = departments.map((dept, i) => {
        // Simple 1-to-1 link based on array index
        if (services[i]) { // Basic check to ensure service exists at index
            return {
                departmentID: dept.id,
                serviceID: services[i].id,
            };
        } else {
            console.warn(`Department ${dept.name} at index ${i} missing corresponding service.`);
            return null;
        }
    }).filter(Boolean) as { departmentID: number; serviceID: number }[]; // Filter out nulls and assert type

    if (departmentServiceLinks.length > 0) {
        await prisma.departmentServices.createMany({
            data: departmentServiceLinks,
            skipDuplicates: true,
        });
    }

    // Create edges
    const edges = await prisma.edge.createMany({
        data: [
            // chestnut hill
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

            // 20 patriot pl, floor 1
            //  A
            edgeFromTo("1left entrance outside", "1left entrance"),
            edgeFromTo("1left entrance", "1a1"),
            edgeFromTo("1a1", "1a2"),
            edgeFromTo("1a2", "1a3"),
            edgeFromTo("1a3", "1a4"),
            edgeFromTo("1a1", "1a4"),
            edgeFromTo("1a4", "1a5"),
            edgeFromTo("1a5", "1middle stairs"),
            edgeFromTo("1a5", "1a6"),
            edgeFromTo("1a6", "1a11"),
            edgeFromTo("1a11", "1a12"),
            edgeFromTo("1a6", "1a7"),
            edgeFromTo("1a7", "1a8"),
            edgeFromTo("1a8", "1urology/cardiology"),
            edgeFromTo("1a8", "1a9"),
            edgeFromTo("1a9", "1a10"),
            edgeFromTo("1a10", "1elevator"),
            edgeFromTo("1a10", "1right stairs"),
            //  A -> B
            edgeFromTo("1a3", "1b2"),
            edgeFromTo("1a12", "1b7"),
            edgeFromTo("1a7", "1b9"),
            edgeFromTo("1a9", "1b12"),
            edgeFromTo("1a10", "1b13"),
            //  B
            edgeFromTo("1b1", "1b2"),
            edgeFromTo("1b2", "1b3"),
            edgeFromTo("1b3", "1b4"),
            edgeFromTo("1b4", "1blood/urgent"),
            edgeFromTo("1b3", "1b17"),
            edgeFromTo("1b3", "1b17"),
            edgeFromTo("1radiology", "1b17"),
            edgeFromTo("1b1", "1radiology"),
            edgeFromTo("1b2", "1b5"),
            edgeFromTo("1b5", "1b6"),
            edgeFromTo("1b6", "1b7"),
            edgeFromTo("1b6", "1b8"),
            edgeFromTo("1b7", "1b9"),
            edgeFromTo("1b9", "1b10"),
            edgeFromTo("1b10", "1b11"),
            edgeFromTo("1b10", "1b12"),
            edgeFromTo("1b11", "1b16"),
            edgeFromTo("1b13", "1b14"),
            edgeFromTo("1b14", "1b15"),
            edgeFromTo("1b15", "1right entrance"),
            edgeFromTo("1right entrance", "1right entrance outside"),
            //  B -> C
            edgeFromTo("1b17", "1c1"),
            edgeFromTo("1b8", "1c5"),
            edgeFromTo("1b9", "1c7"),
            edgeFromTo("1b16", "1c8"),
            //  C
            edgeFromTo("1c1", "1pharmacy"),
            edgeFromTo("1c1", "1c2"),
            edgeFromTo("1c2", "1c3"),
            edgeFromTo("1c3", "1c4"),
            edgeFromTo("1c4", "1c5"),
            edgeFromTo("1c4", "1c6"),
            edgeFromTo("1c5", "1c7"),
            edgeFromTo("1c6", "1c7"),
            //  C -> D
            edgeFromTo("1c8", "1d10"),
            edgeFromTo("1c6", "1d8"),
            edgeFromTo("1c2", "1d1"),
            //  D
            edgeFromTo("1d1", "1d2"),
            edgeFromTo("1d2", "1d3"),
            edgeFromTo("1d3", "1d4"),
            edgeFromTo("1d4", "1d5"),
            edgeFromTo("1d5", "1d11"),
            edgeFromTo("1d5", "1d6"),
            edgeFromTo("1d6", "1d7"),
            edgeFromTo("1d7", "1d8"),
            edgeFromTo("1d7", "1d9"),
            edgeFromTo("1d8", "1d9"),
            edgeFromTo("1d9", "1d10"),
            //  D -> E
            edgeFromTo("1d4", "1e1"),
            edgeFromTo("1d11", "1e3"),
            //  E
            edgeFromTo("1e1", "1e2"),
            edgeFromTo("1e2", "1e3"),
            edgeFromTo("1e1", "1e4"),
            edgeFromTo("1e4", "1e5"),
            edgeFromTo("1e5", "1e6"),
            edgeFromTo("1e6", "1e7"),
            edgeFromTo("1e7", "1top stairs"),


        ]
    });
    
    function edgeFromTo(startDesc: string, endDesc: string) {
        const startIndex = descToI(startDesc);
        const endIndex = descToI(endDesc);
        return {
            fromNodeId: allNodes[startIndex].id, toNodeId: allNodes[endIndex].id,
        }
    }
    

    function descToI(description: string) {
        for(let i = 0; i < allNodes.length; i++) {
            if(allNodes[i].description === description) {
                return i;
            }
        }
        console.error("error seeding node paths, searched for node with description that does not exist: |" + description + "| does not exist");
        return -1;
    }

    console.log('Seed complete!');
}



main()
    .catch((e) => {
        console.error('Seed failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
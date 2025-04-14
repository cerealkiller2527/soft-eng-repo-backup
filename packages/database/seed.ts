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
            { description: 'left entrance outside', x: -1, y: -1 },
            { description: 'left entrance', x: -1, y: -1 },
            { description: 'a1', x: -1, y: -1 },
            { description: 'a2', x: -1, y: -1 },
            { description: 'a3', x: -1, y: -1 },
            { description: 'a4', x: -1, y: -1 },
            { description: 'a5', x: -1, y: -1 },
            { description: 'middle stairs', x: -1, y: -1 },
            { description: 'a6', x: -1, y: -1 },
            { description: 'a7', x: -1, y: -1 },
            { description: 'a8', x: -1, y: -1 },
            { description: 'urology/cardiology', x: -1, y: -1 },
            { description: 'a9', x: -1, y: -1 },
            { description: 'a10', x: -1, y: -1 },
            { description: 'right stairs', x: -1, y: -1 },
            { description: 'elevator', x: -1, y: -1 },
            { description: 'a11', x: -1, y: -1 },
            { description: 'a12', x: -1, y: -1 },
            // B
            { description: 'radiology', x: -1, y: -1 },
            { description: 'b17', x: -1, y: -1 },
            { description: 'b1', x: -1, y: -1 },
            { description: 'b2', x: -1, y: -1 },
            { description: 'b3', x: -1, y: -1 },
            { description: 'b4', x: -1, y: -1 },
            { description: 'blood/urgent', x: -1, y: -1 },
            { description: 'b5', x: -1, y: -1 },
            { description: 'b6', x: -1, y: -1 },
            { description: 'b7', x: -1, y: -1 },
            { description: 'b8', x: -1, y: -1 },
            { description: 'b9', x: -1, y: -1 },
            { description: 'b9', x: -1, y: -1 },
            { description: 'b10', x: -1, y: -1 },
            { description: 'b11', x: -1, y: -1 },
            { description: 'b12', x: -1, y: -1 },
            { description: 'b13', x: -1, y: -1 },
            { description: 'b14', x: -1, y: -1 },
            { description: 'b15', x: -1, y: -1 },
            { description: 'right entrance', x: -1, y: -1 },
            { description: 'right entrance outside', x: -1, y: -1 },
            { description: 'b16', x: -1, y: -1 },
            // C
            { description: 'c1', x: -1, y: -1 },
            { description: 'pharmacy', x: -1, y: -1 },
            { description: 'c2', x: -1, y: -1 },
            { description: 'c3', x: -1, y: -1 },
            { description: 'c4', x: -1, y: -1 },
            { description: 'c5', x: -1, y: -1 },
            { description: 'c6', x: -1, y: -1 },
            { description: 'c7', x: -1, y: -1 },
            { description: 'c8', x: -1, y: -1 },
            // D
            { description: 'd1', x: -1, y: -1 },
            { description: 'd2', x: -1, y: -1 },
            { description: 'd3', x: -1, y: -1 },
            { description: 'd4', x: -1, y: -1 },
            { description: 'd5', x: -1, y: -1 },
            { description: 'd6', x: -1, y: -1 },
            { description: 'd7', x: -1, y: -1 },
            { description: 'd8', x: -1, y: -1 },
            { description: 'd9', x: -1, y: -1 },
            { description: 'd10', x: -1, y: -1 },
            { description: 'd11', x: -1, y: -1 },
            // E
            { description: 'e1', x: -1, y: -1 },
            { description: 'e2', x: -1, y: -1 },
            { description: 'e3', x: -1, y: -1 },
            { description: 'e4', x: -1, y: -1 },
            { description: 'e5', x: -1, y: -1 },
            { description: 'e6', x: -1, y: -1 },
            { description: 'e7', x: -1, y: -1 },
            { description: 'top stairs', x: -1, y: -1 },

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
            edgeFromTo("left entrance outside", "left entrance"),
            edgeFromTo("left entrance", "a1"),
            edgeFromTo("a1", "a2"),
            edgeFromTo("a2", "a3"),
            edgeFromTo("a3", "a4"),
            edgeFromTo("a1", "a4"),
            edgeFromTo("a4", "a5"),
            edgeFromTo("a5", "middle stairs"),
            edgeFromTo("a5", "a6"),
            edgeFromTo("a6", "a11"),
            edgeFromTo("a11", "a12"),
            edgeFromTo("a6", "a7"),
            edgeFromTo("a7", "a8"),
            edgeFromTo("a8", "urology/cardiology"),
            edgeFromTo("a8", "a9"),
            edgeFromTo("a9", "a10"),
            edgeFromTo("a10", "elevator"),
            edgeFromTo("a10", "right stairs"),
            //  A -> B
            edgeFromTo("a3", "b2"),
            edgeFromTo("a12", "b7"),
            edgeFromTo("a7", "b9"),
            edgeFromTo("a9", "b12"),
            edgeFromTo("a10", "b13"),
            //  B
            edgeFromTo("b1", "b2"),
            edgeFromTo("b2", "b3"),
            edgeFromTo("b3", "b4"),
            edgeFromTo("b4", "blood/urgent"),
            edgeFromTo("b3", "b17"),
            edgeFromTo("b3", "b17"),
            edgeFromTo("radiology", "b17"),
            edgeFromTo("b1", "radiology"),
            edgeFromTo("b2", "b5"),
            edgeFromTo("b5", "b6"),
            edgeFromTo("b6", "b7"),
            edgeFromTo("b6", "b8"),
            edgeFromTo("b7", "b9"),
            edgeFromTo("b9", "b10"),
            edgeFromTo("b10", "b11"),
            edgeFromTo("b10", "b12"),
            edgeFromTo("b11", "b16"),
            edgeFromTo("b13", "b14"),
            edgeFromTo("b14", "b15"),
            edgeFromTo("b15", "right entrance"),
            edgeFromTo("right entrance", "right entrance outside"),
            //  B -> C
            edgeFromTo("b17", "c1"),
            edgeFromTo("b8", "c5"),
            edgeFromTo("b9", "c7"),
            edgeFromTo("b16", "c8"),
            //  C
            edgeFromTo("c1", "pharmacy"),
            edgeFromTo("c1", "c2"),
            edgeFromTo("c2", "c3"),
            edgeFromTo("c3", "c4"),
            edgeFromTo("c4", "c5"),
            edgeFromTo("c4", "c6"),
            edgeFromTo("c5", "c7"),
            edgeFromTo("c6", "c7"),
            //  C -> D
            edgeFromTo("c8", "d10"),
            edgeFromTo("c6", "d8"),
            edgeFromTo("c2", "d1"),
            //  D
            edgeFromTo("d1", "d2"),
            edgeFromTo("d2", "d3"),
            edgeFromTo("d3", "d4"),
            edgeFromTo("d4", "d5"),
            edgeFromTo("d5", "d11"),
            edgeFromTo("d5", "d6"),
            edgeFromTo("d6", "d7"),
            edgeFromTo("d7", "d8"),
            edgeFromTo("d7", "d9"),
            edgeFromTo("d8", "d9"),
            edgeFromTo("d9", "d10"),
            //  D -> E
            edgeFromTo("d4", "e1"),
            edgeFromTo("d11", "e3"),
            //  E
            edgeFromTo("e1", "e2"),
            edgeFromTo("e2", "e3"),
            edgeFromTo("e1", "e4"),
            edgeFromTo("e4", "e5"),
            edgeFromTo("e5", "e6"),
            edgeFromTo("e6", "e7"),
            edgeFromTo("e7", "top stairs"),


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
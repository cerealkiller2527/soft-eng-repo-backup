import { PrismaClient, RequestType, Status } from './.prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 🚀 Step 1: Create 5 employees

    await prisma.audioVisual.deleteMany();
    await prisma.externalTransportation.deleteMany();
    await prisma.equipmentDelivery.deleteMany();
    await prisma.language.deleteMany();
    await prisma.security.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.edge.deleteMany();
    await prisma.node.deleteMany();

    // deleted backwards to preserve foreign key constraint
    await prisma.departmentServices.deleteMany();
    await prisma.service.deleteMany();
    await prisma.department.deleteMany();
    await prisma.building.deleteMany();

    console.log('🗑️ Existing data purged.');
    const employees = await Promise.all(
        Array.from({ length: 5 }).map((_, i) =>
            prisma.employee.create({
                data: {
                    name: `Employee ${i + 1}`,
                    employeeType: 'General',
                    canService: [RequestType.AUDIOVISUAL, RequestType.SECURITY],
                },
            })
        )
    );

    // 🚀 Step 2: Create 10 service requests
    await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
                const reqType = Object.values(RequestType);
                const type = reqType[i%5];
                const request = await prisma.serviceRequest.create({
                    data: {
                        type,
                        status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                        description: `Request ${i + 1}`,
                        employeeID: i < 5 ? employees[i % employees.length].id : null,
                    },
                })
                switch (type) {
                    case RequestType.AUDIOVISUAL:
                        await prisma.audioVisual.create({
                            data: {
                                id: request.id,
                                location: `Room ${i + 1}`,
                                deadline: new Date(Date.now() + 1000 * 60 * 60 * 24),
                                audiovisualType: `Type ${i + 1}`,
                            }
                        });
                        break;
                    case RequestType.EXTERNALTRANSPORTATION:
                        await prisma.externalTransportation.create({
                            data: {
                                id: request.id,
                                transportType: `Vehicle ${i}`,
                                fromWhere: `Location ${i}`,
                                toWhere: `Location ${i + 1}`,
                                patientName: `Patient ${i + 1}`,
                                pickupTime: new Date(Date.now() + 1000 * 60 * 60 * 23),
                                dropoffTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
                            }
                        })
                        break;
                    case RequestType.EQUIPMENTDELIVERY:
                        await prisma.equipmentDelivery.create({
                            data: {
                                id: request.id,
                                deadline: new Date(Date.now() + 1000 * 60 * 60 * 23),
                                equipments: [`Equipment ${i}`],
                                toWhere: `Location ${i}`,
                                fromWhere: `Location ${i + 1}`
                            }
                        })
                        break;
                    case RequestType.LANGUAGE:
                        await prisma.language.create({
                            data: {
                                id: request.id,
                                location: `Location ${i}`,
                                language: 'Spanish',
                                startTime: new Date(Date.now() + 1000 * 60 * 60 * 23),
                                endTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
                            }
                        })
                        break;
                    case RequestType.SECURITY:
                        await prisma.security.create({
                            data: {
                                id: request.id,
                                location: `Room ${i + 1}`,
                                riskLevel: Math.floor(Math.random() * 5) + 1
                            }
                        })
                        break;
                }
            }
        )
    );

    const buildings = await prisma.building.create({
        data: {
            id: 1,
            name: 'Brigham and Women’s Health Care Center',
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
            phoneNumber: '1-800-BWH-9999',
        }
    })

    const locations = await prisma.location.createMany({
        data: [
            { suite: '301', floor: 3, nodeID: 1},
            { suite: '540', floor: 5, nodeID: 1},
            { suite: '210', floor: 2, nodeID: 1},
            { suite: '317', floor: 3, nodeID: 1},
            { suite: '575', floor: 5, nodeID: 1},
            { suite: '428', floor: 4, nodeID: 1},
            { suite: '530', floor: 5, nodeID: 1},
            { suite: '303', floor: 3, nodeID: 1},
            { suite: '320', floor: 3, nodeID: 1},
            { suite: '201', floor: 2, nodeID: 1},
            { suite: '202', floor: 2, nodeID: 1},
            { suite: '402', floor: 4, nodeID: 1},
            { suite: '100', floor: 1, nodeID: 1},
            { suite: '130', floor: 1, nodeID: 1},
            { suite: '422', floor: 4, nodeID: 1},
            { suite: '204B', floor: 2, nodeID: 1},
            { suite: '317', floor: 3, nodeID: 1},
            { suite: '560', floor: 5, nodeID: 1},
            { suite: '102B', floor: 1, nodeID: 1},
            { suite: '200', floor: 2, nodeID: 1},
        ]
    })

    const rawDepartmentData = [
        {
            name: 'Allergy and Clinical Immunology',
            description: 'Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency',
            phoneNumber: '(617) 732-9850',
            floor: 3,
            suite: 301,
        },
        {
            name: 'Backup Child Care Center',
            description: 'Backup childcare for employees',
            phoneNumber: '(617) 732-9543',
            floor: 2,
            suite: 210,
        },
        {
            name: 'Brigham Dermatology Associates (BDA)',
            description: 'Medical and surgical dermatology',
            phoneNumber: '(617) 732-9080',
            floor: 3,
            suite: 317,
        },
        {
            name: 'Brigham Obstetrics and Gynecology Group (BOGG)',
            description: 'Gynecology, obstetrics',
            phoneNumber: '(617) 732-9100',
            floor: 5,
            suite: 575,
        },
        {
            name: 'Brigham Physicians Group (BPG)',
            description: 'Adult primary care',
            phoneNumber: '(617) 732-9900',
            floor: 4,
            suite: 428,
        },
        {
            name: 'Brigham Psychiatric Specialties',
            description: 'Psychiatry, psychology, social work',
            phoneNumber: '(617) 732-9811',
            floor: 3,
            suite: 303,
        },
        {
            name: 'Center for Pain Medicine',
            description: 'Multidisciplinary pain management',
            phoneNumber: '(617) 732-9060',
            floor: 3,
            suite: 320,
        },
        {
            name: "Crohn’s and Colitis Center",
            description: "Crohn’s disease, inflammatory bowel disease, infusion services, microscopic colitis, pulmonary, rheumatology, ulcerative colitis",
            phoneNumber: "(617) 732-6389",
            floor: 2,
            suite: 201,
        },
        {
            name: "Endoscopy Center",
            description: "Bacterial overgrowth breath test, colonoscopy, H. Pylori breath test, lactose malabsorption breath test, upper endoscopy",
            phoneNumber: "(617) 732-7426",
            floor: 2,
            suite: 202,
        },
        {
            name: "Gretchen S. and Edward A. Fish Center for Women’s Health",
            description: "Cardiology, dermatology, endocrinology, gastroenterology, hematology, infectious diseases, mental health, general neurology, nutrition, primary care, pulmonary, sleep medicine, women’s health",
            phoneNumber: "(617) 732-9300",
            floor: 4,
            suite: 402,
        },
        {
            name: "Laboratory",
            description: "Blood work, lab services",
            phoneNumber: "(617) 732-9841",
            floor: 1,
            suite: 130,
        },
        {
            name: "Multi-Specialty Clinic",
            description: "Orthopedic surgery, vascular surgery, dermatology, pain medicine, travel medicine",
            phoneNumber: "(617) 732-9500",
            floor: 1,
            suite: 130,
        },
        {
            name: "Osher Clinical Center for Integrative Health",
            description: "Acupuncture, health coaching, chiropractic, integrative medicine, massage therapy, neurology, echocardiography, pulmonary",
            phoneNumber: "(617) 732-9700",
            floor: 4,
            suite: 422,
        },
        {
            name: "Patient Financial Services",
            description: "Patient financial counseling",
            phoneNumber: "(617) 732-9677",
            floor: 2,
            suite: 204,
        },
        {
            name: "Pharmacy",
            description: "Outpatient pharmacy services",
            phoneNumber: "(617) 732-9040",
            floor: 3,
            suite: 317,
        },
        {
            name: "Radiology",
            description: "Bone density, Breast imaging/Mammography, ultrasound, X-Ray",
            phoneNumber: "(617) 732-9801",
            floor: 5,
            suite: 560,
        },
        {
            name: "Radiology, MRI/CT scan",
            description: "CT scan, MRI, X-Ray",
            phoneNumber: "(617) 732-9821",
            floor: 1,
            suite: 102,
        },
        {
            name: "Rehabilitation Services",
            description: "Orthopedic, sports, neurologic and vestibular Physical Therapy, pelvic floor therapy, occupational therapy, speech language pathology",
            phoneNumber: "(617) 732-9525",
            floor: 2,
            suite: 200,
        },
    ];

   const services = await Promise.all(
        rawDepartmentData.map((dept) =>
            prisma.service.create({
                data: {
                    name: dept.description ?? dept.name, // Fallback to name if description missing
                },
            })
        )
    );

    const departments = await Promise.all(
        rawDepartmentData.map((dept) =>
            prisma.department.create({
                data: {
                    name: dept.name,
                    phoneNumber: dept.phoneNumber,
                },
            })
        ));

    // linking locations to departments
    await Promise.all(
        rawDepartmentData.map(async (dept, index) => {
            const department = departments[index];

            await prisma.location.updateMany({
                where: {
                    floor: dept.floor,
                    suite: String(dept.suite),
                },
                data: {
                    departmentId: department.id,
                },
            });
        }));

    const departmentServices = await Promise.all(
        departments.map((dept, i) =>
            prisma.departmentServices.create({
                data: {
                    departmentID: dept.id,
                    serviceID: services[i].id,
                },
            })
        ));

    await seedNodesEdges();

    console.log('✅ Seed complete!');
}

async function seedNodesEdges() {
    // seed nodes
    const nodes = await prisma.node.createManyAndReturn({
        data: [
            {description: '1top stairs', x: 272, y: 110},
            {description: '1b', x: 272, y: 130},
            {description: '1a', x: 190, y: 130},
            {description: '1c', x: 190, y: 239},
            {description: '1d', x: 163, y: 239},
            {description: '1e', x: 163, y: 360},
            {description: '1f', x: 275, y: 360},
            {description: '1bottom entrance', x: 275, y: 390},
            {description: '1bottom entrance outside', x: 275, y: 450},
            {description: '1g', x: 275, y: 315},
            {description: '1h', x: 357, y: 315},
            {description: '1bottom stairs', x: 357, y: 300},
            {description: '1right entrance', x: 400, y: 315},
            {description: '1right entrance outside', x: 450, y: 315},
            {description: 'reception', x: 25, y: 25}, // random x and y - algos please put in the correct ones!
        ]
    })

    // seed edges with node ids
    const edges = await prisma.edge.createMany({
        data: [
            {fromNodeId: nodes[idFromDesc("1top stairs")].id, toNodeId: nodes[idFromDesc("1b")].id},
            {fromNodeId: nodes[idFromDesc("1b")].id, toNodeId: nodes[idFromDesc("1a")].id},
            {fromNodeId: nodes[idFromDesc("1a")].id, toNodeId: nodes[idFromDesc("1c")].id},
            {fromNodeId: nodes[idFromDesc("1c")].id, toNodeId: nodes[idFromDesc("1d")].id},
            {fromNodeId: nodes[idFromDesc("1d")].id, toNodeId: nodes[idFromDesc("1e")].id},
            {fromNodeId: nodes[idFromDesc("1e")].id, toNodeId: nodes[idFromDesc("1f")].id},
            {fromNodeId: nodes[idFromDesc("1f")].id, toNodeId: nodes[idFromDesc("1g")].id},
            {fromNodeId: nodes[idFromDesc("1g")].id, toNodeId: nodes[idFromDesc("1h")].id},
            {fromNodeId: nodes[idFromDesc("1h")].id, toNodeId: nodes[idFromDesc("1right entrance")].id},
            {
                fromNodeId: nodes[idFromDesc("1right entrance")].id,
                toNodeId: nodes[idFromDesc("1right entrance outside")].id
            },
            {fromNodeId: nodes[idFromDesc("1f")].id, toNodeId: nodes[idFromDesc("1bottom entrance")].id},
            {
                fromNodeId: nodes[idFromDesc("1bottom entrance")].id,
                toNodeId: nodes[idFromDesc("1bottom entrance outside")].id
            },
        ]
    })


    /*  idFromDesc()
        return the index from nodes[] that corresponds to a given "description"
        returns -1 if no node is found with that description
     */
    function idFromDesc(description: string): number {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].description === description) {
                return i;
            }
        }
        return -1;
    }
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient, RequestType, Status } from './.prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 🚀 Step 1: Create 5 employees

    // Clear all tables in the correct order to maintain foreign key constraints
    if ((await prisma.user.count()) != 0) {
        await prisma.user.deleteMany();
    }
    await prisma.audioVisual.deleteMany();
    await prisma.externalTransportation.deleteMany();
    await prisma.equipmentDelivery.deleteMany();
    await prisma.language.deleteMany();
    await prisma.security.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.edge.deleteMany();
    await prisma.node.deleteMany();
    await prisma.departmentServices.deleteMany();
    await prisma.service.deleteMany();
    await prisma.department.deleteMany();
    await prisma.building.deleteMany();

    console.log('🗑️ Existing data purged.');

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.com',
        }
    })

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

    const buildings = await Promise.all(
        Array.from({ length: 3 }).map((_, i) =>
            prisma.building.create({
                data: {
                    name: `Building ${i + 1}`,
                    address: `Address for Building ${i + 1}`,
                    phoneNumber: Math.floor(Math.random() * 2000000000) + 1000000000,
                },
            })
        )
    );

    const departments = await Promise.all(
        Array.from({ length: 5 }).map((_, i) =>
            prisma.department.create({
                data: {
                    name: `Department ${i + 1}`,
                    description: `Description for Department ${i + 1}`,
                    phoneNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
                    buildingID: buildings[i % buildings.length].id,
                },
            })
        )
    );

    const services = await Promise.all(
        Array.from({ length: 3 }).map((_, i) =>
            prisma.service.create({
                data: {
                    name: `Service ${i + 1}`,
                },
            })
        )
    );

    const departmentServices = await Promise.all(
        services.flatMap((service) =>
            Array.from({ length: 2 }).map((_, i) =>
                prisma.departmentServices.create({
                    data: {
                        departmentID: departments[i % departments.length].id,
                        serviceID: service.id,
                    },
                })
            )
        )
    );

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

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

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

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

    // seed nodes
    const nodes = await prisma.node.createManyAndReturn({
        data: [
            {description: 'entry', x: 1, y: 6},
            {description: 'a', x: 2, y: 6},
            {description: 'lab1', x: 2, y: 5},
            {description: 'b', x: 3, y: 6},
            {description: 'c', x: 4, y: 6},
            {description: 'd', x: 4, y: 3},
            {description: 'lab2', x: 3, y: 3},
            {description: 'e', x: 5, y: 3},
            {description: 'multi-spec clinic', x: 5, y: 2},
            {description: 'f', x: 3, y: 10},
            {description: 'radiology', x: 4, y: 10},
        ]
    })

    // seed edges with node ids
    const edges = await prisma.edge.createMany({
        data: [
            {fromNodeId: nodes[idFromDesc("entry")].id, toNodeId: nodes[idFromDesc("a")].id},
            {fromNodeId: nodes[idFromDesc("a")].id, toNodeId: nodes[idFromDesc("lab1")].id},
            {fromNodeId: nodes[idFromDesc("a")].id, toNodeId: nodes[idFromDesc("b")].id},
            {fromNodeId: nodes[idFromDesc("b")].id, toNodeId: nodes[idFromDesc("c")].id},
            {fromNodeId: nodes[idFromDesc("c")].id, toNodeId: nodes[idFromDesc("d")].id},
            {fromNodeId: nodes[idFromDesc("d")].id, toNodeId: nodes[idFromDesc("lab2")].id},
            {fromNodeId: nodes[idFromDesc("d")].id, toNodeId: nodes[idFromDesc("e")].id},
            {fromNodeId: nodes[idFromDesc("e")].id, toNodeId: nodes[idFromDesc("multi-spec clinic")].id},
            {fromNodeId: nodes[idFromDesc("b")].id, toNodeId: nodes[idFromDesc("f")].id},
            {fromNodeId: nodes[idFromDesc("f")].id, toNodeId: nodes[idFromDesc("radiology")].id}
        ]
    })

    /*  idFromDesc()
        return the index from nodes[] that corresponds to a given "description"
        returns -1 if no node is found with that description
     */
    function idFromDesc(description: string): number{
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].description === description){
                return i;
            }
        }
        return -1;
    }


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

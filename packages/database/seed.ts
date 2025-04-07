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
            {name: 'entry', x: 0, y: 0},
            {name: 'a', x: 0, y: 0},
            {name: 'lab1', x: 0, y: 0},
            {name: 'b', x: 0, y: 0},
            {name: 'c', x: 0, y: 0},
            {name: 'd', x: 0, y: 0},
            {name: 'lab2', x: 0, y: 0},
            {name: 'e', x: 0, y: 0},
            {name: 'multi-spec clinic', x: 0, y: 0},
            {name: 'f', x: 0, y: 0},
            {name: 'radiology', x: 0, y: 0},
        ]
    })

    // seed edges with node ids
    const edges = await prisma.edge.createMany({
        data: [
            {fromNodeId: nodes[idFromName("entry")].id, toNodeId: nodes[idFromName("a")].id},
            {fromNodeId: nodes[idFromName("a")].id, toNodeId: nodes[idFromName("lab1")].id},
            {fromNodeId: nodes[idFromName("a")].id, toNodeId: nodes[idFromName("b")].id},
            {fromNodeId: nodes[idFromName("b")].id, toNodeId: nodes[idFromName("c")].id},
            {fromNodeId: nodes[idFromName("c")].id, toNodeId: nodes[idFromName("d")].id},
            {fromNodeId: nodes[idFromName("d")].id, toNodeId: nodes[idFromName("lab2")].id},
            {fromNodeId: nodes[idFromName("d")].id, toNodeId: nodes[idFromName("e")].id},
            {fromNodeId: nodes[idFromName("e")].id, toNodeId: nodes[idFromName("multi-spec clinic")].id},
            {fromNodeId: nodes[idFromName("b")].id, toNodeId: nodes[idFromName("f")].id},
            {fromNodeId: nodes[idFromName("f")].id, toNodeId: nodes[idFromName("radiology")].id}
        ]
    })

    /*  idFromName()
        return the index from nodes[] that corresponds to a given "name"
        returns -1 if no node is found with that name
     */
    function idFromName(name: string): number{
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].name === name){
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

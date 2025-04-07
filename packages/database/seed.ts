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
        Array.from({ length: 10 }).map((_, i) =>
            prisma.serviceRequest.create({
                data: {
                    type: i % 2 === 0 ? RequestType.AUDIOVISUAL : RequestType.SECURITY,
                    status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                    description: `Request ${i + 1}`,
                    employeeID: i < 5 ? employees[i % employees.length].id : null,
                },
            })
        )
    );

    console.log('✅ Seed complete!');
}

    (async () => {
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
    })();

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

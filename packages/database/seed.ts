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
                {fromNodeId: nodes[idFromDesc("1right entrance")].id, toNodeId: nodes[idFromDesc("1right entrance outside")].id},
                {fromNodeId: nodes[idFromDesc("1f")].id, toNodeId: nodes[idFromDesc("1bottom entrance")].id},
                {fromNodeId: nodes[idFromDesc("1bottom entrance")].id, toNodeId: nodes[idFromDesc("1bottom entrance outside")].id},
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

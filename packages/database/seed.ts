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


    // seed nodes
    const nodes = await prisma.node.createManyAndReturn({
        data: [
            {name: 'entry'},
            {name: 'a'},
            {name: 'lab1'},
            {name: 'b'},
            {name: 'c'},
            {name: 'd'},
            {name: 'lab2'},
            {name: 'e'},
            {name: 'multi-spec clinic'},
            {name: 'f'},
            {name: 'radiology'}
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

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient, RequestType, Status } from './.prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 🚀 Step 1: Create 5 employees
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
                    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
                    status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                    description: `Request ${i + 1}`,
                    priority: Math.floor(Math.random() * 5) + 1,
                    employeeID: i < 5 ? employees[i % employees.length].id : null,
                },
            })
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

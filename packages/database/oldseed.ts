import { PrismaClient, RequestType, Status, nodeType, Priority } from './.prisma/client';

const prisma = new PrismaClient();

function toNodeType(value: string): nodeType {
    return nodeType[value as keyof typeof nodeType];
}

async function main() {
    // drop all data from database
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
    await prisma.department.deleteMany();
    await prisma.node.deleteMany();
    await prisma.location.deleteMany();
    await prisma.building.deleteMany();
    await prisma.user.deleteMany();

    console.log('Existing data purged.');

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin', // Plain text - insecure!
            email: 'admin@admin.com',
        },
    });

    console.log(`Created admin user: ${admin.username}`);

    // Create buildings
    const chestnutHillBuilding = await prisma.building.create({
        data: {
            id: 1,
            name: "Chestnut Hill Medical Center",
            address: '25 Boylston St, Chestnut Hill, Ma 02467',
            phoneNumber: '(617) 482-5500',
        }
    });
    const patriotPlace20Building = await prisma.building.create({
        data: {
            id: 2,
            name: "20 Patriot Place",
            address: '20 Patriot Pl, Foxboro, MA 02035',
            phoneNumber: '(866) 378-9164',
        }
    });
    const patriotPlace22Building = await prisma.building.create({
        data: {
            id: 3,
            name: "22 Patriot Place",
            address: '22 Patriot Pl, Foxboro, MA 02035',
            phoneNumber: '(866) 378-9164',
        }
    });

    const faulknerBuilding = await prisma.building.create({
        data: {
            id: 4,
            name: "Faulkner Hospital",
            address: '1153 Centre St, Jamaica Plain, MA 02130',
            phoneNumber: '(866) 378-9164',
        }
    });

    const chestnutNodes = [
        { suite: '0', description: '1top entrance outside', lat: 42.32623496574831, long: -71.14950957972837, floor: 1, type: "Entrance" },
        { suite: '0', description: '1top entrance', lat: 42.32620375463355, long: -71.14950766082836, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1c', lat: 42.32613778563545, long: -71.1494999852283, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1multi specialty clinic', lat: 42.32615339121115, long: -71.1495997680289, floor: 1, type: "Location" },
        { suite: '0', description: '1b', lat: 42.32597321751075, long: -71.14949614742828, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1a', lat: 42.32597889228084, long: -71.14935894607748, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1d', lat: 42.32576254130898, long: -71.14935222992743, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1e', lat: 42.32574906368282, long: -71.14954028212856, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1radiology', lat: 42.32577601893224, long: -71.14954220102855, floor: 1, type: "Location" },
        { suite: '0', description: '1right entrance', lat: 42.32598456705039, long: -71.1492591632769, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1right entrance outside', lat: 42.325987404435004, long: -71.14921598802664, floor: 1, type: "Location" },
        { suite: '0', description: '1drop off', lat: 42.326295063631804, long: -71.1494980200208, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1lot1', lat: 42.326294043305104, long: -71.1495987024141, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1lot2', lat: 42.32638877194042, long: -71.14960193256016, floor: 1, type: "Intermediary" },
        { suite: '0', description: '1parking', lat: 42.32636329870798, long: -71.14976451657915, floor: 1, type: "Intermediary" },
    ]
    const pat20Floor1Nodes = [

        { suite: '0', description: '1left entrance outside', lat: 42.09247336762025, long: -71.26641176178101,floor : 1, type: "Location" },
        { suite: '0', description: '1left entrance', lat: 42.092519162004315, long: -71.26635382787208,floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a1', lat: 42.09253411526544, long: -71.26633745524565,floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a2', lat: 42.09256776009002, long: -71.26629967226157,floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a3', lat: 42.09259112454105, long: -71.26627196473991, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a4', lat: 42.09254626478749, long: -71.26625433268069, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a5', lat: 42.09257990960563, long: -71.26611327620677, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1middle stairs', lat: 42.092620096448364, long: -71.26612209223639 , floor : 1, type: "Staircase" },
        { suite: '0', description: '1a6', lat: 42.09259766658581, long: -71.26601000271695, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a7', lat: 42.09261916187092, long: -71.26592058298796, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a8', lat: 42.09263318053121, long: -71.26586138964623, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1urology/cardiology', lat: 42.092669629033466, long: -71.26587524340705, floor : 1, type: "Location" },
        { suite: '0', description: '1urology/cardiology2', lat: 42.092669629033465, long: -71.26587524340704, floor : 1, type: "Location" },
        { suite: '0', description: '1a9', lat: 42.092651872073446, long: -71.26577322935003, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a10', lat: 42.092664956149726, long: -71.26570773884428, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1right stairs', lat: 42.092697666328625, long: -71.26560824365289, floor : 1, type: "Staircase" },
        { suite: '0', description: '120elevator', lat: 42.09268458225911, long: -71.26565232380098, floor : 1, type: "Elevator" },
        { suite: '0', description: '1a11', lat: 42.092694, long: -71.265939, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1a12', lat: 42.092739, long: -71.265955, floor : 1 , type: "Intermediary" },

        { suite: '0', description: '120radiology', lat: 42.092654675804305, long: -71.2663588656033, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b17', lat: 42.0926873859885, long: -71.26631478545521, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b1', lat: 42.09262290018065, long: -71.26635256843929, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b2', lat: 42.09262850764481, long: -71.26628707793354, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b3', lat: 42.09264626461136, long: -71.26629589396316, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b4', lat: 42.09264906834246, long: -71.26627952133673, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b5', lat: 42.09264906834246, long: -71.26627952133673, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1blood/urgent', lat: 42.09267243276353, long: -71.26623040345743, floor : 1, type: "Location" },
        { suite: '0', description: '1blood/urgent2', lat: 42.09267243276352, long: -71.26623040345744 , floor: 1, type: "Intermediary" },
        { suite: '0', description: '1b6', lat: 42.092774, long: -71.265858, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b7', lat: 42.092786, long: -71.265820, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b8', lat: 42.092803, long: -71.265870, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b9', lat: 42.092791, long: -71.265787, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b10', lat: 42.092803, long: -71.265754, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b11', lat: 42.092803, long: -71.265754, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b12', lat: 42.092803, long: -71.265754, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b13', lat: 42.092821, long: -71.265723, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b14', lat: 42.092821, long: -71.265723, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1b15', lat: 42.092835, long: -71.265595, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1right entrance', lat: 42.092835, long: -71.265595, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1right entrance outside', lat: 42.09280140421301, long: -71.26562965401052, floor : 1, type: "Location" },
        { suite: '0', description: '1b16', lat: 42.09283317974725, long: -71.26585383304942, floor : 1 , type: "Intermediary" },

        { suite: '0', description: '1c1', lat: 42.092715423275855, long: -71.26632737978323, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1pharmacy', lat: 42.092788, long: -71.266211, floor : 1, type: "Location" },
        { suite: '0', description: '1c2', lat: 42.092836, long: -71.266267, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c3', lat: 42.092846, long: -71.266212, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c4', lat: 42.092860, long: -71.266150, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c5', lat: 42.092839, long: -71.266153, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c6', lat: 42.092874, long: -71.266087, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c7', lat: 42.092848, long: -71.266089, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1c8', lat: 42.092869, long: -71.265967, floor : 1 , type: "Intermediary" },

        { suite: '0', description: '1d1', lat: 42.092817, long: -71.266270, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d2', lat: 42.092821, long: -71.266236, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d3', lat: 42.092837, long: -71.266243, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d4', lat: 42.092860, long: -71.266254, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d5', lat: 42.092892, long: -71.266017, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d6', lat: 42.092892, long: -71.266017, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d7', lat: 42.092871, long: -71.265968, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d8', lat: 42.092871, long: -71.265968, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d9', lat: 42.092871, long: -71.265968, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d10', lat: 42.092852, long: -71.265911, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1d11', lat: 42.092892, long: -71.266017, floor : 1 , type: "Intermediary" },

        { suite: '0', description: '1e1', lat: 42.092886, long: -71.266333, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e2', lat: 42.092917, long: -71.266278, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e3', lat: 42.092940, long: -71.266120, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e4', lat: 42.092920, long: -71.266343, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e5', lat: 42.092930, long: -71.266360, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e6', lat: 42.092947, long: -71.266384, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '1e7', lat: 42.092963, long: -71.266393, floor : 1 , type: "Intermediary" },
        { suite: '0', description: '120top stairs', lat: 42.092960, long: -71.266427, floor : 1, type: "Staircase" }
    ]
    const pat22Floor3Nodes= [
        { suite: '0', description: '3left stairs', lat: 42.092446, long: -71.266887, floor: 3, type: "Staircase" },
        { suite: '0', description: '3a1', lat: 42.092464, long: -71.266866, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3a2', lat: 42.092472, long: -71.266881, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3a3', lat: 42.092520, long: -71.266830, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3a4', lat: 42.092505, long: -71.266806, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3multi specialty', lat: 42.092496, long: -71.266790, floor: 3, type: "Location" },
        { suite: '0', description: '3middle stairs', lat: 42.092532, long: -71.266775, floor: 3, type: "Staircase" },
        { suite: '0', description: '322elevator', lat: 42.092589, long: -71.266719, floor: 3, type: "Elevator" },
        { suite: '0', description: '3a5', lat: 42.092610, long: -71.266686, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3a6', lat: 42.092642, long: -71.266661, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3a7', lat: 42.092679, long: -71.266727, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3b1', lat: 42.092719, long: -71.266783, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3b2', lat: 42.092773, long: -71.266725, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3b3', lat: 42.092795, long: -71.266771, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3b4', lat: 42.092826, long: -71.266734, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3b5', lat: 42.092847, long: -71.266733, floor: 3, type: "Intermediary" },
        { suite: '0', description: '3right stairs', lat: 42.092855, long: -71.266709, floor: 3, type: "Staircase" },
    ]
    const pat22Floor4Nodes= [
        { suite: '0', description: '4left stairs', lat: 42.092446, long: -71.266887, floor: 4, type: "Staircase" },
        { suite: '0', description: '4a1', lat: 42.092548, long: -71.266732, floor: 4, type: "Intermediary" },
        { suite: '0', description: '4a2', lat: 42.092542, long: -71.266715, floor: 4, type: "Intermediary" },
        { suite: '0', description: '4phlebotomy', lat: 42.092527, long: -71.266734, floor: 4, type: "Location" },
        { suite: '0', description: '4middle stairs', lat: 42.092532, long: -71.266775, floor: 4, type: "Staircase" },
        { suite: '0', description: '422elevator', lat: 42.092589, long: -71.266719, floor: 4, type: "Elevator" },
    ]
    const pat22TempFloor1Nodes= [
        { suite: '0', description: '1entrance outside', lat: 42.092584, long: -71.266532, floor: 1, type: "Entrance" },
        { suite: '0', description: '1entrance', lat: 42.092599, long: -71.266584, floor: 1, type: "Intermediary" },
        { suite: '0', description: '122elevator', lat: 42.092589, long: -71.266719, floor: 1, type: "Elevator" },
        { suite: '0', description: '222elevator', lat: 42.092589, long: -71.266719, floor: 2, type: "Elevator" },
        { suite: '0', description: '120/122drop off', lat: 42.092522, long: -71.266522, floor: 1, type: "Entrance" },
        { suite: '0', description: '120/122parking entrance 1', lat: 42.092481, long: -71.266441, floor: 1, type: "Intermediary" },
        { suite: '0', description: '120/122parking entrance 2', lat: 42.092439, long: -71.266355, floor: 1, type: "Intermediary" },
        { suite: '0', description: '120/122parking', lat: 42.092361, long: -71.266417, floor: 1, type: "Location" },
    ]

    // Create nodes first
    const chestnutNodesSeeded = await Promise.all(
        chestnutNodes.map(async (node) => {
            const createdNode = await prisma.node.create({
                data: {
                    description: node.description,
                    lat: node.lat,
                    long: node.long,
                    type: toNodeType(node.type),
                },
            });
            await prisma.location.create({
                data: {
                    floor: node.floor,
                    buildingId: chestnutHillBuilding.id,
                    nodeID: createdNode.id,
                },
            });
            return createdNode;
        })
    );

    const pat20Floor1NodesSeeded = await Promise.all(
        pat20Floor1Nodes.map(async(node) => {
            const createdNode = await prisma.node.create({
                data: {
                    description: node.description,
                    lat: node.lat,
                    long: node.long,
                    type: toNodeType(node.type),
                },
            });
            await prisma.location.create({
                data: {
                    floor: node.floor,
                    buildingId: patriotPlace20Building.id,
                    nodeID: createdNode.id,
                },
            });
            return createdNode;
        })
    );
    const pat22Floor3NodesSeeded = await Promise.all(
        pat22Floor3Nodes.map(async (node) => {
            const createdNode = await prisma.node.create({
                data: {
                    description: node.description,
                    lat: node.lat,
                    long: node.long,
                    type: toNodeType(node.type),
                },
            });
            await prisma.location.create({
                data: {
                    floor: node.floor,
                    buildingId: patriotPlace22Building.id,
                    nodeID: createdNode.id,
                },
            });
            return createdNode;
        })
    );
    const pat22Floor4NodesSeeded = await Promise.all(
        pat22Floor4Nodes.map(async(node) => {
            const createdNode = await prisma.node.create({
                data: {
                    description: node.description,
                    lat: node.lat,
                    long: node.long,
                    type: toNodeType(node.type),
                },
            });
            await prisma.location.create({
                data: {
                    floor: node.floor,
                    buildingId: patriotPlace22Building.id,
                    nodeID: createdNode.id,
                },
            });
            return createdNode;
        })
    );
    const pat22TempFloor1NodesSeeded = await Promise.all(
        pat22TempFloor1Nodes.map(async (node) => {
            const createdNode = await prisma.node.create({
                data: {
                    description: node.description,
                    lat: node.lat,
                    long: node.long,
                    type: toNodeType(node.type),
                },
            });
            await prisma.location.create({
                data: {
                    floor: node.floor,
                    buildingId: patriotPlace22Building.id,
                    nodeID: createdNode.id,
                },
            });
            return createdNode;
        })
    );

    const allNodes = [
        ...chestnutNodesSeeded,
        ...pat20Floor1NodesSeeded,
        ...pat22Floor3NodesSeeded,
        ...pat22Floor4NodesSeeded,
        ...pat22TempFloor1NodesSeeded
    ];

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

    // Create external transportation service requests
    await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const reqType = Object.values(RequestType);
            const type = reqType[i%5];
            const priorityType = Object.values(Priority);
            const priority = priorityType[i%3];
            const serviceRequest = await prisma.serviceRequest.create({
                data: {
                    type: type,
                    status: i < 5 ? Status.ASSIGNED : Status.NOTASSIGNED,
                    description: `No additional note`,
                    assignedEmployeeID: i < 5 ? employees[i % employees.length].id : null,
                    fromEmployee: 'admin',
                    priority: priority,
                },
            });
            switch (type) {
                case RequestType.AUDIOVISUAL:
                    await prisma.audioVisual.create({
                        data: {
                            id: serviceRequest.id,
                            location: `Room ${i + 1}`,
                            deadline: new Date(Date.now() + 1000 * 60 * 60 * 24),
                            audiovisualType: `Type ${i + 1}`,
                        }
                    });
                    break;
                case RequestType.EXTERNALTRANSPORTATION:
                    await prisma.externalTransportation.create({
                        data: {
                            id: serviceRequest.id,
                            fromWhere: `Location A${i}`,
                            toWhere: `Location B${i}`,
                            transportType: 'Wheelchair Van',
                            patientName: `Patient ${i + 1}`,
                            pickupTime: new Date(Date.now() + 1000 * 60 * (i + 1) * 30),
                        },
                    })
                    break;
                case RequestType.EQUIPMENTDELIVERY:
                    await prisma.equipmentDelivery.create({
                        data: {
                            id: serviceRequest.id,
                            deadline: new Date(Date.now() + 1000 * 60 * 60 * 23),
                            equipments: [`Equipment ${i}`],
                            toWhere: `Location ${i}`
                        }
                    })
                    break;
                case RequestType.LANGUAGE:
                    await prisma.language.create({
                        data: {
                            id: serviceRequest.id,
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
                            id: serviceRequest.id,
                            location: `Room ${i + 1}`
                        }
                    })
                    break;
            }
        }))
    const rawDepartmentData = [
        {
            name: 'Allergy and Clinical Immunology',
            description: 'Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency',
            phoneNumber: '(617) 732-9850',
            floor: 3,
            suite: '301',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Backup Child Care Center',
            description: 'Backup childcare for employees',
            phoneNumber: '(617) 732-9543',
            floor: 2,
            suite: '210',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Brigham Dermatology Associates (BDA)',
            description: 'Medical and surgical dermatology',
            phoneNumber: '(617) 732-9080',
            floor: 3,
            suite: '317',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Brigham Obstetrics and Gynecology Group (BOGG)',
            description: 'Gynecology, obstetrics',
            phoneNumber: '(617) 732-9100',
            floor: 5,
            suite: '575',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Brigham Physicians Group (BPG)',
            description: 'Adult primary care',
            phoneNumber: '(617) 732-9900',
            floor: 4,
            suite: '428',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Brigham Psychiatric Specialties',
            description: 'Psychiatry, psychology, social work',
            phoneNumber: '(617) 732-9811',
            floor: 3,
            suite: '303',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: 'Center for Pain Medicine',
            description: 'Multidisciplinary pain management',
            phoneNumber: '(617) 732-9060',
            floor: 3,
            suite: '320',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Crohn's and Colitis Center",
            description: "Crohn's disease, inflammatory bowel disease, infusion services, microscopic colitis, pulmonary, rheumatology, ulcerative colitis",
            phoneNumber: "(617) 732-6389",
            floor: 2,
            suite: '201',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Endoscopy Center",
            description: "Bacterial overgrowth breath test, colonoscopy, H. Pylori breath test, lactose malabsorption breath test, upper endoscopy",
            phoneNumber: "(617) 732-7426",
            floor: 2,
            suite: '202',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Gretchen S. and Edward A. Fish Center for Women's Health",
            description: "Cardiology, dermatology, endocrinology, gastroenterology, hematology, infectious diseases, mental health, general neurology, nutrition, primary care, pulmonary, sleep medicine, women's health",
            phoneNumber: "(617) 732-9300",
            floor: 4,
            suite: '402',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Laboratory",
            description: "Blood work, lab services",
            phoneNumber: "(617) 732-9841",
            floor: 1,
            suite: '130',
            buildingId: chestnutHillBuilding.id,
            nodeDescription: "1a",
        },
        {
            name: "Multi-Specialty Clinic",
            description: "Orthopedic surgery, vascular surgery, dermatology, pain medicine, travel medicine",
            phoneNumber: "(617) 732-9500",
            floor: 1,
            suite: '130',
            buildingId: chestnutHillBuilding.id,
            nodeDescription: "1multi specialty clinic"
        },
        {
            name: "Osher Clinical Center for Integrative Health",
            description: "Acupuncture, health coaching, chiropractic, integrative medicine, massage therapy, neurology, echocardiography, pulmonary",
            phoneNumber: "(617) 732-9700",
            floor: 4,
            suite: '422',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Patient Financial Services",
            description: "Patient financial counseling",
            phoneNumber: "(617) 732-9677",
            floor: 2,
            suite: '204B',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Pharmacy",
            description: "Outpatient pharmacy services",
            phoneNumber: "(617) 732-9040",
            floor: 3,
            suite: '317',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Radiology",
            description: "Bone density, Breast imaging/Mammography, ultrasound, X-Ray",
            phoneNumber: "(617) 732-9801",
            floor: 5,
            suite: '560',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Radiology, MRI/CT scan",
            description: "CT scan, MRI, X-Ray",
            phoneNumber: "(617) 732-9821",
            floor: 1,
            suite: '102B',
            buildingId: chestnutHillBuilding.id,
            nodeDescription: "1radiology",
        },
        {
            name: "Rehabilitation Services",
            description: "Orthopedic, sports, neurologic and vestibular Physical Therapy, pelvic floor therapy, occupational therapy, speech language pathology",
            phoneNumber: "(617) 732-9525",
            floor: 2,
            suite: '200',
            buildingId: chestnutHillBuilding.id
        },
        {
            name: "Cardiovascular Services",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "1urology/cardiology",
        },
        {
            name: "Radiology",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "120radiology",
        },
        {
            name: "Blood Draw/ Phlebotomy",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "1blood/urgent",
        },
        {
            name: "Pharmacy",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "1pharmacy",
        },
        {
            name: "Multi Specialty Clinic",
            description: "Cardiac Arrhythmia, Dermatology, Neurosurgery, Optometry, Pulmonology, Women's Health, Allergy, Gastroenterology, Neurology, Endocrinology, Kidney (Renal) Medicine, Ophthalmology, Rheumatology, Vein Care Services, Patient Financial Services",
            phoneNumber: "(866) 378-9164",
            floor: 3,
            suite: '0',
            buildingId: patriotPlace22Building.id,
            nodeDescription: "3multi specialty",
        },
        {
            name: "Blood Draw/Phlebotomy",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace22Building.id,
            nodeDescription: "4phlebotomy",
        },
        {
            name: "Urgent Care Center",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "1blood/urgent2",
        },
        {
            name: "Urology",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 1,
            suite: '0',
            buildingId: patriotPlace20Building.id,
            nodeDescription: "1urology/cardiology2",
        },
        {
            name: "Orthopaedics",
            description: "Hand and Upper Extremity, Arthroplasty, Pediatric Trauma, Physiatry, Podiatry",
            phoneNumber: "(866) 378-9164",
            floor: 2,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Rehabilitation Services",
            description: "Cardiac Rehab; Occupational Therapy, Hand Therapy, Upper Extremity; Physical Therapy, Speech - Language",
            phoneNumber: "(866) 378-9164",
            floor: 2,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Clinical Lab",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 2,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Surgi-Care",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 2,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Surgical Specialties",
            description: "Audiology; ENT, General and Gastrointestinal Surgery, Plastic Surgery, Thoracic Surgery, Vascular Surgery, Weight Management and Wellness",
            phoneNumber: "(866) 378-9164",
            floor: 3,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Sports Medicine Center",
            description: "X-Ray Suite",
            phoneNumber: "(866) 378-9164",
            floor: 3,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Electromyography (EMG)",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Nutrition",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Pain Medicine",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Pulmonary Function Testing",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Day Surgery Center",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace20Building.id
        },
        {
            name: "Community Room",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace22Building.id
        },
        {
            name: "Primary Care",
            description: "",
            phoneNumber: "(866) 378-9164",
            floor: 4,
            suite: '0',
            buildingId: patriotPlace22Building.id
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
                },
            })
        )
    );

    // Link nodes to departments based on floor/suite
    await Promise.all(
        departments.map(async (dept, i) => {
            const deptData = rawDepartmentData[i];

            if (deptData.nodeDescription) {
                const matchedNode = allNodes.find(n =>
                    n.description === deptData.nodeDescription
                );

                if (matchedNode) {
                    const existingLocation = await prisma.location.findFirst({
                        where: {
                            nodeID: matchedNode.id,
                            buildingId: deptData.buildingId,
                        },
                    });

                    if (existingLocation && !existingLocation.departmentId) {
                        // If there's no department yet, update it
                        await prisma.location.update({
                            where: { id: existingLocation.id },
                            data: { departmentId: dept.id },
                        });
                    } else {
                        // If it already has a department, create a new location
                        await prisma.location.create({
                            data: {
                                floor: deptData.floor,
                                suite: deptData.suite,
                                buildingId: deptData.buildingId,
                                nodeID: matchedNode.id,
                                departmentId: dept.id,
                            },
                        });
                    }
                }

            }

            // Fallback if no nodeDescription match
            await prisma.location.create({
                data: {
                    floor: deptData.floor,
                    suite: deptData.suite,
                    departmentId: dept.id,
                    buildingId: deptData.buildingId,
                },
            });
        })
    );

    // Parse and create services
    const servicesList: { name: string; departmentIndex: number }[] = [];

    rawDepartmentData.forEach((dept, index) => {
        let services = dept.description
            ?.split(',')
            .flatMap((s) =>
                s.includes(' and ') &&
                !s.toLowerCase().includes('allergy') &&
                !s.toLowerCase().includes('crohn')
                    ? s.split(' and ')
                    : [s]
            )
            .map((s) => s.trim());

        services?.forEach((name) => {
            if (name && name.length > 1) {
                servicesList.push({ name, departmentIndex: index });
            }
        });
    });

    const createdServices = await Promise.all(
        servicesList.map((s) =>
            prisma.service.create({
                data: { name: s.name },
            })
        )
    );

    const deptServices = servicesList.map((s, i) => ({
        departmentID: departments[s.departmentIndex].id,
        serviceID: createdServices[i].id,
    }));

    await prisma.departmentServices.createMany({
        data: deptServices,
        skipDuplicates: true,
    });

    // Create edges
    const edges = await prisma.edge.createMany({
        data: [
            // chestnut hill
            edgeFromTo("1top entrance outside", "1drop off"),
            edgeFromTo("1drop off", "1lot1"),
            edgeFromTo("1lot1", "1lot2"),
            edgeFromTo("1lot2", "1parking"),
            edgeFromTo("1top entrance outside", "1top entrance"),
            edgeFromTo("1top entrance", "1c"),
            edgeFromTo("1top entrance", "1multi specialty clinic"),
            edgeFromTo("1c", "1multi specialty clinic"),
            edgeFromTo("1c", "1b"),
            edgeFromTo("1b", "1a"),
            edgeFromTo("1a", "1a"),
            edgeFromTo("1a", "1right entrance"),
            edgeFromTo("1a", "1right entrance"),
            edgeFromTo("1right entrance outside", "1right entrance"),
            edgeFromTo("1a", "1d"),
            edgeFromTo("1d", "1e"),
            edgeFromTo("1e", "1radiology"),

            // 20 patriot pl, floor 1
            //  A
            edgeFromTo("1left entrance outside", "1left entrance"),
            edgeFromTo("1left entrance", "1a1"),
            edgeFromTo("1a1", "1a2"),
            edgeFromTo("1a2", "1a3"),
            edgeFromTo("1a3", "1a4"),
            edgeFromTo("1a1", "1a4"),
            edgeFromTo("1a4", "1a5"),
            edgeFromTo("1a5", "1middle stairs"),
            edgeFromTo("1a5", "1a6"),
            edgeFromTo("1a6", "1a11"),
            edgeFromTo("1a11", "1a12"),
            edgeFromTo("1a6", "1a7"),
            edgeFromTo("1a7", "1a8"),
            edgeFromTo("1a8", "1urology/cardiology"),
            edgeFromTo("1a8", "1urology/cardiology2"),
            edgeFromTo("1a8", "1a9"),
            edgeFromTo("1a9", "1a10"),
            edgeFromTo("1a10", "120elevator"),
            edgeFromTo("1a10", "1right stairs"),
            //  A -> B
            edgeFromTo("1a3", "1b2"),
            edgeFromTo("1a12", "1b7"),
            edgeFromTo("1a7", "1b9"),
            edgeFromTo("1a9", "1b12"),
            edgeFromTo("1a10", "1b13"),
            //  B
            edgeFromTo("1b1", "1b2"),
            edgeFromTo("1b2", "1b3"),
            edgeFromTo("1b3", "1b4"),
            edgeFromTo("1b4", "1blood/urgent"),
            edgeFromTo("1b4", "1blood/urgent2"),
            edgeFromTo("1b3", "1b17"),
            edgeFromTo("1b3", "1b17"),
            edgeFromTo("120radiology", "1b17"),
            edgeFromTo("1b1", "120radiology"),
            edgeFromTo("1b2", "1b5"),
            edgeFromTo("1b5", "1b6"),
            edgeFromTo("1b6", "1b7"),
            edgeFromTo("1b6", "1b8"),
            edgeFromTo("1b7", "1b9"),
            edgeFromTo("1b9", "1b10"),
            edgeFromTo("1b10", "1b11"),
            edgeFromTo("1b10", "1b12"),
            edgeFromTo("1b11", "1b16"),
            edgeFromTo("1b13", "1b14"),
            edgeFromTo("1b14", "1b15"),
            edgeFromTo("1b15", "1right entrance"),
            edgeFromTo("1right entrance", "1right entrance outside"),
            //  B -> C
            edgeFromTo("1b17", "1c1"),
            edgeFromTo("1b8", "1c5"),
            edgeFromTo("1b9", "1c7"),
            edgeFromTo("1b16", "1c8"),
            //  C
            edgeFromTo("1c1", "1pharmacy"),
            edgeFromTo("1c1", "1c2"),
            edgeFromTo("1c2", "1c3"),
            edgeFromTo("1c3", "1c4"),
            edgeFromTo("1c4", "1c5"),
            edgeFromTo("1c4", "1c6"),
            edgeFromTo("1c5", "1c7"),
            edgeFromTo("1c6", "1c7"),
            //  C -> D
            edgeFromTo("1c8", "1d10"),
            edgeFromTo("1c6", "1d8"),
            edgeFromTo("1c2", "1d1"),
            //  D
            edgeFromTo("1d1", "1d2"),
            edgeFromTo("1d2", "1d3"),
            edgeFromTo("1d3", "1d4"),
            edgeFromTo("1d4", "1d5"),
            edgeFromTo("1d5", "1d11"),
            edgeFromTo("1d5", "1d6"),
            edgeFromTo("1d6", "1d7"),
            edgeFromTo("1d7", "1d8"),
            edgeFromTo("1d7", "1d9"),
            edgeFromTo("1d8", "1d9"),
            edgeFromTo("1d9", "1d10"),
            //  D -> E
            edgeFromTo("1d4", "1e1"),
            edgeFromTo("1d11", "1e3"),
            //  E
            edgeFromTo("1e1", "1e2"),
            edgeFromTo("1e2", "1e3"),
            edgeFromTo("1e1", "1e4"),
            edgeFromTo("1e4", "1e5"),
            edgeFromTo("1e5", "1e6"),
            edgeFromTo("1e6", "1e7"),
            edgeFromTo("1e7", "120top stairs"),

            // 22 Patriot Pl
            // Floor 3
            edgeFromTo("3left stairs", "3a1"),
            edgeFromTo("3a1", "3a3"),
            edgeFromTo("3a2", "3a3"),
            edgeFromTo("3a3", "3a4"),
            edgeFromTo("3a4", "3multi specialty"),
            edgeFromTo("3a4", "3middle stairs"),
            edgeFromTo("3middle stairs", "322elevator"),
            edgeFromTo("322elevator", "3a5"),
            edgeFromTo("3a5", "3a6"),
            edgeFromTo("3a6", "3a7"),
            edgeFromTo("3a7", "3b1"),
            edgeFromTo("3a1", "3b2"),
            edgeFromTo("3a2", "3b3"),
            edgeFromTo("3a3", "3b4"),
            edgeFromTo("3a4", "3b5"),
            edgeFromTo("3a5", "3right stairs"),
            // Floor 3 -> Floor 4
            edgeFromTo("322elevator", "422elevator"),
            edgeFromTo("3left stairs", "4left stairs"),
            edgeFromTo("3middle stairs", "4middle stairs"),
            // Floor 4
            edgeFromTo("4left stairs", "4middle stairs"),
            edgeFromTo("4middle stairs", "4a1"),
            edgeFromTo("4a1", "4a2"),
            edgeFromTo("4a1", "4phlebotomy"),
            edgeFromTo("4a1", "422elevator"),
            // Elevators
            edgeFromTo("122elevator", "222elevator"),
            edgeFromTo("222elevator", "322elevator"),
            edgeFromTo("322elevator", "422elevator"),
            // Temp Floor 1
            edgeFromTo("1entrance outside", "1entrance"),
            edgeFromTo("1entrance", "122elevator"),
            // Parking Lot/Drop Off
            edgeFromTo("120/122drop off", "120/122parking entrance 1"),
            edgeFromTo("120/122parking entrance 1", "120/122parking entrance 2"),
            edgeFromTo("120/122parking entrance 2", "120/122parking"),
            edgeFromTo("120/122drop off", "1left entrance outside"),
            edgeFromTo("120/122drop off", "1entrance outside"),
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
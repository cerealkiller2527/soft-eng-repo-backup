import { expect, test, describe, vi, beforeEach } from "vitest";
import { serviceRouter } from "../routes/service/serviceRouter.ts";
import { RequestType, Priority, Status, Prisma } from "database";
import PrismaClient from "../bin/prisma-client.ts";

//make fake data(doesn't connect to the database so that we can just test the routers)
vi.mock("../bin/prisma-client.ts", () => ({
  default: {
    serviceRequest: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    equipmentDelivery: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));
const prisma = PrismaClient as any;

//make sure we would have a clean mock data before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe("getEquipmentDeliveryRequests", () => {
  test("filtered equipment requests", async () => {
    // return data only if toWhere matches
    prisma.serviceRequest.findMany.mockImplementation(
      ({ where }: { where: Prisma.ServiceRequestWhereInput }) => {
        if (where.equipmentDelivery?.toWhere === "Room 1") {
          return Promise.resolve("Filter for only Room 1");
        }

        return Promise.resolve([]);
      },
    );

    const caller = serviceRouter.createCaller({ prisma });

    const result = await caller.getEquipmentDeliveryRequests({
      toWhere: "Room 1",
    });

    // make sure the Prisma is called correctly
    expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
      where: {
        type: RequestType.EQUIPMENTDELIVERY,
        equipmentDelivery: {
          toWhere: "Room 1",
        },
      },
      include: {
        equipmentDelivery: true,
        assignedTo: true,
      },
    });

    // should return matching data
    expect(result).toEqual("Filter for only Room 1");
  });

  test("no filters equipment requests", async () => {
    const caller = serviceRouter.createCaller({});
    await caller.getEquipmentDeliveryRequests({});

    expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
      where: {
        type: RequestType.EQUIPMENTDELIVERY,
      },
      include: {
        equipmentDelivery: true,
        assignedTo: true,
      },
    });
  });
});

test("create new equipment data", async () => {
  const serviceRequestMock = { id: 1 };

  prisma.serviceRequest.create.mockResolvedValue(serviceRequestMock);
  prisma.equipmentDelivery.create = vi.fn().mockResolvedValue({});

  const caller = serviceRouter.createCaller({});
  const input = {
    deadline: new Date("2025-08-09T09:22:18Z"),
    equipment: ["MRI", "Gown"],
    toWhere: "Room 1",
    additionalNotes: "",
    priority: Priority.High,
    employee: "Emp1",
  };

  const result = await caller.addEquipmentDeliveryRequest(input);

  expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
    data: {
      type: RequestType.EQUIPMENTDELIVERY,
      dateCreated: expect.any(Date),
      status: Status.NOTASSIGNED,
      description: "",
      fromEmployee: "Emp1",
      priority: Priority.High,
    },
  });

  expect(prisma.equipmentDelivery.create).toHaveBeenCalledWith({
    data: {
      id: 1,
      deadline: new Date("2025-08-09T09:22:18Z"),
      equipments: ["MRI", "Gown"],
      toWhere: "Room 1",
    },
  });

  expect(result).toEqual({
    message: "Create equipment delivery request done.",
  });
});

test("updates equipment request with some fields", async () => {
  prisma.serviceRequest.update.mockResolvedValue({ id: 1 });

  const caller = serviceRouter.createCaller({ prisma }); // pass the mock
  const input = {
    id: 1,
    priority: Priority.Medium,
    equipment: ["MRI", "Gown"],
    toWhere: "Room 1",
  };

  const result = await caller.updateEquipmentDeliveryRequest(input);

  expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: {
      priority: Priority.Medium,
      equipmentDelivery: {
        update: {
          equipments: ["MRI", "Gown"],
          toWhere: "Room 1",
        },
      },
    },
  });

  expect(result).toEqual({
    message: "Update equipment delivery request done.",
  });
});

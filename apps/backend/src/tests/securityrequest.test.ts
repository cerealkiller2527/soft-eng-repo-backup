import { expect, test, describe, vi, beforeEach } from "vitest";
import { serviceRouter } from "../routes/service/serviceRouter.ts";
import { Prisma, RequestType, Priority, Status } from "database";
import PrismaClient from "../bin/prisma-client.ts";

//make fake data(doesn't connect to the database so that we can just test the routers)
vi.mock("../bin/prisma-client.ts", () => ({
  default: {
    serviceRequest: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    security: {
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

describe("getSecurityRequests", () => {
  test("filtered security requests", async () => {
    // return data only if location matches
    prisma.serviceRequest.findMany.mockImplementation(
      ({ where }: { where: Prisma.ServiceRequestWhereInput }) => {
        if (where.security?.location === "Main Gate") {
          return Promise.resolve("Filter for Main Gate");
        }

        return Promise.resolve([]);
      },
    );

    const caller = serviceRouter.createCaller({});
    const result = await caller.getSecurityRequests({
      location: "Main Gate",
    });

    // check that the Prisma query is called correctly
    expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
      where: {
        type: RequestType.SECURITY,
        security: {
          location: "Main Gate",
        },
      },
      include: {
        security: true,
        assignedTo: true,
      },
    });
    // should return matching data
    expect(result).toEqual("Filter for Main Gate");
  });

  test("no filters security requests", async () => {
    const caller = serviceRouter.createCaller({});
    await caller.getSecurityRequests({});

    expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
      where: {
        type: RequestType.SECURITY,
      },
      include: {
        security: true,
        assignedTo: true,
      },
    });
  });
});

test("create new security data", async () => {
  const serviceRequestMock = { id: 1 };

  prisma.serviceRequest.create.mockResolvedValue(serviceRequestMock);
  prisma.security.create = vi.fn().mockResolvedValue({});

  const caller = serviceRouter.createCaller({});
  const input = {
    additionalNotes: "Need extra patrol",
    priority: Priority.High,
    employee: "Emp1",
    location: "Front Door",
  };

  const result = await caller.addSecurityRequest(input);

  expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
    data: {
      type: RequestType.SECURITY,
      dateCreated: expect.any(Date),
      status: Status.NOTASSIGNED,
      description: "Need extra patrol",
      fromEmployee: "Emp1",
      priority: Priority.High,
    },
  });

  expect(prisma.security.create).toHaveBeenCalledWith({
    data: {
      id: 1,
      location: "Front Door",
    },
  });

  expect(result).toEqual({
    message: "Create security request done.",
  });
});

test("updates security request with some fields", async () => {
  prisma.serviceRequest.update.mockResolvedValue({ id: 1 });

  const caller = serviceRouter.createCaller({ prisma }); // pass the mock
  const input = {
    id: 1,
    priority: Priority.Medium,
    location: "Front Gate",
  };

  const result = await caller.updateSecurityRequest(input);

  expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: {
      priority: Priority.Medium,
      security: {
        update: {
          location: "Front Gate",
        },
      },
    },
  });

  expect(result).toEqual({ message: "Update security request done." });
});

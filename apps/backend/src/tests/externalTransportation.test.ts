// import { expect, test, describe, vi, beforeEach } from "vitest";
// import { serviceRouter } from "../routes/serviceRouter.ts";
// import { RequestType, Priority, Status, Prisma } from "database";
// import PrismaClient from "../bin/prisma-client.ts";
//
// //make fake data(doesn't connect to the database so that we can just test the routers)
// vi.mock("../bin/prisma-client.ts", () => ({
//   default: {
//     serviceRequest: {
//       findMany: vi.fn(),
//       create: vi.fn(),
//       update: vi.fn(),
//     },
//     externalTransportation: {
//       findMany: vi.fn(),
//       create: vi.fn(),
//       update: vi.fn(),
//     },
//   },
// }));
// const prisma = PrismaClient as any;
//
// //make sure we would have a clean mock data before each test
// beforeEach(() => {
//   vi.clearAllMocks();
// });
//
// describe("getExternalTransportationRequests", () => {
//   test("filtered transportation requests", async () => {
//     // return data only if patientName matches
//     prisma.serviceRequest.findMany.mockImplementation(
//       ({ where }: { where: Prisma.ServiceRequestWhereInput }) => {
//         if (where.externalTransportation?.patientName === "Patient 1") {
//           return Promise.resolve("Filter for only Patient 1");
//         }
//
//         return Promise.resolve([]);
//       },
//     );
//
//     const caller = serviceRouter.createCaller({ prisma });
//
//     const result = await caller.getExternalTransportationRequests({
//       patientName: "Patient 1",
//     });
//
//     // check that the Prisma query is called correctly
//     expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
//       where: {
//         type: RequestType.EXTERNALTRANSPORTATION,
//         externalTransportation: {
//           patientName: "Patient 1",
//         },
//       },
//       include: {
//         externalTransportation: true,
//         assignedTo: true,
//       },
//     });
//
//     // should return matching data
//     expect(result).toEqual("Filter for only Patient 1");
//   });
//
//   test("no filters transportation requests", async () => {
//     const caller = serviceRouter.createCaller({});
//     await caller.getExternalTransportationRequests({});
//
//     expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
//       where: {
//         type: RequestType.EXTERNALTRANSPORTATION,
//       },
//       include: {
//         externalTransportation: true,
//         assignedTo: true,
//       },
//     });
//   });
// });
//
// test("create new transportation data", async () => {
//   const serviceRequestMock = { id: 1 };
//
//   prisma.serviceRequest.create.mockResolvedValue(serviceRequestMock);
//   prisma.externalTransportation.create = vi.fn().mockResolvedValue({});
//
//   const caller = serviceRouter.createCaller({});
//   const input = {
//     patientName: "Patient 1",
//     pickupTime: new Date("2025-08-09T09:22:18Z"),
//     transportation: "Van",
//     pickupTransport: "Chestnut",
//     dropoffTransport: "20 Place Patriot Place",
//     additionalNotes: "",
//     priority: Priority.High,
//     employee: "Emp1",
//   };
//
//   const result = await caller.addExternalTransportationRequest(input);
//
//   expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
//     data: {
//       type: RequestType.EXTERNALTRANSPORTATION,
//       dateCreated: expect.any(Date),
//       status: Status.NOTASSIGNED,
//       description: "",
//       fromEmployee: "Emp1",
//       priority: Priority.High,
//     },
//   });
//
//   expect(prisma.externalTransportation.create).toHaveBeenCalledWith({
//     data: {
//       id: 1,
//       fromWhere: "Chestnut",
//       toWhere: "20 Place Patriot Place",
//       transportType: "Van",
//       patientName: "Patient 1",
//       pickupTime: new Date("2025-08-09T09:22:18Z"),
//     },
//   });
//
//   expect(result).toEqual({
//     message: "Create ext. transportation request done.",
//   });
// });
//
// test("updates transportation request with some fields", async () => {
//   prisma.serviceRequest.update.mockResolvedValue({ id: 1 });
//
//   const caller = serviceRouter.createCaller({ prisma }); // pass the mock
//   const input = {
//     id: 1,
//     priority: Priority.Medium,
//     pickupTransport: "22 Place Patriot Place",
//     pickupTime: new Date("2025-08-09T09:30:18Z"),
//   };
//
//   const result = await caller.updateExternalTransportationRequest(input);
//
//   expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
//     where: { id: 1 },
//     data: {
//       priority: Priority.Medium,
//       externalTransportation: {
//         update: {
//           fromWhere: "22 Place Patriot Place",
//           pickupTime: new Date("2025-08-09T09:30:18Z"),
//         },
//       },
//     },
//   });
//
//   expect(result).toEqual({
//     message: "Update ext. transportation request done.",
//   });
// });

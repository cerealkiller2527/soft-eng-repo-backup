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
//     language: {
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
// describe("getLanguageRequests", () => {
//   test("filtered language requests", async () => {
//     // return data only if language matches
//     prisma.serviceRequest.findMany.mockImplementation(
//       ({ where }: { where: Prisma.ServiceRequestWhereInput }) => {
//         if (where.language?.language === "Japanese") {
//           return Promise.resolve("Filter for Japanese");
//         }
//
//         return Promise.resolve([]);
//       },
//     );
//
//     const caller = serviceRouter.createCaller({});
//     const result = await caller.getLanguageRequests({
//       language: "Japanese",
//     });
//
//     // check that the Prisma query is called correctly
//     expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
//       where: {
//         type: RequestType.LANGUAGE,
//         language: {
//           language: "Japanese",
//         },
//       },
//       include: {
//         language: true,
//         assignedTo: true,
//       },
//     });
//     // should return matching data
//     expect(result).toEqual("Filter for Japanese");
//   });
//
//   test("no filters language requests", async () => {
//     const caller = serviceRouter.createCaller({});
//     await caller.getLanguageRequests({});
//
//     expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
//       where: {
//         type: RequestType.LANGUAGE,
//       },
//       include: {
//         language: true,
//         assignedTo: true,
//       },
//     });
//   });
// });
//
// test("create new language data", async () => {
//   const serviceRequestMock = { id: 1 };
//
//   prisma.serviceRequest.create.mockResolvedValue(serviceRequestMock);
//   prisma.language.create = vi.fn().mockResolvedValue({});
//
//   const caller = serviceRouter.createCaller({});
//   const input = {
//     language: "Japanese",
//     location: "Room 1",
//     startTime: new Date("2025-08-09T09:22:18Z"),
//     endTime: new Date("2025-08-09T10:22:18Z"),
//     additionalNotes: "",
//     priority: Priority.High,
//     employee: "Emp1",
//   };
//
//   const result = await caller.addLanguageRequest(input);
//
//   expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
//     data: {
//       type: RequestType.LANGUAGE,
//       dateCreated: expect.any(Date),
//       status: Status.NOTASSIGNED,
//       description: "",
//       fromEmployee: "Emp1",
//       priority: Priority.High,
//     },
//   });
//
//   expect(prisma.language.create).toHaveBeenCalledWith({
//     data: {
//       id: 1,
//       language: "Japanese",
//       location: "Room 1",
//       startTime: new Date("2025-08-09T09:22:18Z"),
//       endTime: new Date("2025-08-09T10:22:18Z"),
//     },
//   });
//
//   expect(result).toEqual({
//     message: "Create language request done.",
//   });
// });
//
// test("updates language request with some fields", async () => {
//   prisma.serviceRequest.update.mockResolvedValue({ id: 1 });
//
//   const caller = serviceRouter.createCaller({ prisma }); // pass the mock
//   const input = {
//     id: 1,
//     priority: Priority.Medium,
//     location: "Room 2",
//     startTime: new Date("2025-08-09T09:40:18Z"),
//   };
//
//   const result = await caller.updateLanguageRequest(input);
//
//   expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
//     where: { id: 1 },
//     data: {
//       priority: Priority.Medium,
//       language: {
//         update: {
//           location: "Room 2",
//           startTime: new Date("2025-08-09T09:40:18Z"),
//         },
//       },
//     },
//   });
//
//   expect(result).toEqual({ message: "Update language request done." });
// });

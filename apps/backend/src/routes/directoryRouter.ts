import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';

export const t = initTRPC.create();

// Mock data to use in case of database failure
const mockDepartments = [
    {
        id: 1,
        name: 'Backup Child Care Center',
        description: 'Backup childcare for employees',
        phoneNumber: '(617) 732-9543',
        building: {
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
        },
        Location: {
            floor: 2,
            suite: '210',
        },
        DepartmentServices: [
            {
                service: {
                    name: 'Childcare services, Emergency care, Employee support',
                },
            },
        ],
    },
    {
        id: 2,
        name: 'Center for Pain Medicine',
        description: 'Multidisciplinary pain management',
        phoneNumber: '(617) 732-9060',
        building: {
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
        },
        Location: {
            floor: 3,
            suite: '320',
        },
        DepartmentServices: [
            {
                service: {
                    name: 'Pain management, Chronic pain treatment, Medical therapy, Physical therapy',
                },
            },
        ],
    },
    {
        id: 3,
        name: 'Brigham Dermatology Associates',
        description: 'Medical and surgical dermatology',
        phoneNumber: '(617) 732-9080',
        building: {
            address: '850 Boylston Street, Chestnut Hill, MA 02467',
        },
        Location: {
            floor: 3,
            suite: '317',
        },
        DepartmentServices: [
            {
                service: {
                    name: 'Dermatology, Skin cancer screening, Cosmetic procedures, Laser treatments',
                },
            },
        ],
    },
];

export const directoryRouter = t.router({
    getAllDepartments: t.procedure.query(async () => {
        try {
            console.log('Backend: Getting all departments');

            // Check if Department model exists in Prisma
            const models = Object.keys(PrismaClient);
            console.log('Available Prisma models:', models);

            // Check if we can access the Department model
            if (!PrismaClient.department) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Department model not found in Prisma client',
                    cause: { models },
                });
            }

            // Try a simpler query first to check connection
            const departmentCount = await PrismaClient.department.count();
            console.log(`Database has ${departmentCount} departments`);

            // Now try the full query
            const departments = await PrismaClient.department.findMany({
                include: {
                    Location: true,
                    building: true,
                    DepartmentServices: {
                        include: {
                            service: true,
                        },
                    },
                },
            });

            console.log(`Backend: Successfully retrieved ${departments.length} departments`);
            return departments;
        } catch (error) {
            console.error('Backend ERROR in getAllDepartments:', error);

            // Return detailed error information
            if (error instanceof Error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Database query failed: ${error.message}`,
                    cause: error,
                });
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Unknown database error',
            });
        }
    }),

    checkPrismaModels: t.procedure.query(async () => {
        try {
            // This procedure is just for debugging
            const dmmf = (PrismaClient as any)._dmmf;
            const models = dmmf ? dmmf.modelMap : null;
            const clientModels = Object.keys(PrismaClient).filter(
                (key) =>
                    typeof (PrismaClient as any)[key] === 'object' &&
                    (PrismaClient as any)[key] !== null
            );

            // Try to get tables directly from the database
            const tablesQuery = await PrismaClient.$queryRaw`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            `;

            // Try a sample query on another model to test database connection
            const employeesCount = await PrismaClient.employee.count();
            const serviceRequestsCount = await PrismaClient.serviceRequest.count();

            return {
                clientModels,
                modelsFromDMMF: models ? Object.keys(models) : null,
                tablesInDatabase: tablesQuery,
                counts: {
                    employees: employeesCount,
                    serviceRequests: serviceRequestsCount,
                },
            };
        } catch (error) {
            console.error('Error checking Prisma models:', error);

            if (error instanceof Error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Prisma introspection failed: ${error.message}`,
                    cause: error,
                });
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Unknown error during Prisma introspection',
            });
        }
    }),

    getDepartmentById: t.procedure.input(z.number()).query(async ({ input }) => {
        try {
            console.log(`Backend: Getting department by ID: ${input}`);

            const department = await PrismaClient.department.findUnique({
                where: { id: input },
                include: {
                    Location: true,
                    building: true,
                    DepartmentServices: {
                        include: {
                            service: true,
                        },
                    },
                },
            });

            if (!department) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Department with ID ${input} not found`,
                });
            }

            return department;
        } catch (error) {
            console.error(`Backend ERROR in getDepartmentById(${input}):`, error);

            if (error instanceof TRPCError) {
                throw error;
            }

            if (error instanceof Error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Database query failed: ${error.message}`,
                    cause: error,
                });
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Unknown database error',
            });
        }
    }),

    getDepartmentBySlug: t.procedure.input(z.string()).query(async ({ input }) => {
        try {
            console.log(`Backend: Getting department by slug: ${input}`);

            // Skip empty input
            if (!input) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Empty slug provided',
                });
            }

            // Convert slug to department name pattern
            const slugMap: Record<string, string> = {
                bccc: 'Backup Child Care Center',
                copm: 'Center for Pain Medicine',
                cacc: "Crohn's and Colitis Center",
                ec: 'Endoscopy Center',
                gsea: 'Fish Center',
                occ: 'Osher Clinical Center',
                aci: 'Allergy and Clinical Immunology',
                laboratory: 'Laboratory',
                'multi-speciality': 'Multi-Specialty Clinic',
                pfs: 'Patient Financial Services',
                pharmacy: 'Pharmacy',
                radiology: 'Radiology',
                mri: 'MRI',
                rehab: 'Rehabilitation Services',
                bda: 'Dermatology Associates',
                bogg: 'Obstetrics',
                bpg: 'Physicians Group',
                bps: 'Psychiatric Specialties',
            };

            const namePattern = slugMap[input] || input;
            console.log(`Looking for department matching pattern: "${namePattern}"`);

            const department = await PrismaClient.department.findFirst({
                where: {
                    name: {
                        contains: namePattern,
                        mode: 'insensitive',
                    },
                },
                include: {
                    Location: true,
                    building: true,
                    DepartmentServices: {
                        include: {
                            service: true,
                        },
                    },
                },
            });

            if (!department) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No department found matching slug: ${input}`,
                });
            }

            return department;
        } catch (error) {
            console.error(`Backend ERROR in getDepartmentBySlug(${input}):`, error);

            if (error instanceof TRPCError) {
                throw error;
            }

            if (error instanceof Error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Database query failed: ${error.message}`,
                    cause: error,
                });
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Unknown database error',
            });
        }
    }),
});

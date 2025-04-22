import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc.ts";

const NodeTypeEnum = z.enum(['Entrance', 'Intermediary', 'Staircase', 'Elevator', 'Location', 'Help_Desk']);

const NodeSchema = z.object({
    id: z.number(),
    type: NodeTypeEnum,
    description: z.string(),
    lat: z.number(),
    long: z.number()
}).nullable();

const BuildingSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phoneNumber: z.string()
});

const LocationSchema = z.object({
    id: z.number(),
    floor: z.number(),
    suite: z.string().nullable(),
    buildingId: z.number(),
    building: BuildingSchema,
    nodeID: z.number().nullable(),
    node: NodeSchema
});

const ServiceSchema = z.object({
    service: z.object({
        id: z.number(),
        name: z.string()
    })
});

const DepartmentSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    phoneNumber: z.string(),
    DepartmentServices: z.array(ServiceSchema),
    Location: z.array(LocationSchema)
});

type Department = z.infer<typeof DepartmentSchema>;

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
);

const ErrorMessage: React.FC<{ error?: Error }> = ({ error }) => (
    <div className="text-center py-8">
        <div className="text-red-600 mb-4">
            {error ? 'Failed to load department. Please try again later.' : 'Department not found.'}
        </div>
    </div>
);

const DepartmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const trpc = useTRPC();
    const { data: departmentData, isLoading, error } = useQuery(
        trpc.directories.getDepartmentById.queryOptions({ id: Number(id) })
    );

    const departmentResult = departmentData ? DepartmentSchema.safeParse(departmentData) : { success: false, error: null };
    const department = departmentResult.success ? departmentResult.data : null;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <Navbar />
                <main className="max-w-4xl mx-auto p-4">
                    <LoadingSpinner />
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !departmentResult.success || !department) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <Navbar />
                <main className="max-w-4xl mx-auto p-4">
                    <ErrorMessage error={error} />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto p-4 w-full">
                <h1 className="text-3xl font-light text-[#012D5A] mb-4">{department.name}</h1>
                <hr className="border-[#012D5A]/20 mb-6" />

                <div className="grid gap-6">
                    {department.description && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Description</h2>
                            <p className="text-gray-600">{department.description}</p>
                        </section>
                    )}

                    {department.phoneNumber && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Contact</h2>
                            <a href={`tel:${department.phoneNumber}`} 
                               className="text-[#012D5A] hover:underline">
                                {department.phoneNumber}
                            </a>
                        </section>
                    )}

                    {department.Location.length > 0 && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Locations</h2>
                            <div className="space-y-6">
                                {department.Location.map((location) => (
                                    <div key={location.id} className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-medium text-lg text-[#012D5A] mb-3">
                                            {location.building.name}
                                        </h3>
                                        <dl className="space-y-3">
                                            <div className="flex">
                                                <dt className="w-32 font-medium">Address</dt>
                                                <dd>
                                                    <a href={`https://maps.google.com/?q=${encodeURIComponent(location.building.address)}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="text-[#012D5A] hover:underline">
                                                        {location.building.address}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="flex">
                                                <dt className="w-32 font-medium">Phone</dt>
                                                <dd>
                                                    <a href={`tel:${location.building.phoneNumber}`}
                                                       className="text-[#012D5A] hover:underline">
                                                        {location.building.phoneNumber}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="flex">
                                                <dt className="w-32 font-medium">Floor</dt>
                                                <dd>{location.floor}</dd>
                                            </div>
                                            {location.suite && (
                                                <div className="flex">
                                                    <dt className="w-32 font-medium">Suite</dt>
                                                    <dd>{location.suite}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {department.DepartmentServices.length > 0 && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {department.DepartmentServices.map((service) => (
                                    <div key={service.service.id}
                                         className="p-4 bg-gray-50 rounded-lg hover:bg-[#012D5A]/5 transition-colors">
                                        {service.service.name}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DepartmentPage; 
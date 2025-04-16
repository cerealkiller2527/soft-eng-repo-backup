import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc.ts";

const BuildingSchema = z.object({
    name: z.string(),
    address: z.string(),
    phoneNumber: z.string()
});

const LocationSchema = z.object({
    suite: z.string(),
    floor: z.number(),
    building: BuildingSchema
});

const ServiceSchema = z.object({
    service: z.object({
        name: z.string()
    })
});

const DepartmentSchema = z.object({
    id: z.number(),
    name: z.string(),
    phoneNumber: z.string(),
    description: z.string().optional(),
    DepartmentServices: z.array(ServiceSchema),
    node: z.array(LocationSchema)
});

type Department = z.infer<typeof DepartmentSchema>;

const DepartmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const trpc = useTRPC();
    const { data: departmentData, isLoading, error } = useQuery(
        trpc.directories.getDepartmentById.queryOptions({ id: Number(id) })
    );

    // Validate department data
    const departmentResult = DepartmentSchema.safeParse(departmentData);
    const department = departmentResult.success ? departmentResult.data : null;
    const hasError = !departmentResult.success || error;

    if (isLoading || hasError || !department) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <Navbar />
                <div className="max-w-4xl mx-auto p-4">
                    {isLoading ? (
                        <div className="text-center py-8">Loading department information...</div>
                    ) : (
                        <div className="text-center py-8 text-red-500">
                            {!departmentResult.success ? 
                                "Invalid department data received" : 
                                "Error loading department information"
                            }
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        );
    }

    const services = department.description
        ?.split(/[(),]/)
        .flatMap(s => s.split(" and "))
        .map(s => s.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-white pt-20">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-light text-[#012D5A] mb-4">{department.name}</h1>
                <hr className="border-[#012D5A]/20 mb-6" />

                <div className="grid gap-6">
                    {department.phoneNumber && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Contact</h2>
                            <a href={`tel:${department.phoneNumber}`} 
                               className="text-[#012D5A] hover:underline">
                                {department.phoneNumber}
                            </a>
                        </section>
                    )}

                    {department.node.length > 0 && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Locations</h2>
                            <div className="space-y-6">
                                {department.node.map((location, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
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
                                            <div className="flex">
                                                <dt className="w-32 font-medium">Suite</dt>
                                                <dd>{location.suite}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {services?.length > 0 && (
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map((service, index) => (
                                    <div key={index}
                                         className="p-4 bg-gray-50 rounded-lg hover:bg-[#012D5A]/5 transition-colors">
                                        {service}
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
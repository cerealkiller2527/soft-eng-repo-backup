import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc.ts";

interface Department {
    id: string;
    name: string;
    phoneNumber: string;
    DepartmentServices: Array<{
        service: {
            name: string;
        };
    }>;
    node: Array<{
        suite: string;
        floor: number;
        building: {
            name: string;
            address: string;
            phoneNumber: string;
        };
    }>;
}

const DepartmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const trpc = useTRPC();

    const { data: department, isLoading, error } = useQuery(
        trpc.directories.getDepartmentById.queryOptions({ id: Number(id) })
    );

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-8">Loading department information...</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !department) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-8 text-red-500">
                            Error loading department information
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Group services by removing parentheses and splitting by commas and "and"
    const services = department.description
        ?.split(/[(),]/)
        .flatMap(s => s.split(" and "))
        .map(s => s.trim())
        .filter(s => s.length > 0);

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
            <div className="flex-grow p-4">
                <Navbar />

                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                        {department.name}
                    </h1>
                    <div className="h-px bg-[#012D5A]/20 w-full"></div>
                </div>

                {/* Department Information */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#012D5A] mb-4">
                                    Contact Information
                                </h2>
                                {department.phoneNumber && (
                                    <div className="mb-2">
                                        <span className="font-medium">Phone:</span>{" "}
                                        <a href={`tel:${department.phoneNumber}`} className="text-[#012D5A] hover:underline">
                                            {department.phoneNumber}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Location Information */}
                            {department.node.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-[#012D5A] mb-4">
                                        Location
                                    </h2>
                                    {department.node.map((location, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <div className="font-medium text-lg text-[#012D5A] mb-3">
                                                {location.building.name}
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-baseline">
                                                    <span className="font-medium w-32">Address:</span>
                                                    <a 
                                                        href={`https://maps.google.com/?q=${encodeURIComponent(location.building.address)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#012D5A] hover:underline"
                                                    >
                                                        {location.building.address}
                                                    </a>
                                                </div>
                                                <div className="flex items-baseline">
                                                    <span className="font-medium w-32">Building Phone:</span>
                                                    <a 
                                                        href={`tel:${location.building.phoneNumber}`} 
                                                        className="text-[#012D5A] hover:underline"
                                                    >
                                                        {location.building.phoneNumber}
                                                    </a>
                                                </div>
                                                <div className="flex items-baseline">
                                                    <span className="font-medium w-32">Floor:</span>
                                                    <span>{location.floor}</span>
                                                </div>
                                                <div className="flex items-baseline">
                                                    <span className="font-medium w-32">Suite:</span>
                                                    <span>{location.suite}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Services */}
                    {services && services.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#012D5A] mb-4">
                                Services Offered
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map((service, index) => (
                                    <div 
                                        key={index}
                                        className="p-4 border border-[#012D5A]/20 rounded-lg hover:bg-[#012D5A]/5 transition-colors"
                                    >
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DepartmentPage; 
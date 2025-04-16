import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc.ts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";

interface Department {
    id: string;
    name: string;
    description: string;
    phoneNumber: string;
    DepartmentServices: Array<{
        service: {
            name: string;
        };
    }>;
    node: Array<{
        suite: string;
        floor: string;
    }>;
}

const DirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const trpc = useTRPC();

    // Fetch departments data
    const { data: departments, isLoading, error } = useQuery(
        trpc.directories.getAllDepartments.queryOptions()
    );

    // Button styling
    const buttonClass = "flex items-center justify-center text-center text-[#012D5A] " +
        "p-4 h-32 w-64 text-base leading-tight whitespace-normal border border-[#012D5A] " +
        "break-words transition-all duration-200 hover:bg-[#012D5A]/5 rounded-lg";
    const buttonContainerClass = "flex flex-wrap justify-center gap-4 my-6 w-full";

    // Accordion styling
    const accordionContentClass = "px-2 pt-2 pb-6";
    const accordionTriggerClass = "w-full py-4 text-[#012D5A] text-left text-xl font-normal " +
        "hover:no-underline border-b border-[#012D5A]/20 hover:bg-gray-50 px-0";

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-8">Loading directory information...</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-8 text-red-500">
                            Error loading departments: {error.message}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Filter departments based on search term
    const filteredDepartments = departments?.filter(dept => 
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group departments by their first letter
    const groupedDepartments = departments?.reduce((acc: { [key: string]: Department[] }, dept) => {
        const firstLetter = dept.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(dept);
        return acc;
    }, {});

    // Create accordion items from grouped departments
    const accordionItems = Object.entries(groupedDepartments || {}).map(([letter, depts]) => ({
        id: `section-${letter}`,
        title: letter,
        content: (
            <div className={accordionContentClass}>
                <div className={buttonContainerClass}>
                    {depts.map((dept) => (
                        <Link 
                            key={dept.id} 
                            to={`/department/${dept.id}`} 
                            className={buttonClass}
                        >
                            <div>
                                <div className="font-semibold">{dept.name}</div>
                                {dept.phoneNumber && (
                                    <div className="text-sm mt-1">{dept.phoneNumber}</div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }));

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
            <div className="flex-grow p-4">
                <Navbar />

                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                        Directory
                    </h1>
                    <div className="h-px bg-[#012D5A]/20 w-full"></div>
                </div>

                {/* Search Bar */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search departments by name or services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#012D5A] focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Departments List */}
                <div className="bg-white rounded-lg shadow-sm">
                    {filteredDepartments?.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No departments found matching your search.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredDepartments?.map((dept) => (
                                <Link
                                    key={dept.id}
                                    to={`/department/${dept.id}`}
                                    className="block p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="flex-grow">
                                            <h2 className="text-xl font-semibold text-[#012D5A] mb-2">
                                                {dept.name}
                                            </h2>
                                            {dept.description && (
                                                <p className="text-gray-600 mb-2">
                                                    {dept.description}
                                                </p>
                                            )}
                                        </div>
                                        {dept.phoneNumber && (
                                            <div className="mt-2 md:mt-0 md:ml-4 text-[#012D5A]">
                                                {dept.phoneNumber}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DirectoryPage;
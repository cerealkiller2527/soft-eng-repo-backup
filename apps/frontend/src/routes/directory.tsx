import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc.ts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";

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
    description: z.string().optional(),
    phoneNumber: z.string(),
    DepartmentServices: z.array(ServiceSchema),
    node: z.array(LocationSchema)
});

type Department = z.infer<typeof DepartmentSchema>;

// Medical categories for grouping
const DEPARTMENT_CATEGORIES = {
    'Primary Care': ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'General Practice'],
    'Specialty Care': ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Oncology'],
    'Surgical Services': ['General Surgery', 'Vascular Surgery', 'Plastic Surgery', 'Neurosurgery'],
    'Women\'s Health': ['Obstetrics', 'Gynecology', 'Women\'s Health', 'Breast Health'],
    'Mental Health': ['Psychiatry', 'Psychology', 'Behavioral Health', 'Counseling'],
    'Diagnostic Services': ['Radiology', 'Laboratory', 'Imaging', 'Pathology'],
    'Rehabilitation': ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Rehabilitation'],
    'Emergency & Urgent Care': ['Emergency', 'Urgent Care', 'Trauma', 'Critical Care'],
    'Other Services': [] // For departments that don't match other categories
} as const;

const DirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const trpc = useTRPC();
    const { data: departmentsData, isLoading, error } = useQuery(
        trpc.directories.getAllDepartments.queryOptions()
    );

    // Validate departments data
    const departmentsResult = z.array(DepartmentSchema).safeParse(departmentsData);
    const departments = departmentsResult.success ? departmentsResult.data : null;
    const hasError = !departmentsResult.success || error;

    if (isLoading || hasError) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <Navbar />
                <main className="max-w-4xl mx-auto p-4">
                    <div className="text-center py-8">
                        {isLoading ? (
                            "Loading directory information..."
                        ) : (
                            <span className="text-red-500">
                                {!departmentsResult.success ? 
                                    "Invalid departments data received" : 
                                    "Error loading departments"
                                }
                            </span>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const filteredDepartments = departments?.filter(dept => 
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group departments by category
    const groupedDepartments = Object.entries(DEPARTMENT_CATEGORIES).reduce((acc, [category, keywords]) => {
        const depts = filteredDepartments?.filter(dept => {
            const deptText = `${dept.name} ${dept.description || ''}`.toLowerCase();
            return keywords.some(keyword => deptText.includes(keyword.toLowerCase())) ||
                   (category === 'Other Services' && !Object.entries(DEPARTMENT_CATEGORIES)
                    .filter(([cat]) => cat !== 'Other Services')
                    .some(([_, kw]) => kw.some(k => deptText.includes(k.toLowerCase()))));
        }) || [];
        
        if (depts.length > 0) {
            acc[category] = depts;
        }
        return acc;
    }, {} as Record<keyof typeof DEPARTMENT_CATEGORIES, Department[]>);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto p-4 w-full">
                <h1 className="text-3xl font-light text-[#012D5A] mb-4">Directory</h1>
                <hr className="border-[#012D5A]/20 mb-6" />

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search departments by name or services..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-[#012D5A] focus:border-transparent"
                    />
                    <svg 
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    {Object.keys(groupedDepartments).length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No departments found matching your search.
                        </div>
                    ) : (
                        <Accordion type="single" collapsible className="divide-y divide-gray-200">
                            {(Object.entries(groupedDepartments) as [keyof typeof DEPARTMENT_CATEGORIES, Department[]][]).map(([category, depts]) => (
                                <AccordionItem key={category} value={category}>
                                    <AccordionTrigger className="px-6 py-4 text-[#012D5A] hover:bg-gray-50">
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-xl font-semibold">{category}</span>
                                            <span className="text-sm text-gray-500">
                                                {depts.length} {depts.length === 1 ? 'department' : 'departments'}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="divide-y divide-gray-100">
                                            {depts.map((dept) => (
                                                <Link
                                                    key={dept.id}
                                                    to={`/department/${dept.id}`}
                                                    className="block p-6 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                                                        <div className="flex-grow">
                                                            <h3 className="text-lg font-semibold text-[#012D5A]">
                                                                {dept.name}
                                                            </h3>
                                                            {dept.description && (
                                                                <p className="text-gray-600 mt-1">
                                                                    {dept.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {dept.phoneNumber && (
                                                            <div className="text-[#012D5A] whitespace-nowrap">
                                                                {dept.phoneNumber}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DirectoryPage;
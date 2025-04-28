import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import NewNavbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const NodeTypeEnum = z.enum([
    "Entrance",
    "Intermediary",
    "Staircase",
    "Elevator",
    "Location",
    "Help_Desk",
]);

const NodeSchema = z
    .object({
        id: z.number(),
        type: NodeTypeEnum,
        description: z.string(),
        lat: z.number(),
        long: z.number(),
    })
    .nullable();

const BuildingSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
});

const LocationSchema = z.object({
    id: z.number(),
    floor: z.number(),
    suite: z.string().nullable(),
    buildingId: z.number(),
    building: BuildingSchema,
    nodeID: z.number().nullable(),
    node: NodeSchema,
});

const ServiceSchema = z.object({
    service: z.object({
        id: z.number(),
        name: z.string(),
    }),
});

const DepartmentSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    phoneNumber: z.string(),
    DepartmentServices: z.array(ServiceSchema),
    Location: z.array(LocationSchema),
});

type Department = z.infer<typeof DepartmentSchema>;

const DEPARTMENT_CATEGORIES = {
    "Primary Care": ["Family Medicine", "Internal Medicine", "Pediatrics", "General Practice"],
    "Specialty Care": ["Cardiology", "Dermatology", "Neurology", "Orthopedics", "Oncology"],
    "Surgical Services": ["General Surgery", "Vascular Surgery", "Plastic Surgery", "Neurosurgery"],
    "Women's Health": ["Obstetrics", "Gynecology", "Women's Health", "Breast Health"],
    "Mental Health": ["Psychiatry", "Psychology", "Behavioral Health", "Counseling"],
    "Diagnostic Services": ["Radiology", "Laboratory", "Imaging", "Pathology"],
    Rehabilitation: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Rehabilitation"],
    "Emergency & Urgent Care": ["Emergency", "Urgent Care", "Trauma", "Critical Care"],
    "Other Services": [],
} as const;

const DirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof DEPARTMENT_CATEGORIES | null>(null);
    const [selectedService, setSelectedService] = useState("");
    const trpc = useTRPC();
    const { data: departmentsData, isLoading, error } = useQuery(trpc.directories.getAllDepartments.queryOptions());

    const departmentsResult = departmentsData
        ? z.array(DepartmentSchema).safeParse(departmentsData)
        : { success: false, error: null };

    const departments = departmentsResult.success ? departmentsResult.data : null;

    const isDepartmentInCategory = (dept: Department, category: keyof typeof DEPARTMENT_CATEGORIES): boolean => {
        const deptText = `${dept.name} ${dept.description || ""}`.toLowerCase();
        const keywords = DEPARTMENT_CATEGORIES[category];
        return keywords.some((keyword) => deptText.includes(keyword.toLowerCase()));
    };

    const filteredDepartments = departments?.filter((dept) => {
        const matchesSearch =
            dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dept.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesService =
            selectedService === "" || dept.DepartmentServices.some((s) => s.service.name === selectedService);
        return matchesSearch && matchesService;
    }) || [];

    const groupedDepartments = Object.entries(DEPARTMENT_CATEGORIES).reduce((acc, [category, _]) => {
        const categoryKey = category as keyof typeof DEPARTMENT_CATEGORIES;
        const depts = filteredDepartments.filter((dept) =>
            categoryKey === "Other Services"
                ? !Object.entries(DEPARTMENT_CATEGORIES).some(
                    ([cat, _]) => cat !== "Other Services" && isDepartmentInCategory(dept, cat as keyof typeof DEPARTMENT_CATEGORIES)
                )
                : isDepartmentInCategory(dept, categoryKey)
        );

        if (depts.length > 0) {
            acc[categoryKey] = depts;
        }
        return acc;
    }, {} as Record<keyof typeof DEPARTMENT_CATEGORIES, Department[]>);

    const displayedDepartments = selectedCategory ? groupedDepartments[selectedCategory] || [] : [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F4F8FA] pt-20">
                <NewNavbar />
                <main className="max-w-5xl mx-auto p-6 flex justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-[#012D5A] border-gray-200" />
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !departmentsResult.success) {
        return (
            <div className="min-h-screen bg-[#F4F8FA] pt-20">
                <NewNavbar />
                <main className="max-w-5xl mx-auto p-6 text-center">
                    <p className="text-red-500 font-semibold mb-2">
                        {error ? "Failed to load departments. Please try again later." : "Data validation error."}
                    </p>
                    {departmentsResult.error && (
                        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(departmentsResult.error.errors, null, 2)}
            </pre>
                    )}
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F2F2F2]">
            <NewNavbar />
            <main className="max-w-7xl mx-auto p-6 pt-24">
                <h1 className="text-4xl font-semibold text-[#012D5A] mb-6">Directory</h1>
                <p className="text-lg text-muted-foreground mb-4">Find a specialty, department or service</p>
                <Input
                    type="text"
                    placeholder="Search departments by name or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 bg-[#FFFFFF] hover:border-2 hover:border-[#012D5A]"
                />

                <div className="flex gap-6">
                    <div className="w-1/4 space-y-2">
                        {Object.keys(groupedDepartments).map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "secondary" : "ghost"}
                                onClick={() => setSelectedCategory(category as keyof typeof DEPARTMENT_CATEGORIES)}
                                className={`w-full justify-start ${
                                    selectedCategory === category
                                        ? "border-2 border-[#F6BD38] shadow-md"
                                        : "hover:border-2 hover:border-[#F6BD38]"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}


                    </div>

                    <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">



                        {displayedDepartments.length === 0 ? (
                            <p className="text-muted-foreground col-span-full">Select a category to view departments.</p>
                        ) : (
                            displayedDepartments.map((dept) => (


                                <Link key={dept.id} to={`/department/${dept.id}`}>
                                    <Card className="hover:border-2 hover:border-[#012D5A] transition min-h-[540px]">
                                        <CardContent className="p-4">

                                            {/*change this to image??: <div className="h-32 bg-[#F2F2F2] rounded mb-4" />*/}

                                            <img
                                                src="/Department.png" // <- replace with your actual image path
                                                alt="Department"
                                                className="h-32 w-full object-cover rounded mb-4"
                                            />

                                            <CardTitle className="text-[#012D5A] text-lg mb-2">{dept.name}</CardTitle>
                                            {dept.description && <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>}
                                            <p className="text-sm font-medium text-[#012D5A]">{dept.phoneNumber}</p>


                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DirectoryPage;

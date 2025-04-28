import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc";
import { Search, Filter, Building, Phone, MapPin, ChevronRight } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const NodeTypeEnum = z.enum(["Entrance", "Intermediary", "Staircase", "Elevator", "Location", "Help_Desk"]);

const NodeSchema = z
    .object({
        id: z.number(),
        type: NodeTypeEnum,
        description: z.string(),
        lat: z.number(),
        long: z.number()
    })
    .nullable();

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

const DEPARTMENT_CATEGORIES = {
    "Primary Care": ["Family Medicine", "Internal Medicine", "Pediatrics", "General Practice"],
    "Specialty Care": ["Cardiology", "Dermatology", "Neurology", "Orthopedics", "Oncology"],
    "Surgical Services": ["General Surgery", "Vascular Surgery", "Plastic Surgery", "Neurosurgery"],
    "Women's Health": ["Obstetrics", "Gynecology", "Women's Health", "Breast Health"],
    "Mental Health": ["Psychiatry", "Psychology", "Behavioral Health", "Counseling"],
    "Diagnostic Services": ["Radiology", "Laboratory", "Imaging", "Pathology"],
    Rehabilitation: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Rehabilitation"],
    "Emergency & Urgent Care": ["Emergency", "Urgent Care", "Trauma", "Critical Care"],
    "Other Services": []
} as const;

const DirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
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

    const filteredDepartments =
        departments?.filter((dept) => {
            const matchesSearch =
                searchTerm === "" ||
                dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dept.description?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        }) || [];

    const groupedDepartments = Object.entries(DEPARTMENT_CATEGORIES).reduce(
        (acc, [category, _]) => {
            const categoryKey = category as keyof typeof DEPARTMENT_CATEGORIES;
            const depts = filteredDepartments.filter((dept) =>
                categoryKey === "Other Services"
                    ? !Object.entries(DEPARTMENT_CATEGORIES).some(
                        ([cat]) =>
                            cat !== "Other Services" && isDepartmentInCategory(dept, cat as keyof typeof DEPARTMENT_CATEGORIES)
                    )
                    : isDepartmentInCategory(dept, categoryKey)
            );

            if (depts.length > 0) {
                acc[categoryKey] = depts;
            }
            return acc;
        },
        {} as Record<keyof typeof DEPARTMENT_CATEGORIES, Department[]>
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="max-w-7xl mx-auto p-6 pt-24 flex justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-[#012D5A] border-gray-200" />
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !departmentsResult.success) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="max-w-7xl mx-auto p-6 pt-24 text-center">
                    <p className="text-red-500 font-semibold mb-2">
                        {error ? "Failed to load departments. Please try again later." : "Data validation error."}
                    </p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* top section of the page*/}
            {!selectedDepartment && (
                <div className="bg-slate-50 border-b border-slate-200 h-80">
                    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 pt-24">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-[#012D5A] sm:text-5xl">Where do you want to go?</h1>
                            <p className="mt-4 text-lg text-slate-500">Find a specialty, department or service in a second</p>
                        </div>

                        <div className="mt-10 max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="flex shadow-sm rounded-lg bg-white">
                                    <div className="relative flex-grow">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <Input
                                            type="search"
                                            placeholder="Search departments, services, or locations..."
                                            className="block w-full pl-12 pr-4 py-6 text-lg border-0"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="px-6 py-6 bg-[#012D5A] text-white rounded-r-lg">
                                        Search
                                    </Button>
                                </div>
                            </form>

                            {/*filter tabs maybe??*/}




                        </div>
                    </div>
                </div>

            )}

            {/* moveable search bar if department selected */}
            {selectedDepartment && (

                <div className="sticky top-18 z-10 bg-white px-4 py-4 border-b border-gray-200">
                    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                        <div className="flex shadow-sm rounded-lg bg-white">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="block w-full pl-12 pr-4 py-3"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="px-4 bg-[#012D5A] text-white">
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex gap-8 flex-col md:flex-row">



                    {/* left side of the page - accordion categories */}
                    <div className={`w-full md:w-64 lg:w-72 transition-all duration-300 `} >
                        <h2 className = "text-lg font-semibold text-[#012D5A] mb-4 text-left ">Categories</h2>
                        <Card>
                            <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {Object.entries(groupedDepartments).map(([category, depts]) => (
                                <AccordionItem value={category} key={category}>
                                    <AccordionTrigger className="text-left font-medium">{category}</AccordionTrigger>
                                    <AccordionContent>
                                        {depts.map((dept) => (
                                            <Button
                                                key={dept.id}
                                                variant="ghost"
                                                className="w-full justify-start text-left"
                                                onClick={() => setSelectedDepartment(dept)}
                                            >
                                                {dept.name}
                                            </Button>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                                </CardContent>
                                </Card>
                    </div>

                    {/* right side of the webpage - content or details of department */}

                    <div className="flex-1">
                        {selectedDepartment ? (


                                <div className="flex flex-col gap-8">



                                    {/*heading section*/}
                                    <div className="flex flex-col justify-center items-center bg-slate-50 border-slate-100 rounded-lg h-40 text-center mt-9">
                                        <h1 className="text-4xl font-bold text-[#012D5A]">{selectedDepartment.name}</h1>
                                        {selectedDepartment.description && (
                                            <p className="mt-4 text-lg text-slate-600">{selectedDepartment.description}</p>
                                        )}
                                    </div>

                                    {/* location and contact uses card -- but needed/not */}
                                    <div className="grid gap-8 md:grid-cols-2">
                                        <Card className="h-full">
                                            <CardHeader>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                                    <h3 className="font-semibold text-[#012D5A]">Contact Information</h3>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-sm text-slate-500">{selectedDepartment.phoneNumber}</div>
                                            </CardContent>
                                        </Card>

                                        <Card className="h-full">
                                            <CardHeader>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                                    <h3 className="font-semibold text-[#012D5A]">Location</h3>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-sm text-slate-500">
                                                    {selectedDepartment.Location[0].building.name}
                                                    {selectedDepartment.Location[0].suite && `, Suite ${selectedDepartment.Location[0].suite}`}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* services listed  */}
                                    {selectedDepartment.DepartmentServices.length > 0 && (
                                        <Card>
                                            <CardHeader>
                                                <h4 className="text-lg font-medium text-[#012D5A]">Services</h4>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedDepartment.DepartmentServices.map((s) => (
                                                        <Badge key={s.service.id} variant="secondary">
                                                            {s.service.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* start direction -- not functional yet*/}


                                    <div className="flex justify-between items-center mt-8">
                                        <Button onClick={() => setSelectedDepartment(null)} variant="ghost">
                                            ← Back to Directory
                                        </Button>

                                        <Button variant="outline" className="flex items-center gap-2 bg-[#012D5A] text-white">
                                            <MapPin className="h-4 w-4" />
                                            Start Directions
                                        </Button>
                                    </div>


                                </div>








                            )



                            :

                            (


                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredDepartments.map((dept) => (
                                    <Link key={dept.id} to={`/department/${dept.id}`}>
                                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
                                            <CardContent className="p-0">
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-[#012D5A] text-lg">{dept.name}</h3>
                                                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                                                {dept.description || "Department information"}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                    <div className="flex items-center mt-4 text-sm text-slate-500">
                                                        <Phone className="h-4 w-4 mr-1" />
                                                        <span>{dept.phoneNumber}</span>
                                                    </div>
                                                    {dept.Location && dept.Location.length > 0 && (
                                                        <div className="flex items-center mt-2 text-sm text-slate-500">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            <span>
                                {dept.Location[0].building.name}
                                                                {dept.Location[0].suite && `, Suite ${dept.Location[0].suite}`}
                              </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                                                    {dept.DepartmentServices.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {dept.DepartmentServices.slice(0, 3).map((service) => (
                                                                <Badge key={service.service.id} variant="secondary" className="bg-slate-100 text-slate-700">
                                                                    {service.service.name}
                                                                </Badge>
                                                            ))}
                                                            {dept.DepartmentServices.length > 3 && (
                                                                <Badge variant="outline" className="text-slate-500">
                                                                    +{dept.DepartmentServices.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">No services listed</span>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>


                        )
                        }




                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DirectoryPage;

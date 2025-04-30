import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import { Search, Phone, MapPin, Bot } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTRPC } from "../database/trpc";
import Layout from "../components/Layout";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NodeTypeEnum = z.enum(["Entrance", "Intermediary", "Staircase", "Elevator", "Location", "Help_Desk"]);
const NodeSchema = z.object({
    id: z.number(),
    type: NodeTypeEnum,
    description: z.string(),
    lat: z.number(),
    long: z.number(),
}).nullable();
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

const chatbotMappings: Record<string, string> = {
    "emergency": "Emergency",
    "urgent": "Urgent Care",
    "women": "Women's Health",
    "pediatrics": "Pediatrics",
    "cardiology": "Cardiology",
    "mental": "Mental Health",
    "radiology": "Radiology",
    "therapy": "Rehabilitation",
    "oncology": "Oncology",
};

const DirectoryPage: React.FC = () => {
    const [chatInput, setChatInput] = useState("");
    const [chatOpen, setChatOpen] = useState(false);
    const navigate = useNavigate();
    const trpc = useTRPC();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const { data: departmentsData, isLoading } = useQuery(
        trpc.directories.getAllDepartments.queryOptions()
    );

    const departmentsResult = departmentsData
        ? z.array(DepartmentSchema).safeParse(departmentsData)
        : { success: false, error: null };
    const departments = departmentsResult.success ? departmentsResult.data : null;

    useEffect(() => {
        if (departments && departments.length > 0 && !selectedDepartment) {
            setSelectedDepartment(departments[0]);
        }
    }, [departments, selectedDepartment]);

    const filteredDepartments = departments?.filter((dept) => {
        const matchesSearch =
            searchTerm === "" ||
            dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dept.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    }) || [];

    const groupedDepartments = Object.entries(DEPARTMENT_CATEGORIES).reduce(
        (acc, [category]) => {
            const depts = filteredDepartments.filter((dept) => {
                const deptText = `${dept.name} ${dept.description || ""}`.toLowerCase();
                return category === "Other Services"
                    ? !Object.entries(DEPARTMENT_CATEGORIES).some(
                        ([cat]) =>
                            cat !== "Other Services" &&
                            DEPARTMENT_CATEGORIES[cat as keyof typeof DEPARTMENT_CATEGORIES].some((k) =>
                                deptText.includes(k.toLowerCase())
                            )
                    )
                    : DEPARTMENT_CATEGORIES[category as keyof typeof DEPARTMENT_CATEGORIES].some((k) =>
                        deptText.includes(k.toLowerCase())
                    );
            });
            if (depts.length > 0) {
                acc[category as keyof typeof DEPARTMENT_CATEGORIES] = depts;
            }
            return acc;
        },
        {} as Record<keyof typeof DEPARTMENT_CATEGORIES, Department[]>
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChat = (e: React.FormEvent) => {
        e.preventDefault();
        const lowerInput = chatInput.toLowerCase();
        for (const keyword in chatbotMappings) {
            if (lowerInput.includes(keyword)) {
                const matchName = chatbotMappings[keyword];
                const dept = departments?.find((d) =>
                    d.name.toLowerCase().includes(matchName.toLowerCase())
                );
                if (dept) {
                    setSelectedDepartment(dept);
                    setChatInput("");
                    return;
                }
            }
        }
        alert("Sorry, I couldn't find that department.");
    };

    if (isLoading || !departments) {
        return (
            <div className="min-h-screen bg-white flex flex-col">

                <main className="flex-1 flex justify-center items-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-[#012D5A] border-gray-200" />
                </main>

            </div>
        );
    }

    {
        /*
        const placeholders = [
            "Search departments...",
            "Search services...",
            "Search locations...",
        ];
        const [placeholderIndex, setPlaceholderIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
            }, 2000); // change every 3 seconds
            return () => clearInterval(interval);
        }, []);
*/
    }

    return (
        <Layout>
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">


            {/* chat button pop */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="rounded-full p-4 bg-[#012D5A] hover:bg-[#01356A]"
                >
                    <Bot className="h-6 w-6 text-white" />
                </Button>
            </div>

            {/* chat opens */}
            {chatOpen && (
                <div className="fixed bottom-20 right-6 bg-white shadow-lg border rounded-lg p-4 w-80 z-50">
                    <form onSubmit={handleChat} className="flex flex-col gap-3">
                        <Input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about a department..."
                            className="flex-1"
                        />
                        <Button type="submit" className="bg-[#012D5A] text-white">
                            Ask
                        </Button>
                    </form>
                </div>
            )}

            {/*  show search bar */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 text-center mt-12 rounded-lg ">
                <div className="max-w-6xl mx-auto flex flex-col gap-4">
                    <h1 className=" text-white text-4xl font-bold">
                        What are you looking for?
                    </h1>
                    <p className="text-lg text-slate-500 text-center text-white">Find a specialty, department or service in a second</p>

                    <div className="mt-1 ">
                        <form onSubmit={handleSearch} className="flex-grow">
                            <div className="flex shadow-sm rounded-lg bg-white">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        type="search"
                                        placeholder="Search departments, services, or locations..."
                                        className="block w-full pl-12 pr-4 py-6 text-lg border-0 text-black"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="px-6 py-6 bg-[#012D5A] text-white rounded-r-lg">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-20 px-6 py-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">


                    {/* left section */}
                    <div className="w-full md:w-64 lg:w-72 ">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-lg font-semibold text-[#012D5A]">
                                Healthcare Services
                            </h2>
                            <Card className="max-h-[500px] overflow-y-auto shadow-sm">
                                <CardContent>
                                    <Accordion type="single" collapsible>
                                        {Object.entries(groupedDepartments).map(
                                            ([category, depts]) => (
                                                <AccordionItem value={category} key={category}>
                                                    <AccordionTrigger className="text-left font-medium">
                                                        {category}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {depts.map((dept) => (
                                                            <Button
                                                                key={dept.id}
                                                                variant="ghost"
                                                                className={`w-full justify-start text-left truncate 
        ${selectedDepartment?.id === dept.id
                                                                    ? "bg-[#86A2B6] text-white"
                                                                    : "text-[#004170] hover:bg-[#86A2B6] hover:text-white"}`}
                                                                title={dept.name}
                                                                onClick={() => setSelectedDepartment(dept)}
                                                            >
                                                                {dept.name}
                                                            </Button>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                        )}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* department info */}
                    <div className="flex-1">
                        {selectedDepartment && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <Card className="bg-[#004170FF] text-white p-8 text-center mt-12 rounded-lg ">
                                    <h1 className="text-4xl font-bold">
                                        {selectedDepartment.name}
                                    </h1>
                                    {/*
                                    {selectedDepartment.description && (
                                        <p className="mt-4 text-lg text-slate-600">{selectedDepartment.description}</p>
                                    )}
                                    */}
                                </Card>

                                <div className="grid gap-8 md:grid-cols-2">
                                    <Card>
                                        <CardHeader className="flex items-center gap-2">
                                            <Phone className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-[#004170FF] font-semibold">Contact</h3>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                            <p className="text-slate-500">{selectedDepartment.phoneNumber}</p>

                                            <a
                                                href={`tel:${selectedDepartment.phoneNumber}`}
                                                className="w-fit"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="bg-[#004170FF] text-white hover:bg-chart-4 hover:text-white hover:border hover:border-[#004170FF] self-start"
                                                >
                                                    Call Now
                                                </Button>
                                            </a>
                                        </CardContent>
                                    </Card>


                                    <Card>
                                        <CardHeader className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-[#004170FF] font-semibold">Location</h3>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                            <p className="text-slate-500">
                                                {selectedDepartment.Location[0]?.building.name}
                                                {selectedDepartment.Location[0]?.suite &&
                                                    `, Suite ${selectedDepartment.Location[0].suite}`}
                                            </p>

                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    navigate("/floorplan", {
                                                        state: {
                                                            building: selectedDepartment?.Location[0]?.building.name,
                                                            destination: selectedDepartment?.Location[0]?.suite || "",
                                                        },
                                                    });
                                                }}
                                                className="bg-[#004170FF] text-white hover:bg-chart-4 hover:text-white hover:border hover:border-[#004170FF] self-start"
                                            >
                                                Get Directions
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/*
                                    <Card>
                                        <CardHeader className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-[#012D5A] font-semibold">
                                                Location
                                            </h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-500">
                                                {selectedDepartment.Location[0]?.building.name}
                                                {selectedDepartment.Location[0]?.suite &&
                                                    `, Suite ${selectedDepartment.Location[0].suite}`}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    */}
                                </div>

                                {selectedDepartment.DepartmentServices.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <h4 className="text-lg font-medium text-[#012D5A]">
                                                Services
                                            </h4>
                                        </CardHeader>
                                        <CardContent className="flex flex-wrap gap-2">
                                            {selectedDepartment.DepartmentServices.map(
                                                (service) => (
                                                    <span
                                                        key={service.service.id}
                                                        className="inline-block bg-[#86A2B6FF] text-white text-sm sm:text-base font-medium px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition"
                                                    >
      {service.service.name}
    </span>
                                                )
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                                {/*
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            navigate('/floorplan', {
                                                state: {
                                                    building:
                                                        selectedDepartment?.Location[0]?.building
                                                            .name,
                                                    destination:
                                                        selectedDepartment?.Location[0]?.suite ||
                                                        '',
                                                },
                                            });
                                        }}
                                        className="bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] hover:border hover:border-[#012D5A]"
                                    >
                                        Get Directions
                                    </Button>
                                </div>
                                */}
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>


        </div>
        </Layout>
    );
};

export default DirectoryPage;

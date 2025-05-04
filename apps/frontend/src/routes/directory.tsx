import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import { Search, Phone, MapPin, Bot } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

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
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Load or create a session ID once per user
        let existing = localStorage.getItem("chatSessionId");
        if (!existing) {
            existing = uuidv4();
            localStorage.setItem("chatSessionId", existing);
        }
        setSessionId(existing);
    }, []);

    const navigate = useNavigate();
    const trpc = useTRPC();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; message: string }[]>([]);
    const [pendingLocationRequest, setPendingLocationRequest] = useState(false);



    const chatBoxRef = useRef<HTMLDivElement>(null);
    const askMutation = useMutation(trpc.chat.ask.mutationOptions());
    const [isTyping, setIsTyping] = useState(false);


    const goToDirections = () => {
        const location = selectedDepartment?.Location[0];
        if (!location) return;
        navigate("/floorplan", {
            state: {
                building: location.building.name,
                destination: location.suite ?? "",
            },
        });
    };

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
    useEffect(() => {
        if (pendingLocationRequest && chatInput.toLowerCase().includes("yes")) {
            goToDirections();
            setPendingLocationRequest(false);
            setChatInput("");
        }
    }, [chatInput]);
    useEffect(() => {
        chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

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

    const handleChatInput = async (text: string) => {
        if (!text || !sessionId) return;

        setChatHistory((prev) => [...prev, { role: "user", message: text }]);
        setIsTyping(true);

        try {
            const result = await askMutation.mutateAsync({ message: text, sessionId });

            const parsed = result.raw;
            setChatHistory((prev) => [...prev, { role: "assistant", message: parsed.reply }]);

            if (parsed.action === "selectDepartment" && parsed.params?.name) {
                const match = departments?.find(
                    (d) => d.name.trim().toLowerCase() === parsed.params.name!.trim().toLowerCase()
                );
                if (match) setSelectedDepartment(match);
            }

            if (parsed.action === "awaitDirectionsConfirmation") {
                setPendingLocationRequest(true);
            }

            if (parsed.action === "goToDepartmentDirections") {
                goToDirections();
                setPendingLocationRequest(false);
            }
        } catch (err) {
            console.error("GPT error:", err);
            setChatHistory((prev) => [
                ...prev,
                { role: "assistant", message: "Sorry, I couldn't understand that." },
            ]);
        }

        setIsTyping(false);
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


    {/*the below two is used for the functionality of the voice command -- uses in buitl web speech API*/}
    const startVoiceRecognition = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition){
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        alert("Click OK to start speaking");

        recognition.onresult = (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setChatInput(spokenText);
            handleChatFromVoice(spokenText);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error: ",event.error);
        };



        recognition.start();

    };

    const handleChatFromVoice = (spokenText: string) => {
        handleChatInput(spokenText);
    };



    return (
        <Layout>
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">


            {/* chat button pop */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="rounded-full p-4 bg-[#012D5A] hover:bg-[#01356A]"
                >
                    <Bot className="w-5 h-5 text-white" />
                </Button>

            </div>

            {/* chat opens */}
            {chatOpen && (
                <div className="fixed bottom-24 right-6 w-[320px] h-[420px] bg-white shadow-2xl border border-gray-200 rounded-2xl flex flex-col overflow-hidden z-50 font-sans">

                    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#F8FAFC]">
                        {chatHistory.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-2"
                            >
                                <p className="text-sm text-gray-600 font-medium mb-1">Try asking:</p>
                                {[
                                    "Where is Radiology?",
                                    "Call Pediatrics",
                                    "How do I get to Emergency?",
                                    "Find Women's Health",
                                    "Show me Mental Health services",
                                ].map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setChatInput(q);
                                            handleChatInput(q);
                                        }}
                                        className="text-left bg-white border border-gray-200 hover:bg-[#F0F4F8] text-sm px-4 py-2 rounded-lg shadow-sm transition"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <>
                                {chatHistory.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-start gap-2 ${
                                            msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        {msg.role === "assistant" && (
                                            <img
                                                src="/bot-avatar.png"
                                                alt="Bot"
                                                className="w-8 h-8 rounded-full border border-gray-300"
                                            />
                                        )}
                                        <div
                                            className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] whitespace-pre-wrap shadow-sm ${
                                                msg.role === "user"
                                                    ? "bg-[#004170] text-white rounded-br-none"
                                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                            }`}
                                        >
                                            {msg.message}
                                        </div>
                                        {msg.role === "user" && (
                                            <img
                                                src="/user-avatar.png"
                                                alt="You"
                                                className="w-8 h-8 rounded-full border border-gray-300"
                                            />
                                        )}
                                    </div>
                                ))}
                                <div ref={chatBoxRef} />
                            </>
                        )}
                    </div>



                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleChatInput(chatInput.trim());
                            setChatInput("");
                        }}
                        className="border-t border-gray-200 bg-white px-3 py-2"
                    >
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                                <Input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="pl-4 pr-10 py-2 text-sm rounded-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#004170] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={startVoiceRecognition}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#004170]"
                                >
                                    🎤
                                </button>
                            </div>
                            <Button
                                type="submit"
                                className="px-4 py-2 rounded-full bg-[#004170] text-white text-sm hover:bg-[#003055]"
                            >
                                Ask
                            </Button>
                        </div>
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
                                                    className="bg-primary text-white hover:bg-chart-4 hover:text-white hover:border self-start"
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

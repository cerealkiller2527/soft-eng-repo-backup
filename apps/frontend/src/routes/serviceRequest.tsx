import React, {useEffect} from 'react';
import { useState } from "react";
import Layout from "../components/Layout";
import DashboardButton from "../components/DashboardButton.tsx";
import ServiceCards from "@/components/serviceRequestComponents/ServiceCards.tsx";
import Services from "@/components/serviceRequestComponents/Services.tsx"
import {
    Ambulance,
    ArrowRight,
    BarChart3,
    Languages,
    LineChart,
    PieChart,
    Shield,
    Stethoscope,
    TrendingUp
} from 'lucide-react';
import Statistics from '@/components/serviceRequestComponents/Statistics.tsx';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {useTRPC} from "@/database/trpc.ts";
import {useQuery} from "@tanstack/react-query";
import { Button } from '@/components/ui/button.tsx';
import {Link} from "react-router-dom";


//This page is used to hold all of the buttons and forms for the different service requests
const ServiceRequest = () => {

    //Transport request type
    type TransportRequest = {
        patientName: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };

    type EquipmentRequest = {
        deadline: Date;
        equipment: string[];
        location: string;
        additionalNotes: string;
        priority: string;
        employee: string,
    }

    const trpc = useTRPC();
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({assigned: false}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({assigned: false}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({assigned: false}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({assigned: false}));

    //This whole part is just to locally show the submitted forms on the same page, keeping here for now for consistency
    const [transportRequests, setTransportRequests] = useState<object[]>([]);
    const [transportFormSubmitted, setTransportFormSubmitted] = useState(false);
    const [securityRequests, setSecurityRequests] = useState<object[]>([]);
    const [securityFormSubmitted, setSecurityFormSubmitted] = useState(false);
    const [languageRequests, setLanguageRequests] = useState<object[]>([]);
    const [languageFormSubmitted, setLanguageFormSubmitted] = useState(false);
    const [equipmentRequests, setEquipmentRequests] = useState<object[]>([]);
    const [equipmentFormSubmitted, setEquipmentFormSubmitted] = useState(false);

    useEffect(() => {
        if (securityFormSubmitted) {
            requestsSecurity.refetch();
            setSecurityFormSubmitted(false);
        }
    }, [securityFormSubmitted, requestsSecurity]);

    useEffect(() => {
        if (transportFormSubmitted) {
            requestsTransport.refetch();
            setTransportFormSubmitted(false);
        }
    }, [transportFormSubmitted, requestsTransport]);

    useEffect(() => {
        if (equipmentFormSubmitted) {
            requestsEquipment.refetch();
            setEquipmentFormSubmitted(false);
        }
    }, [equipmentFormSubmitted, requestsEquipment]);

    useEffect(() => {
        if (languageFormSubmitted) {
            requestsLanguage.refetch();
            setLanguageFormSubmitted(false);
        }
    }, [languageFormSubmitted, requestsLanguage]);

    const addTransportRequest = (newRequest: object) => {
        setTransportRequests((prev) => [...prev, newRequest]);
    };
    const addEquipmentRequest = (newRequest: object) => {
        setEquipmentRequests((prev) => [...prev, newRequest]);
    }
    const addLanguageRequest = (newRequest: object) => {
        setLanguageRequests((prev) => [...prev, newRequest]);
    }
    const addSecurityRequest = (newRequest: object) => {
        setSecurityRequests((prev) => [...prev, newRequest]);
    }
    return (
        <Layout>
        <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
            <div className="text-center mb-8 pt-25">
                <h1 className="text-4xl font-bold mb-2 text-primary">Hospital Services</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Request assistance for transport, security, equipment, or language services
                </p>
            </div>
            <div className="relative overflow-hidden rounded-xl mx-20 mb-10 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <div className="absolute bottom-10 right-32">
                        <LineChart className="h-24 w-24" strokeWidth={1} />
                    </div>
                </div>
                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                        <div className="flex items-center mb-4">
                            <BarChart3 className="h-8 w-8 mr-3" />
                            <h2 className="text-3xl font-bold">Service Request Dashboard</h2>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 w-full max-w-xs">
                                <Link to="/requestdashboard" className="block w-full">
                                    <Button className="w-full bg-white hover:bg-accent text-[#1a365d] font-medium">
                                        Open Full Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-20">

            <Services title={"Medical Equipment"} description={"Request specialized medical equipment or repairs"} icon={Stethoscope} formType={"equipment"} onSuccess={() => setEquipmentFormSubmitted(true)} />
            <Services title={"Patient Transport"} description={"Request transportation between hospitals"} icon={Ambulance} formType={"transport"} onSuccess={() => setTransportFormSubmitted(true)} />
                <Services title={"Security Assistance"} description ={"Request security personnel for patient or staff safety"} icon={Shield} formType={"security"} onSuccess={() => setSecurityFormSubmitted(true)} />
                <Services title={"Language Services"} description={"Request interpreter or translation"} icon={Languages} formType={"language"} onSuccess={() => setLanguageFormSubmitted(true)} />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-20">

                <Card className="bg-white shadow text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-[#003153]">Equipment Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsEquipment.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Transport Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-chart-1">{requestsTransport.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Security Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-chart-2">{requestsSecurity.data?.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary">Language Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-chart-3">{requestsLanguage.data?.length}</div>
                    </CardContent>

                </Card>
            </div>
            <div className="mb-8 mx-20">
                <Statistics />
            </div>
            </div>
        </Layout>


    );
};

export default ServiceRequest;
import React from 'react';
import { useState } from "react";
import Layout from "../components/Layout";
import DashboardButton from "../components/DashboardButton.tsx";
import ServiceCards from "@/components/serviceRequestComponents/ServiceCards.tsx";
import Services from "@/components/serviceRequestComponents/Services.tsx"
import {Ambulance, Languages, Shield, Stethoscope} from "lucide-react"
import Statistics from '@/components/serviceRequestComponents/Statistics.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import {useTRPC} from "@/database/trpc.ts";
import {useQuery} from "@tanstack/react-query";


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
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({}));

    //This whole part is just to locally show the submitted forms on the same page, keeping here for now for consistency
    const [transportRequests, setTransportRequests] = useState<object[]>([]);
    const [securityRequests, setSecurityRequests] = useState<object[]>([]);
    const [languageRequests, setLanguageRequests] = useState<object[]>([]);
    const [equipmentRequests, setEquipmentRequests] = useState<object[]>([]);

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
        <div className="flex flex-col min-h-screen bg-[#f2f2f2] ">
            <div className="flex-grow pt-20 pl-20 pr-20 ">
                <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
                <hr />


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-20">
            <Services title={"Medical Equipment"} description={"Request specialized medical equipment or repairs"} icon={Stethoscope} formType={"equipment"} />
            <Services title={"Patient Transport"} description={"Request transportation between hospitals"} icon={Ambulance} formType={"transport"} />
                <Services title={"Security Assistance"} description ={"Request security personnel for patient or staff safety"} icon={Shield} formType={"security"} />
                <Services title={"Language Services"} description={"Request interpreter or translation"} icon={Languages} formType={"language"} />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-20">

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-[#003153]">Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsEquipment.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Transport</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsTransport.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsSecurity.data?.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary">Language</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsLanguage.data?.length}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="mb-8 mx-20">
                <Statistics />
            </div>

            <DashboardButton />
            <ServiceCards />

            <div className={"flex flex-wrap justify-center gap-4 my-6 w-full"}>
                <div className="mt-10">
                </div>
            </div>
            </div>
        </Layout>


    );
};

export default ServiceRequest;
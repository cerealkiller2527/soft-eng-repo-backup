import React from 'react';
import TransportCard from "../components/TransportCard.tsx";
import EquipmentCard from "../components/EquipmentCard.tsx";
import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import DashboardButton from "../components/DashboardButton.tsx";
import SecurityCard from "@/components/SecurityCard.tsx";
import LanguageCard from "@/components/LanguageCard.tsx";


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
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-grow pt-20 pl-20 pr-20">
                <Navbar />
                <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
                <hr />
                <br />
            </div>
            <div className="flex flex-wrap justify-center">
                <DashboardButton />
            </div>
            <div className={"flex flex-wrap justify-center gap-4 my-6 w-full"}>
                <div className="mt-10">
                    <br />
                    <TransportCard onAddRequest={addTransportRequest} />
                </div>

                <div className="mt-10">
                    <br />
                    <SecurityCard onAddRequest={addSecurityRequest} />
                </div>
                <div className="mt-10">
                    <br />
                    <LanguageCard onAddRequest={addLanguageRequest} />
                </div>
                <div className="mt-10">
                    <br />
                    <EquipmentCard onAddRequest={addEquipmentRequest} />
                </div>
            </div>
            <div>
                <Footer />
            </div>
            </div>


    );
};

export default ServiceRequest;
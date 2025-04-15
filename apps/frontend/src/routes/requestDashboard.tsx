import React from "react";
import {useState} from "react";
import Navbar from "../components/Navbar.tsx";
import { useQuery } from '@tanstack/react-query';
import {useTRPC} from "../database/trpc.ts";
import TransportRequestDisplay from "../components/allServiceRequests/TransportRequestDisplay.tsx";
import SecurityRequestDisplay from "../components/allServiceRequests/SecurityRequestDisplay.tsx";
import LanguageRequestDisplay from "../components/allServiceRequests/LanguageRequestDisplay.tsx";
import EquipmentRequestDisplay from "../components/allServiceRequests/EquipmentRequestDisplay.tsx";


const requestDashboard = () => {

    //list of transport request options
    type TransportRequest = {
        employeeName: string;
        patientName: string;
        priority: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };

    // Setup for tRPC
    const trpc = useTRPC();
    const requests = useQuery(trpc.service.getExternalTransportation.queryOptions())
    console.log("Fetched requests:", requests.data);

    return (
        <div className="p-25">
            <Navbar />

            <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
            <div className="mt-8">
                <br />
                <hr />
                <div>
                <h2 className="font-bold">TRANSPORTATION REQUESTS</h2>
                <TransportRequestDisplay />
                </div>
                <br />
                <br />
                <hr />
                <div>
                    <h2 className="font-bold">SECURITY REQUESTS</h2>
                    <SecurityRequestDisplay />
                </div>
                <br />
                <br />
                <hr />
                <div>
                    <h2 className="font-bold">LANGUAGE REQUESTS</h2>
                    <LanguageRequestDisplay />
                </div>
                <br />
                <br />
                <hr />
                <div>
                    <h2 className="font-bold">EQUIPMENT REQUESTS</h2>
                    <EquipmentRequestDisplay />
                </div>
            </div>
        </div>
    );
};


export default requestDashboard;
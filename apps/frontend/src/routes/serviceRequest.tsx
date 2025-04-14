import React from 'react';
import TransportCard from "../components/TransportCard.tsx";
import EquipmentCard from "../components/EquipmentCard.tsx";
import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import DashboardButton from "../components/DashboardButton.tsx";

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
    const [requests, setRequests] = useState<object[]>([]);

    const addRequest = (newRequest: object) => {
        setRequests((prev) => [...prev, newRequest]);
    };
    return (
        <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-grow pt-20 pl-20 pr-20">
            <Navbar />
            <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
            <hr />
            <br />
            <div className="mt-10">
                <DashboardButton />
                <br />
                <TransportCard onAddRequest={addRequest} />
                <br />
                <EquipmentCard onAddRequest={addRequest} />
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Submitted Requests</h2>
                {requests.length === 0 ? (
                    <p>No requests submitted yet.</p>) : (
                    <div className="grid gap-4">
                        {requests.map((req, i) => (
                            <div
                                key={i}
                                className="border p-4 rounded-xl shadow bg-white space-y-1">
                                <p><strong>TRANSPORT REQUEST</strong></p>
                                <p><strong>Patient:</strong> {req.patientName}</p>
                                <p><strong>Pickup Time:</strong> {req.pickupTime.toLocaleString()}</p>
                                <p><strong>Transport Type:</strong> {req.transportType}</p>
                                <p><strong>Pickup:</strong> {req.pickupTransport}</p>
                                <p><strong>Dropoff:</strong> {req.dropoffTransport}</p>
                                <p><strong>Notes:</strong> {req.additionalNotes || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
            <Footer/>
        </div>
    );
};

export default ServiceRequest;

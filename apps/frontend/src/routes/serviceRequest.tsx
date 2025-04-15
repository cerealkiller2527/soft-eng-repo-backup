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
                <div className="mt-10">
                    <DashboardButton />
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
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Submitted Requests</h2>
                    <hr />
                    <br />
                    <div>
                    <h2 className="text-md font-semibold mb-4"> Transportation Requests </h2>
                    {transportRequests.length === 0 ? (
                        <p>No requests submitted yet.</p>) : (
                        <div className="grid gap-4">
                            {transportRequests.map((req, i) => (
                                <div
                                    key={i}
                                    className="border p-4 rounded-xl shadow bg-white space-y-1">
                                    <p><strong>TRANSPORT REQUEST</strong></p>
                                    <p><strong>Employee:</strong> {req.employeeName}</p>
                                    <p><strong>Patient:</strong> {req.patientName}</p>
                                    <p><strong>Priority:</strong> {req.priority}</p>
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
                    <br />
                    <div>
                        <h2 className="text-md font-semibold mb-4"> Equipment Requests </h2>
                        {equipmentRequests.length === 0 ? (
                            <p>No requests submitted yet.</p>) : (
                            <div className="grid gap-4">
                                {equipmentRequests.map((req, i) => (
                                    <div
                                        key={i}
                                        className="border p-4 rounded-xl shadow bg-white space-y-1">
                                        <p><strong>EQUIPMENT REQUEST</strong></p>
                                        <p><strong>Employee:</strong> {req.employeeName}</p>
                                        <p><strong>Priority:</strong> {req.priority}</p>
                                        <p><strong>Deadline:</strong> {req.deadline.toLocaleString()}</p>
                                        <p><strong>Equipment:</strong> {req.equipment.join(", ")}</p>
                                        <p><strong>Location:</strong> {req.location}</p>
                                        <p><strong>Notes:</strong> {req.additionalNotes || "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <br />
                    <div>
                        <h2 className="text-md font-semibold mb-4"> Security Requests </h2>
                        {securityRequests.length === 0 ? (
                            <p>No requests submitted yet.</p>) : (
                            <div className="grid gap-4">
                                {securityRequests.map((req, i) => (
                                    <div
                                        key={i}
                                        className="border p-4 rounded-xl shadow bg-white space-y-1">
                                        <p><strong>SECURITY REQUEST</strong></p>
                                        <p><strong>Employee:</strong> {req.employeeName}</p>
                                        <p><strong>Priority:</strong> {req.priority}</p>
                                        <p><strong>Location:</strong> {req.location}</p>
                                        <p><strong>Notes:</strong> {req.additionalNotes || "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <br />
                    <div>
                        <h2 className="text-md font-semibold mb-4"> Language Requests </h2>
                        {languageRequests.length === 0 ? (
                            <p>No requests submitted yet.</p>) : (
                            <div className="grid gap-4">
                                {languageRequests.map((req, i) => (
                                    <div
                                        key={i}
                                        className="border p-4 rounded-xl shadow bg-white space-y-1">
                                        <p><strong>LANGUAGE REQUEST</strong></p>
                                        <p><strong>Employee:</strong> {req.employeeName}</p>
                                        <p><strong>Priority:</strong> {req.priority}</p>
                                        <p><strong>Language:</strong> {req.language}</p>
                                        <p><strong>Start Time:</strong> {req.startTime.toLocaleString()}</p>
                                        <p><strong>End Time:</strong> {req.endTime.toLocaleString()}</p>
                                        <p><strong>Location:</strong> {req.location}</p>
                                        <p><strong>Notes:</strong> {req.additionalNotes || "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            <div>
                <Footer />
            </div>
            </div>


    );
};

export default ServiceRequest;
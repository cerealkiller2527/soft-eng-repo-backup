import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import TransportCard from "../components/TransportCard.tsx";
import { useState } from "react";
import Navbar from "../components/Navbar.tsx";


const ServiceRequest = () => {
    type TransportRequest = {
        patientName: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };
    const [requests, setRequests] = useState<object[]>([]);
    const [showForm, setShowForm] = useState(false);

    const addRequest = (newRequest: object) => {
        setRequests((prev) => [...prev, newRequest]);
    };
    return (
        <div className="p-20">
            <Navbar />
            <h1 className="font-bold text-xl pb-4">Service Request Page</h1>
            <TransportCard onAddRequest={addRequest} />
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Submitted Requests</h2>
                {requests.length === 0 ? (
                    <p>No requests submitted yet.</p>) : (
                    <div className="grid gap-4">
                        {requests.map((req, i) => (
                            <div
                                key={i}
                                className="border p-4 rounded-xl shadow bg-white space-y-1">
                                <p><strong>Patient:</strong> {req.patientName}</p>
                                <p><strong>Pickup Time:</strong> {req.pickupTime.toString()}</p>
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
    );
};

export default ServiceRequest;

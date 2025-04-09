import React from "react";
import {useState} from "react";
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import TransportCard from "../components/TransportCard.tsx"
import Navbar from "../components/Navbar.tsx";

const requestDashboard = () => {

    type TransportRequest = {
        patientName: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };
    const [requests, setRequests] = useState<TransportRequest[]>([]);

    return (
        <div className="p-25">
            <Navbar />
            <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
            <hr />
            <br />

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


export default requestDashboard;
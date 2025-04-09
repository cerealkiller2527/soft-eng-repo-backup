import React from "react";
import {useState} from "react";
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import TransportCard from "../components/TransportCard.tsx"
import Navbar from "../components/Navbar.tsx";
import { useQuery } from '@tanstack/react-query';
import {useTRPC} from "../database/trpc.ts";

const requestDashboard = () => {

    type TransportRequest = {
        patientName: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };
    const trpc = useTRPC();
    const requests = useQuery(trpc.service.getExternalTransportation.queryOptions())

    return (
        <div className="p-25">
            <Navbar />
            <h1 className="text-3xl font-bold text-[#012D5A] mb-4">Service Requests</h1>
            <hr />
            <br />

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Submitted Requests</h2>
                {requests.data?.length === 0 ? (
                    <p>No requests submitted yet.</p>) : (
                    <div className="grid gap-4">
                        {requests.data?.map(req => (
                            <div
                                className="border p-4 rounded-xl shadow bg-white space-y-1">
                                <p><strong>TRANSPORT REQUEST</strong></p>
                                <p key={req.id}><strong>Patient:</strong> {req.externalTransportation.patientName}</p>
                                <p key={req.id}><strong>Pickup Time:</strong> {req.externalTransportation.pickupTime.toString()}</p>
                                <p key={req.id}><strong>Transport Type:</strong> {req.externalTransportation.transportType}</p>
                                <p key={req.id}><strong>Pickup:</strong> {req.externalTransportation.fromWhere}</p>
                                <p key={req.id}><strong>Dropoff:</strong> {req.externalTransportation.toWhere}</p>
                                <p key={req.id}><strong>Notes:</strong> {req.description || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default requestDashboard;
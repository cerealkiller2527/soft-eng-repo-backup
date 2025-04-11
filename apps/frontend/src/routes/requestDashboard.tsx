import React from "react";
import {useState} from "react";
import Navbar from "../components/Navbar.tsx";
import { useQuery } from '@tanstack/react-query';
import {useTRPC} from "../database/trpc.ts";


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
            <hr />
            <br />

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Submitted Requests</h2>
                {requests.data?.length === 0 ? (
                    <p>No requests submitted yet.</p>) : (
                    <div className="grid gap-4">
                        {requests.data?.map(req => (
                            <div
                                key={req.id}
                                className="border p-4 rounded-xl shadow bg-white space-y-1">
                                <p><strong>TRANSPORT REQUEST</strong></p>
                                <p><strong>Patient:</strong> {req.externalTransportation.patientName}</p>
                                <p><strong>Pickup Time:</strong> {req.externalTransportation.pickupTime.toString()}</p>
                                <p><strong>Transport Type:</strong> {req.externalTransportation.transportType}</p>
                                <p><strong>Pickup:</strong> {req.externalTransportation.fromWhere}</p>
                                <p><strong>Dropoff:</strong> {req.externalTransportation.toWhere}</p>
                                <p><strong>Notes:</strong> {req.description || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default requestDashboard;
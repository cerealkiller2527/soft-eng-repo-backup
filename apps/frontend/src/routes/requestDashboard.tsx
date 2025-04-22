import React from "react";
import {useState} from "react";
import Layout from "../components/Layout";
import { useQuery } from '@tanstack/react-query';
import {useTRPC} from "../database/trpc.ts";
import TransportRequestDisplay from "../components/allServiceRequests/TransportRequestDisplay.tsx";


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

    return (
        <Layout>
        <div className="p-25 bg-[#f2f2f2]">
            <div className="mt-8">
                <br />
                <div>
                <TransportRequestDisplay />
                </div>
            </div>
        </div>
        </Layout>
    );
};


export default requestDashboard;
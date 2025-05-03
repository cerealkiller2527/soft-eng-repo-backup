import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/database/trpc.ts";
import { useQuery } from "@tanstack/react-query";
import MiniChart from "@/components/serviceRequestComponents/chart.tsx";
import NewChart from "@/components/serviceRequestComponents/NewChart.tsx";

export default function MiniDashboard() {
    const trpc = useTRPC();
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({assigned: false}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({assigned: false}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({assigned: false}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({assigned: false}));

    // Combine all fetched requests into one array
    const combinedRequests = [
        ...(requestsTransport.data ?? []).map(req => ({
            id: req.id,
            type: "Patient Transport",
            status: req.status,
            details: req.description ?? "Transport request",
            employee: `${req.fromEmployee.firstName} ${req.fromEmployee.lastName}`,
        })),
        ...(requestsSecurity.data ?? []).map(req => ({
            id: req.id,
            type: "Security Assistance",
            status: req.status,
            details: req.description ?? "Security request",
            employee: `${req.fromEmployee.firstName} ${req.fromEmployee.lastName}`,
        })),
        ...(requestsEquipment.data ?? []).map(req => ({
            id: req.id,
            type: "Medical Equipment",
            status: req.status,
            details: req.description ?? "Equipment request",
            employee: `${req.fromEmployee.firstName} ${req.fromEmployee.lastName}`,
        })),
        ...(requestsLanguage.data ?? []).map(req => ({
            id: req.id,
            type: "Language Services",
            status: req.status,
            details: req.description ?? "Language request",
            employee: `${req.fromEmployee.firstName} ${req.fromEmployee.lastName}`,
        })),
    ];


    const [filterType, setFilterType] = useState<"All" | "Patient Transport" | "Security Assistance" | "Medical Equipment" | "Language Services">("All");

    const filteredRequests = filterType === "All" ? combinedRequests : combinedRequests.filter(req => req.type === filterType);

    const chartColors = ["#004170", "#86A2B6", ];
    const notAssignedCount = filteredRequests.filter(r => r.status === "NOTASSIGNED").length;
    const assignedCount = filteredRequests.filter(r => r.status === "ASSIGNED").length;
    const chartData = [assignedCount, notAssignedCount,];
    const chartLabels = ["Assigned", "Not Assigned"]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <Card className="bg-white shadow md:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#003153]">Request Quick View</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        {['All', 'Patient Transport', 'Security Assistance', 'Medical Equipment', 'Language Services'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type as any)}
                                className={`px-4 py-2 rounded-md border ${filterType === type ? "bg-accent text-primary" : "bg-white text-primary"}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {filteredRequests.map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <h3 className="font-medium text-[#003153]">{request.type}</h3>
                                        <span className="text-xs text-gray-500 ml-2">• {request.employee}</span>
                                    </div>
                                    <p className="text-xs text-gray-700">{request.details}</p>
                                </div>
                                <div>
                                    {request.status === "ASSIGNED" && (
                                        <span className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                                            {request.status}
                    </span>
                                    )}
                                    {request.status === "NOTASSIGNED" && (
                                        <span className="flex items-center text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                                            {request.status}
                    </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="bg-white shadow h-[300px] rounded-xl mb-20">
                    <NewChart transport={requestsTransport} equipment={requestsEquipment} language={requestsLanguage} security={requestsSecurity} />

            </div>
        </div>
    );
}

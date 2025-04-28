import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/database/trpc.ts";
import { useQuery } from "@tanstack/react-query";

export default function MiniDashboard() {
    const trpc = useTRPC();
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({}));

    // Combine all fetched requests into one array
    const combinedRequests = [
        ...(requestsTransport.data ?? []).map(req => ({
            id: req.id,
            type: "Patient Transport",
            status: req.status,
            time: new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: req.description ?? "Transport request",
            createdAt: req.createdAt,
        })),
        ...(requestsSecurity.data ?? []).map(req => ({
            id: req.id,
            type: "Security Assistance",
            status: req.status,
            time: new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: req.description ?? "Security request",
            createdAt: req.createdAt,
        })),
        ...(requestsEquipment.data ?? []).map(req => ({
            id: req.id,
            type: "Medical Equipment",
            status: req.status,
            time: new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: req.description ?? "Equipment request",
            createdAt: req.createdAt,
        })),
        ...(requestsLanguage.data ?? []).map(req => ({
            id: req.id,
            type: "Language Services",
            status: req.status,
            time: new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: req.description ?? "Language request",
            createdAt: req.createdAt,
        })),
    ];

    const sortedRequests = combinedRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const [filterType, setFilterType] = useState<"All" | "Patient Transport" | "Security Assistance" | "Medical Equipment" | "Language Services">("All");

    const filteredRequests = filterType === "All" ? sortedRequests : sortedRequests.filter(req => req.type === filterType);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white shadow md:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#003153]">Recent Activity</CardTitle>
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
                                        <span className="text-xs text-gray-500 ml-2">• {request.time}</span>
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

            <Card className="bg-white shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#003153]">Request Status</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-[calc(100%-60px)]">
                    {/* Future Chart Area */}
                </CardContent>
            </Card>
        </div>
    );
}

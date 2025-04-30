"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { useTRPC } from "@/database/trpc"
import { Badge } from "@/components/ui/badge"
import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {ArrowLeft, TrendingUpIcon} from "lucide-react"
import {Link} from "react-router-dom";

export default function TransportRequestDisplay() {

    type TransportRequest = {
        employeeName: string;
        patientName: string;
        priority: string;
        pickupTime: Date;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
        status: string;
    };

    const trpc = useTRPC();
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({}));

    const combinedData = [
        ...(requestsTransport.data ?? []),
        ...(requestsSecurity.data ?? []),
        ...(requestsEquipment.data ?? []),
        ...(requestsLanguage.data ?? []),
    ];
    console.log("Fetched requests:", requestsTransport.data);

    // Stuff for the filter feature
    const [filter, setFilter] = useState("");

    const filteredData = combinedData.filter((req) => {
        const filterLower = filter.toLowerCase();
        return (
            req.type.toLowerCase().includes(filterLower) ||
            req.fromEmployee.toLowerCase().includes(filterLower) ||
            req.priority.toLowerCase().includes(filterLower) ||
            req.status.toLowerCase().includes(filterLower)
        );
    });

    // Stuff for the expanded information section
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const toggleRow = (id: string) => {
        setExpandedRowId(prev => (prev === id ? null : id));
    };

    return (

        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-primary">Service Request Dashboard</h1>
                <Link to="/serviceRequest">
                    <Button variant="outline" className="border-primary text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Services
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-20">

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-[#003153]">Equipment Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsEquipment.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Transport Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsTransport.data?.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-[#003153]">Security Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsSecurity.data?.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary">Language Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-secondary">{requestsLanguage.data?.length}</div>
                    </CardContent>

                </Card>
            </div>
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="@xl/main:grid-cols-1 grid grid-cols-1 gap-4 px-4 lg:px-6">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Manage and view submitted service requests.</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    Service Request Dashboard
                                </CardTitle>
                                <div className="absolute right-4 top-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3" />
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardFooter className="flex-col items-start gap-4 text-sm w-full">
                                <div className="w-full flex justify-end">
                                    <Input
                                        className="w-40 hover:border-[#F6BD38] border-2 border-[#F6BD38] hover:border-4"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        placeholder="Filter"
                                    />
                                </div>

                                <div className="w-full overflow-auto">
                                    <Table className="min-w-[1000px] border border-gray-200 rounded-xl shadow-sm mt-2">
                                        <TableCaption>A list of Requests</TableCaption>
                                        <TableHeader>
                                            <TableRow className="bg-[#012D5A] hover:bg-[#012D5A]">
                                                <TableHead className="text-white">Request Type</TableHead>
                                                <TableHead className="text-white">Requested By</TableHead>
                                                <TableHead className="text-white">Priority</TableHead>
                                                <TableHead className="text-white">Additional Notes</TableHead>
                                                <TableHead className="text-white">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredData.map((req) => (
                                                <>
                                                    <TableRow
                                                        key={req.id}
                                                        onClick={() => toggleRow(req.id)}
                                                        className="odd:bg-white even:bg-gray-100 cursor-pointer hover:outline-[#012D5A] hover:outline-4 transition"
                                                    >
                                                        <TableCell>{req.type}</TableCell>
                                                        <TableCell>{req.fromEmployee}</TableCell>
                                                        <TableCell>{req.priority}</TableCell>
                                                        <TableCell>{req.description}</TableCell>
                                                        <TableCell>{req.status}</TableCell>
                                                    </TableRow>

                                                    {expandedRowId === req.id && (
                                                        <TableRow className="bg-[#f9f9f9]">
                                                            <TableCell colSpan={5}>
                                                                <div className="p-6 bg-white border border-gray-200 rounded-md shadow-inner text-sm space-y-4">
                                                                    <h3 className="text-lg font-semibold text-[#012D5A]">Request Details</h3>
                                                                    <hr />
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                                                                        <p><span className="font-medium text-black">Employee:</span> {req.fromEmployee}</p>
                                                                        <p><span className="font-medium text-black">Priority:</span> {req.priority}</p>
                                                                        <p><span className="font-medium text-black">Status:</span> {req.status}</p>
                                                                        <p><span className="font-medium text-black">Notes:</span> {req.description}</p>

                                                                        {req.type === "EXTERNALTRANSPORTATION" && req.externalTransportation && (
                                                                            <>
                                                                                <p><span className="font-medium text-black">Transport Type:</span> {req.externalTransportation.transportType}</p>
                                                                                <p><span className="font-medium text-black">From:</span> {req.externalTransportation.fromWhere}</p>
                                                                                <p><span className="font-medium text-black">To:</span> {req.externalTransportation.toWhere}</p>
                                                                                <p><span className="font-medium text-black">Pickup Time:</span> {new Date(req.externalTransportation.pickupTime).toLocaleString()}</p>
                                                                            </>
                                                                        )}

                                                                        {req.type === "SECURITY" && req.security && (
                                                                            <p><span className="font-medium text-black">Location:</span> {req.security.location}</p>
                                                                        )}

                                                                        {req.type === "EQUIPMENTDELIVERY" && req.equipmentDelivery && (
                                                                            <>
                                                                                <p><span className="font-medium text-black">Deadline:</span> {new Date(req.equipmentDelivery.pickupTime).toLocaleString()}</p>
                                                                                <p><span className="font-medium text-black">Equipment:</span> {req.equipmentDelivery.equipments.join(", ")}</p>
                                                                                <p><span className="font-medium text-black">To:</span> {req.equipmentDelivery.toWhere}</p>
                                                                            </>
                                                                        )}

                                                                        {req.type === "LANGUAGE" && req.language && (
                                                                            <>
                                                                                <p><span className="font-medium text-black">Language:</span> {req.language.language}</p>
                                                                                <p><span className="font-medium text-black">Start:</span> {new Date(req.language.startTime).toLocaleString()}</p>
                                                                                <p><span className="font-medium text-black">End:</span> {new Date(req.language.endTime).toLocaleString()}</p>
                                                                                <p><span className="font-medium text-black">Location:</span> {req.language.location}</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import { useQuery } from '@tanstack/react-query';
import {useTRPC} from "@/database/trpc.ts";

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
    const requestsTransport = useQuery(trpc.service.externalTransportationRouter.getExternalTransportationRequests.queryOptions({}));
    const requestsSecurity = useQuery(trpc.service.securityRouter.getSecurityRequests.queryOptions({}));
    const requestsEquipment = useQuery(trpc.service.equipmentDeliveryRouter.getEquipmentDeliveryRequests.queryOptions({}));
    const requestsLanguage = useQuery(trpc.service.languageRouter.getLanguageRequests.queryOptions({}));

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
        <div className="p-6 md:p-10 max-w-full overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
            <div>
                <h1 className="text-3xl font-bold text-[#012D5A] mb-4 flex justify-center">Service Requests</h1>
            <div className="flex justify-end">
            <Input className="w-40 hover:border-[#F6BD38] border-2 border-[#F6BD38] hover:border-4"
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter"/>
            </div>
            </div>
            <br />
        <Table className="min-w-[1000px] border border-gray-200 rounded-xl shadow-sm ">
            <TableCaption>A list of Requests</TableCaption>
            <TableHeader>
                <TableRow className="bg-[#012D5A] hover:bg-[#012D5A]">
                    <TableHead className="text-white"> Request Type</TableHead>
                    <TableHead className="text-white">Employee</TableHead>
                    <TableHead className="text-white">Priority</TableHead>
                    <TableHead className="text-white">Additional Notes</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.map((req) => (
                        <>
                        <TableRow key={req.id} onClick={() => toggleRow(req.id)} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:border-[#F6BD38] hover:border-4 transition">
                            <TableCell>
                            <span>{req.type}
                            </span>
                            </TableCell>
                            <TableCell> {req.fromEmployee} </TableCell>
                            <TableCell> {req.priority} </TableCell>
                            <TableCell> {req.description} </TableCell>
                            <TableCell> {req.status} </TableCell>
                            </TableRow>

                            {expandedRowId === req.id && (
                                <TableRow className="bg-[#f9f9f9]">
                                    <TableCell colSpan={5}>
                                        <div className="p-6 bg-white border border-gray-200 rounded-md shadow-inner text-sm space-y-4">
                                            <h3 className="text-lg font-semibold text-[#012D5A]">Request Details</h3>
                                            <hr/>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                                                <p><span className="font-medium text-black">Employee:</span> {req.fromEmployee}</p>
                                                <p><span className="font-medium text-black">Priority:</span> {req.priority}</p>
                                                <p><span className="font-medium text-black">Status:</span> {req.status}</p>
                                                <p><span className="font-medium text-black">Notes:</span> {req.description}</p>

                                                {/* Transport Details */}
                                                {req.type === "EXTERNALTRANSPORTATION" && req.externalTransportation && (
                                                    <>
                                                        <p><span className="font-medium text-black">Transport Type:</span> {req.externalTransportation.transportType}</p>
                                                        <p><span className="font-medium text-black">From:</span> {req.externalTransportation.fromWhere}</p>
                                                        <p><span className="font-medium text-black">To:</span> {req.externalTransportation.toWhere}</p>
                                                        <p><span className="font-medium text-black">Pickup Time:</span> {new Date(req.externalTransportation.pickupTime).toLocaleString()}</p>
                                                    </>
                                                )}

                                                {/* Security Details */}
                                                {req.type === "SECURITY" && req.security && (
                                                    <>
                                                        <p><span className="font-medium text-black">Location:</span> {req.security.location}</p>
                                                    </>
                                                )}

                                                {/* Equipment Delivery Details */}
                                                {req.type === "EQUIPMENTDELIVERY" && req.equipmentDelivery && (
                                                    <>
                                                        <p><span className="font-medium text-black">Deadline:</span> {new Date(req.equipmentDelivery.pickupTime).toLocaleString()}</p>
                                                        <p><span className="font-medium text-black">Equipment:</span> {req.equipmentDelivery.equipments.join(", ")}</p>
                                                        <p><span className="font-medium text-black">To:</span> {req.equipmentDelivery.toWhere}</p>
                                                    </>
                                                )}

                                                {/* Language Request Details */}
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

    )
}

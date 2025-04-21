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
            <div className="flex justify-end">
            <Input className="w-40 hover:border-[#F6BD38] border-2 border-[#F6BD38] hover:border-4"
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter"/>
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
                        <TableRow className="bg-gray-100">
                        <TableCell colSpan={9}>
                    <div className="p-4 space-y-2 text-sm text-gray-700">
                        {req.type === "EXTERNALTRANSPORTATION" && req.externalTransportation && (
                            <div className="p-4 bg-white rounded-md shadow-md border border-gray-300 space-y-1">
                                <p><strong>Employee:</strong> {req.fromEmployee}</p>
                                <p><strong>Priority:</strong> {req.priority}</p>
                                <p><strong>Status:</strong> {req.status}</p>
                                <p><strong>Transport Type:</strong> {req.externalTransportation.transportType}</p>
                                <p><strong>From:</strong> {req.externalTransportation.fromWhere}</p>
                                <p><strong>To:</strong> {req.externalTransportation.toWhere}</p>
                                <p><strong>Pickup Time:</strong> {new Date(req.externalTransportation.pickupTime).toLocaleString()}</p>
                                <p><strong>Notes:</strong> {req.description}</p>
                            </div>
                        )}
                        {req.type === "SECURITY" && req.security && (
                                    <div>
                                        <p><strong>Employee:</strong> {req.fromEmployee}</p>
                                        <p><strong>Priority:</strong> {req.priority}</p>
                                        <p><strong>Status:</strong> {req.status}</p>
                                        <p><strong>Location:</strong> {req.security.location}</p>
                                        <p><strong>Notes:</strong> {req.description}</p>
                                    </div>
                                )}
                        {req.type === "EQUIPMENTDELIVERY" && req.equipmentDelivery && (
                            <div>
                                <p><strong>Employee:</strong> {req.fromEmployee}</p>
                                <p><strong>Priority:</strong> {req.priority}</p>
                                <p><strong>Status:</strong> {req.status}</p>
                                <p><strong>deadline:</strong> {new Date(req.equipmentDelivery.pickupTime).toLocaleString()}</p>
                                <p><strong>Equipment:</strong> {req.equipmentDelivery.equipments.join(", ")}</p>
                                <p><strong>To Where:</strong> {req.equipmentDelivery.toWhere}</p>
                                <p><strong>Notes:</strong> {req.description}</p>
                            </div>
                        )}

                        {req.type === "LANGUAGE" && req.language && (
                            <div>
                                <p><strong>Employee:</strong> {req.fromEmployee}</p>
                                <p><strong>Priority:</strong> {req.priority}</p>
                                <p><strong>Status:</strong> {req.status}</p>
                                <p><strong>Language:</strong> {req.language.language}</p>
                                <p><strong>Start Time:</strong> {new Date(req.language.startTime).toLocaleString()}</p>
                                <p><strong>End Time:</strong> {new Date(req.language.endTime).toLocaleString()}</p>
                                <p><strong>Language:</strong> {req.language.location}</p>
                                <p><strong>Notes:</strong> {req.description}</p>
                            </div>
                        )}
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

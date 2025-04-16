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
    const requests = useQuery(trpc.service.externalTransportationRouter.getExternalTransportationRequests.queryOptions({}))
    console.log("Fetched requests:", requests.data);


    return (
        <Table>
            <TableCaption>A list of Transportation Requests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Employee</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="">Pickup Time</TableHead>
                    <TableHead>Transport Type</TableHead>
                    <TableHead>Pickup From</TableHead>
                    <TableHead>Drop Off To</TableHead>
                    <TableHead>Additional Notes</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>

                    {requests.data?.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell> {req.fromEmployee} </TableCell>
                        <TableCell> {req.externalTransportation.patientName} </TableCell>
                            <TableCell> {req.priority} </TableCell>
                            <TableCell> {new Date(req.externalTransportation.pickupTime).toLocaleString()} </TableCell>
                            <TableCell> {req.externalTransportation.transportType} </TableCell>
                            <TableCell> {req.externalTransportation.fromWhere} </TableCell>
                            <TableCell> {req.externalTransportation.toWhere} </TableCell>
                            <TableCell> {req.description} </TableCell>
                            <TableCell> {req.status} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
    )
}

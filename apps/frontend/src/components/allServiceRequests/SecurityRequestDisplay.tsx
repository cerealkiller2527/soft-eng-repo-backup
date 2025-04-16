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

export default function SecurityRequestDisplay() {

    type SecurityRequest = {
        employeeName: string,
        priority: string,
        location: string,
        additionalNotes: string,
    };

    const trpc = useTRPC();
    const requests = useQuery(trpc.service.securityRouter.getSecurityRequests.queryOptions())
    console.log("Fetched requests:", requests.data);


    return (
        <Table>
            <TableCaption>A list of Security Requests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Employee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Additional Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.data?.map((req) => (
                    <TableRow key={req.id}>
                        <TableCell> {req.fromEmployee}</TableCell>
                        <TableCell> {req.priority}</TableCell>
                        <TableCell> {req.security.location}</TableCell>
                        <TableCell> {req.description} </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

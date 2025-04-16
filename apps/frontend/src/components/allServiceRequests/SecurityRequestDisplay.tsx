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
        status: string,
    };

    const trpc = useTRPC();
    const requests = useQuery(trpc.service.securityRouter.getSecurityRequests.queryOptions({}))
    console.log("Fetched requests:", requests.data);


    return (
        <div className="p-6 md:p-10 max-w-full overflow-x-auto">
            <Table className="min-w-[1000px] border border-gray-200 rounded-xl shadow-sm">
            <TableCaption>A list of Security Requests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Employee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Additional Notes</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.data?.map((req) => (
                    <TableRow key={req.id}>
                        <TableCell> {req.fromEmployee} </TableCell>
                        <TableCell> {req.priority} </TableCell>
                        <TableCell> {req.security.location} </TableCell>
                        <TableCell> {req.description} </TableCell>
                        <TableCell> {req.status} </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}

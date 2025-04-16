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

export default function EquipmentRequestDisplay() {

    type EquipmentRequest = {
        employeeName: string;
        priority: string;
        deadline: Date;
        equipment: string;
        location: string[];
        additionalNotes: string;
    };

    const trpc = useTRPC();
    const requests = useQuery(trpc.service.equipmentDeliveryRouter.getEquipmentDeliveryRequests.queryOptions());
    console.log("Fetched requests:", requests.data);


    return (
        <Table>
            <TableCaption>A list of Equipment Requests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Employee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="">Deadline</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Additional Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.data?.map((req) => (
                    <TableRow key={req.id}>
                        <TableCell> {req.fromEmployee}</TableCell>
                        <TableCell> {req.priority}</TableCell>
                        <TableCell> {new Date(req.equipmentDelivery.deadline).toLocaleString()}</TableCell>
                        <TableCell> {req.equipmentDelivery.equipments.join(", ")}</TableCell>
                        <TableCell> {req.equipmentDelivery.toWhere}</TableCell>
                        <TableCell> {req.description} </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

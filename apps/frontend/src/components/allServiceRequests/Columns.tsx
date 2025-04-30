"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Define the type for our request data
export type ServiceRequest = {
    type: string
    fromEmployee: string
    priority: string
    description: string
    status: string
    createdAt: Date
    // Type-specific fields
    externalTransportation?: {
        transportType: string
        fromWhere: string
        toWhere: string
        pickupTime: string
    }
    security?: {
        location: string
    }
    equipmentDelivery?: {
        pickupTime: string
        equipments: string[]
        toWhere: string
    }
    language?: {
        language: string
        startTime: string
        endTime: string
        location: string
    }
}

export const columns: ColumnDef<ServiceRequest>[] = [
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white hover:bg-[#012D5A]/80"
                >
                    Request Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const type = row.getValue("type") as string
            return <div className="font-medium">{type}</div>
        },
    },
    {
        accessorKey: "fromEmployee",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white hover:bg-[#012D5A]/80"
                >
                    Employee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white hover:bg-[#012D5A]/80"
                >
                    Priority
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const priority = row.getValue("priority") as string

            return (
                <Badge variant={priority === "High" ? "destructive" : priority === "Medium" ? "default" : "outline"}>
                    {priority}
                </Badge>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white hover:bg-[#012D5A]/80"
                >
                    Additional Notes
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const description = row.getValue("description") as string
            return <div className="truncate max-w-[300px]">{description}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white hover:bg-[#012D5A]/80"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            return (
                <Badge
                    variant={
                        status === "Completed"
                            ? "success"
                            : status === "In Progress"
                                ? "default"
                                : status === "Pending"
                                    ? "secondary"
                                    : "outline"
                    }
                    className={
                        status === "Completed"
                            ? "bg-green-500"
                            : status === "In Progress"
                                ? "bg-blue-500"
                                : status === "Pending"
                                    ? "bg-yellow-500"
                                    : ""
                    }
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const request = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

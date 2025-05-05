import React from "react";
import {useState} from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '../components/Layout';
import { useUser } from "@clerk/clerk-react";
import { useTRPC } from "@/database/trpc";
import { useQuery } from "@tanstack/react-query";
import {Input} from "@/components/ui/input.tsx";
import {TableCaption, TableCell, TableHead, TableHeader, TableRow, TableBody, Table} from "@/components/ui/table.tsx";



function getInitials(firstName?: string | null, lastName?: string | null): string {
    const f = firstName?.[0] ?? '';
    const l = lastName?.[0] ?? '';
    return (f + l).toUpperCase();
}

export default function ProfilePage() {
    const { isLoaded, user } = useUser();

    const trpc = useTRPC();
    const assignedrequestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({assigned: true, username: user?.username ?? undefined}));
    const assignedrequestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({assigned: true, username: user?.username ?? undefined}));
    const assignedrequestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({assigned: true, username: user?.username ?? undefined}));
    const assignedrequestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({assigned: true, username: user?.username ?? undefined}));
    const requestsTransport = useQuery(trpc.service.getExternalTransportationRequests.queryOptions({assigned: false, username: user?.username ?? undefined}));
    const requestsSecurity = useQuery(trpc.service.getSecurityRequests.queryOptions({assigned: false, username: user?.username ?? undefined}));
    const requestsEquipment = useQuery(trpc.service.getEquipmentDeliveryRequests.queryOptions({assigned: false, username: user?.username ?? undefined}));
    const requestsLanguage = useQuery(trpc.service.getLanguageRequests.queryOptions({assigned: false, username: user?.username ?? undefined}));
    const listofEmployees = useQuery(trpc.employee.getEmployee.queryOptions());

    const combinedData = [
        ...(requestsTransport.data ?? []),
        ...(requestsSecurity.data ?? []),
        ...(requestsEquipment.data ?? []),
        ...(requestsLanguage.data ?? []),
    ];
    const assignedCombinedData = [
        ...(assignedrequestsTransport.data ?? []),
        ...(assignedrequestsSecurity.data ?? []),
        ...(assignedrequestsEquipment.data ?? []),
        ...(assignedrequestsLanguage.data ?? []),
    ];
    const [filter, setFilter] = useState("");

    function getEmployeeName(id: number): string {
        const employee = listofEmployees.data?.find(emp => emp.id === id)
        if (!employee) {
            return "Unknown"
        }else{
            return `${employee.firstName} ${employee.lastName}`
        }
    }

    const filteredData = combinedData.filter((req) => {
        const filterLower = filter.toLowerCase();
        const employeeName = getEmployeeName(Number(req.fromEmployeeID));
        return (
            req.type.toLowerCase().includes(filterLower) ||
            employeeName.toLowerCase().includes(filterLower) ||
            req.priority.toLowerCase().includes(filterLower) ||
            req.status.toLowerCase().includes(filterLower)
        );
    });
    const assignedFilteredData = assignedCombinedData.filter((req) => {
        const filterLower = filter.toLowerCase();
        const employeeName = getEmployeeName(Number(req.fromEmployeeID));
        return (
            req.type.toLowerCase().includes(filterLower) ||
            employeeName.toLowerCase().includes(filterLower) ||
            req.priority.toLowerCase().includes(filterLower) ||
            req.status.toLowerCase().includes(filterLower)
        );
    });
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-white flex flex-col">

                <main className="flex-1 flex justify-center items-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-[#012D5A] border-gray-200" />
                </main>

            </div>
        );
    }

    const name = user?.fullName;
    const username = user?.username;
    const role = user?.publicMetadata?.role.toString();
    const dateJoined = user?.createdAt?.toLocaleDateString();
    const email = user?.emailAddresses.map(e => e.emailAddress).join(", ");
    const initials = getInitials(user?.firstName, user?.lastName);

    return <Layout>
        <div className="flex flex-col min-h-screen bg-gray-100 text-foreground">
            <main className="flex-grow">
                <div className="max-w-4xl mx-auto p-6 space-y-8 pt-16">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-semibold">{name}</h1>
                                <p className="text-sm text-secondary">Joined {dateJoined}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Info Card */}
                        <Card className="md:col-span-1 bg-accent min-h-[22rem]">
                            <CardHeader>
                                <CardTitle className="text-primary text-xl font-bold">Profile Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-foreground">
                                <p><span className="font-medium text-primary">Username:</span> {username}</p>
                                <p><span className="font-medium text-primary">Email:</span> {email}</p>
                                <p><span className="font-medium text-primary">Role:</span> {role}</p>
                                <p><span className="font-medium text-primary">Location:</span> Worcester, MA</p>
                                <p><span className="font-medium text-primary">Bio:</span> Developer, cat lover, coffee enthusiast.</p>
                            </CardContent>
                        </Card>

                        {/* Tabs Section */}
                        <div className="md:col-span-2">
                            <Tabs defaultValue="assigned" className="w-full">
                                <TabsList className="border-b bg-accent mb-2">
                                    <TabsTrigger value="assigned" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                        Assigned Requests
                                    </TabsTrigger>
                                    <TabsTrigger value="submitted" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                        Submitted Requests
                                    </TabsTrigger>
                                </TabsList>

                                <Card className="bg-gradient-to-r from-accent to-primary p-4 min-h-[22rem]">
                                    <TabsContent value="submitted">
                                        <div className="@container/main flex flex-1 flex-col gap-2">
                                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                <div className="@xl/main:grid-cols-1 grid grid-cols-1 gap-4 px-4 lg:px-6">
                                                    <Card className="@container/card">

                                                        <CardFooter className="flex-col items-start gap-4 text-sm w-full">

                                                            <div className="w-full overflow-auto">
                                                                <Table className=" border border-gray-200 rounded-xl shadow-sm mt-2">
                                                                    <TableCaption>A list of Requests</TableCaption>
                                                                    <TableHeader>
                                                                        <TableRow className="bg-[#012D5A] hover:bg-[#012D5A]">
                                                                            <TableHead className="text-white">Request Type</TableHead>
                                                                            <TableHead className="text-white">Assigned To</TableHead>
                                                                            <TableHead className="text-white">Priority</TableHead>
                                                                            <TableHead className="text-white">Status</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {filteredData.map((req) => <>
                                                                                <TableRow
                                                                                    key={req.id}
                                                                                    onClick={() => toggleRow(req.id)}
                                                                                    className="odd:bg-white even:bg-gray-100 cursor-pointer hover:outline-[#012D5A] hover:outline-4 transition"
                                                                                >
                                                                                    <TableCell>{req.type}</TableCell>
                                                                                    <TableCell>{getEmployeeName(Number(req.assignedEmployeeID))}</TableCell>                                                        <TableCell>{req.priority}</TableCell>
                                                                                    <TableCell>{req.status}</TableCell>
                                                                                </TableRow>
                                                                            </>
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="assigned">
                                        <div className="@container/main flex flex-1 flex-col gap-2">
                                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                                <div className="@xl/main:grid-cols-1 grid grid-cols-1 gap-4 px-4 lg:px-6">
                                                    <Card className="@container/card">

                                                        <CardFooter className="flex-col items-start gap-4 text-sm w-full">

                                                            <div className="w-full overflow-auto">
                                                                <Table className=" border border-gray-200 rounded-xl shadow-sm mt-2">
                                                                    <TableCaption>A list of Requests</TableCaption>
                                                                    <TableHeader>
                                                                        <TableRow className="bg-[#012D5A] hover:bg-[#012D5A]">
                                                                            <TableHead className="text-white">Request Type</TableHead>
                                                                            <TableHead className="text-white">Assigned To</TableHead>
                                                                            <TableHead className="text-white">Priority</TableHead>
                                                                            <TableHead className="text-white">Status</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {assignedFilteredData.map((req) => <>
                                                                                <TableRow
                                                                                    key={req.id}
                                                                                    onClick={() => toggleRow(req.id)}
                                                                                    className="odd:bg-white even:bg-gray-100 cursor-pointer hover:outline-[#012D5A] hover:outline-4 transition"
                                                                                >
                                                                                    <TableCell>{req.type}</TableCell>
                                                                                    <TableCell>{getEmployeeName(Number(req.assignedEmployeeID))}</TableCell>                                                        <TableCell>{req.priority}</TableCell>
                                                                                    <TableCell>{req.status}</TableCell>
                                                                                </TableRow>
                                                                            </>
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Card>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </Layout>;
}

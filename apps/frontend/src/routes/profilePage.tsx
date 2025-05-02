import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '../components/Layout';
import { useUser } from "@clerk/clerk-react";

function getInitials(firstName?: string | null, lastName?: string | null): string {
    const f = firstName?.[0] ?? '';
    const l = lastName?.[0] ?? '';
    return (f + l).toUpperCase();
}

export default function ProfilePage() {
    const { isLoaded, user } = useUser();


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

    return (
        <Layout>
            <div className="flex flex-col min-h-screen bg-white text-foreground">
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
                                    <TabsList className="border-b border-secondary mb-2">
                                        <TabsTrigger value="assigned" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                            Assigned Requests
                                        </TabsTrigger>
                                        <TabsTrigger value="submitted" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                            Submitted Requests
                                        </TabsTrigger>
                                    </TabsList>

                                    <Card className="bg-gradient-to-r from-accent to-primary p-4 min-h-[22rem]">
                                        <TabsContent value="submitted">
                                            {/*Placeholder*/}
                                        </TabsContent>
                                        <TabsContent value="assigned">
                                            {/*Placeholder*/}
                                        </TabsContent>
                                    </Card>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}

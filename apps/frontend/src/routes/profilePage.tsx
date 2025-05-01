import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '../components/Layout';
import { useUser } from "@clerk/clerk-react";

function getInitials(firstName?: string, lastName?: string): string {
    const f = firstName?.[0]  ?? "";
    const l = lastName?.[0]   ?? "";
    return (f + l).toUpperCase();
}

export default function ProfilePage() {
    const { user } = useUser();
    const name = user.fullName;
    const username = user.username;
    const dateJoined = user.createdAt.toLocaleDateString();
    const email = user.emailAddresses.map(e => e.emailAddress).join(", ");
    const initials = getInitials(user.firstName, user.lastName);

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
                                    <p><span className="font-medium text-primary">Location:</span> Worcester, MA</p>
                                    <p><span className="font-medium text-primary">Bio:</span> Developer, cat lover, coffee enthusiast.</p>
                                </CardContent>
                            </Card>

                            {/* Tabs Section with triggers outside Card */}
                            <div className="md:col-span-2">
                                <Tabs defaultValue="Privileges" className="w-full">
                                    <TabsList className="border-b border-secondary mb-2">
                                        <TabsTrigger value="privileges" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                            Privileges
                                        </TabsTrigger>
                                        <TabsTrigger value="submitted" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                            Submitted Requests
                                        </TabsTrigger>
                                        <TabsTrigger value="assigned" className="data-[state=active]:bg-primary data-[state=active]:text-background hover:cursor-pointer">
                                            Assigned Requests
                                        </TabsTrigger>
                                    </TabsList>

                                    <Card className="bg-accent p-4 min-h-[22rem]">
                                        <TabsContent value="privileges">
                                            {/* Privileges content here */}
                                        </TabsContent>
                                        <TabsContent value="submitted">
                                            {/* Submitted requests content here */}
                                        </TabsContent>
                                        <TabsContent value="assigned">
                                            {/* Assigned requests content here */}
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

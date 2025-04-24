import React from "react";
import { Link } from "react-router-dom";
import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function DashboardButton() {
    return (
        <div className="@container/main mx-20 px-6 lg:px-6">
            <Card className="@container/card hover:shadow-lg transition">
                <CardHeader className="relative">
                    <CardDescription>View and manage all submitted service requests.</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        Request Form Dashboard
                    </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                    <Link
                        to="/requestdashboard"
                        className="w-full bg-[#012D5A] text-white text-center font-medium py-2 px-4 rounded-md
                            hover:text-[#012D5A] hover:bg-white
                            hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                    >
                        Open Dashboard
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

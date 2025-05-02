"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useTRPC} from "@/database/trpc.ts";
import {useQuery} from "@tanstack/react-query";



const chartConfig = {
    notAssigned: {
        label: "Not Assigned",
        color: "var(--chart-1)",
    },
    assigned: {
        label: "Assigned",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


interface ChartProps {
    assigned: number,
    notAssigned: number,
}

export default function BarChartMini({notAssigned, assigned,}: ChartProps) {



    const chartData = [
        { month: "Assigned", status: assigned, mobile: 80 },
        { month: "Not Assigned", status: notAssigned ?? 0, mobile: 200 },

    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Custom Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="status" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="status"
                            layout="vertical"
                            fill="var(--chart-2)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-[white]"
                                fontSize={15}
                            />
                            <LabelList
                                dataKey="status"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={15}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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


const chartConfig = {
    transport: {
        label: "transport",
    },
    security: {
        label: "security",
        color: "(var(--chart-1))",
    },
    equipment: {
        label: "equipment",
        color: "hsl(var(--chart-2))",
    },
    language: {
        label: "language",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

interface ChartProps {
    transport: object,
    security: object,
    language: object,
    equipment: object,
}


export default function NewChart({transport, security, language, equipment }: ChartProps) {




    const chartData = [
        { browser: "Transport", visitors: transport.data?.length ?? 0, fill: "var(--chart-1)" },
        { browser: "Security", visitors: security.data?.length ?? 0, fill: "var(--chart-2)" },
        { browser: "Language", visitors: language.data?.length ?? 0, fill: "var(--chart-3)" },
        { browser: "Equipment", visitors: equipment.data?.length ?? 0, fill: "var(--secondary)" },
    ]

    const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Requests</CardTitle>
                <CardDescription>Amount of open requests</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Requests
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    View more on dashboard page
                </div>

            </CardFooter>
        </Card>
    )
}

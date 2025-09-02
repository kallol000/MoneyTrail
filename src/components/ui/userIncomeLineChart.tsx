"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

import { incomeRow, multiBarChartRow, timeSeriesExpenseRow } from "@/app/utils/lib/types"
import { useState, useEffect, JSX } from "react"
import { months } from "@/app/utils/lib/helpers"
import { UserCategorySelectDropdown } from "./UserCategorySelectDropdown"
import { userCategoriesRecord } from "@/app/utils/lib/types"


export const description = "A multiple line chart"

type userLineChartProps = {data: incomeRow[], month: string, year: number};

const chartConfig = {
    month: {
        label: "Month",
    }
} satisfies ChartConfig

export function UserIncomeLineChart({ data, month, year }: userLineChartProps) {
    
    const [chartData, setChartdata] = useState<multiBarChartRow[]>([]);


    

    useEffect(() => {
        if(data) {
            setChartdata(prev => data);
        }
    }, [data])
    // console.log(chartData)

    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>Income - Over Time</CardTitle>
                <CardDescription>Last 6 months' trend</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                        // key=""
                        dataKey="total_income"
                        type="monotone"
                        stroke={`var(--chart-1)`}
                        strokeWidth={1}
                        dot={false}
                    />
                </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col w-full items-center gap-2 text-sm">
                <div className="grid gap-2">
                    <div className="text-muted-foreground font-semibold flex justify-center items-center gap-2 leading-none">
                    {month} {year} 
                    </div>
                </div>
                </div>
            </CardFooter>
        </Card>
    )
}

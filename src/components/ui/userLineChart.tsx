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

import { multiBarChartRow, timeSeriesExpenseRow } from "@/app/utils/lib/types"
import { useState, useEffect, JSX } from "react"


export const description = "A multiple line chart"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80, tablet: 70 },
//   { month: "February", desktop: 305, mobile: 200, tablet: 170 },
//   { month: "March", desktop: 237, mobile: 120, tablet: 90 },
//   { month: "April", desktop: 73, mobile: 190, tablet: 110 },
//   { month: "May", desktop: 209, mobile: 130, tablet: 702 },
//   { month: "June", desktop: 214, mobile: 140, tablet: 70 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type userLineChartProps = {data: timeSeriesExpenseRow[], month: string, year: number};


export function UserLineChart({ data, month, year }: userLineChartProps) {

    const [chartData, setChartdata] = useState<multiBarChartRow[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if(chartData.length > 0) {
            setSelectedCategories(prev => {
                const currentMonthData = chartData.filter(row => new Date(row.month).getMonth() === 7)
                let dataArray = Object.entries(currentMonthData[0])
                dataArray.shift()
                dataArray = dataArray.sort((a, b) => b[1] as number - (a[1] as number)).slice(0, 6)

                return dataArray.map(item => item[0])
            })
        }
    }, [data, chartData, month, year])
    
    useEffect(() => {
        if(data) {
            setChartdata(prev => data.map(row => ({ month: row.month, ...row.categories })));
        }
    }, [data])

    useEffect(() => {
        if(selectedCategories.length > 0) {
            setLines(prev => selectedCategories.map((category, index) => 
                <Line
                    key={index}
                    dataKey={category}
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={1}
                    dot={false}
                    />
                ))
        }
    }, [chartData, selectedCategories])


    return (
        <Card>
        <CardHeader>
            <CardTitle>Line Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
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
                {/* <Line
                    dataKey="Food"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={1}
                    dot={false}
                />
                <Line
                    dataKey="EMI"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={1}
                    dot={false}
                />
                <Line
                    dataKey="tablet"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={1}
                    dot={false}
                /> */}
                {lines}
            </LineChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
                {/* <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Showing total visitors for the last 6 months
                </div> */}
            </div>
            </div>
        </CardFooter>
        </Card>
    )
}

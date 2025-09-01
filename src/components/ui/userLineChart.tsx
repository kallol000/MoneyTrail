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
import { months } from "@/app/utils/lib/helpers"
import { UserCategorySelectDropdown } from "./UserCategorySelectDropdown"
import { userCategoriesRecord } from "@/app/utils/lib/types"


export const description = "A multiple line chart"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80, tablet: 70 },
//   { month: "February", desktop: 305, mobile: 200, tablet: 170 },
//   { month: "March", desktop: 237, mobile: 120, tablet: 90 },
//   { month: "April", desktop: 73, mobile: 190, tablet: 110 },
//   { month: "May", desktop: 209, mobile: 130, tablet: 702 },
//   { month: "June", desktop: 214, mobile: 140, tablet: 70 },
// ]


type userLineChartProps = {data: timeSeriesExpenseRow[], month: string, year: number, userCategories: userCategoriesRecord[]};

const chartConfig = {
    month: {
        label: "Month",
    }
} satisfies ChartConfig

export function UserLineChart({ data, month, year, userCategories }: userLineChartProps) {
    
    const [chartData, setChartdata] = useState<multiBarChartRow[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if(chartData.length > 0 && month && year) {
            // const monthIndex = months.indexOf(month)
            // console.log(month)
            const currentMonthData = chartData.filter(row => row.month === month)
            console.log(currentMonthData)
            // console.log(currentMonthData, chartData)
            if(currentMonthData.length > 0) {
                let dataArray = Object.entries(currentMonthData[0])
                dataArray.shift()
                dataArray = dataArray.sort((a, b) => b[1] as number - (a[1] as number)).slice(0, 6)
                setSelectedCategories(prev => {
                    return dataArray.map(item => item[0])
                })
            }
        }
    }, [data, chartData, month, year])

    

    useEffect(() => {
        if(data) {
            setChartdata(prev => data.map(row => ({ month: months[new Date(row.month).getMonth() + 1], ...row.categories })));
        }
    }, [data])

    useEffect(() => {
        if(selectedCategories.length > 0) {
            setLines(prev => selectedCategories.map((category, index) => 
                <Line
                    key={index}
                    dataKey={category}
                    type="monotone"
                    stroke={`var(--chart-${index + 1})`}
                    strokeWidth={1}
                    dot={false}
                    />
                ))
        }
    }, [chartData, selectedCategories])

    // console.log(chartData)

    return (
        <Card className="relative">
            <div className="absolute right-6 top-6"> 
                <UserCategorySelectDropdown selectedCategories = {selectedCategories} userCategories={userCategories} handleSelectedCategoryChange={() => console.log("hello")} />
            </div>
            <CardHeader>
                <CardTitle>Expednitures - Over Time</CardTitle>
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
                    {lines}
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

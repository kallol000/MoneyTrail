"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { expenseRow } from "@/app/utils/lib/types"
import { singleBarChartRow } from "@/app/utils/lib/types"
import { useState, useEffect } from "react"
import { months } from "@/app/utils/lib/helpers"


export const description = "A bar chart"


export function ChartBarDefault({data, category}:{data: expenseRow[], category: string}) {
  
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "var(--chart-2)",
      },
    } satisfies ChartConfig
    
    const [chartData, setChartData] = useState<singleBarChartRow[]>([])

    useEffect(() => {
      if(data.length > 0){
        console.log("run")
        setChartData(prev => {
          return data.map(val => {
              const {month, category, total_spent} = val
              const monthName = months[new Date(month).getMonth()]
              return {month: monthName, [category]: total_spent}
          }).filter(item => Object.keys(item)[1] === category)
        })
      }
    }, [data.length])

    // useEffect(() => {
      
    //     setChartData(prev => {month: "Jan", Food: 1000})
      
    // }, [data])

    console.log(chartData)

    return (
        <Card>
        <CardHeader>
            <CardTitle>{`${category} Spends (in rupees)`}</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey={category} fill="var(--color-desktop)" radius={8} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
            {`Showing total ${category} spends for the last 6 months`}
            </div>
        </CardFooter>
        </Card>
    )
}
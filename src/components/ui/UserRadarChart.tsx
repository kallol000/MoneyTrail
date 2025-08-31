"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { useState, useEffect, use } from "react"

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
import { expenseRow, userCategoriesRecord } from "@/app/utils/lib/types"
import { months } from "@/app/utils/lib/helpers"
import { UserCategorySelectDropdown } from "./UserCategorySelectDropdown"

export const description = "A radar chart with dots"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type radarChartProps = {data: expenseRow[], month: string, year: number, userCategories: userCategoriesRecord[]};

export function UserRadarChart({data, month, year, userCategories}: radarChartProps) {
    
    const [chartData, setChartData] = useState<expenseRow[]>([]) 
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    
    const handleSelectedCategoryChange = (checked: boolean, name: string) => {
        if (checked === true) {
            setSelectedCategories(prev => [...prev, name]);
            setChartData(prev => {
                const newData = data.filter(item => item.category_name === name);
                return [...prev, ...newData];
            })

        }else {
            setSelectedCategories(prev => prev.filter(category => category !== name));
            setChartData(prev => prev.filter(item => item.category_name !== name));
        }
    }

    useEffect(() => {
        if(data) {
            const top6Data = data.sort((a, b) => b.total_spent - a.total_spent).slice(0, 6);
            setSelectedCategories(top6Data.map(item => item.category_name));
            setChartData(top6Data);
        }
    }, [data]);

    



    return (
    <Card className="relative">
        <div className="absolute right-6 top-6"> 
            <UserCategorySelectDropdown selectedCategories = {selectedCategories} userCategories = {userCategories} handleSelectedCategoryChange={handleSelectedCategoryChange} />
        </div>
        <CardHeader className="items-center">
            <CardTitle>Expenditure Ditribution</CardTitle>
            <CardDescription>
            Top 6 expenditure categories
            </CardDescription>
        </CardHeader>
        <CardContent className="pb-0 ">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-w-[500px] max-h-[250px]"
            >
            <RadarChart data={chartData}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis dataKey="category_name" />
                <PolarGrid />
                <Radar
                dataKey="total_spent"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
                dot={{
                    r: 4,
                    fillOpacity: 1,
                }}
                />
            </RadarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
            {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
            {month} {year} 
            </div>
        </CardFooter>
    </Card>
  )
}

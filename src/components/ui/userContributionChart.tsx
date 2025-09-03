import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { expenseRecord } from "@/app/utils/lib/types"
import { JSX, useState, useEffect } from "react"
import { Tooltip, TooltipContent } from "./tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"


const rupeesymbol = "\u20B9";

type contributionChartProps = {data: expenseRecord[]}

export  default function UserContributionChart({ data }: contributionChartProps) {
  
  console.log(data)

  const [dailyBoxes, setDailyBoxes] = useState<JSX.Element[]>([])


  useEffect(() => {
    if(data) {
      setDailyBoxes(prev => data.map((day, index) => 
          <div key={index}>
            <Tooltip >
            <TooltipTrigger>
              <div className = "w-5 h-5 bg-secondary"></div>
            </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col items-center">
                  {Object.keys(day).map((category, index) => {
                    if(typeof day[category] === "number" && day[category] > 0) {
                      return <div key={index} className="flex justify-start">
                        {category}: {day[category]}
                      </div>
                    }
                    })}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        ))
    }
  }, [data])
  
  return (
    <Card className={`w-full h-full`}>
      <CardHeader>
        <CardTitle>Contribution Chart</CardTitle>
      </CardHeader>
      {/* <CardContent className={variant === "identity" ? "text-4xl font-bold": "text-xl font-semibold"}> */}
      <CardContent className="text-4xl font-bold">
          <div className="grid grid-cols-42 gap-2">
            {dailyBoxes}
          </div>
      </CardContent>
    </Card>
  )
}

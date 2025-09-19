import { Card, CardContent, CardHeader,CardTitle } from "@/components/ui/card"
import { expenseRecord } from "@/app/utils/lib/types"
import { JSX, useState, useEffect } from "react"
import { Tooltip, TooltipContent } from "./tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { range } from "@/app/utils/lib/types"
import { months } from "@/app/utils/lib/helpers"
import { ChartTooltip } from "./chart"

type contributionChartProps = {data: expenseRecord[], month: string}

export  default function UserContributionChart({ data, month }: contributionChartProps) {
  
  const [dailyBoxes, setDailyBoxes] = useState<JSX.Element[]>([])
  const [range, setRange] = useState<range>({lowerLim:0, higherLim:0})
  const [chartData, setChartData] = useState<expenseRecord[][]>([])


  useEffect(() => {
    if(data){
      let tempMonths:String[] = []
      const ind = months.findIndex(key => key === month)
      if(ind < 6) {
        tempMonths = [...months.slice(12- (6 - ind - 1), 12 + 1) , ...months.slice(1, ind+1)]
      }else {
        tempMonths = months.slice(ind+1-6, ind+1)
      }
      console.log(tempMonths)


      setChartData(tempMonths.map(month => {
        const monthDetails = data.filter(row => months[new Date(row.date).getMonth()+1] === month )
        return [...monthDetails]
      }))
    }
  }, [data])

  console.log(chartData)


  useEffect(() => {
    if(data) {
      let tempLowerLim = 0
      let tempHigherLim = 0
      for(let i = 0; i < data.length; i++) {
        tempLowerLim = Math.min(tempLowerLim, data[i].total)
        tempHigherLim = Math.max(tempHigherLim, data[i].total)
      }

      setRange(prev => ({lowerLim: tempLowerLim, higherLim: tempHigherLim}))
    }
  }, [data])



  useEffect(() => {
    if(chartData) {
      setDailyBoxes(
      chartData.map((month, idx) => <div key={idx} className="grid grid-cols-7 gap-2">
        <div className="col-span-7 m-auto  text-sm">{months[new Date(month[0]?.date).getMonth() + 1]}</div>
        {month.map((day, index) => 
        {
          const opacity = (day["total"] - range.lowerLim) <= 0 ? 0.001 : (range.higherLim - day["total"]) === 0 ? 1 : (day["total"] - range.lowerLim)/(range.higherLim - day["total"])
          return  <Tooltip key={index}>
              <TooltipTrigger>
                <div className = "min-w-4 max-w-6 min-h-4 max-h-6 aspect-square relative bg-black/10 rounded-md overflow-hidden cursor-pointer">
                  <div  style = {{opacity}} className="absolute inset-0 bg-identity cursor-pointer"></div>
                </div>
              </TooltipTrigger>
                <TooltipContent className="m-0 min-w-[6rem] min-h-[3rem] bg-secondary text-primary shadow-xl">
                  <div className={"flex flex-col items-start"}>
                    <div className="mb-2 font-semibold m-auto">{`${months[new Date(day["date"]).getMonth() + 1]} ${new Date(day["date"]).getDate()}`}</div>
                    <div>{day["total"] === 0 ? "No expenditure logged for this date" : null}</div>
                    {Object.keys(day).map((category, index) => {
                      if(typeof day[category] === "number" && day[category] > 0 && category !== "total")  {
                        return <div key={index} className="flex justify-start">
                          {category} : {day[category]}
                        </div>
                      }
                      })}
                  </div>
                </TooltipContent>
              </Tooltip>
          }
        )}
      </div>)
      )
    }
  }, [chartData, range])

  
  
  return (
    <Card className={`w-full h-full`}>
      <CardHeader>
        <CardTitle>Expenditure Distribution</CardTitle>
      </CardHeader>
      {/* <CardContent className={variant === "identity" ? "text-4xl font-bold": "text-xl font-semibold"}> */}
      <CardContent className="relative text-4xl font-semibold">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-2 p-0">
            {dailyBoxes}
          </div>
      </CardContent>

    </Card>
  )
}

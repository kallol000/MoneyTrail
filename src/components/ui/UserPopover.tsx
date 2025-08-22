import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { insertExpenseRecord } from "@/app/utils/lib/types"
import { useState, useEffect, ReactNode, ChangeEvent } from "react"


export function UserPopover({date, category, handleExpenseDataChange} : {date:string, category:string, handleExpenseDataChange: (date:string, category: string, amount: number) => void}) {

  const [expenseFormdata, setExpenseFormdata] = useState<insertExpenseRecord>({0: {date:date, category: category, amount: 0}})
  const [expenseElems, setExpenseElems] = useState<ReactNode[]>([])

  const addEmptyExpense = () => {
    setExpenseFormdata(prev => ({...prev, [Object.keys(prev).length]: {date:date, category: category, amount: 0}}))
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target
    console.log(id, value, expenseFormdata)

    setExpenseFormdata(prev => ({
      ...prev, [id]: {...prev, amount: value}
    }))
  }


  const handleSubmit = () => {
    console.log(expenseFormdata)
  }

  useEffect(() => {
    setExpenseElems(prev => Object.keys(expenseFormdata).map((expSerial, index) => 
      <div key={index} className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="width">{`Expense ${index + 1}`}</Label>
        <Input
          type="number"
          id = {index}
          name = {category}
          value={expenseFormdata[index]?.amount}
          onChange={handleChange}
          // defaultValue="100%"
          className="col-span-2 h-8"
        />
      </div>))
  }, [expenseFormdata])

  return (
    <Popover>
      <PopoverTrigger  asChild>
        <Button onClick = {() => console.log(date, category)} className="p-0 h-6 w-6" variant="outline">+</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">{category.toUpperCase()}</h4>
            <p className="text-muted-foreground text-sm">
              Add expense(s)
            </p>
          </div>
          <div className="grid gap-2">
            {expenseElems}
          </div>
          <div className="mt-8 grid grid-cols-1 items-center gap-4">
            <Button onClick = {addEmptyExpense}>Add another expense</Button>
            <Button variant={"action"} onClick = {handleSubmit}>Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

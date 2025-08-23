import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { expenseFormdataRecord } from "@/app/utils/lib/types"
import { useState, useEffect, ReactNode, ChangeEvent } from "react"
import { XMarkIcon, TrashIcon } from "@heroicons/react/16/solid"
import { getOneDayExpense } from "@/app/api/fetch/route"
import { upsertExpense } from "@/app/api/upsert/route"

export function UserPopover({date, categoryName, categoryId, handleExpenseDataChange} : {date:string, categoryName:string, categoryId:number,  handleExpenseDataChange: (date:string, category: string, amount: number) => void}) {

  const [formdata, setFormdata] = useState<expenseFormdataRecord[]>([{ amount: 0, description: "", category_id: categoryId, date: date }])
  const [expenseElems, setExpenseElems] = useState<ReactNode[]>([])
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)


  const fetchExpenditure = async (date:string, categoryId: number) => {
    console.log(categoryId, date)
    const res = await getOneDayExpense(date, categoryId)
    const data = await res.json()
    // console.log(data)
    setFormdata(data)
  }

  const addEmptyExpense = () => {
    setFormdata(prev => [...prev, { amount: 0, description: "", category_id: categoryId, date: date }])
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {id, type, name, value} = e.target
    const index = parseInt(id)
    
    if(type === "number") {
      const updatedValue = parseInt(value)
      
      setFormdata(prev => {
        let updatedData = [...prev]
        updatedData[index] = {...updatedData[index], amount: updatedValue}
        return updatedData
      })
      
    }else if (type === "text"){
      const updatedValue = value
        setFormdata(prev => {
          let updatedData = [...prev]
          updatedData[index] = {...updatedData[index], description: updatedValue}
          return updatedData
        })
    }

  }



  const handleSubmit = async () => {
    const res = await upsertExpense(formdata)
    const data = await res.json()

    console.log(data)
  }

  const handlePopoverOpen = () => {
    setPopoverOpen(true)
  }

  const handleClose = () => {
    setPopoverOpen(false)
    setFormdata([{ amount: 0, description: "", category_id: categoryId, date: date }])
  }

  
  useEffect(() => {
    if(popoverOpen) {
      fetchExpenditure(date, categoryId)
    }
  }, [popoverOpen])



  useEffect(() => {
    if(popoverOpen) {
      if(formdata){
        setExpenseElems(prev => {
          return formdata?.map((exp, index) => 
          <div key={index} className="grid grid-cols-10 items-center gap-4">
            {/* <Label htmlFor="width" className="col-span-3">{`Expense ${index + 1}`}</Label> */}
            <Input
              type="text"
              
              id = {index}
              name = {"fetched"}
              value = {exp.description ? exp.description : ""}
              onChange={handleChange}
              placeholder="expense description"
              className="col-span-4 h-8"
            />
            <Input
              type="number"
              min={0}
              id = {index}
              name = {"fetched"}
              value = {exp.amount}
              onChange={handleChange}
              className="col-span-5 h-8"
            />
              <Button className="col-span-1" variant={"ghost"}><TrashIcon /></Button>
            </div>
          )
        })
      }
    }
  }, [popoverOpen, formdata])
  

  return (
    <Popover open = {popoverOpen} onOpenChange={handlePopoverOpen} >
      <PopoverTrigger  asChild>
        <Button onClick = {handlePopoverOpen} className="p-0 h-6 w-6" variant="outline">+</Button>
      </PopoverTrigger>
      <PopoverContent className="w-120">
        <Button onClick={handleClose} variant={"ghost"} className="absolute right-3 top-3"><XMarkIcon className="" /></Button>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">{categoryName}</h4>
            <p className="text-muted-foreground text-sm">
              Add expense(s)
            </p>
          </div>
          <div className="grid gap-2">
            {expenseElems}
          </div>
          <div className="mt-8 grid grid-cols-1 items-center gap-4">
            <Button onClick = {addEmptyExpense}>Add an Expense</Button>
            <Button variant={"action"} onClick = {handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

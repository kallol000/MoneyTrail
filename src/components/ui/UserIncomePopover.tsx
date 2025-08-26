import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { InfoIcon, PlusIcon } from "./icons"
import { useState, useEffect, ReactNode } from "react"
import { getAllMonthlyIncome } from "@/app/api/fetch/route"
import { incomeFormdataRecord } from "@/app/utils/lib/types"
import { ChangeEvent } from "react"
import { XMarkIcon, TrashIcon  } from "@heroicons/react/16/solid"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { Dispatch, SetStateAction } from "react"
import { deleteIncome } from "@/app/api/delete/route"
import { upsertIncome } from "@/app/api/upsert/route"


export function UserIncomePopover({income, month, year, setRefresh}:{income:number|undefined, month: number, year: number, setRefresh: Dispatch<SetStateAction<boolean>>}) {

  const [formdata, setFormdata] = useState<incomeFormdataRecord[]>([])
  const [initialFormdata, setInitialFormdata] = useState<incomeFormdataRecord[]>([])
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const [incomeElems, setIncomeElems] = useState<ReactNode[]>([])
  const [changeMade, setChangeMade] = useState<boolean>(false)
  const [unsavedIncomeIds, setUnsavedIncomeIds] = useState<Set<string>>(new Set())
  const [localRefresh, setLocalRefresh] = useState<boolean>(false)

  const fetchAllncome = async (year: number, month: number) => {
    try {
      const res = await getAllMonthlyIncome(year, month)
      const data = await res.json()
      setFormdata(data)
      setInitialFormdata(data)
    } catch (error) {
      console.error("Error fetching income data:", error)
    }
  }

  const handlePopoverOpen = () => {
    setPopoverOpen(true)
  }

  const handleClose = () => {
    setPopoverOpen(false)
  }

  const handleDelete = async (id: string) => {


    if(unsavedIncomeIds.has(id)) {
      unsavedIncomeIds.delete(id)
      setFormdata(prev => prev.filter(income => income.id !== id))
      toast("the income was deleted")
      } else {
          try {
            const res = await deleteIncome(id)
            if(res.status === 200) {
              toast("the expense was deleted")
              setLocalRefresh(prev => !prev)
              setRefresh(prev => !prev)
            }
          } catch (err) {
            toast.error("there was an error")
          }
      } 
    }
  
  const addEmptyIncome = () => {
    const newId = uuidv4()
    setFormdata(prev => [...prev, {id: newId, amount: 0, description: "", date: `${year}-${month < 10 ? '0' + month : month}-01` }])
    setUnsavedIncomeIds(unsavedIncomeIds.add(newId))
  }

  const handleSubmit = async () => {
    const res = await upsertIncome(formdata)
    const data = await res.json()
    console.log(data)
        if(res.status === 400) {
          toast.error("There was an error")
        }else if(res.status === 200) {
          toast.success("Successfully Saved")
        }
    
        setRefresh(prev => !prev)
        setLocalRefresh(prev => !prev)
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
  


  useEffect(() => {
    if(popoverOpen){
      fetchAllncome(year, month)
    }
  }, [popoverOpen, localRefresh])


  useEffect(() => {
    if(JSON.stringify(formdata) === JSON.stringify(initialFormdata)){
      setChangeMade(false)
    } else {
      setChangeMade(true)
    }
  }, [formdata])


  useEffect(() => {
    if(popoverOpen) {
      if(formdata){
        setIncomeElems(prev => {
          return formdata?.map((income, index) => 
          <div key={index} className="grid grid-cols-10 items-center gap-4">
            {/* <Label htmlFor="width" className="col-span-3">{`Expense ${index + 1}`}</Label> */}
            <Input
              type="text"
              id = {index}
              name = {"fetched"}
              value = {income.description ? income.description : ""}
              onChange={handleChange}
              placeholder="expense description"
              className="col-span-4 h-8"
            />
            <div className="flex items-center relative col-span-5">
              <label className="absolute left-2 text-primary/50">&#8377;</label>
              <Input
                type="number"
                min={0}
                id = {index}
                name = {"fetched"}
                value = {income.amount}
                onChange={handleChange}
                className=" h-8 text-right"
              />
            </div>
              <Button className="col-span-1" variant={"ghost"} onClick={() => handleDelete(income.id)}><TrashIcon /></Button>
              
            </div>
          )
        })
      }
    }
  }, [popoverOpen, formdata])
  



  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverOpen}>
      <PopoverTrigger asChild>
        <Button  variant="outline" className="text-sm flex items-center">Total Income : {income}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-120">
        <Button onClick={handleClose} variant={"ghost"} className="absolute right-3 top-3"><XMarkIcon className="" /></Button>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Income</h4>
            <p className="text-muted-foreground text-sm">
              Add Earning(s)
            </p>
          </div>
          <div className="grid gap-2">
            {incomeElems}
          </div>
          <div className="mt-8 grid grid-cols-10 justify-items-center items-center gap-4">
            <div className="col-span-2"></div>
            <Button className="col-span-3" onClick = {addEmptyIncome}>Add an Income</Button>
            <Button className="col-span-3" variant={"action"} onClick = {handleSubmit} disabled = {!changeMade}>Save Changes</Button>
            <div className="col-span-2"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

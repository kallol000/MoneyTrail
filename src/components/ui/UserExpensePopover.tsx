import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { expenseFormdataRecord } from "@/app/utils/lib/types"
import { useState, useEffect, ReactNode, ChangeEvent, useTransition, Dispatch, SetStateAction } from "react"
import { XMarkIcon, TrashIcon  } from "@heroicons/react/16/solid"
import { getOneDayExpense } from "@/app/api/fetch/route"
import { upsertExpense } from "@/app/api/upsert/route"
import { v4 as uuidv4 } from "uuid"
import Spinner from '@/components/ui/spinner'
import { toast } from "sonner"
import { deleteExpense } from "@/app/api/delete/route"
import { InfoIcon, PlusIcon } from "./icons"


export function UserExpensePopover({icon, date, categoryName, categoryId, setRefresh} : {icon: string, date:string, categoryName:string, categoryId:number, setRefresh: Dispatch<SetStateAction<boolean>>}) {

  const [formdata, setFormdata] = useState<expenseFormdataRecord[]>([])
  const [initialFormdata, setInitialFormdata] = useState<expenseFormdataRecord[]>([])
  const [expenseElems, setExpenseElems] = useState<ReactNode[]>([])
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const [changeMade, setChangeMade] = useState<boolean>(false)
  const[unsavedExpenseIds, setUnsavedExpenseIds] = useState<Set<string>>(new Set())
  const [isDataFetchPending, startDataFetchTransition] = useTransition()
  const [localRefresh, setLocalRefresh] = useState<boolean>(false)


  const fetchExpenditure = async (date:string, categoryId: number) => {
    const res = await getOneDayExpense(date, categoryId)
    const data = await res.json()
    // console.log(data)
    setFormdata(prev => data)
    setInitialFormdata(prev => data)
  }

  const addEmptyExpense = () => {
    const newId = uuidv4()
    setFormdata(prev => [...prev, {id: newId, amount: 0, description: "", category_id: categoryId, date: date }])
    setUnsavedExpenseIds(unsavedExpenseIds.add(newId))
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

    if(res.status === 400) {
      toast.error("There was an error")
    }else if(res.status === 200) {
      toast.success("Successfully Saved")
    }

    // handleClose()
    setRefresh(prev => !prev)
    setLocalRefresh(prev => !prev)
  }

  const handleDelete = async (id: string) => {

    if(unsavedExpenseIds.has(id)) {
      unsavedExpenseIds.delete(id)
      setFormdata(prev => prev.filter(exp => exp.id !== id))
      toast("the expense was deleted")
      } else {
          try {
            const res = await deleteExpense(id)
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


  const handlePopoverOpen = () => {
    setPopoverOpen(true)
  }
  
  const handleClose = () => {
    setPopoverOpen(false)
    setFormdata([])
  }
  
  useEffect(() => {
    if(JSON.stringify(formdata) === JSON.stringify(initialFormdata)){
      setChangeMade(false)
    } else {
      setChangeMade(true)
    }
  }, [formdata])
  
  useEffect(() => {
    if(popoverOpen) {
      startDataFetchTransition(async() => {
        fetchExpenditure(date, categoryId)
      })
    }
  }, [popoverOpen, localRefresh])



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
            <div className="flex items-center relative col-span-5">
              <label className="absolute left-2 text-primary/50">&#8377;</label>
              <Input
                type="number"
                min={0}
                id = {index}
                name = {"fetched"}
                value = {exp.amount}
                onChange={handleChange}
                className=" h-8 text-right"
              />
            </div>
              <Button className="col-span-1" variant={"ghost"} onClick={() => handleDelete(exp.id)}><TrashIcon /></Button>
            </div>
          )
        })
      }
    }
  }, [popoverOpen, formdata])
  

  return (
    <Popover open = {popoverOpen} onOpenChange={handlePopoverOpen} modal = {true} >
      <PopoverTrigger  asChild>
        <Button onClick = {handlePopoverOpen} className="p-0 h-6 w-6" variant="outline">{icon === "add" ? <PlusIcon /> : <InfoIcon />  }</Button>
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
            {isDataFetchPending ? <Spinner /> : expenseElems}
          </div>
          <div className="mt-8 grid grid-cols-10 justify-items-center items-center gap-4">
            <div className="col-span-2"></div>
            <Button className="col-span-3" onClick = {addEmptyExpense}>Add an Expense</Button>
            <Button className="col-span-3" variant={"action"} onClick = {handleSubmit} disabled = {!changeMade}>Save Changes</Button>
            <div className="col-span-2"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

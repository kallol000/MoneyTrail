import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusIcon } from "./icons"
import { useState, useEffect, ChangeEvent } from "react"
import { XMarkIcon } from "@heroicons/react/16/solid"
import { JSX } from "react"
import { toast } from "sonner"
import { Dispatch, SetStateAction } from "react"
import { insertCategoryRow } from "@/app/utils/lib/types"
import {TrashIcon} from "@heroicons/react/16/solid"
import { deleteCategory } from "@/app/api/delete/route"

export function UserCategoryDeletePopover({id, setHomeRefresh, setCategoryListRefresh}: {id: number, setHomeRefresh:Dispatch<SetStateAction<boolean>>, setCategoryListRefresh:Dispatch<SetStateAction<boolean>>}) {

    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [localRefresh, setLocalRefresh] = useState<boolean>(false)



    const handlePopoverOpen = () => {
        setPopoverOpen(true)
    }   

    const handleClose = () => {
        setPopoverOpen(false)
    }

    const handleDelete = async () => {

        const res = await deleteCategory(id)
        const data = await res.json()

        if(res.status === 200) {
            toast("Category deleted")
            setHomeRefresh(prev => !prev)
            setCategoryListRefresh(prev => !prev)
        }else if(res.status === 400) {
            toast.error("Error deleting category", data.message)
        }

        handleClose()
    }
    




    return (
        <Popover open={popoverOpen} onOpenChange={handlePopoverOpen} modal={true}>
        <PopoverTrigger asChild>
            <Button variant={"ghost"} className=" text-xs"><TrashIcon/></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <Button onClick={handleClose} variant={"ghost"} className="absolute right-3 top-3"><XMarkIcon className="" /></Button>
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="leading-none font-medium">Are you sure?</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                The category along with all expenses related to it will be deleted. This action cannot be undone.
                </p>
            </div>
            <div className="grid gap-2">
                
            </div>
            <div className=" grid grid-cols-10 justify-items-center items-center gap-4 ">
                <div className="col-span-1"></div>
                <Button className="col-span-4 w-full text-xs" variant="outline" onClick = {handleClose} >cancel</Button>
                <Button className="col-span-4 w-full text-xs" variant="destructive" onClick = {handleDelete} >Delete</Button>
                <div className="col-span-1"></div>
            </div>
            </div>
        </PopoverContent>
        </Popover>
  )
}

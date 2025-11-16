import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Copy } from "./icons"
import { Dispatch, SetStateAction } from "react"

type userCopyExpenditurePopoverProps = {
    month: number;
    categoryName: string;
    categoryId: number;
    setHomeRefresh: Dispatch<SetStateAction<boolean>>;
}

export function UserCopyExpenditurePopover({month, categoryName, categoryId, setHomeRefresh}: userCopyExpenditurePopoverProps) {


    const handleClose = () => {
        // close popover
    }

    const handleCopy = async () => {
        console.log("Category Name:", categoryName, categoryId, month);

    }      



    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button className="p-0 h-6 w-6" variant="ghost"><Copy /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="leading-none font-medium">Are you sure?</h4>
                <p className="text-muted-foreground text-sm">
                You are about to copy last month's expenditure data to this month. Any existing records will remain unchanged.
                </p>
            </div>
            <div className="grid gap-2">
                <div className=" grid grid-cols-10 justify-items-center items-center gap-4 ">
                    <div className="col-span-1"></div>
                    <Button className="col-span-4 w-full text-xs" variant="outline" onClick = {handleClose} >Cancel</Button>
                    <Button className="col-span-4 w-full text-xs" variant="action" onClick = {handleCopy} >Yes</Button>
                    <div className="col-span-1"></div>
                </div>
            </div>
            </div>
        </PopoverContent>
        </Popover>
    )
}

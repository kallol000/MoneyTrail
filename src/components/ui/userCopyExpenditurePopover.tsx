import { Button } from "@/components/ui/button"
import axios from "axios"
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Copy } from "./icons"
import { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import { toast } from "sonner"
type userCopyExpenditurePopoverProps = {
    month: number;
    year: number;
    categoryName: string;
    categoryId: number;
    setHomeRefresh: Dispatch<SetStateAction<boolean>>;
}

export function UserCopyExpenditurePopover({month, year, categoryName, categoryId, setHomeRefresh}: userCopyExpenditurePopoverProps) {

    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    
    const handlePopoverOpen = () => {
        setPopoverOpen(true) 
    };

    const handleClose = () => {
        setPopoverOpen(false)
    }



    const handleCopy = async () => {
        
        const res = await axios.post(`/api/expenditure/copy-last-month?year=${year}&month=${month}&categoryId=${categoryId}`)
        
        if (res.status === 400) {
            toast.error("There was an error");
        } else if (res.status === 200) {
            toast.success("Successfully copied");
        }

        handleClose()
        setHomeRefresh((prev) => !prev);
    }      



    return (
        <Popover open={popoverOpen} onOpenChange={handlePopoverOpen}>
        <PopoverTrigger asChild>
            <Button size="icon" variant="ghost"><Copy /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80">
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="leading-none font-medium">Are you sure?</h4>
                <p className="text-muted-foreground text-sm">
                {`You are about to copy last month's ${categoryName} expenses to this month. Any existing records will remain unchanged.`}
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

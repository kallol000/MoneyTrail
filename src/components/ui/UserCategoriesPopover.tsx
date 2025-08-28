import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusIcon } from "./icons"
import { userCategoriesRecord } from "@/app/utils/lib/types"
import { useState, useEffect, ChangeEvent } from "react"
import { getUserCategories } from "@/app/api/fetch/route"
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { XMarkIcon } from "@heroicons/react/16/solid"
import { JSX } from "react"
import SortableItem from "./sortableItem"
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { upsertCategories } from "@/app/api/upsert/route"
import { toast } from "sonner"
import { Dispatch, SetStateAction } from "react"
import { AddUserCategoryPopover } from "./AddUserCategoryPopover"


export function UserCategoriesPopover({setRefresh}: {setRefresh: Dispatch<SetStateAction<boolean>>}) {

    const [initialCategories, setInitialCategories] = useState<userCategoriesRecord[]>([])
    const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>([])
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [changeMade, setChangeMade] = useState<boolean>(false)
    const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([])
    const [localRefresh, setLocalRefresh] = useState<boolean>(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchUserCategories = async () => {
        const res = await getUserCategories();
        const data = await res.json();
        setUserCategories(data);
        setInitialCategories(data);
    }

    function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    
    if (over && active.id !== over.id) {
        setUserCategories(prev => {

            const oldIndex = userCategories.findIndex((category) => category.id === active.id)
            const newIndex = userCategories.findIndex((category) => category.id === over.id)

            const newArray = arrayMove(prev, oldIndex, newIndex)
            for(let i = 0; i < newArray.length; i++) {
                newArray[i].order = i + 1
            }
            return newArray
        });
        }
    }
    

    useEffect(() => {
        setCategoryElems(userCategories.map((category) => 
            <SortableItem key={category.id} id={category.id}>{category.name}</SortableItem>  ))
    }, [userCategories])


    useEffect(() => {
        fetchUserCategories()
    }, [popoverOpen, localRefresh])


    useEffect(() => {
        setChangeMade(JSON.stringify(initialCategories) !== JSON.stringify(userCategories))
    }, [initialCategories, userCategories])

    const handlePopoverOpen = () => {
        setPopoverOpen(true)
    }   

    const handleClose = () => {
        setPopoverOpen(false)
    }

    const handleSave = async () => {

        try {
            const res = await upsertCategories(userCategories)
            if(res.status === 200) {
                toast.success("Categories updated successfully")
                setRefresh(prev => !prev)
                setLocalRefresh(prev => !prev)
            }

        } catch (error) {
            toast.error("There was an error")
        }

        // handleClose()
    }
    




    return (
        <Popover open={popoverOpen} onOpenChange={handlePopoverOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline">Categories <PlusIcon /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <Button onClick={handleClose} variant={"ghost"} className="absolute right-3 top-3"><XMarkIcon className="" /></Button>
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="leading-none font-medium">Expenditure Categories</h4>
                <p className="text-muted-foreground text-sm">
                Manage your expenditure categories here
                </p>
            </div>
            <div className="grid gap-2">
                <DndContext
                    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={userCategories} strategy={verticalListSortingStrategy}>
                        {categoryElems}
                    </SortableContext>
                </DndContext>
                
            </div>
            <div className="mt-8 grid grid-cols-10 justify-items-center items-center gap-4 ">
                <div className="col-span-1"></div>
                <div className="col-span-4 w-full">
                    <AddUserCategoryPopover setRefresh={setRefresh} />
                </div>
                <Button className="col-span-4 w-full text-xs" variant={"action"} onClick = {handleSave} disabled = {!changeMade}>Save Changes</Button>
                <div className="col-span-1"></div>
            </div>
            </div>
        </PopoverContent>
        </Popover>
  )
}

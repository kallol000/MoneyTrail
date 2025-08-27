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
import { useState, useEffect } from "react"
import { getUserCategories } from "@/app/api/fetch/route"
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Draggable from "./Draggable"
import Droppable from "./Droppable"
import { XMarkIcon } from "@heroicons/react/16/solid"
import { JSX } from "react"
import { findIndexInArray } from "@/app/utils/lib/helpers"
import SortableItem from "./sortableItem"
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

export function UserCategoriesPopover({} : {}) {

    const [initialCategories, setInitialCategories] = useState<userCategoriesRecord[]>([])
    const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>([])
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [changeMade, setChangeMade] = useState<boolean>(false)
    const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([])

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

    function handleDragEnd(event: any) {
    const {active, over} = event;

    // console.log(active, over)
    
    if (active.id !== over.id) {
        setUserCategories(prev => {

            const oldIndex = userCategories.findIndex((category) => category.id === active.id)
            const newIndex = userCategories.findIndex((category) => category.id === over.id)

            return arrayMove(prev, oldIndex, newIndex)
        });
        }
    }
    

    useEffect(() => {
        setCategoryElems(userCategories.map((category) => 
            <SortableItem key={category.id} id={category.id}>{category.name}</SortableItem>  ))
    }, [userCategories])


    useEffect(() => {
        fetchUserCategories()
    }, [popoverOpen])

    const handlePopoverOpen = () => {
        setPopoverOpen(true)
    }   

    const handleClose = () => {
        setPopoverOpen(false)
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
            </div>
        </PopoverContent>
        </Popover>
  )
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "./icons";
import { userCategoriesRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ChangeEvent } from "react";
import { getUserCategories } from "@/app/api/fetch/route";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { JSX } from "react";
import SortableItem from "./sortableItem";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { upsertCategories } from "@/app/api/upsert/route";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { AddUserCategoryPopover } from "./AddUserCategoryPopover";

export function UserCategoriesPopover({
  setHomeRefresh,
}: {
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
}) {
  const [initialCategories, setInitialCategories] = useState<
    userCategoriesRecord[]
  >([]);
  const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>(
    []
  );
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([]);
  const [categoryListRefresh, setCategoryListRefresh] = useState<boolean>(false);

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
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setUserCategories((prev) => {
        const oldIndex = userCategories.findIndex(
          (category) => category.id === active.id
        );
        const newIndex = userCategories.findIndex(
          (category) => category.id === over.id
        );

        const newArray = arrayMove(prev, oldIndex, newIndex);
        for (let i = 0; i < newArray.length; i++) {
          newArray[i].order = i + 1;
        }
        return newArray;
      });
    }
  }

  useEffect(() => {
    setCategoryElems(
      userCategories.map((category) => (
        <SortableItem key={category.id} id={category.id} setHomeRefresh={setHomeRefresh} setCategoryListRefresh={setCategoryListRefresh}>
          {category.name}
        </SortableItem>
      ))
    );
  }, [userCategories]);

  useEffect(() => {
    fetchUserCategories();
  }, [popoverOpen, categoryListRefresh]);

  useEffect(() => {
    setChangeMade(
      JSON.stringify(initialCategories) !== JSON.stringify(userCategories)
    );
  }, [initialCategories, userCategories]);

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  const handleSave = async () => {
    const res = await upsertCategories(userCategories);
    if (res.status === 200) {
      toast.success("Categories updated successfully");
      setHomeRefresh((prev) => !prev);
      setCategoryListRefresh((prev) => !prev);
    } else if (res.status === 400) {
      const data = await res.json();
      toast.error("There was an error", data.message);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Categories <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" onInteractOutside={handleClose}>
        <Button
          onClick={handleClose}
          variant={"ghost"}
          className="absolute right-3 top-3"
        >
          <XMarkIcon className="" />
        </Button>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Expenditure Categories</h4>
            <p className="text-muted-foreground text-sm">
              Manage your expenditure categories here
            </p>
          </div>
          <div className="grid gap-2 px-2 max-h-100 overflow-y-auto
          [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
          ">
            <DndContext
              modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={userCategories}
                strategy={verticalListSortingStrategy}
              >
                {categoryElems}
              </SortableContext>
            </DndContext>
          </div>
          <div className="mt-8 grid grid-cols-10 justify-items-center items-center gap-4 ">
            <div className="col-span-1"></div>
            <div className="col-span-4 w-full">
              <AddUserCategoryPopover setCategoryListRefresh={setCategoryListRefresh} setHomeRefresh={setHomeRefresh} />
            </div>
            <Button
              className="col-span-4 w-full text-xs"
              variant={"action"}
              onClick={handleSave}
              disabled={!changeMade}
            >
              Save Changes
            </Button>
            <div className="col-span-1"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

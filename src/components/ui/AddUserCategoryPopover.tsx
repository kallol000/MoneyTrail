import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "./icons";
import { useState, useEffect, ChangeEvent } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { JSX } from "react";
import { insertCategory, upsertCategories } from "@/app/api/upsert/route";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { insertCategoryRow } from "@/app/utils/lib/types";
import { TrashIcon } from "@heroicons/react/16/solid";

export function AddUserCategoryPopover({
  setHomeRefresh,
  setCategoryListRefresh
}: {
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
  setCategoryListRefresh: Dispatch<SetStateAction<boolean>>;
}) {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [initialFormdata, setInitialFormdata] = useState<insertCategoryRow[]>([
    { name: "" },
  ]);
  const [formdata, setFormdata] = useState<insertCategoryRow[]>([{ name: "" }]);
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([]);
  const [localRefresh, setLocalRefresh] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFormdata = [...formdata];
    newFormdata[index].name = e.target.value;
    setFormdata(newFormdata);
  };

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
    setFormdata([{ name: "" }]);
  };

  const handleSave = async () => {
    const res = await insertCategory(formdata);
    const data = await res.json();

    if (res.status === 200) {
      toast.success("Category added successfully");
      setHomeRefresh((prev) => !prev);
      setCategoryListRefresh((prev) => !prev);
    } if (res.status === 400) {
      toast.error("There was an error", data.message);
    }

    handleClose();
  };

  useEffect(() => {
    setCategoryElems(
      formdata.map((category, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={category.name}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Category Name"
          />
          {/* <Button onClick={() => handleRemoveCategory(index)} variant={"ghost"}>
                    <TrashIcon className="h-4 w-4" />
                </Button> */}
        </div>
      ))
    );
  }, [formdata]);

  useEffect(() => {
    if (JSON.stringify(initialFormdata) !== JSON.stringify(formdata)) {
      setChangeMade(true);
    } else if (JSON.stringify(initialFormdata) === JSON.stringify(formdata)) {
      setChangeMade(false);
    }
  }, [formdata]);

  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button className="col-span-4 w-full text-xs">Add a Category</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Button
          onClick={handleClose}
          variant={"ghost"}
          className="absolute right-3 top-3"
        >
          <XMarkIcon className="" />
        </Button>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Add a new Category</h4>
            <p className="text-muted-foreground text-sm">
              Add a new expenditure category here
            </p>
          </div>
          <div className="grid gap-2">{categoryElems}</div>
          <div className=" grid grid-cols-10 justify-items-center items-center gap-4 ">
            <div className="col-span-3"></div>
            <Button
              className="col-span-4 w-full text-xs"
              variant={"action"}
              onClick={handleSave}
              disabled={!changeMade}
            >
              Add
            </Button>
            <div className="col-span-3"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

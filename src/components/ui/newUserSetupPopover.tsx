import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "./icons";
import { globalCategoriesRecord, insertCategoryRow, userCategoriesRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ChangeEvent } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { JSX } from "react";
import { upsertCategories } from "@/app/api/upsert/route";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { AddUserCategoryPopover } from "./AddUserCategoryPopover";
import { Plus } from "lucide-react";
import { MinusIcon } from "@heroicons/react/16/solid";

export function NewUserSetupPopover() {
  const [initialCategories, setInitialCategories] = useState<
    userCategoriesRecord[]
  >([]);

  const [recommendedCategories, setRecommendedCategories] = useState<globalCategoriesRecord[]>([])
  const [recommendedCategoryElems, setRecommendedCategoryElems] = useState<JSX.Element[]>([])

  const [initialFormdata, setInitialFormdata] = useState<insertCategoryRow[]>([])
  const [formdata, setFormdata] = useState<insertCategoryRow[]>([])
  const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([]);

  const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>(
    []
  );
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [categoryListRefresh, setCategoryListRefresh] = useState<boolean>(false);

  const fetchRecommendedCategories = async () => {
    // const res = await getGlobalCategories()
    const res = await fetch(`/api/categories/global`)
    const data = await res.json();
    setRecommendedCategories(data)
  };


  const handleUserCategoryAdd = (category?: string ) => {

    if(category) {
      setFormdata(prev => {
        if(prev.length > 0) {
          for(let i = 0; i < prev.length; i++) {
            if(prev[i].name === category){
              return prev
            }
          }
          return [...prev, {name:category}]
        }else {
          return [...prev, {name: category }]
        }
      })
    }else{
      setFormdata(prev => {
        return [...prev, {name: ""}]
      })
    }
    // setFormdata(prev => [...prev, {id: "categoryId", name: "hello", order: 1} ])
  }

  const handleDelete = (index:number) => {
    let temp = [...formdata]
    temp = [...temp.slice(0, index), ...temp.slice(index+1, temp.length)]
    setFormdata(temp)
  }

  useEffect(() => {
    setRecommendedCategoryElems(recommendedCategories.map(((category, index) => 
    <Button 
      variant={"tertiary"} key={index}
      size={"sm"} 
      onClick={() => handleUserCategoryAdd(category.name)} 
      className="border-1 rounded-[50] text-xs" 
      >
      {category.name}
      <PlusIcon />
    </Button>)))
  }, [recommendedCategories])



  useEffect(() => {
    fetchRecommendedCategories()
  }, [popoverOpen, categoryListRefresh]);

  useEffect(() => {
    setChangeMade(
      JSON.stringify(initialFormdata) !== JSON.stringify(formdata)
    );
  }, [formdata]);


  useEffect(() => {
    setCategoryElems(prev => formdata.map((category, index) => {
      return <div key={index} className="grid grid-cols-6 items-center gap-4 ">
        <Input 
          type="text"
          id={index} 
          value={category.name}
          onChange={handleChange}
          className="col-span-5 h-8"
          />
        <Button 
          variant={"ghost"}
          className="col-span-1"
          onClick={() => handleDelete(index)}
          // id={index}
          ><MinusIcon /></Button>
      </div>
    }))
  }, [formdata])

  const handleChange = () => {

  }

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
      // setHomeRefresh((prev) => !prev);
      setCategoryListRefresh((prev) => !prev);
    } else if (res.status === 400) {
      const data = await res.json();
      toast.error("There was an error", data.message);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button className="bg-identity">
          Set Up 
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-120" onInteractOutside={handleClose}>
        <Button
          onClick={handleClose}
          variant={"ghost"}
          className="absolute right-3 top-3"
        >
          <XMarkIcon className="" />
        </Button>
        <div className="grid gap-4">
          <div className="mt-4 flex flex-col gap-4">
            <h4 className="font-semibold">What should we call you?</h4>
            <Input />
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Add or select the categories you'd like to track expenses for</h4>
              <div>{categoryElems}</div>
              <div className="bg-secondary border-1 p-2 flex flex-col gap-4 text-xs">
                <p >Common categories</p>
                <div className="flex flex-wrap items-center  gap-2  ">
                  {recommendedCategoryElems}
                </div>

              </div>
              <div className=" grid grid-cols-10 justify-items-center items-center gap-4 ">  
                <div className="col-span-2"></div>
                <Button
                    className="col-span-3 w-full text-xs"
                    variant={"action"}
                    onClick={() => handleUserCategoryAdd()}
                    // disabled={!changeMade}
                  >
                    Add Another
                </Button>
                <Button
                  className="col-span-3 w-full text-xs"
                  variant={"action"}
                  onClick={handleSave}
                  disabled={!changeMade}
                >
                  Save
                </Button>
                <div className="col-span-2"></div>
            </div>
            </div>
          </div>
        </div>  
      </PopoverContent>
    </Popover>
  );
}

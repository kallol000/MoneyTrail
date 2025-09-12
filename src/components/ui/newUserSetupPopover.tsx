import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import { InfoCircleIcon, PlusIcon } from "./icons";
import { globalCategoriesRecord, insertCategoryRow, userCategoriesRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ChangeEvent } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { JSX } from "react";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { AddUserCategoryPopover } from "./AddUserCategoryPopover";
import { Plus } from "lucide-react";
import { MinusIcon } from "@heroicons/react/16/solid";
import {InformationCircleIcon} from "@heroicons/react/16/solid";
import { InfoIcon } from "./icons";
import axios from "axios";
import { Toaster } from "./sonner";


export function NewUserSetupPopover({setHomeRefresh}:{setHomeRefresh:Dispatch<SetStateAction<boolean>>}) {

  const [recommendedCategories, setRecommendedCategories] = useState<globalCategoriesRecord[]>([])
  const [recommendedCategoryElems, setRecommendedCategoryElems] = useState<JSX.Element[]>([])

  const [initialFormdata, setInitialFormdata] = useState<insertCategoryRow[]>([])
  const [formdata, setFormdata] = useState<insertCategoryRow[]>([])
  const [username, setUsername] = useState<string>("")
  const [initialUsername, setInitialUsername] = useState<string>("")
  const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([]);

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
      JSON.stringify(initialFormdata) !== JSON.stringify(formdata) && JSON.stringify(initialUsername) !== JSON.stringify(username)
    );
  }, [formdata, username]);


  useEffect(() => {
    setCategoryElems(prev => formdata.map((category, index) => {
      return <div key={index} className="grid grid-cols-6 items-center gap-4 ">
        <Input 
          type="text"
          id={index.toString()} 
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

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {type, name, id, value} = e.target

    if(name === "username") {
      setUsername(value)
    } else {
      setFormdata(prev => {
        const temp = [...prev]
        temp[parseInt(id)] = {name: value}
        return temp
      })
    }

    // console.log(type, name, value, id)
  }

  // console.log(formdata)

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  

  const handleSave = async () => {
    
    const res = await axios.post(`/api/user/details?username=${username}`, formdata)
    
    if(res.status === 200) {
      toast.success("You're all set up")
      setUsername("")
      setFormdata([])
      handleClose()
      setHomeRefresh(prev => !prev)
    }else{
      toast.error("There was an error")
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button className="bg-identity">
          Set Up 
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={-200} className="w-120" onInteractOutside={handleClose}>
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
            <Input type="text" name = {"username"} value = {username} onChange={handleChange} className="font-semibold"/>


            <div className="flex flex-col gap-4">
              
              <h4 className="font-semibold">{"Add or select the categories you'd like to track expenses for"}</h4>
              
              {categoryElems ? <div>{categoryElems}</div> : null}
              
              <div className="bg-secondary border-1 p-2 flex flex-col gap-2 text-xs">
                <p >Common categories</p>
                <div className="flex flex-wrap items-center  gap-2  ">
                  {recommendedCategoryElems}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <InfoCircleIcon  />
                <p className="col-span-19 text-xs">you need to declare your name and create atleast one category</p>
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
      <Toaster richColors/>
    </Popover>
  );
}

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "@heroicons/react/16/solid"
import { Checkbox } from "./checkbox"
import { DropdownMenuItem, DropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu"
import { userCategoriesRecord } from "@/app/utils/lib/types"
import { useState, useEffect, JSX } from "react"
import { Label } from "./label"
import {XMarkIcon} from "@heroicons/react/16/solid"
import { CheckIcon } from "lucide-react"

type userCategorySelectDropdownProps = {selectedCategories: string[], handleSelectedCategoryChange:(checked: boolean, name: string) => void,  userCategories?: userCategoriesRecord[]};

export function UserCategorySelectDropdown( {selectedCategories, handleSelectedCategoryChange, userCategories}:userCategorySelectDropdownProps ) {
  
    const [categoryElems, setCategoryElems] = useState<JSX.Element[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleDropdownOpen = () => {
        setDropdownOpen(true)
    }

    const handleDefaultDropdownBehaviour = (e: Event) => {
        e.preventDefault();
    }

    useEffect(() => {
        if(userCategories) {
            setCategoryElems(prev => userCategories.map(category => 
                <DropdownMenuCheckboxItem 
                    key={category.id}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked) => handleSelectedCategoryChange(checked, category.name)}
                    >
                    {category.name}
                </DropdownMenuCheckboxItem>
            ))
        }
    }, [userCategories, selectedCategories])

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Categories <ChevronDownIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 " align="start">
                <div>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={() => setDropdownOpen(false)}><XMarkIcon /></Button>
                </div>    
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuGroup  >
                    {categoryElems}
                    {/* <DropdownMenuCheckboxItem checked={false}>
                        
                        Checkbox Item
                    </DropdownMenuCheckboxItem> */}
                    
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

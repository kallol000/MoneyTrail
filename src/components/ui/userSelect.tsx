import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"
import { ReactNode } from "react"
import { useState, useEffect } from "react"

export function UserSelect( {name, label, data, value, onChange } : {name: string, label:string, data: string[] | number [], value: string , onChange: (value:string, name: string ) => void}  ) {
  
    const [selectItems, setSelectItems] = useState<ReactNode[]>([])
    
    useEffect( () => {
        if ( data ) {
            setSelectItems( prev => data.map(
                (elem, index) => <SelectItem key={index} value={elem}>{elem}</SelectItem>
            ))
        }
    }, [ data ] )
    

    // const name = "hello"

    return (
            <Select name={name} value={value} onValueChange={(value) => onChange(value, name)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {selectItems}
                </SelectGroup>
            </SelectContent>
            </Select>
    )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { tabLinkRow } from "@/app/utils/lib/types"
import { tab } from "../../app/utils/lib/types"
import { useState, useEffect, ReactNode, ChangeEvent } from "react"


export default function UserTabs({tabs, activeTab, handleValueChange}:{tabs:tab, activeTab: string, handleValueChange: (value:string) => void}) {
    
    const [tabElems, setTabElems] = useState<ReactNode[]>([])
    
    useEffect(() => {
        if(tabs){
            setTabElems(prev => Object.keys(tabs).map(tab => <TabsTrigger  key = {tab} value={tab}>{tabs[tab]}</TabsTrigger>))
        }
    }, [tabs])

    return(
        <Tabs value={activeTab} onValueChange={handleValueChange} className="mr-4">
        <TabsList className="gap-1">
            
            {tabElems}
            
        </TabsList>
        </Tabs>
    )
}
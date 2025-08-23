import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { tabLinkRow } from "@/app/utils/lib/types"
import { tab } from "../../app/utils/lib/types"
import { useState, useEffect, ReactNode, ChangeEvent } from "react"


export default function UserTabs({tabs, activeTab, handleValueChange}:{tabs:tab, activeTab: string, handleValueChange: (value:string) => void}) {
    
    const [tabElems, setTabElems] = useState<ReactNode[]>([])
    
    useEffect(() => {
        if(tabs){
            setTabElems(prev => Object.keys(tabs).map(tab => <TabsTrigger key = {tab} value={tab}>{tabs[tab]}</TabsTrigger>))
        }
    }, [tabs])

    return(
        <Tabs value={activeTab} onValueChange={handleValueChange} className="w-[400px]">
        <TabsList className="gap-1">
            {/* {links.map((link, index) => <TabsTrigger key = {index} value="account"><Link href={link.link}>{link.name}</Link></TabsTrigger>)} */}
            {tabElems}
            
            {/* <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger> */}
        </TabsList>
        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
    )
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { tabLinkRow } from "@/app/utils/lib/types"

export default function UserTabs({links}: {links:tabLinkRow[]}) {
    return(
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="gap-2">
            {links.map((link, index) => <TabsTrigger key = {index} value="account"><Link href={link.link}>{link.name}</Link></TabsTrigger>)}
            {/* <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger> */}
        </TabsList>
        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
    )
}
// "use client"
import { ReactNode } from "react"
import UserTabs from "@/components/ui/userTabs"
import Link from "next/link"
export default function Layout({children} : {children: ReactNode}) {

    const links = [{name: "Time Series View", link: '/home/timeSeries-view'}, {name: "Monthly View",link:'/home/monthly-view'}]

    return(
        <div className="flex flex-col gap-4 p-4">
            <UserTabs links={links} />
            {/* <Link href={'/home/timeSeries-view'}>alksjdhalksjdh</Link>
            <Link href={'/home/monthly-view'}>alksjdhalksjdh</Link> */}
            {children}
        </div>
    )
}
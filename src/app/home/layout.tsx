"use client"
import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import UserTabs from "@/components/ui/userTabs";
import Link from "next/link";
import { useState } from "react";

export default function Layout({children, monthlyAnalytics, timeseriesAnalytics} : {children: ReactNode, monthlyAnalytics: ReactNode, timeseriesAnalytics:ReactNode}) {
    
    const [ tab1, setTab1 ] = useState<boolean>( false )
    const [tab2, setTab2] = useState<boolean>( true )

    return (
        <div className="flex flex-col gap-4">
            <Navbar>
                <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                <form>
                    <Button formAction={logOut}>Logout</Button>
                </form>
            </Navbar>
            {/* <Link href={'/timeSeries'}>6 months</Link> */}
            {/* <UserTabs /> */}
            { children }
            <UserTabs  />
            {tab1 && monthlyAnalytics }
            {tab2 && timeseriesAnalytics }
        </div>
    )
}
"use client"
import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import UserTabs from "@/components/ui/userTabs";
import Link from "next/link";
import { useState } from "react";
import {tab} from "../utils/lib/types"

export default function Layout({children, monthlyAnalytics, timeseriesAnalytics, expenditureView} : {children: ReactNode, monthlyAnalytics: ReactNode, expenditureView:ReactNode, timeseriesAnalytics:ReactNode}) {
    
    const [tabs, setTabs] = useState<tab>({
        monthlyAnalytics: "Monthly View",
        timeseriesAnalytics: "Time Series View",
        expenditureView: "Expenditure Tracking",
    })

    const [activeTab, setActiveTab] = useState<string>("expenditureView")

    const handleTabChange = (value:string) => {
        setActiveTab(value)
    }

    return (
        <div className="flex flex-col gap-4 min-h-screen">
            <Navbar>
                <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                <form>
                    <Button formAction={logOut}>Logout</Button>
                </form>
            </Navbar>
            {/* <Link href={'/timeSeries'}>6 months</Link> */}
            {/* <UserTabs /> */}
            <div className="px-4 ">
                <UserTabs tabs = {tabs} activeTab = {activeTab} handleValueChange={handleTabChange}/>
                {activeTab === "monthlyAnalytics" && monthlyAnalytics }
                {activeTab === "timeseriesAnalytics" && timeseriesAnalytics }
                {activeTab === "expenditureView" && expenditureView }
            </div>
        </div>
    )
}
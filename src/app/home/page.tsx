'use client'
import { useState, useEffect, useTransition } from "react"
import {tab, UserDetails} from "../utils/lib/types"
import UserTabs from "@/components/ui/userTabs"
import AnalyticsView from "./@analyticsView/page"
import ExpenditureView from "./@expenditureView/page"
import { UserSelect } from "@/components/ui/userSelect"
import { months, monthsinNumber } from "../utils/lib/helpers"
import { monthYear } from "../utils/lib/types"
import { userCategoriesRecord } from "../utils/lib/types"
import Spinner from "@/components/ui/spinner"
import { Card, CardTitle } from "@/components/ui/card"
import { NewUserSetupPopover } from "@/components/ui/newUserSetupPopover"
import { useUser } from "../utils/lib/userContext"
import axios from "axios"


export default function HomePage() {

    
    const [username, setUsername] = useState<string>("")
    const [isFetchUserPending, startFetchUser] = useTransition()
    const [isNewUser, setIsNewUser] = useState<boolean>(false)
    
    const [tabs, setTabs] = useState<tab>({
        analytics: "Analytics View",
        expenditureView: "Expenditure Tracking",
        // timeseriesAnalytics: "Time Series View",
    })
    const [activeTab, setActiveTab] = useState<string>("analytics");
    const [selectedMonthYear, setSelectedMonthYear] = useState<monthYear>({
        month: months[new Date().getMonth() +1 ],
        year: new Date().getFullYear().toString(),
      });

    const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>([]);
    const [homeRefresh, setHomeRefresh] = useState<boolean>(false);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenditure, setTotalExpenditure] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);


    const fetchUserDetails = async () => {
        startFetchUser(async () => {
            const res = await axios.get(`/api/user/details`);
            const data = res.data
            if(data?.length > 0) {
                setUsername(prev => data[0].name)
            }
        })
    }

    
    
    // to fetch user categories
    const fetchUserCategories = async () => {
        // const res = await getUserCategories();
        const res = await fetch(`/api/categories/user-all`)
        const data = await res.json();
        setUserCategories(data);
    };

    const fetchMonthlyIncome = async () => {
        const res = await fetch(`/api/income/month-total?year=${parseInt(selectedMonthYear.year)}&month=${monthsinNumber[selectedMonthYear.month]}`)  
        const data = await res.json();
        setTotalIncome(data);
    };


    const fetchMonthlyExpenditure = async () => {
        
        const year = parseInt(selectedMonthYear.year)
        const month = monthsinNumber[selectedMonthYear.month]
        const res = await fetch(`/api/expenditure/month-total?year=${year}&month=${month}`)
        const data = await res.json();
        setTotalExpenditure(data);
    };

    const handleMonthYearChange = (value: string, name: string) => {
        setSelectedMonthYear((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleTabChange = (value:string) => {
        setActiveTab(value)
    }

    useEffect(() => {
        setHomeRefresh(prev => !prev)
    },[])

    useEffect(() => {
        fetchUserDetails()
    }, [homeRefresh])


    useEffect(() => {

        if(username){
            setIsNewUser(false)
        }else{
            setIsNewUser(true)
        }
    }, [username])

    useEffect(() => {
        if (username) {
        fetchUserCategories();
        }
    }, [username, selectedMonthYear, homeRefresh])


    useEffect(() => {
        // startFetchTransition(async () => {
        if (username && selectedMonthYear.year && selectedMonthYear.month) {
            fetchMonthlyIncome();
            fetchMonthlyExpenditure();
        }
        // });
    }, [username, selectedMonthYear, homeRefresh]);

    useEffect(() => {
        setBalance((prev) => {
            if (totalIncome && totalExpenditure) {
            prev = totalIncome - totalExpenditure;
            }
            return prev;
        });
    }, [totalIncome, totalExpenditure]);


    if(isNewUser && !isFetchUserPending) {
        return (
            <div className="px-4 row-span-10 h-full">
                <Card className="text-xl h-full flex items-center justify-center p-4">
                    <CardTitle>{"Hey there! Looks like you are new. Let's set up your profile"}</CardTitle>
                    <NewUserSetupPopover setHomeRefresh = {setHomeRefresh} />
                </Card>
            </div>
        )
    }
    
    if(isFetchUserPending) {
        return <div>
            <Spinner />
        </div>
    }
    
    return (
        
        <>
            <div className="row-span-2 items-center grid grid-cols-[repeat(auto-fit,minmax(0,90px))] gap-2">
                <div className="col-span-20 sm:col-span-3 ">
                    <UserTabs  tabs = {tabs} activeTab = {activeTab} handleValueChange={handleTabChange}/>
                </div>
                <div className="col-span-20 sm:col-span-9 md:col-span-6">
                    <div className="flex ">
                        <UserSelect
                            name="month"
                            label="Month"
                            data={months.filter(m => m !== "")}
                            value={selectedMonthYear.month}
                            onChange={handleMonthYearChange}
                            />
                            <UserSelect
                            name="year"
                            label="Year"
                            data={["2024", "2025", "2026"]}
                            value={selectedMonthYear.year}
                            onChange={handleMonthYearChange}
                        />
                    </div>
                </div>
            </div>
                {activeTab === "analytics" && <AnalyticsView 
                    user={username}
                    userCategories={userCategories} 
                    year={parseInt(selectedMonthYear.year)} 
                    month={monthsinNumber[selectedMonthYear.month]} 
                    totalIncome={totalIncome} 
                    totalExpenditure={totalExpenditure} 
                    balance={balance} 
                    homeRefresh={homeRefresh}
                    setHomeRefresh={setHomeRefresh}
                    /> }
                {activeTab === "expenditureView" && <ExpenditureView 
                    user={username} 
                    userCategories={userCategories} 
                    year={parseInt(selectedMonthYear.year)} 
                    month={monthsinNumber[selectedMonthYear.month]} 
                    totalIncome={totalIncome} 
                    totalExpenditure={totalExpenditure} 
                    balance={balance} 
                    homeRefresh={homeRefresh}
                    setHomeRefresh={setHomeRefresh}
                    /> }
            <div></div>
                {/* {activeTab === "timeseriesAnalytics" && timeseriesAnalytics } */}
            </>
    )
}
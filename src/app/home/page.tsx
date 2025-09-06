'use client'
import { useState, useEffect, useTransition } from "react"
import {tab} from "../utils/lib/types"
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


export default function HomePage() {

    const [user, setUser] = useState<string>("");
    const [isNewUser, setIsNewUser] = useState<boolean>(true)

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
    const [isFetchPending, startFetchTransition] = useTransition();
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenditure, setTotalExpenditure] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);


    // to fetch user details
        const fetchUser = async () => {
        // const res = await getUser();
        const res = await fetch(`/api/user`)
        const data = await res.json();
        setUser(data.user.id);
    };

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

    console.log(userCategories)

    const fetchMonthlyExpenditure = async () => {
        
            const year = parseInt(selectedMonthYear.year)
            const month = monthsinNumber[selectedMonthYear.month]
        //   const res = await getMonthlyExpense(parseInt(selectedMonthYear.year), monthsinNumber[selectedMonthYear.month]);
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
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
        fetchUserCategories();
        }
    }, [user, selectedMonthYear, homeRefresh]);

    // console.log(selectedMonthYear)

    useEffect(() => {
        startFetchTransition(async () => {
        if (user && selectedMonthYear.year && selectedMonthYear.month) {
            fetchMonthlyIncome();
            fetchMonthlyExpenditure();
        }
        });
    }, [user, selectedMonthYear, homeRefresh]);

    useEffect(() => {
        setBalance((prev) => {
            if (totalIncome && totalExpenditure) {
            prev = totalIncome - totalExpenditure;
            }
            return prev;
        });
    }, [totalIncome, totalExpenditure]);

    // if(isNewUser) {
    //     return (
    //         <div className="px-4 h-full">
    //             <Card className="text-xl h-full flex items-center justify-center p-4">
    //                 <CardTitle>Let's set up your profile</CardTitle>
    //                 <NewUserSetupPopover />
    //             </Card>
    //         </div>
    //     )
    // }

    return (
        <div className="px-4 ">
            <div className="flex items-center gap-2">

                <UserTabs tabs = {tabs} activeTab = {activeTab} handleValueChange={handleTabChange}/>
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
                {isFetchPending ? <Spinner /> : undefined}
            </div>
                {activeTab === "analytics" && <AnalyticsView 
                    user={user}
                    userCategories={userCategories} 
                    year={parseInt(selectedMonthYear.year)} 
                    month={monthsinNumber[selectedMonthYear.month]} 
                    totalIncome={totalIncome} 
                    totalExpenditure={totalExpenditure} 
                    balance={balance} 
                    homeRefresh={homeRefresh}
                    setHomeRefresh={setHomeRefresh}
                    /> }
                {activeTab === "expenditureView" && <ExpenditureView user={user} 
                    userCategories={userCategories} 
                    year={parseInt(selectedMonthYear.year)} 
                    month={monthsinNumber[selectedMonthYear.month]} 
                    totalIncome={totalIncome} 
                    totalExpenditure={totalExpenditure} 
                    balance={balance} 
                    homeRefresh={homeRefresh}
                    setHomeRefresh={setHomeRefresh}
                    /> }
                {/* {activeTab === "timeseriesAnalytics" && timeseriesAnalytics } */}
            </div>
    )
}
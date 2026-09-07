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
import axios from "axios"


export default function HomePage() {

    
    const [username, setUsername] = useState<string>("")
    const [userRefresh, setUserRefresh] = useState<boolean>(false)
    const [isFetchUserPending, startFetchUser] = useTransition()
    const [isNewUser, setIsNewUser] = useState<boolean>(false)
    const [tabs, setTabs] = useState<tab>({
        analytics: "Analytics View",
        expenditureView: "Expenditure Tracking",
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
    const [balanceHidden, setBalanceHidden] = useState<boolean>(true);

    //   get the details of the user
    const fetchUserDetails = async () => {
        startFetchUser(async () => {
            const res = await axios.get(`/api/user/details`);
            const data = res.data
            if(data?.length > 0) {
                setUsername(prev => data[0].name)
            }
        })
    }
    
    // fetch an user's categories
    const fetchUserCategories = async () => {
        const res = await axios.get(`/api/categories/user-all`)
        const data = res.data;
        setUserCategories(data);
    };

    // fetch an user's total monthly income
    const fetchMonthlyIncome = async () => {
        
        const res = await axios.get(`/api/income/month-total?year=${parseInt(selectedMonthYear.year)}&month=${monthsinNumber[selectedMonthYear.month]}`)  
        const data = res.data;
        setTotalIncome(data);
    };
    
    
    // fetch an user's total monthly expenditure
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
        fetchUserDetails()
    }, [userRefresh])

    // decide whether it's a new user who logged just logged in 
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
        if (username && selectedMonthYear.year && selectedMonthYear.month) {
            fetchMonthlyIncome();
            fetchMonthlyExpenditure();
        }
    }, [username, selectedMonthYear, homeRefresh]);

    useEffect(() => {
        setBalance((prev) => {
            prev = parseFloat((totalIncome - totalExpenditure).toFixed(2));
            return prev;
        });
    }, [totalIncome, totalExpenditure, selectedMonthYear]);


    if(isNewUser && !isFetchUserPending) {
        return (
            <div className="px-4 h-full">
                <Card className="text-xl h-full flex items-center justify-center p-4 text-center">
                    <CardTitle>{"Hey there! Looks like you are new. Let's set up your profile"}</CardTitle>
                    <NewUserSetupPopover setUserRefresh = {setUserRefresh} />
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
            <div className="shrink-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="overflow-x-auto">
                    <UserTabs  tabs = {tabs} activeTab = {activeTab} handleValueChange={handleTabChange}/>
                </div>
                <div className="flex gap-2">
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
                {activeTab === "analytics" && <AnalyticsView
                    user={username}
                    userCategories={userCategories}
                    year={parseInt(selectedMonthYear.year)}
                    month={monthsinNumber[selectedMonthYear.month]}
                    totalIncome={totalIncome}
                    totalExpenditure={totalExpenditure}
                    balance={balance}
                    balanceHidden={balanceHidden}
                    setBalanceHidden={setBalanceHidden}
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
                    balanceHidden={balanceHidden}
                    setBalanceHidden={setBalanceHidden}
                    homeRefresh={homeRefresh}
                    setHomeRefresh={setHomeRefresh}
                    /> }
            <div></div>
            </>
    )
}
"use client"
import { useState, useEffect } from "react"
import { UserSelect } from "@/components/ui/userSelect"
import { months, daysInMonth, monthsinNumber, mapUserCategories, mapUserCategoryNumbers } from "@/app/utils/lib/helpers"
import { monthYear, expenseRecord, userCategoriesRecord } from "@/app/utils/lib/types"
import UserTable from "@/components/ui/userTable"
import { getUser, getDateWiseExpenses, getUserCategories } from "@/app/api/fetch/route"

export default function UpdateDataPage() {
    
    const [ selectedMonthYear, setSelectedMonthYear ] = useState<monthYear>( { month: months[new Date().getMonth()], year: new Date().getFullYear().toString() } )
    const [ user, setUser ] = useState<string>( "" )
    const [ expenseData, setExpenseData ] = useState<expenseRecord[]>( [] )
    const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>([])
    const [categoryNamesMap, setCategoryNamesMap] = useState<Map<string, number>>(new Map())
    const [categoryNumbersMap, setCategoryNumbersMap] = useState<Map<number, string>>(new Map())
    // const []
    
    // to fetch user details
    const fetchUser = async () => {
        const res = await getUser()
        const data = await res.json()
        setUser(data.user.id)
    }
    
    // to fetch user categories
    const fetchUserCategories = async () => {
        const res = await getUserCategories();
        const data = await res.json();
        setUserCategories(data);
    };
    
    // to fetch monthly expenses
    const fetchDateWiseExpenses = async () => {
        const res = await getDateWiseExpenses(parseInt(selectedMonthYear.year), monthsinNumber[selectedMonthYear.month])
        const data = await res.json()
        setExpenseData(data)
    }
    

    const handleMonthYearChange = (value: string, name: string ) => {
        setSelectedMonthYear(prev => ({...prev, [name]: value}))
    }

    const handleFormDataChange = (date:string, category: string, amount: number) => {
        console.log(date, category, amount)
    }


    useEffect( () => {
        fetchUser()
    }, [] )
    
    useEffect( () => {
        if ( user ) {
            fetchUserCategories()
            fetchDateWiseExpenses()
        }
    }, [user, selectedMonthYear])

    useEffect(() => {
        
        const namesMap = mapUserCategories(userCategories)
        const numbersMap = mapUserCategoryNumbers(userCategories)
        setCategoryNamesMap(namesMap)
        setCategoryNumbersMap(numbersMap)

    }, [userCategories])
    

    useEffect( () => {

    }, [selectedMonthYear])
    
    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <UserSelect name = "month" label="Month" data={ months } value={ selectedMonthYear.month } onChange={ handleMonthYearChange} />
                <UserSelect name = "year" label="Year" data={ ["2024", "2025", "2026"] } value={selectedMonthYear.year} onChange={handleMonthYearChange}/>
            </div>
            <UserTable data = {expenseData} categoryNamesMap={categoryNamesMap} categoryNumbersMap = {categoryNumbersMap} handleFormdataChange = {handleFormDataChange} />
        </div>
    )
}
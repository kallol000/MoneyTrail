"use client"
import { useState, useEffect } from "react"
import { UserSelect } from "@/components/ui/userSelect"
import { months, daysInMonth, monthsinNumber } from "@/app/utils/lib/helpers"
import { monthYear, expenseRecord, insertExpenseRecord } from "@/app/utils/lib/types"
import UserTable from "@/components/ui/userTable"
import { getUser, getDateWiseExpenses } from "@/app/api/fetch/route"

export default function UpdateDataPage() {
    
    const [ selectedMonthYear, setSelectedMonthYear ] = useState<monthYear>( { month: months[new Date().getMonth()], year: new Date().getFullYear().toString() } )
    const [ user, setUser ] = useState<string>( "" )
    const [ expenseData, setExpenseData ] = useState<expenseRecord[]>( [] )
    const [formData, setFormData] = useState<insertExpenseRecord[]>([])

    
    const fetchUser = async () => {
        const res = await getUser()
        const data = await res.json()
        setUser(data.user.id)
    }

    const fetchDateWiseExpenses = async () => {
        const res = await getDateWiseExpenses(user, parseInt(selectedMonthYear.year), monthsinNumber[selectedMonthYear.month])
        const data = await res.json()
        console.log(data)
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
            fetchDateWiseExpenses()
        }
    }, [user, selectedMonthYear])

    

    useEffect( () => {

    }, [selectedMonthYear])
    
    // console.log(daysInMonth())

    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <UserSelect name = "month" label="Month" data={ months } value={ selectedMonthYear.month } onChange={ handleMonthYearChange} />
                <UserSelect name = "year" label="Year" data={ ["2024", "2025", "2026"] } value={selectedMonthYear.year} onChange={handleMonthYearChange}/>
            </div>
            {/* {expenseData} */}
            <UserTable data = {expenseData} formData = {formData} handleFormdataChange = {handleFormDataChange} />
        </div>
    )
}
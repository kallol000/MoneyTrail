"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { expenseRecord, expenseRow, incomeRow, timeSeriesExpenseRow } from "../../utils/lib/types";
import UserCard from "@/components/ui/userCard";
import { userCategoriesRecord } from "../../utils/lib/types";
import { UserRadarChart } from "@/components/ui/UserRadarChart";
import { months } from "@/app/utils/lib/helpers";
import { UserExpenseLineChart } from "@/components/ui/userExpenseLineChart";
import { UserIncomeLineChart } from "@/components/ui/userIncomeLineChart";
import UserContributionChart from "@/components/ui/userContributionChart";

type analyticsPageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};


export default function AnalyticsView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, homeRefresh, setHomeRefresh}: analyticsPageProps) {
  

  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState<expenseRow[]>([]);
  const [lastSixMonthsExpenses, setLastSixMonthsExpenses] = useState<timeSeriesExpenseRow[]>([]);
  const [lastSixMonthsIncomeData, setLastSixMonthsIncomeData] = useState<incomeRow[]>([]);
  const [lastSixMonthsDailyExpenses, setLastSixMonthsDailyExpenses] = useState<expenseRecord[]>([])


  const fetchCategoryWiseMonthlyExpenses = async () => {
    // const res = await getCategoryWiseMonthlyExpenses(year, month);
    const res = await fetch(`/api/expenditure/month-categorywise?year=${year}&month=${month}`)
    const data = await res.json();
    setCategoryWiseExpenses(data);
  }

  const fetchCategoryWiseLastSixMonthsExpenses = async () => {
    const res = await fetch(`/api/expenditure/last-six-months-categorywise?year=${year}&month=${month}`)
    const data = await res.json();
    setLastSixMonthsExpenses(data);
  }
  
  // console.log(lastSixMonthsExpenses)
  
  const fetchLastSixMonthsDailyExpenses = async () => {
    // const res = await getLastSixMOnthsDateWiseExpenses(year,month)
    const res = await fetch(`/api/expenditure/last-six-months-datewise?year=${year}&month=${month}`)
    const data = await res.json()
    setLastSixMonthsDailyExpenses(data)
  }

  const fetchLastSixMonthsIncome = async () => {
    // const res = await getlastSixMonthsIncome(year, month);
    const res = await fetch(`/api/income/last-six-months?year=${year}&month=${month}`)
    const data = await res.json();
    setLastSixMonthsIncomeData(data);
  }

  // console.log(categoryWiseExpenses)

  useEffect(() => {
    fetchCategoryWiseMonthlyExpenses()
    fetchCategoryWiseLastSixMonthsExpenses()
    fetchLastSixMonthsIncome()
    fetchLastSixMonthsDailyExpenses()
  }, [year, month, homeRefresh])

  // console.log(categoryWiseExpenses)
  
  return (
    <>
      <div className="py-4 grid grid-cols-7 gap-4">
        <UserCard variant="identity" title="Available Balance" data={balance} />
        <UserCard variant="secondary" title="Total Income" data={totalIncome} />
        <div className="col-span-2 row-span-2">
          <UserRadarChart data = {categoryWiseExpenses} month={months[month] } year={year} userCategories={userCategories}/>
        </div>
        <div className="col-span-3 row-span-2">
          <UserExpenseLineChart data = {lastSixMonthsExpenses} month={months[month] } year={year} userCategories={userCategories} />
        </div>
        <UserCard variant="secondary" title="Total Expenditure" data={totalExpenditure} />
        <UserCard variant="secondary" title="Total Investments" />
        <div className="col-span-4 row-span-2">
          <UserContributionChart data = {lastSixMonthsDailyExpenses} month = {months[month]}/>
        </div>
        <div className="col-span-3 row-span-2">
          <UserIncomeLineChart data={lastSixMonthsIncomeData} month={months[month] } year={year} />
        </div>
      </div>
    </>
  );
}

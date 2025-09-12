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

  return (
    <>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-6 xl:grid xl:grid-cols-6 xl:max-h-full ">
      {/* <div className="flex flex-col gap-4 md:grid md:row-span-3 md:grid-cols-3 xl:row-span-3"> */}
        <div className="bg-identity border-none rounded-lg flex gap-2 items-end justify-between p-4 text-secondary col-span-1 sm:col-span-2 sm:flex-col sm:items-start xl:col-span-2">
          <div className="">Available Balance</div>
          <div className="text-2xl font-bold">&#8377;{balance}</div>
        </div>
        <div className=" border-identity border-2 rounded-lg flex gap-2 items-end justify-between p-4 col-span-1 sm:col-span-2 sm:flex-col sm:items-start xl:col-span-2">
          <div>Total Income</div>
          <div className="text-2xl font-bold">&#8377;{totalIncome}</div>
        </div>
        <div className="border-identity border-2 rounded-lg flex gap-2 items-end justify-between sm:col-span-2 p-4  col-span-1 sm:flex-col sm:items-start xl:col-span-2">
          <div>Total Expenditure</div>
          <div className="text-2xl font-bold">&#8377;{totalExpenditure}</div>
        </div>
      {/* </div> */}

        <div className="sm:col-span-3 xl:col-span-2 xl:max-h-full ">
          <UserRadarChart data = {categoryWiseExpenses} month={months[month] } year={year} userCategories={userCategories}/>
        </div>
        <div className="sm:col-span-3 xl:col-span-2">
          <UserExpenseLineChart data = {lastSixMonthsExpenses} month={months[month] } year={year} userCategories={userCategories} />
        </div>
        <div className="sm:col-span-3 xl:col-span-2">
          <UserIncomeLineChart data={lastSixMonthsIncomeData} month={months[month] } year={year} />
        </div>
        <div className="sm:col-span-6 xl:col-span-4">
          <UserContributionChart data = {lastSixMonthsDailyExpenses} month = {months[month]}/>
        </div>
      </div>
    


      {/* <div className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:row-span-21 xl:grid-cols-3 xl:row-span-21 md:gap-4 "> */}
        {/* <div className="col-span-1 row-span-3">
          <UserCard  variant="identity" title="Available Balance" data={balance} />
        </div>
        <div className="col-span-1 row-span-3">
          <UserCard variant="secondary" title="Total Income" data={totalIncome} />
        </div>
        <div className="col-span-1 row-span-3">
          <UserCard variant="secondary" title="Total Expenditure" data={totalExpenditure} />
        </div> */}
    </>
  );
}

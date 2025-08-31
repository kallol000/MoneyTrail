"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../../login/actions";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getUser, getIncome, getUserCategories, getMonthlyExpenses } from "../../api/fetch/route";
import { UserBarChart } from "@/components/ui/UserBarChart";
import { expenseRow, timeSeriesExpenseRow } from "../../utils/lib/types";
import UserTabs from "@/components/ui/userTabs";
import UserCard from "@/components/ui/userCard";
import { userCategoriesRecord } from "../../utils/lib/types";
import { UserRadarChart } from "@/components/ui/UserRadarChart";
import { getCategoryWiseMonthlyExpenses, getCategoryWiseSixMonthsExpenses } from "../../api/fetch/route";
import { months } from "@/app/utils/lib/helpers";
import { UserLineChart } from "@/components/ui/userLineChart";

type analyticsPageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};


export default function AnalyticsView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, homeRefresh, setHomeRefresh}: analyticsPageProps) {
  

  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState<expenseRow[]>([]);
  const [lastSixMonthsExpenses, setLastSixMonthsExpenses] = useState<timeSeriesExpenseRow[]>([]);


  const fetchCategoryWiseMonthlyExpenses = async () => {
    const res = await getCategoryWiseMonthlyExpenses(year, month);
    const data = await res.json();
    setCategoryWiseExpenses(data);
  }

  const fetchCategoryWiseLastSixMonthsExpenses = async () => {
    const res = await getCategoryWiseSixMonthsExpenses(year, month);
    const data = await res.json();
    setLastSixMonthsExpenses(data);
  }

  useEffect(() => {
    fetchCategoryWiseMonthlyExpenses()
    fetchCategoryWiseLastSixMonthsExpenses()
  }, [year, month, homeRefresh])
  

  return (
    <>
      <div className="py-4 grid grid-cols-8 gap-4">
        <UserCard variant="identity" title="Available Balance" data={balance} />
        <UserCard variant="secondary" title="Total Income" data={totalIncome} />
        <div className="col-span-2 row-span-3">
          <UserRadarChart data = {categoryWiseExpenses} month={months[month] } year={year} userCategories={userCategories}/>
        </div>
        <div className="col-span-2 row-span-3">
          <UserLineChart data = {lastSixMonthsExpenses} month={months[month] } year={year} />
        </div>
        <UserCard variant="secondary" title="Total Expenditure" data={totalExpenditure} />
        <UserCard variant="secondary" title="Total Investments" />
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../../login/actions";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getUser, getIncome, getUserCategories, getMonthlyExpenses } from "../../api/fetch/route";
import { UserBarChart } from "@/components/ui/UserBarChart";
import { expenseRow } from "../../utils/lib/types";
import UserTabs from "@/components/ui/userTabs";
import UserCard from "@/components/ui/userCard";
import { userCategoriesRecord } from "../../utils/lib/types";

type analyticsPageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};


export default function AnalyticsView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, homeRefresh, setHomeRefresh}: analyticsPageProps) {
  

  

  // console.log(userCategories);

  return (
    <>
      <div className="p-4 grid grid-cols-6 gap-4">
        <UserCard variant="identity" title="Available Balance" data={totalIncome} />
        <UserCard variant="secondary" />
        <div className="col-span-2 row-span-5">
        <UserCard variant="secondary" />
        </div>
        <div className="col-span-2 row-span-5">
        <UserCard variant="secondary" />
        </div>
          <UserCard variant="secondary" />
        <UserCard variant="secondary" />
        <div className="col-span-2 row-span-4">
        <UserCard variant="secondary" />
        </div>
        <UserCard variant="secondary" />
        <UserCard variant="secondary" />
        <UserCard variant="secondary" />
        <UserCard variant="secondary" />
        <UserCard variant="secondary" />
        <UserCard variant="secondary" />
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../../login/actions";
import { useState, useEffect } from "react";
import { getUser, getIncome, getUserCategories, getMonthlyExpenses, getDateWiseExpenses } from "../../api/fetch/route";
import { UserBarChart } from "@/components/ui/UserBarChart";
import { expenseRow } from "../../utils/lib/types";
import UserTabs from "@/components/ui/userTabs";

export default function TimeSeries() {
  const [user, setUser] = useState<string>("")
  const [incomeData, setIncomeData] = useState();
  const [userCategories, setUserCategories] = useState();
  const [monthlyExpenses, setMonthlyExpenses] = useState<expenseRow[]>([])

  const fetchUser = async () => {
    const res = await getUser()
    const data = await res.json()
    setUser(data.user.id)
  }
  
  const fetchIncome = async () => {
    const res = await getIncome();
    const data = await res.json();
    setIncomeData(data);
  };
  
  const fetchUserCategories = async () => {
    const res = await getUserCategories();
    const data = await res.json();
    setUserCategories(data);
  };
  
  const fetchMonthlyExpenses = async () => {
    const res = await getMonthlyExpenses(user)
    const data = await res.json()
    // console.log(data)
    setMonthlyExpenses(data)
  }
  
  
  useEffect(() => {
    fetchIncome();
    fetchUserCategories();
    fetchUser()

  }, []);

  useEffect(() => {
    // console.log("helloooo")
    if(user) {
      fetchMonthlyExpenses()
    }
  }, [user])

  console.log(userCategories);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <UserBarChart data = {monthlyExpenses} category="Food"/>
        <UserBarChart data = {monthlyExpenses} category="Grocery"/>
        {/* <UserBarChart />
        <UserBarChart />
        <UserBarChart /> */}
      </div>
    </>
  );
}

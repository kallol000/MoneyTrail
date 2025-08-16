"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import { useState, useEffect } from "react";
import { getUser, getIncome, getUserCategories, getMonthlyExpenses } from "../api/fetch/route";
import { ChartBarDefault } from "@/components/ui/chartBar";


export default function Home() {
  const [user, setUser] = useState<string>("")
  const [incomeData, setIncomeData] = useState();
  const [userCategories, setUserCategories] = useState();

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
    console.log(data)
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
    <div className="p-4 grid grid-cols-4 gap-4">
      <ChartBarDefault />
      <ChartBarDefault />
      <ChartBarDefault />
      <ChartBarDefault />
    </div>
  );
}

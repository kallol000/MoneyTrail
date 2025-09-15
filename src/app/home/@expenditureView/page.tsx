"use client";
import { useState, useEffect, useTransition, Dispatch, SetStateAction } from "react";
import { mapUserCategories, mapUserCategoryNumbers} from "@/app/utils/lib/helpers";
import { expenseRecord, userCategoriesRecord} from "@/app/utils/lib/types";
import UserTable from "@/components/ui/userTable";
import { Toaster } from "@/components/ui/sonner";
import { UserIncomePopover } from "@/components/ui/UserIncomePopover";
import { UserCategoriesPopover } from "@/components/ui/UserCategoriesPopover";
import axios from "axios";

type expenditurePageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};

export default function ExpenditureView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, homeRefresh, setHomeRefresh}: expenditurePageProps) {
  
  const [expenseData, setExpenseData] = useState<expenseRecord[]>([]);
  const [categoryNamesMap, setCategoryNamesMap] = useState<Map<string, number>>(new Map());
  const [categoryNumbersMap, setCategoryNumbersMap] = useState<Map<number, string>>(new Map());
  const [isFetchPending, startFetchTransition] = useTransition();
  

  //fetch an user's date wise expenditures
  const fetchDateWiseExpenses = async () => {
    const res = await axios.get(`/api/expenditure/month-datewise?year=${year}&month=${month}`)
    const data = res.data;
    setExpenseData(data);
  };

  
  useEffect(() => {
    startFetchTransition(async () => {
      if (user) {
        fetchDateWiseExpenses();
      }
    });
  }, [user, year, month, homeRefresh]);

  

  useEffect(() => {
    const namesMap = mapUserCategories(userCategories);
    const numbersMap = mapUserCategoryNumbers(userCategories);
    setCategoryNamesMap(namesMap);
    setCategoryNumbersMap(numbersMap);
  }, [userCategories]);


  return (
    <>
      <div className="grid row-span-3 grid-cols-10">
        <div className="bg-identity border-none rounded-lg flex flex-col items-start p-4 text-secondary col-span-8 sm:col-span-5 md:col-span-5 xl:col-span-3">
          <div>Available Balance</div>
          <span className="text-2xl font-bold">&#8377;{balance}</span>
        </div>
        <div className="col-[span-8/span-10]">
          <div className="flex flex-col md:flex-row justify-items-end gap-2">
            <UserIncomePopover
              income={totalIncome}
              month={month}
              year={year}
              setHomeRefresh={setHomeRefresh}
            />
            <UserCategoriesPopover setHomeRefresh={setHomeRefresh} />
          </div>
        </div>
      </div>
      <div className="row-span-18 h-full overflow-scroll
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <UserTable
          data={expenseData}
          categoryNamesMap={categoryNamesMap}
          categoryNumbersMap={categoryNumbersMap}
          setHomeRefresh={setHomeRefresh}
          userCategories={userCategories}
        />
      </div>
      <Toaster richColors />
    </>  
  );
}

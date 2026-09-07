"use client";
import { useState, useEffect, useTransition, Dispatch, SetStateAction } from "react";
import { mapUserCategories, mapUserCategoryNumbers} from "@/app/utils/lib/helpers";
import { expenseRecord, userCategoriesRecord} from "@/app/utils/lib/types";
import UserTable from "@/components/ui/userTable";
import { Toaster } from "@/components/ui/sonner";
import { UserIncomePopover } from "@/components/ui/UserIncomePopover";
import { UserCategoriesPopover } from "@/components/ui/UserCategoriesPopover";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import axios from "axios";

type expenditurePageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, balanceHidden:boolean, setBalanceHidden: Dispatch<SetStateAction<boolean>>, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};

export default function ExpenditureView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, balanceHidden, setBalanceHidden, homeRefresh, setHomeRefresh}: expenditurePageProps) {
  
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
      <div className="grid grid-cols-10 gap-2">
        <div className="bg-identity border-none rounded-lg flex flex-col items-start p-4 text-secondary col-span-10 sm:col-span-5 md:col-span-5 xl:col-span-3">
          <div>Available Balance</div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold">&#8377;{balanceHidden ? "••••" : balance}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-secondary hover:bg-white/20 hover:text-secondary"
              onClick={() => setBalanceHidden((prev) => !prev)}
            >
              {balanceHidden ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </Button>
          </div>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-5 xl:col-span-7">
          <div className="flex flex-col md:flex-row md:justify-end gap-2">
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
      <div className="overflow-x-auto">
        <UserTable
          data={expenseData}
          month = {month}
          year = {year}
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

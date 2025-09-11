"use client";
import { useState, useEffect, useTransition, Dispatch, SetStateAction } from "react";
import { mapUserCategories, mapUserCategoryNumbers} from "@/app/utils/lib/helpers";
import { expenseRecord, userCategoriesRecord} from "@/app/utils/lib/types";
import UserTable from "@/components/ui/userTable";
import { Toaster } from "@/components/ui/sonner";
import { UserIncomePopover } from "@/components/ui/UserIncomePopover";
import { UserCategoriesPopover } from "@/components/ui/UserCategoriesPopover";
import { Card, CardHeader } from "@/components/ui/card";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";


type expenditurePageProps = {user:string, userCategories:userCategoriesRecord[], year:number, month:number, totalIncome:number, totalExpenditure:number, balance:number, homeRefresh: boolean, setHomeRefresh: Dispatch<SetStateAction<boolean>>};


export default function ExpenditureView({user, userCategories, year, month, totalIncome, totalExpenditure, balance, homeRefresh, setHomeRefresh}: expenditurePageProps) {
  
//   const [user, setUser] = useState<string>("");
  const [expenseData, setExpenseData] = useState<expenseRecord[]>([]);
  
  const [categoryNamesMap, setCategoryNamesMap] = useState<Map<string, number>>(new Map());
  const [categoryNumbersMap, setCategoryNumbersMap] = useState<Map<number, string>>(new Map());
  const [isFetchPending, startFetchTransition] = useTransition();
  
  
  // console.log("user",user)

  // to fetch monthly expenses
  const fetchDateWiseExpenses = async () => {
    // const res = await getDateWiseExpenses(year,month);
    const res = await fetch(`/api/expenditure/month-datewise?year=${year}&month=${month}`)
    const data = await res.json();
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
        <div className="bg-identity border-none rounded-lg flex flex-col items-start p-4 text-secondary col-span-3">
          <div>Available Balance</div>
          <span className="text-2xl font-bold">&#8377;{balance}</span>
        </div>
          {/* <Card className="bg-identity border-none text-secondary col-span-3">
            <CardHeader className=" items-end font-semibold">
              <div className="flex items-center gap-4">
                <span className="text-md ">Available Balance</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InformationCircleIcon className="size-5 text-secondary/75 hover:text-secondary cursor-pointer " />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="text-sm bg-secondary text-primary shadow-xl"
                  >
                    <p>Total Income: {totalIncome}</p>
                    <p>Total Expenditure: {totalExpenditure}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-2xl font-bold">&#8377;{balance}</span>
            </CardHeader>
          </Card> */}
        <div className="col-[span-8/span-10] justify-items-center">
          <div className="flex items-center gap-2">
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
      <div className="row-span-18  h-full overflow-scroll
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

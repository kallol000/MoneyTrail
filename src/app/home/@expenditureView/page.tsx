"use client";
import { useState, useEffect, useTransition, Dispatch, SetStateAction } from "react";
import { mapUserCategories, mapUserCategoryNumbers} from "@/app/utils/lib/helpers";
import { expenseRecord, userCategoriesRecord} from "@/app/utils/lib/types";
import UserTable from "@/components/ui/userTable";
import { getDateWiseExpenses} from "@/app/api/fetch/route";
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
  
  
  console.log("user",user)

  // to fetch monthly expenses
  const fetchDateWiseExpenses = async () => {
    const res = await getDateWiseExpenses(year,month);
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
    <div className="mt-4 flex flex-col gap-4 h-full">
      <div className="flex flex-row gap-4 items-top justify-between">
        <div className="basis-2/6">
          <Card className="bg-identity border-none text-secondary ">
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
          </Card>
        </div>
        {/* <div className="flex items-center gap-4">
                    </div> */}
        <div className="basis-2/3 flex gap-4 justify-end">
          <UserIncomePopover
            income={totalIncome}
            month={month}
            year={year}
            setHomeRefresh={setHomeRefresh}
          />
          <UserCategoriesPopover setHomeRefresh={setHomeRefresh} />
         
          
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <UserTable
          data={expenseData}
          categoryNamesMap={categoryNamesMap}
          categoryNumbersMap={categoryNumbersMap}
          setHomeRefresh={setHomeRefresh}
          userCategories={userCategories}
        />
      </div>
      <Toaster richColors />
    </div>
  );
}

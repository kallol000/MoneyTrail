"use client";
import { useState, useEffect, useTransition } from "react";
import { UserSelect } from "@/components/ui/userSelect";
import {
  months,
  daysInMonth,
  monthsinNumber,
  mapUserCategories,
  mapUserCategoryNumbers,
} from "@/app/utils/lib/helpers";
import {
  monthYear,
  expenseRecord,
  userCategoriesRecord,
} from "@/app/utils/lib/types";
import UserTable from "@/components/ui/userTable";
import {
  getUser,
  getDateWiseExpenses,
  getUserCategories,
  getMonthlyIncome,
  getMonthlyExpense,
} from "@/app/api/fetch/route";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { UserIncomePopover } from "@/components/ui/UserIncomePopover";
import { UserCategoriesPopover } from "@/components/ui/UserCategoriesPopover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function UpdateDataPage() {
  const [selectedMonthYear, setSelectedMonthYear] = useState<monthYear>({
    month: months[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
  });
  const [user, setUser] = useState<string>("");
  const [expenseData, setExpenseData] = useState<expenseRecord[]>([]);
  const [userCategories, setUserCategories] = useState<userCategoriesRecord[]>(
    []
  );
  const [categoryNamesMap, setCategoryNamesMap] = useState<Map<string, number>>(
    new Map()
  );
  const [categoryNumbersMap, setCategoryNumbersMap] = useState<
    Map<number, string>
  >(new Map());
  const [isFetchPending, startFetchTransition] = useTransition();
  const [homeRefresh, setHomeRefresh] = useState<boolean>(false);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenditure, setTotalExpenditure] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  // const []

  // to fetch user details
  const fetchUser = async () => {
    const res = await getUser();
    const data = await res.json();
    setUser(data.user.id);
  };

  // to fetch user categories
  const fetchUserCategories = async () => {
    const res = await getUserCategories();
    const data = await res.json();
    setUserCategories(data);
  };

  // to fetch monthly expenses
  const fetchDateWiseExpenses = async () => {
    const res = await getDateWiseExpenses(
      parseInt(selectedMonthYear.year),
      monthsinNumber[selectedMonthYear.month]
    );
    const data = await res.json();
    setExpenseData(data);
  };

  const fetchMonthlyIncome = async () => {
    try {
      const res = await getMonthlyIncome(
        parseInt(selectedMonthYear.year),
        monthsinNumber[selectedMonthYear.month]
      );
      const data = await res.json();
      setTotalIncome(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMonthlyExpenditure = async () => {
    try {
      const res = await getMonthlyExpense(
        parseInt(selectedMonthYear.year),
        monthsinNumber[selectedMonthYear.month]
      );
      const data = await res.json();
      setTotalExpenditure(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMonthYearChange = (value: string, name: string) => {
    setSelectedMonthYear((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserCategories();
    }
  }, [user, selectedMonthYear, homeRefresh]);

  useEffect(() => {
    startFetchTransition(async () => {
      if (user) {
        fetchDateWiseExpenses();
        fetchMonthlyIncome();
        fetchMonthlyExpenditure();
      }
    });
  }, [user, selectedMonthYear, homeRefresh]);

  useEffect(() => {
    setBalance((prev) => {
      if (totalIncome && totalExpenditure) {
        prev = totalIncome - totalExpenditure;
      }
      return prev;
    });
  }, [totalIncome, totalExpenditure]);

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
          <Card className="bg-identity/85 border-none text-secondary ">
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
            month={monthsinNumber[selectedMonthYear.month]}
            year={parseInt(selectedMonthYear.year)}
            setHomeRefresh={setHomeRefresh}
          />
          <UserCategoriesPopover setHomeRefresh={setHomeRefresh} />
          <UserSelect
            name="month"
            label="Month"
            data={months}
            value={selectedMonthYear.month}
            onChange={handleMonthYearChange}
          />
          <UserSelect
            name="year"
            label="Year"
            data={["2024", "2025", "2026"]}
            value={selectedMonthYear.year}
            onChange={handleMonthYearChange}
          />
          {isFetchPending ? <Spinner /> : undefined}
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

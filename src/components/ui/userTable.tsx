import { expenseRecord, userCategoriesRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ReactNode } from "react";
import { UserExpensePopover } from "./UserExpensePopover";
import { comparator } from "@/app/utils/lib/helpers";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./button";
import { Copy } from "./icons";
import { UserCopyExpenditurePopover } from "./userCopyExpenditurePopover";
import { months } from "@/app/utils/lib/helpers";
import { useMediaQuery } from "@/app/utils/lib/hooks/useMediaQuery";

export default function UserTable({
  data,
  month,
  year,  
  categoryNamesMap,
  categoryNumbersMap,
  userCategories,
  setHomeRefresh,
}: {
  data: expenseRecord[];
  month: number;
  year: number;
  categoryNamesMap: Map<string, number>;
  categoryNumbersMap: Map<number, string>;
  userCategories: userCategoriesRecord[];
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
}) {
  const [tableHeaders, setTableHeaders] = useState<ReactNode[]>([]);
  const [tableBody, setTableBody] = useState<ReactNode[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    // if (data.length > 0) {
    setColumns((prev) => {
      const categories = userCategories.map((category) => category.name);
      return ["date", ...categories];
    });
  }, [data, userCategories]);


  useEffect(() => {
    if (data?.length > 0) {
      setTableHeaders(
        columns.map((column, index) => (
          <th className="text-xs p-2" key={index}>
            <div className="flex gap-2 items-center justify-center">
              
              {column.substring(0, 1).toUpperCase() +
                column.substring(1, column.length)}
              
              {/* <Button variant={"ghost"}> */}
                <UserCopyExpenditurePopover 
                  month={month}
                  year={year}
                  categoryName={column}
                  categoryId={categoryNamesMap.get(column)!}
                  setHomeRefresh={setHomeRefresh}
                />
              {/* </Button> */}
            </div>
          </th>
        ))
      );
    }
  }, [columns]);

  useEffect(() => {
    if (data?.length > 0 && columns) {
      setTableBody((prev) =>
        data.map((day, index) => (
          <tr key={index} className="hover:bg-secondary/40">
            {columns.map((colName, idx) => (
              <td className="min-w-32 2xl:min-w-38 border-b-1 border-collapse" key={idx}>
                <div className="min-w-32 2xl:min-w-38 flex items-center justify-between text-xs  p-2">
                  <div className="flex items-center justify-center w-full">
                    {day[colName] === 0 ? "-" : day[colName]}
                  </div>
                  <div>
                    {colName === "date" ? (
                      ""
                    ) : (
                      <UserExpensePopover
                        icon={day[colName] === 0 ? "add" : "view"}
                        date={day.date}
                        categoryName={colName}
                        categoryId={categoryNamesMap.get(colName)!}
                        setHomeRefresh={setHomeRefresh}
                      />
                    )}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))
      );
    }
  }, [columns, categoryNamesMap]);

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-3">
        {data?.map((day, index) => (
          <div key={index} className="rounded-lg border bg-card p-3">
            <div className="text-sm font-semibold mb-1">{day.date}</div>
            <div className="flex flex-col divide-y divide-border">
              {columns
                .filter((colName) => colName !== "date")
                .map((colName, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{colName}</span>
                    <div className="flex items-center gap-2">
                      <span>{day[colName] === 0 ? "-" : day[colName]}</span>
                      <UserExpensePopover
                        icon={day[colName] === 0 ? "add" : "view"}
                        date={day.date}
                        categoryName={colName}
                        categoryId={categoryNamesMap.get(colName)!}
                        setHomeRefresh={setHomeRefresh}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="max-w-full">
      <thead>
        <tr className="bg-secondary sticky top-0">{tableHeaders}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
}

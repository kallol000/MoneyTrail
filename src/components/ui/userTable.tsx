import { expenseRecord, userCategoriesRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ReactNode } from "react";
import { UserExpensePopover } from "./UserExpensePopover";
import { comparator } from "@/app/utils/lib/helpers";
import { Dispatch, SetStateAction } from "react";

export default function UserTable({
  data,
  categoryNamesMap,
  categoryNumbersMap,
  userCategories,
  setHomeRefresh,
}: {
  data: expenseRecord[];
  categoryNamesMap: Map<string, number>;
  categoryNumbersMap: Map<number, string>;
  userCategories: userCategoriesRecord[];
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
}) {
  const [tableHeaders, setTableHeaders] = useState<ReactNode[]>([]);
  const [tableBody, setTableBody] = useState<ReactNode[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    // if (data.length > 0) {
    setColumns((prev) => {
      const categories = userCategories.map((category) => category.name);
      return ["date", ...categories];
    });
  }, [data, userCategories]);

  useEffect(() => {
    if (data.length > 0) {
      setTableHeaders(
        columns.map((column, index) => (
          <th className="text-xs p-2" key={index}>
            {column.substring(0, 1).toUpperCase() +
              column.substring(1, column.length)}
          </th>
        ))
      );
    }
  }, [columns]);

  useEffect(() => {
    if (data.length > 0 && columns) {
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

  return (
    <table className="max-w-full">
      <thead>
        <tr className="bg-secondary ">{tableHeaders}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
}

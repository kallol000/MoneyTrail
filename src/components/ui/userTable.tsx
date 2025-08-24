import { expenseRecord } from "@/app/utils/lib/types";
import { useState, useEffect, ReactNode } from "react";
import { UserPopover } from "./UserPopover";
import { comparator } from "@/app/utils/lib/helpers";
import { Dispatch, SetStateAction } from "react";

export default function UserTable({
  data,
  categoryNamesMap,
  categoryNumbersMap,
  setRefresh
}: {
  data: expenseRecord[];
  categoryNamesMap: Map<string, number>,
  categoryNumbersMap: Map<number, string>,
  setRefresh: Dispatch<SetStateAction<boolean>>
}) {
  const [tableHeaders, setTableHeaders] = useState<ReactNode[]>([]);
  const [tableBody, setTableBody] = useState<ReactNode[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setColumns(Object.keys(data[0]).sort(comparator));
    }
  }, [data])


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
          <tr key={index}>
            {columns.map((colName, idx) => (
              <td className="min-w-32 border border-collapse" key={idx}>
                <div className="min-w-32 flex items-center justify-between text-xs  p-2">
                  <div className="flex items-center justify-center w-full">
                    {day[colName] === 0 ? "-" : day[colName]}
                  </div>
                  <div>
                    {colName === "date" ? 
                      ""
                    : (
                      <UserPopover
                        icon={day[colName] === 0 ? "add" : "view"}
                        date={day.date}
                        categoryName = {colName}
                        categoryId={categoryNamesMap.get(colName)!}
                        setRefresh = {setRefresh}
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
    <div
      className="
            max-w-screen max-h-full overflow-scroll 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <table className="w-full">
        <thead>
          <tr className="bg-secondary ">{tableHeaders}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}

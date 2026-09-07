import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { expenseRecord } from "@/app/utils/lib/types";
import { daysInMonth, months } from "@/app/utils/lib/helpers";
import { UserDayExpenseDialog } from "./userDayExpenseDialog";

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type userExpenseCalendarProps = {
  data: expenseRecord[];
  month: number;
  year: number;
  columns: string[];
  categoryNamesMap: Map<string, number>;
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
};

export function UserExpenseCalendar({
  data,
  month,
  year,
  columns,
  categoryNamesMap,
  setHomeRefresh,
}: userExpenseCalendarProps) {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);

  const categories = useMemo(
    () => columns.filter((column) => column !== "date"),
    [columns]
  );

  const dataByDay = useMemo(() => {
    const map = new Map<number, expenseRecord>();
    data?.forEach((day) => {
      map.set(new Date(day.date).getDate(), day);
    });
    return map;
  }, [data]);

  const maxTotal = useMemo(
    () => Math.max(1, ...(data ?? []).map((day) => day.total || 0)),
    [data]
  );

  const totalDays = daysInMonth(month, year);
  const leadingBlanks = new Date(year, month - 1, 1).getDay();

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const selectedDay = selectedDayNumber ? dataByDay.get(selectedDayNumber) : undefined;
  const selectedDate = selectedDayNumber
    ? selectedDay?.date ?? `${year}-${pad(month)}-${pad(selectedDayNumber)}`
    : "";

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-1">
        {weekdayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: leadingBlanks }).map((_, idx) => (
          <div key={`blank-${idx}`} />
        ))}
        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNumber = idx + 1;
          const day = dataByDay.get(dayNumber);
          const total = day?.total ?? 0;
          const opacity = total > 0 ? Math.max(0.15, total / maxTotal) : 0;
          return (
            <button
              key={dayNumber}
              onClick={() => setSelectedDayNumber(dayNumber)}
              className="relative aspect-square rounded-md border flex items-center justify-center text-xs cursor-pointer active:bg-secondary"
            >
              <div
                className="absolute inset-0 bg-identity rounded-md pointer-events-none"
                style={{ opacity }}
              />
              <span className="relative z-10">{dayNumber}</span>
            </button>
          );
        })}
      </div>

      <UserDayExpenseDialog
        open={selectedDayNumber !== null}
        onOpenChange={(open) => !open && setSelectedDayNumber(null)}
        date={selectedDate}
        dayLabel={
          selectedDayNumber ? `${months[month]} ${selectedDayNumber}, ${year}` : ""
        }
        dayTotal={selectedDay?.total ?? 0}
        categories={categories}
        dayData={selectedDay}
        categoryNamesMap={categoryNamesMap}
        setHomeRefresh={setHomeRefresh}
      />
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserExpensePopover } from "./UserExpensePopover";
import { expenseRecord } from "@/app/utils/lib/types";

type userDayExpenseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  dayLabel: string;
  dayTotal: number;
  categories: string[];
  dayData: expenseRecord | undefined;
  categoryNamesMap: Map<string, number>;
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
};

export function UserDayExpenseDialog({
  open,
  onOpenChange,
  date,
  dayLabel,
  dayTotal,
  categories,
  dayData,
  categoryNamesMap,
  setHomeRefresh,
}: userDayExpenseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dayLabel}</DialogTitle>
          <p className="text-muted-foreground text-sm">
            {dayTotal > 0 ? `Total spent: ₹${dayTotal}` : "No expenditure logged"}
          </p>
        </DialogHeader>
        <div className="flex flex-col divide-y divide-border">
          {categories.map((categoryName, idx) => {
            const amount = dayData ? dayData[categoryName] : 0;
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 py-2 text-sm"
              >
                <span className="text-muted-foreground">{categoryName}</span>
                <div className="flex items-center gap-2">
                  <span>{!amount ? "-" : amount}</span>
                  <UserExpensePopover
                    icon={!amount ? "add" : "view"}
                    date={date}
                    categoryName={categoryName}
                    categoryId={categoryNamesMap.get(categoryName)!}
                    setHomeRefresh={setHomeRefresh}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

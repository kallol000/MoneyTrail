import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { userCategoriesRecord } from "@/app/utils/lib/types";
import { UserCopyExpenditurePopover } from "./userCopyExpenditurePopover";
import { Copy } from "./icons";

type userCopyLastMonthDialogProps = {
  userCategories: userCategoriesRecord[];
  month: number;
  year: number;
  setHomeRefresh: Dispatch<SetStateAction<boolean>>;
};

export function UserCopyLastMonthDialog({
  userCategories,
  month,
  year,
  setHomeRefresh,
}: userCopyLastMonthDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs flex items-center gap-1">
          <Copy /> Copy Last Month
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Copy from last month</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Pick a category to copy last month&apos;s expenses into this month.
          </p>
        </DialogHeader>
        <div className="flex flex-col divide-y divide-border">
          {userCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between gap-2 py-2 text-sm"
            >
              <span>{category.name}</span>
              <UserCopyExpenditurePopover
                month={month}
                year={year}
                categoryName={category.name}
                categoryId={category.id}
                setHomeRefresh={setHomeRefresh}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

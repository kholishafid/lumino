import { format } from "date-fns";
import { InfoIcon, PrinterIcon, XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { useAppStore } from "@/shared/store/use-app-store";

import SubtasksList from "../subtask/subtaks.list";
import { TaskInput } from "./task-input";
import { TaskDrawerData } from "./task-drawer-data";

export default function TaskDrawer() {
  const { drawerState: drawer, toggleDrawer } = useAppStore(
    (state) => state.tasks,
  );
  return (
    <Card
      className={cn(
        "shadow-none transition-all p-4 max-h-full grow-0 basis-1/2 overflow-x-hidden",
        drawer.isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon-sm"} variant={"outline"} className="mr-2">
              <InfoIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="text-xs flex flex-col gap-2 "
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 text-end text-slate-500">
                Created :
              </div>
              <div className="col-span-2">
                {drawer.data?.createdAt
                  ? format(drawer.data?.createdAt, "eeee, dd MMMM yyyy")
                  : ""}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 text-end text-slate-500">
                Updated :
              </div>
              <div className="col-span-2">
                {drawer.data?.updatedAt
                  ? format(drawer.data?.updatedAt, "eeee, dd MMMM yyyy")
                  : ""}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button size={"icon-sm"} variant={"outline"}>
          <PrinterIcon />
        </Button>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => toggleDrawer(false)}
          className="ml-auto"
        >
          <XIcon className="h-4 w-4" />
          Close
        </Button>
      </div>
      <TaskDrawerData />
      <hr />
      <div className="h-full">
        <div className="mb-2">
          <strong>Subtask</strong>
        </div>
        <div className="h-full">
          <TaskInput createTarget="subtask" id={drawer.data?.id} />
          <SubtasksList taskId={drawer.data?.id || ""} />
        </div>
      </div>
    </Card>
  );
}

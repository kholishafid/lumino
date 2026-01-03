import { ChevronsDownIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

export default function PriorityPicker({
  value: valueProp,
  onValueChange,
  defaultValue,
}: {
  value?: "low" | "medium" | "high" | undefined;
  onValueChange?: (date: "low" | "medium" | "high" | undefined) => void;
  defaultValue?: "low" | "medium" | "high" | undefined;
}) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? undefined,
    onChange: onValueChange,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          {value && value === "low" ? (
            <div className="flex gap-2 items-center">
              <div className="size-3 rounded-full bg-green-400"></div> Low
            </div>
          ) : null}
          {value && value === "medium" ? (
            <div className="flex gap-2 items-center">
              <div className="size-3 rounded-full bg-amber-400"></div> Medium
            </div>
          ) : null}
          {value && value === "high" ? (
            <div className="flex gap-2 items-center">
              <div className="size-3 rounded-full bg-orange-6 00"></div> High
            </div>
          ) : null}
          {value === undefined ? (
            <>
              <ChevronsDownIcon />
              Priority
            </>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" data-form-scope>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setValue("low")}>
            {" "}
            <div className="size-3 rounded-full bg-green-400"></div> Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setValue("medium")}>
            {" "}
            <div className="size-3 rounded-full bg-amber-400"></div> Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setValue("high")}>
            {" "}
            <div className="size-3 rounded-full bg-orange-600"></div> High
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

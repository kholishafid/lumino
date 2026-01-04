import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export default function DueDatePicker({
	value: valueProp,
	onValueChange,
	defaultValue,
	onOpen,
}: {
	value?: Date | undefined;
	onValueChange?: (date: Date | undefined) => void;
	defaultValue?: Date | undefined;
	onOpen?: (open: boolean) => void;
}) {
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? undefined,
		onChange: onValueChange,
	});
	return (
		<DropdownMenu
			modal={true}
			onOpenChange={(e) => (e === true ? onOpen?.(true) : null)}
		>
			<DropdownMenuTrigger asChild>
				<Button size={"sm"} variant={"outline"} onClick={() => onOpen?.(true)}>
					<CalendarIcon />
					{value
						? value.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})
						: "No due date"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="min-w-[200px]"
				data-form-scope
			>
				<DropdownMenuItem onClick={() => setValue(new Date())}>
					Today
					<DropdownMenuShortcut>
						{new Date().toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})}
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setValue(new Date(Date.now() + 24 * 60 * 60 * 1000))}
				>
					Tomorrow{" "}
					<DropdownMenuShortcut>
						{new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(
							"en-US",
							{
								month: "short",
								day: "numeric",
							},
						)}
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						setValue(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
					}
				>
					1 week{" "}
					<DropdownMenuShortcut>
						{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
							"en-US",
							{
								month: "short",
								day: "numeric",
							},
						)}
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setValue(undefined)}>
					No due date
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Date Picker</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent className="w-[250px]">
							<Calendar
								selected={value}
								onSelect={setValue}
								className="w-full"
								mode="single"
							/>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

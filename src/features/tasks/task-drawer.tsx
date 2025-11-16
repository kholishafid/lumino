import { format } from "date-fns";
import { id } from "date-fns/locale";
import { InfoIcon, PrinterIcon, XIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { useAppStore } from "@/shared/store/use-app-store";
import { TaskInput } from "./task-input";

export default function TaskDrawer() {
	const { drawerState: drawer, toggleDrawer } = useAppStore(
		(state) => state.tasks,
	);
	return (
		<Card
			className={cn(
				"shadow-none h-full transition-all p-4",
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
							<div className="col-span-1 text-end text-slate-500">Created :</div>
							<div className="col-span-2">
								{drawer.data
									? format(drawer.data?.createdAt, "eeee, dd MMMM yyyy")
									: ""}
							</div>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="col-span-1 text-end text-slate-500">Updated :</div>
							<div className="col-span-2">
								{drawer.data
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
			<div>
				<div className="mb-3">
					<h3 className="text-3xl">{drawer.data?.title}</h3>
				</div>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-6">
						<div className="col-span-2">
							<Label className="text-sm text-slate-500">Due Date</Label>
						</div>
						<div className="col-span-4"></div>
					</div>
					<div className="grid grid-cols-6">
						<div className="col-span-2">
							<Label className="text-sm text-slate-500">Description</Label>
						</div>
						<div className="col-span-4">
							<p>{drawer.data?.description || "No description provided."}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="mb-2">
					<strong>Subtask</strong>
				</div>
				<div>
					<TaskInput />
				</div>
			</div>
		</Card>
	);
}

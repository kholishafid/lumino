import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { format } from "date-fns";
import { InfoIcon, PrinterIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import taskService from "@/shared/services/task-service";
import { useAppStore } from "@/shared/store/use-app-store";
import type ApiResponse from "@/shared/types/api-response";
import type { Task } from "@/shared/types/task";
import { TaskInput } from "./task-input";

export default function TaskDrawer() {
	const { drawerState: drawer, toggleDrawer } = useAppStore(
		(state) => state.tasks,
	);
	return (
		<Card
			className={cn(
				"shadow-none w-1/2 transition-all p-4 max-h-full grow overflow-x-hidden flex-1 shrink",
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
			<TaskDetail />
			<div>
				<div className="mb-2">
					<strong>Subtask</strong>
				</div>
				<div>
					<TaskInput createTarget="subtask" id={drawer.data?.id} />
					{JSON.stringify(drawer.data)}
				</div>
			</div>
		</Card>
	);
}

function TaskDetail() {
	const { drawerState: drawer, toggleDrawer } = useAppStore(
		(state) => state.tasks,
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: this is intended to update textarea height
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [textareaRef.current]);

	const queryClient = useRouteContext({
		from: "/_authenticated/",
		select: (ctx) => ctx.queryClient,
	});

	const mutation = useMutation({
		mutationFn: taskService.updateTask,
		onMutate() {
			toast.loading("Updating task...", { id: "update-task" });
		},
		onSuccess: (data: ApiResponse<Task>) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			toast.success(
				`Task "${JSON.stringify(data.data.title)}" updated successfully.`,
				{ id: "update-task" },
			);
			toggleDrawer(true, data.data);
		},
	});

	function handleUpdate(data: Partial<Task>, target: keyof Task) {
		if (!drawer.data) return;
		if (data[target] === drawer.data[target]) return;

		mutation.mutate({
			data: {
				...drawer.data,
				...data,
			},
		});
	}

	function updateTextareaHeight() {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}
	return (
		<div>
			<div className="mb-3">
				<textarea
					ref={textareaRef}
					spellCheck={false}
					rows={1}
					className="h-fit resize-none text-2xl font-semibold w-full focus:line-clamp-none max-h-64 focus:h-fit focus:overflow-y-auto focus:bg-orange-50/50 focus:ring-2 outline-0 rounded focus:ring-offset-2 focus:ring-orange-200 transition-all"
					onInput={updateTextareaHeight}
					defaultValue={drawer.data?.title}
					key={drawer.data?.id}
					onKeyDown={(event) => {
						const target = event.target as HTMLTextAreaElement;
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							handleUpdate({ title: target.value }, "title");
							target.blur();
						}
					}}
					onBlur={(event) => {
						const target = event.target as HTMLTextAreaElement;
						handleUpdate({ title: target.value }, "title");
					}}
					onFocus={updateTextareaHeight}
				></textarea>
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
						<input
							type="text"
							className="w-full bg-slate-50 rounded p-2 outline-none"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

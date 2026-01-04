import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronsDownIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Label } from "@/shared/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Textarea } from "@/shared/components/ui/textarea";
import taskService from "@/shared/services/task-service";
import { useAppStore } from "@/shared/store/use-app-store";
import type ApiResponse from "@/shared/types/api-response";
import type { Task } from "@/shared/types/task";

export function TaskDrawerData() {
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

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: taskService.updateTask,
		onMutate() {
			toast.loading("Updating task...", { id: "update-task" });
		},
		onSuccess: (data: ApiResponse<Task>) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			toast.success(`Task "${data.data.title}" updated successfully.`, {
				id: "update-task",
			});
			toggleDrawer(true, data.data);
		},
	});

	function handleUpdate(data: Partial<Task>, target: keyof Task) {
		if (!drawer.data) return;
		if (data[target] === drawer.data[target]) return;

		toggleDrawer(true, {
			...drawer.data,
			...data,
		});

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
			<div className="mb-4">
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
			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-6">
					<div className="col-span-2">
						<Label className="text-sm text-slate-500">Priority</Label>
					</div>
					<div className="col-span-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size={"sm"} variant={"outline"} className="border-b">
									{drawer.data?.priority && drawer.data?.priority === "low" ? (
										<div className="flex gap-2 items-center">
											<div className="size-3 rounded-full bg-green-400"></div>{" "}
											Low
										</div>
									) : null}
									{drawer.data?.priority &&
									drawer.data?.priority === "medium" ? (
										<div className="flex gap-2 items-center">
											<div className="size-3 rounded-full bg-amber-400"></div>{" "}
											Medium
										</div>
									) : null}
									{drawer.data?.priority && drawer.data?.priority === "high" ? (
										<div className="flex gap-2 items-center">
											<div className="size-3 rounded-full bg-orange-600"></div>{" "}
											High
										</div>
									) : null}
									{drawer.data?.priority === undefined ? (
										<>
											<ChevronsDownIcon />
											Priority
										</>
									) : null}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								align="start"
								data-form-scope
							>
								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={() =>
											handleUpdate({ priority: "low" }, "priority")
										}
									>
										{" "}
										<div className="size-3 rounded-full bg-green-400"></div> Low
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleUpdate({ priority: "medium" }, "priority")
										}
									>
										{" "}
										<div className="size-3 rounded-full bg-amber-400"></div>{" "}
										Medium
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleUpdate({ priority: "high" }, "priority")
										}
									>
										{" "}
										<div className="size-3 rounded-full bg-orange-600"></div>{" "}
										High
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="grid grid-cols-6">
					<div className="col-span-2">
						<Label className="text-sm text-slate-500">Due Date</Label>
					</div>
					<div className="col-span-4">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="h-8 text-start px-2 border-b"
								>
									{drawer.data?.dueDate
										? format(
												new Date(drawer.data.dueDate),
												"eeee, dd MMMM yyyy",
											)
										: "Set due date"}
								</Button>
							</PopoverTrigger>
							<PopoverContent align="start" className="w-auto p-0">
								<Calendar
									mode="single"
									month={
										drawer.data?.dueDate
											? new Date(drawer.data.dueDate)
											: undefined
									}
									selected={
										drawer.data?.dueDate
											? new Date(drawer.data.dueDate)
											: undefined
									}
									onSelect={(date) => {
										handleUpdate(
											{ dueDate: date ? date.toISOString() : undefined },
											"dueDate",
										);
									}}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className="grid grid-cols-6">
					<div className="col-span-2">
						<Label className="text-sm text-slate-500">Description</Label>
					</div>
					<div className="col-span-4">
						<Textarea
							defaultValue={drawer.data?.description}
							onKeyDown={(event) => {
								const target = event.target as HTMLTextAreaElement;
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									handleUpdate({ description: target.value }, "description");
									target.blur();
								}
							}}
							onBlur={(event) => {
								const target = event.target as HTMLTextAreaElement;
								handleUpdate({ description: target.value }, "description");
							}}
						></Textarea>
					</div>
				</div>
			</div>
		</div>
	);
}

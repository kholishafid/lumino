import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { CalendarIcon, ChevronsDownIcon, Loader } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
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
import { Kbd } from "@/shared/components/ui/kbd";
import { Textarea } from "@/shared/components/ui/textarea";
import subtaskService from "@/shared/services/subtask-service";
import taskService from "@/shared/services/task-service";

export function TaskInput({
	createTarget,
	id,
}: {
	createTarget?: "task" | "subtask";
	id?: string;
}) {
	const [focused, setFocused] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const queryClient = useRouteContext({
		from: "/_authenticated/",
		select: (ctx) => ctx.queryClient,
	});
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const form = useForm({
		defaultValues: {
			task: "",
		},
		onSubmit: (values) => {
			setIsSubmitting(true);

			if (createTarget === "subtask" && id) {
				subtaskService
					.createSubtask({
						data: { title: values.value.task, description: "" },
						taskId: id,
					})
					.then(() => {
						queryClient.invalidateQueries({ queryKey: [`subtasks-${id}`] });
						form.reset();
						textareaRef.current?.focus();
						setIsSubmitting(false);
						toast.success("Task added successfully!");
						if (textareaRef.current) {
							textareaRef.current.style.height = "auto";
						}
					})
					.catch((error) => {
						console.error("Error adding task:", error);
						setIsSubmitting(false);
					});
			}

			if (!createTarget || createTarget === "task") {
				taskService
					.createTask({
						data: { title: values.value.task, description: "" },
					})
					.then(() => {
						queryClient.invalidateQueries({ queryKey: ["tasks"] });
						form.reset();
						textareaRef.current?.focus();
						setIsSubmitting(false);
						toast.success("Task added successfully!");
						if (textareaRef.current) {
							textareaRef.current.style.height = "auto";
						}
						
					})
					.catch((error) => {
						console.error("Error adding task:", error);
						setIsSubmitting(false);
					});
				return;
			}
		},
	});
	return (
		<div>
			<div>
				<form.Field name="task">
					{(field) => {
						return (
							<Textarea
								ref={textareaRef}
								className="resize-none field-sizing-content"
								placeholder="Write task here"
								onFocus={() => setFocused(true)}
								name={field.name}
								value={field.state.value}
								onBlur={(e) => {
									if (e.target.value === "") setFocused(false);
									field.handleBlur();
								}}
								onChange={(e) => field.handleChange(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										field.state.value !== "" ? form.handleSubmit() : null;
									}
								}}
								disabled={isSubmitting}
								onInput={(event) => {
									const target = event.target as HTMLTextAreaElement;
									target.style.height = "auto";
									target.style.height = `${target.scrollHeight}px`;
								}}
							/>
						);
					}}
				</form.Field>
			</div>
			{focused && (
				<div className="flex justify-between mt-4">
					<div className="flex gap-3">
						<DueDatePicker />
						<Button size={"sm"} variant={"outline"}>
							<ChevronsDownIcon />
							Priority
						</Button>
					</div>
					<form.Subscribe selector={(state) => state.values.task}>
						{(task) => (
							<Button
								size={"sm"}
								disabled={task === "" || isSubmitting}
								type="submit"
								onClick={form.handleSubmit}
							>
								{isSubmitting ? (
									<>
										<Loader className="h-4 w-4 animate-spin" />
										Adding...
									</>
								) : (
									"Add Task"
								)}
								<Kbd variant={"translucent"}>Enter</Kbd>
							</Button>
						)}
					</form.Subscribe>
				</div>
			)}
		</div>
	);
}

function DueDatePicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"sm"} variant={"outline"}>
					<CalendarIcon />
					Due date
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-[200px]">
				<DropdownMenuItem>
					Today
					<DropdownMenuShortcut>
						{new Date().toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})}
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
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
				<DropdownMenuItem>
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
				<DropdownMenuItem>No due date</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Date Picker</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent className="w-[250px]">
							<Calendar className="w-full" />
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

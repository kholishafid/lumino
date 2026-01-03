import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { ChevronsDownIcon, Loader } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Kbd } from "@/shared/components/ui/kbd";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import subtaskService from "@/shared/services/subtask-service";
import taskService from "@/shared/services/task-service";
import DueDatePicker from "./due-date-picker";
import PriorityPicker from "./priority-picker";

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
			dueDate: undefined as Date | undefined,
			priority: undefined as "low" | "medium" | "high" | undefined,
		},
		onSubmit: (values) => {
			setIsSubmitting(true);

			// Create subtask
			if (createTarget === "subtask" && id) {
				subtaskService
					.createSubtask({
						data: {
							title: values.value.task,
							description: "",
							isFinished: false,
							dueDate: values.value.dueDate,
							priority: values.value.priority,
						},
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

			// Ini create task
			if (!createTarget || createTarget === "task") {
				taskService
					.createTask({
						data: {
							title: values.value.task,
							description: "",
							isFinished: false,
							dueDate: values.value.dueDate,
							priority: values.value.priority,
						},
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			onBlur={(e) => {
				if (!e.relatedTarget?.closest("[data-form-scope]")) {
					if (textareaRef.current?.value === "") {
						setFocused(false);
					}
				}
			}}
			data-form-scope
		>
			<div data-form-scope>
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
								onBlur={() => field.handleBlur()}
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
						<DueDatePicker
							onOpen={setFocused}
							onValueChange={(e) =>
								e ? form.setFieldValue("dueDate", e) : null
							}
						/>
						<PriorityPicker
							onValueChange={(e) =>
								e ? form.setFieldValue("priority", e) : null
							}
						/>
					</div>
					<form.Subscribe selector={(state) => state.values.task}>
						{(task) => (
							<Button
								size={"sm"}
								type="submit"
								data-form-scope
								className={cn(task === "" || isSubmitting ? "opacity-50" : "")}
								onClick={() => {
									if (task === "" || isSubmitting) return;
									form.handleSubmit();
								}}
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
		</form>
	);
}

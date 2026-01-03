import { useRouteContext } from "@tanstack/react-router";
import { CheckCheck, Square, SquareCheck, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import taskService from "@/shared/services/task-service";
import { useAppStore } from "@/shared/store/use-app-store";
import type ApiResponse from "@/shared/types/api-response";
import type { Task } from "@/shared/types/task";

export default function TaskSelectedAction() {
	const queryClient = useRouteContext({
		from: "/_authenticated",
		select: (ctx) => ctx.queryClient,
	});

	const { listState, setSelectedTaskIds } = useAppStore((state) => state.tasks);

	function selectAllTask() {
		const tasks = queryClient.getQueryData<ApiResponse<Task[]>>(["tasks"]);
		if (tasks?.data) {
			setSelectedTaskIds(tasks.data.map((task) => task.id));
		}
	}
	const tasksList = queryClient.getQueryData<ApiResponse<Task[]>>(["tasks"]);
	function deselectAllTask() {
		setSelectedTaskIds([]);
	}

	function markTaskComplete() {
		if (listState.selectedTaskIds) {
			taskService.markCompleted({ ids: listState.selectedTaskIds }).then(() => {
				queryClient.invalidateQueries({ queryKey: ["tasks"] });
				toast.success("Task marked as complete!");
				setSelectedTaskIds([]);
			});
		}
	}

	function deleteSelectedTask() {
		if (listState.selectedTaskIds) {
			taskService.deleteTasks({ ids: listState.selectedTaskIds }).then(() => {
				queryClient.invalidateQueries({ queryKey: ["tasks"] });
				toast.success("Task(s) deleted successfully!");
				setSelectedTaskIds([]);
			});
		}
	}

	return (
		<div className="flex gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"sm"} variant={"outline"}>
						{listState.selectedTaskIds?.length === tasksList?.data.length ? (
							<SquareCheck />
						) : (
							<Square />
						)}
						Select
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={selectAllTask}>
						Select All
					</DropdownMenuItem>
					<DropdownMenuItem onClick={deselectAllTask}>
						Deselect All
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant={"outline"} onClick={markTaskComplete} size={"sm"}>
				<CheckCheck /> Mark Complete
			</Button>
			<Button variant={"outline"} onClick={deleteSelectedTask} size={"sm"}>
				<Trash /> Delete
			</Button>
		</div>
	);
}

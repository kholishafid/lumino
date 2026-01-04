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
import subtaskService from "@/shared/services/subtask-service";
import taskService from "@/shared/services/task-service";
import { useAppStore } from "@/shared/store/use-app-store";
import type ApiResponse from "@/shared/types/api-response";
import type { Subtask } from "@/shared/types/subtask";

export default function SubtaskSelectedAction({ taskId }: { taskId?: string }) {
	const queryClient = useRouteContext({
		from: "/_authenticated",
		select: (ctx) => ctx.queryClient,
	});

	const { listState, setSelectedSubtaskIds } = useAppStore(
		(state) => state.subtasks,
	);

	function selectAllTask() {
		const subtask = queryClient.getQueryData<ApiResponse<Subtask[]>>([
			`subtasks-${taskId}`,
		]);
		if (subtask?.data) {
			setSelectedSubtaskIds(subtask.data.map((task) => task.id));
		}
	}
	const subtaskList = queryClient.getQueryData<ApiResponse<Subtask[]>>([
		`subtasks-${taskId}`,
	]);
	function deselectAllTask() {
		setSelectedSubtaskIds([]);
	}

	function markTaskComplete() {
		if (listState.selectedSubtaskIds) {
			subtaskService
				.markCompleted({ ids: listState.selectedSubtaskIds })
				.then(() => {
					queryClient.invalidateQueries({ queryKey: [`subtasks-${taskId}`] });
					toast.success("Subtask marked as complete!");
					setSelectedSubtaskIds([]);
				});
		}
	}

	function deleteSelectedTask() {
		if (listState.selectedSubtaskIds) {
			taskService
				.deleteTasks({ ids: listState.selectedSubtaskIds })
				.then(() => {
					queryClient.invalidateQueries({ queryKey: [`subtasks-${taskId}`] });
					toast.success("Subtask(s) deleted successfully!");
					setSelectedSubtaskIds([]);
				});
		}
	}

	return (
		<div className="flex gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"sm"} variant={"outline"}>
						{listState.selectedSubtaskIds?.length ===
						subtaskList?.data.length ? (
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

import { useRouteContext } from "@tanstack/react-router";
import { Square } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
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

	function deselectAllTask() {
		setSelectedTaskIds([]);
	}

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"sm"} variant={"outline"}>
						<Square />
						Selected
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
		</div>
	);
}

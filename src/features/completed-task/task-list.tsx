import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { Loader, LoaderIcon, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import fetcher from "@/shared/lib/fetcher";
import taskService from "@/shared/services/task-service";
import { useAppStore } from "@/shared/store/use-app-store";
import type ApiResponse from "@/shared/types/api-response";
import type { Task } from "@/shared/types/task";

export default function TaskList() {
	const { drawerState } = useAppStore((state) => state.tasks);
	const toggleDrawer = useAppStore((state) => state.tasks.toggleDrawer);

	const queryClient = useRouteContext({
		from: "/_authenticated",
		select: (ctx) => ctx.queryClient,
	});

	const { data: tasksResponse, isLoading } = useQuery<ApiResponse<Task[]>>({
		queryKey: ["finsihed-tasks"],
		queryFn: taskService.getFinishedTasks,
	});
	const tasks = tasksResponse?.data || [];

	const mutation = useMutation({
		mutationFn: (taskId: string) => {
			return fetcher(`/tasks/${taskId}`, {
				method: "DELETE",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["finsihed-tasks"] });
			if (drawerState.data?.id === mutation.variables) {
				toggleDrawer(false, null);
			}
		},
	});

	return (
		<div className="h-full flex flex-col">
			<div
				className=" grow bg-[linear-gradient(var(--color-slate-50)_2px,transparent_2px)]
 0.05em, transparent 0.05em] bg-size-[100%_32px] bg-repeat-y transition-all"
			>
				{isLoading && (
					<div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
						<LoaderIcon className="animate-spin size-4 mr-2" />
						Loading tasks...
					</div>
				)}
				{!isLoading &&
					tasks?.map((task) => (
						<div key={task.id} className="h-8 flex items-center gap-3 group">
							<div className="flex gap-2 items-center">
								{task.priority === "high" && (
									<div className="size-3 min-w-3 bg-orange-600 rounded-full"></div>
								)}
								{task.priority === "medium" && (
									<div className="size-3 min-w-3 bg-amber-400 rounded-full"></div>
								)}
								{task.priority === "low" && (
									<div className="size-3 min-w-3 bg-green-400 rounded-full"></div>
								)}
								<p
									className="line-clamp-1 hover:underline cursor-pointer stroke-inherit"
									onClick={() => toggleDrawer(true, task)}
									onKeyDown={() => toggleDrawer(true, task)}
								>
									{task.title}
								</p>
							</div>
							<div className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto hidden">
								<Button
									variant={"outline-destructive"}
									size={"icon"}
									className="p-0 size-8"
									onClick={() => mutation.mutate(task.id)}
								>
									{mutation.isPending ? (
										<Loader className="h-4 w-4 animate-spin" />
									) : (
										<Trash className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
									)}
								</Button>
							</div>
						</div>
					))}
				{!isLoading && tasks.length === 0 && (
					<div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
						No tasks available. Add a new task above.
					</div>
				)}
			</div>
		</div>
	);
}

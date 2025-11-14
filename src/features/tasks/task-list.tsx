import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { Loader, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import fetcher from "@/shared/lib/fetcher";
import type { Task } from "@/shared/types/task";

export default function TaskList() {
	const queryClient = useRouteContext({
		from: "/_authenticated",
		select: (ctx) => ctx.queryClient,
	});

	const { data: tasks } = useQuery<Task[]>({
		queryKey: ["tasks"],
		queryFn: () =>
			fetcher("/tasks", {
				method: "GET",
			}),
	});

	const mutation = useMutation({
		mutationFn: (taskId: string) => {
			return fetcher(`/tasks/${taskId}`, {
				method: "DELETE",
			});
		},
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
	return (
		<div>
			{tasks?.map((task) => (
				<div key={task.id} className="h-8 flex items-center gap-3 group">
					<Checkbox id={`task-${task.id}`} />
					<label htmlFor={`task-${task.id}`} className="line-clamp-1">
						{task.title}
					</label>
					<div className="ms-auto opacity-0 group-hover:opacity-100 transition-opacity">
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
			{tasks?.length === 0 && (
				<div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
					No tasks available. Add a new task above.
				</div>
			)}
		</div>
	);
}

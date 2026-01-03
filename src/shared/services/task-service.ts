import fetcher from "@/shared/lib/fetcher";
import type { Task } from "@/shared/types/task";

const taskService = {
	getFinishedTasks: async () => {
		return await fetcher("/tasks?isFinished=true", {
			method: "GET",
		});
	},
	getUnfinishedTasks: async () => {
		return await fetcher("/tasks?isFinished=false", {
			method: "GET",
		});
	},
	createTask: ({
		data,
	}: {
		data: Omit<Task, "id" | "dueDate"> & {
			dueDate?: Date;
		};
		taskId?: string;
	}) =>
		fetcher("/tasks", {
			method: "POST",
			body: JSON.stringify({ ...data }),
			credentials: "include",
		}),
	updateTask: async ({ data }: { data: Task }) => {
		return await fetcher(`/tasks/${data.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	},
	markCompleted: async ({ ids }: { ids: string[] }) => {
		return await fetcher(`/tasks/mark-finished`, {
			method: "POST",
			body: JSON.stringify({ ids }),
		});
	},
	deleteTasks: async ({ ids }: { ids: string[] }) => {
		return await fetcher(`/tasks`, {
			method: "DELETE",
			body: JSON.stringify({ ids }),
		});
	},
};

export default taskService;

import fetcher from "@/shared/lib/fetcher";
import type { Task } from "@/shared/types/task";

const taskService = {
	createTask: ({ data }: { data: Omit<Task, "id">; taskId?: string }) =>
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
};

export default taskService;

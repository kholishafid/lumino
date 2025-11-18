import fetcher from "@/shared/lib/fetcher";
import type { Subtask } from "../types/subtask";

const subtaskService = {
	getSubtasks: async ({ taskId }: { taskId: string }) => {
		return await fetcher(`/subtasks?taskId=${taskId}`, {
			method: "GET",
			credentials: "include",
		});
	},
	createSubtask: ({
		data,
		taskId,
	}: {
		data: Omit<Subtask, "id">;
		taskId: string;
	}) =>
		fetcher("/subtasks", {
			method: "POST",
			body: JSON.stringify({ ...data, task_id: taskId }),
			credentials: "include",
		}),
	updateSubtask: async ({ data }: { data: Subtask }) => {
		return await fetcher(`/subtasks/${data.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	},
};

export default subtaskService;

import fetcher from "@/shared/lib/fetcher";
import type { Subtask } from "../types/subtask";

const subtaskService = {
	createSubtask: ({
		data,
		taskId,
	}: {
		data: Omit<Subtask, "id">;
		taskId: string;
	}) =>
		fetcher("/subtasks", {
			method: "POST",
			body: JSON.stringify({ ...data, taskId }),
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

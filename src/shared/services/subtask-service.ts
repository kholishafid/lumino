import fetcher from "@/shared/lib/fetcher";
import type { Subtask } from "../types/subtask";

const subtaskService = {
  getSubtasks: async ({
    taskId,
    isFinished,
  }: {
    taskId: string;
    isFinished?: boolean;
  }) => {
    return await fetcher(
      `/subtasks?taskId=${taskId}&isFinished=${isFinished}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
  },
  createSubtask: ({
    data,
    taskId,
  }: {
    data: Omit<Subtask, "id" | "dueDate"> & { dueDate?: Date | undefined };
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
  markCompleted: async ({ ids }: { ids: string[] }) => {
    return await fetcher(`/subtasks/mark-finished`, {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
  },
};

export default subtaskService;

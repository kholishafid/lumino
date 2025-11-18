import type { Subtask } from "./subtask";

export type Task = {
	id: string;
	title: string;
	description: string;
	dueDate?: string;
	createdAt?: string;
	updatedAt?: string;
	subtasks?: Subtask[];
};

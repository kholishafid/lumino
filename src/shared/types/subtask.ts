export type Subtask = {
 id: string;
	title: string;
	description: string;
	dueDate?: string;
	priority?: "low" | "medium" | "high";
	isFinished: boolean;
	createdAt?: string;
	updatedAt?: string;
}

import type { Task } from "@/shared/types/task";
import type { ImmerStateCreator } from "../use-app-store";

interface TaskSlice {
	drawerState: {
		isOpen: boolean;
		data?: null | Task;
	};
	toggleDrawer: (
		isOpen: boolean,
		data?: TaskSlice["drawerState"]["data"],
	) => void;
	listState: {
		selectedTaskIds: string[] | null;
	};
	setSelectedTaskIds: (ids: string[] | null) => void;
}

const createTaskSlice: ImmerStateCreator<TaskSlice> = (set) => ({
	drawerState: {
		isOpen: false,
		data: null,
	},
	toggleDrawer: (isOpen, data) =>
		set((state) => {
			state.tasks.drawerState = { isOpen, data };
		}),
	listState: {
		selectedTaskIds: null,
	},
	setSelectedTaskIds: (ids) =>
		set((state) => {
			state.tasks.listState.selectedTaskIds = ids;
		}),
});

export { type TaskSlice, createTaskSlice };

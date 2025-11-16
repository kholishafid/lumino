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
});

export { type TaskSlice, createTaskSlice };

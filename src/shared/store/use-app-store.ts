import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createTaskSlice, type TaskSlice } from "./slice/task.slice";

export type ImmerStateCreator<T> = StateCreator<
	AppState,
	[["zustand/immer", never], never],
	[],
	T
>;

export type AppState = {
	tasks: TaskSlice;
};

export const useAppStore = create<AppState>()(
	immer(
		devtools((...args) => ({
			tasks: createTaskSlice(...args),
		})),
	),
);

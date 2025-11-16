import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type BearSlice, createBearSlice } from "./slice/bear.slice";
import { createFishSlice, type FishSlice } from "./slice/fish.slice";
import { createTaskSlice, type TaskSlice } from "./slice/task.slice";

export type ImmerStateCreator<T> = StateCreator<
	AppState,
	[["zustand/immer", never], never],
	[],
	T
>;

export type AppState = {
	bears: BearSlice;
	fishes: FishSlice;
	tasks: TaskSlice;
};

export const useAppStore = create<AppState>()(
	immer(
		devtools((...args) => ({
			bears: createBearSlice(...args),
			fishes: createFishSlice(...args),
			tasks: createTaskSlice(...args),
		})),
	),
);

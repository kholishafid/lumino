import type { ImmerStateCreator } from "../use-app-store";

interface SubtaskSlice {
	listState: {
		selectedSubtaskIds: string[] | null;
	};
	setSelectedSubtaskIds: (ids: string[] | null) => void;
}

const createSubtaskSlice: ImmerStateCreator<SubtaskSlice> = (set) => ({
	listState: {
		selectedSubtaskIds: null,
	},
	setSelectedSubtaskIds: (ids) =>
		set((state) => {
			state.subtasks.listState.selectedSubtaskIds = ids;
		}),
});

export { type SubtaskSlice, createSubtaskSlice };

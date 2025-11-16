import type { ImmerStateCreator } from "../use-app-store";

interface FishSlice {
	fishes: number;
	addFish: () => void;
}

const createFishSlice: ImmerStateCreator<FishSlice> = (set) => ({
	fishes: 0,
	addFish: () => set((state) => ({ fishes: state.fishes.fishes + 1 })),
});

export { type FishSlice, createFishSlice };

import type { ImmerStateCreator } from "../use-app-store";

interface BearSlice {
	bears: number;
	addBear: () => void;
	eatFish: () => void;
}

const createBearSlice: ImmerStateCreator<BearSlice> = (set) => ({
	bears: 0,
	addBear: () => set((state) => ({ bears: state.bears.bears + 1 })),
	eatFish: () => set((state) => ({ fishes: state.fishes.fishes - 1 })),
});

export { type BearSlice, createBearSlice };

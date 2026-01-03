import { type ClassValue, clsx } from "clsx";
import { differenceInCalendarDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function daysStatus(deadline: Date) {
	const today = new Date();
	const diff = differenceInCalendarDays(deadline, today);

	if (diff === 0) return "Today";
	if (diff < 0) return "Overdue";

	return `${diff} day${diff > 1 ? "s" : ""} left`;
}

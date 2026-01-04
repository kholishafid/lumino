import type {
	EventContentArg,
	EventSourceInput,
} from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import taskService from "@/shared/services/task-service";
import type ApiResponse from "@/shared/types/api-response";
import type { Task } from "@/shared/types/task";
import "./calender-style.css";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/shared/store/use-app-store";
import { getEventColor } from "./get-event-color";

export default function CalendarView() {
	const { data: tasksResponse, isLoading } = useQuery<ApiResponse<Task[]>>({
		queryKey: ["tasks"],
		queryFn: taskService.getUnfinishedTasks,
	});

	const toggleDrawer = useAppStore((state) => state.tasks.toggleDrawer);

	const events: EventSourceInput =
		tasksResponse?.data.map((task) => ({
			title: task.title,
			date: `${task.dueDate?.split("T")[0]}`,
			extendedProps: {
				data: task,
			},
		})) || [];
	return (
		<div>
			<div>
				{isLoading && (
					<div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
						Loading... <Loader2 className="animate-spin size-4 ml-2" />
					</div>
				)}
			</div>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={events}
				eventClick={(v) => {
					toggleDrawer(true, v.event.extendedProps.data);
				}}
				eventContent={(e) => renderEventContent(e)}
			/>
		</div>
	);
}

function renderEventContent(eventInfo: EventContentArg) {
	return (
		<div className="flex items-center text-slate-800 gap-2">
			<div
				className="size-3 min-w-3 rounded-full"
				style={{
					backgroundColor: getEventColor(
						eventInfo.event.extendedProps.data.priority,
					),
				}}
			></div>
			<p className="line-clamp-1">{eventInfo.event.title}</p>
		</div>
	);
}

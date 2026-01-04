import { createFileRoute } from "@tanstack/react-router";
import CalendarView from "@/features/calendar/calendar-view";
import TaskDrawer from "@/features/tasks/task-drawer";
import { Card } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/layouts/dashboard-layout";

export const Route = createFileRoute("/_authenticated/calendar/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DashboardLayout>
			<Card className="p-4 h-screen rounded-b-none overflow-auto overflow-x-hidden">
				<CalendarView />
				<TaskDrawer floating />
			</Card>
		</DashboardLayout>
	);
}

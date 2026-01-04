import { createFileRoute } from "@tanstack/react-router";
import TaskList from "@/features/completed-task/task-list";
import { Card } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/layouts/dashboard-layout";

export const Route = createFileRoute("/_authenticated/completed-tasks/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DashboardLayout className="pr-0">
			<div className="flex h-full gap-4 w-full">
				<Card className="p-4 grow-0 basis-1/2 rounded-b-none overflow-auto overflow-x-hidden">
					<TaskList />
				</Card>
			</div>
		</DashboardLayout>
	)
}

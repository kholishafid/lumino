import { createFileRoute } from "@tanstack/react-router";
import TaskDrawer from "@/features/tasks/task-drawer";
import { TaskInput } from "@/features/tasks/task-input";
import TaskList from "@/features/tasks/task-list";
import { Card } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/layouts/dashboard-layout";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
	beforeLoad: async () => {},
});

function App() {
	return (
		<DashboardLayout className="pr-0">
			<div className="flex h-full gap-4 w-full">
				<Card className="p-4 grow-0 basis-1/2 rounded-b-none overflow-auto overflow-x-hidden">
					<TaskInput />
					<div
						className="h-full bg-[linear-gradient(var(--color-slate-50)_2px,transparent_2px)]
 0.05em, transparent 0.05em] bg-size-[100%_32px] bg-repeat-y transition-all"
					>
						<TaskList />
					</div>
				</Card>
				<TaskDrawer />
			</div>
		</DashboardLayout>
	);
}

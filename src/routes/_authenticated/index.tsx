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
			<div className="grid lg:grid-cols-2 grow gap-4">
				<Card className="w-full h-full p-4 rounded-b-none ">
					<TaskInput />
					<div
						className="h-full bg-[linear-gradient(var(--color-slate-50)_2px,transparent_2px)]
 0.05em, transparent 0.05em] bg-size-[100%_32px] bg-repeat-y transition-all"
					>
						<TaskList />
					</div>
				</Card>
				<div className="relative">
					<TaskDrawer />
				</div>
			</div>
		</DashboardLayout>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { TaskInput } from "@/features/tasks/task-input";
import TaskList from "@/features/tasks/task-list";
import { Card } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/layouts/dashboard-layout";
import { API_URL } from "@/shared/lib/constant";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
	beforeLoad: async () => {},
});

async function fetchData() {
	const url = `${API_URL}/tasks`;
	const options = {
		method: "GET",
		headers: { authorization: "Bearer " },
		credentials: "include" as RequestCredentials,
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

function App() {
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<DashboardLayout>
			<div className="grid lg:grid-cols-2 grow">
				<Card className="w-full h-full p-4 rounded-b-none ">
					<TaskInput />
					<div
						className="h-full bg-[linear-gradient(var(--color-slate-50)_2px,transparent_2px)]
 0.05em, transparent 0.05em] bg-size-[100%_32px] bg-repeat-y transition-all"
					>
						<TaskList />
					</div>
				</Card>
			</div>
		</DashboardLayout>
	);
}

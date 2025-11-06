import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import DashboardLayout from "@/shared/layouts/dashboard-layout";
import { API_URL } from "@/shared/lib/constant";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
	beforeLoad: async () => {
	
	},
});

async function fetchData() {
	const url = `${API_URL}/tasks`;
	const options = {
		method: "GET",
		headers: {  authorization: "Bearer " },
		credentials: "include" as RequestCredentials,
	}

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
			<div className="grow grid place-items-center">
				<div className="max-w-3xl w-full text-center">"Welcome to the App"</div>
			</div>
		</DashboardLayout>
	)
}

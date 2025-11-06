import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { API_URL } from "@/shared/lib/constant";

export const Route = createFileRoute("/_authenticated/tasks/")({
	component: RouteComponent,
});

async function fetchData() {
	const url = `${API_URL}/tasks`;
	const options = {
		method: "GET",
		headers: { authorization: "Bearer " },
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

function RouteComponent() {
	useEffect(() => {
		fetchData();
	}, []);
	return <div>Hello "/tasks/"!</div>;
}

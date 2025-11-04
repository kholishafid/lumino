import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";

export const Route = createFileRoute("/")({
	component: App,
	beforeLoad: async () => {
		console.log(document.cookie);
	},
});

async function fetchData() {
const url = 'http://localhost:3000/api/v1/tasks';
const options = {
  method: 'GET',
  headers: {origin: 'http://localhost:3000', authorization: 'Bearer '},
	credentials: 'include' as RequestCredentials,
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
			<div className="grow grid place-items-center">
				<div className="max-w-3xl w-full text-center">"Welcome to the App"</div>
			</div>
		</DashboardLayout>
	);
}

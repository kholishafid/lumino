import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

// A wrapper for checking authentication
export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const { auth } = context;
		if (auth && !auth.user) {
			throw redirect({
				to: "/auth/signin",
			});
		}
	},
});

function RouteComponent() {
	return (
		<div>
			<Outlet />
		</div>
	);
}

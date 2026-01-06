import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import type { AuthState } from "@/features/auth/auth-provider";
import TanStackQueryDevtools from "@/shared/integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
	auth: AuthState | undefined;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => {
		return (
			<>
				<div className="h-screen w-screen flex flex-col overflow-hidden">
					<Outlet />
				</div>
				{import.meta.env.VITE_ENV === "development" && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				)}
				<Toaster position="bottom-center" />
			</>
		);
	},
});

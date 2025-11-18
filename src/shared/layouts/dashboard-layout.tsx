import { AppSidebar } from "@/shared/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { cn } from "../lib/utils";

export default function DashboardLayout({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div
					className={cn("flex flex-col gap-4 bg-slate-100 p-4 h-screen", className)}
				>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

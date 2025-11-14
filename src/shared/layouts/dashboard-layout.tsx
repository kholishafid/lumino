import { AppSidebar } from "@/shared/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="flex flex-1 flex-col gap-4 p-4 bg-slate-100">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

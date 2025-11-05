"use client";

import { Frame, MapIcon, PieChart } from "lucide-react";
import { NavMain } from "@/shared/components/nav-main";
import { NavUser } from "@/shared/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/shared/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	menus: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
			active: true,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex items-center gap-2">
					<div className="border border-orange-200 rounded w-10 group-data-[collapsible=icon]:w-full max-w-10">
						<img src="/lumino.png" alt="Lumino Logo" className="rounded" />
					</div>
					<strong className="group-data-[collapsible=icon]:hidden">Lumino</strong>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain menus={data.menus} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

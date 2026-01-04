"use client";

import {
	Calendar,
	LayoutList,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavMain } from "@/shared/components/nav-main";
import { NavUser } from "@/shared/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import cookieHelper from "../lib/cookie";
import type { User } from "../types/user";

// This is sample data.
const data = {
	menus: [
		{
			name: "Tasks",
			url: "/",
			icon: LayoutList,
		},
		{
			name: "Task Calendar",
			url: "/calendar",
			icon: Calendar,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [user, setUser] = useState<User>();
	useEffect(() => {
		cookieHelper.get("lumino_user").then((data) => {
			if (data) {
				setUser(JSON.parse(data) as User);
			}
		});
		return () => {};
	}, []);
	return (
		<Sidebar collapsible="icon" {...props} className="border-0!">
			<SidebarHeader>
				<div className="flex items-center justify-between relative group/logo">
					<div className="flex items-center gap-2">
						<div className="border border-orange-200 rounded w-10 group-data-[collapsible=icon]:w-full max-w-10">
							<img src="/lumino.png" alt="Lumino Logo" className="rounded" />
						</div>
						<strong className="group-data-[collapsible=icon]:hidden">
							Lumino
						</strong>
					</div>
					<div className="group-data-[collapsible=icon]:hidden">
						<SidebarTrigger variant={"outline"} />
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain menus={data.menus} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: user?.name || "",
						email: user?.email || "",
						avatar: user?.image || "",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

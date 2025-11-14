"use client";

import { Link, useLocation } from "@tanstack/react-router";

import type { LucideIcon } from "lucide-react";

("@/shared/components/ui/dropdown-menu");

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";

export function NavMain({
	menus,
}: {
	menus: {
		name: string;
		url: string;
		icon: LucideIcon;
		active?: boolean;
	}[];
}) {
	const location = useLocation();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem className="group-data-[collapsible=icon]:block hidden mb-2">
					<SidebarMenuButton asChild>
						<SidebarTrigger variant={"outline"} />
					</SidebarMenuButton>
				</SidebarMenuItem>
				{menus.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							asChild
							isActive={location.pathname === item.url}
						>
							<Link to={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

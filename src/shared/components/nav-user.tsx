import { useRouter } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import cookieHelper from "../lib/cookie";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const router = useRouter();

	function logout() {
		toast.loading("Logging out...", { id: "logout" });
		cookieHelper.erase("lumino_user");
		toast.remove("logout");
		router.navigate({
			to: "/auth/signin",
		});
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem onClick={logout}>
				<SidebarMenuButton
					variant={"desctructive"}
					className="data-[state=open]:bg-sidebar-accent text-destructive"
				>
					<LogOutIcon /> Signout
				</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg bg-orange-50 border border-orange-200 text-orange-600">
							{user.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.name}</span>
						<span className="truncate text-xs">{user.email}</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

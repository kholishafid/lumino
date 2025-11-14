import { Loader2 } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "@/shared/lib/constant";
import type { Session } from "@/shared/types/sessions";
import type { User } from "@/shared/types/user";

export type AuthState = {
	isAuthenticated: boolean;
	user: User | null | undefined;
	session: Session | undefined;
	isLoading: boolean;
	setUser?: (user: User | null) => void;
	setSession?: (session: Session | undefined) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | undefined>(undefined);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`${API_URL}/auth/get-session`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.user) {
					setUser(data.user);
					setIsAuthenticated(true);
				}
			})
			.catch((error) => {
				console.error("Error fetching session:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<div className="h-screen w-screen grid place-items-center">
				<Loader2
					strokeWidth={1.5}
					className="animate-spin text-primary"
					size={48}
				/>
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user: user,
				session: session,
				isAuthenticated: isAuthenticated,
				setUser: setUser,
				setSession: setSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

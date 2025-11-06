import { API_URL } from "@/shared/lib/constant";
import cookieHelper from "../lib/cookie";

const authService = {
	signIn: async (value: { email: string; password: string }) => {
		const url = `${API_URL}/auth/sign-in/email`;
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(value),
			credentials: "include" as RequestCredentials,
		};
		return await fetch(url, options);
	},
	signOut: async () => {
		const url = `${API_URL}/auth/sign-out`;
		const options = {
			method: "POST",
			credentials: "include" as RequestCredentials,
		};
		cookieHelper.erase("lumino_user");
		return await fetch(url, options);
	},
};

export default authService;

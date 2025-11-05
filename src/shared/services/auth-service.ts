import { API_URL } from "@/shared/lib/constant";

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
};

export default authService;

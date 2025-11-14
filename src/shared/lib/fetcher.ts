import { API_URL } from "./constant";

async function fetcher(url: string, options?: RequestInit) {
	return fetch(`${API_URL}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	}).then((res) => {
		if (!res.ok) throw new Error("Network response was not ok");
		return res.json();
	});
}

export default fetcher;

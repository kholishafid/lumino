const cookieHelper = {
	set: async (name: string, value: string, days: number = 7) => {
		const expires = Date.now() + days * 24 * 60 * 60 * 1000;
		await cookieStore.set({
			name: name,
			value: JSON.stringify(value),
			expires: expires,
		});
	},

	get: async (name: string): Promise<string | null> => {
		const result = await cookieStore.get(name);
		return result?.value || null;
	},

	erase: async (name: string) => {
		await cookieStore.delete(name);
	},
};

export default cookieHelper;

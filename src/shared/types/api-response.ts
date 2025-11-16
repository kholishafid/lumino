export default interface ApiResponse<T> {
	data: T;
	message: string;
	status: "success" | "error" | "fail";
	[key: string]: any;
}

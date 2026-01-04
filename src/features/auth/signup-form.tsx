import { Link, useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldSeparator,
} from "@/shared/components/ui/field";
import { useAppForm } from "@/shared/hooks/form";
import { API_URL } from "@/shared/lib/constant";
import { cn } from "@/shared/lib/utils";

const schema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			toast.loading("Signing up...", { id: "signup" });
			const url = `${API_URL}/auth/sign-up/email`;
			const options = {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(value),
				credentials: "include" as RequestCredentials,
			};

			try {
				const response = await fetch(url, options);
				const data = await response.json();

				if (response.ok) {
					toast.success("Signup successful!", { id: "signup" });
					router.navigate({
						to: "/auth/signin",
					});
				}
				if (!response.ok && data.code === "INVALID_EMAIL_OR_PASSWORD") {
					toast.error("Invalid email or password.", { id: "signup" });
					form.setErrorMap({
						onSubmit: {
							fields: {},
							form: "Invalid email or password.",
						},
					});
				}
				if (!response.ok) {
					toast.error(
						data.message || "Something went wrong. Please try again.",
						{ id: "signup" },
					);
				}
			} catch {
				toast.error("Something went wrong. Please try again.", {
					id: "signup",
				});
			}
		},
	});

	function submit(e: React.FormEvent) {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8" onSubmit={submit}>
						<div className="flex items-center justify-center mx-auto mb-3">
							<img
								src="/lumino.png"
								alt="Lumino Logo"
								className="rounded size-12"
							/>
						</div>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Welcome to Lumino</h1>
								<p className="text-muted-foreground text-balance">
									Signup for a Lumino account
								</p>
							</div>
							<form.AppField name="name">
								{(field) => (
									<field.TextField label="Name" placeholder="John Doe" />
								)}
							</form.AppField>
							<form.AppField name="email">
								{(field) => (
									<field.TextField label="Email" placeholder="m@example.com" />
								)}
							</form.AppField>
							<form.AppField name="password">
								{(field) => (
									<field.TextField
										label="Password"
										type="password"
										placeholder="••••••••"
									/>
								)}
							</form.AppField>

							<form.AppField name="confirmPassword">
								{(field) => (
									<field.TextField
										label="Password Confirmation"
										type="password"
										placeholder="••••••••"
									/>
								)}
							</form.AppField>

							{/* <form.AppForm>
								<form.FormErrorMessage />
							</form.AppForm> */}

							<form.AppForm>
								<form.SubscribeButton label="Signup" />
							</form.AppForm>
							{/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>
							<Field className="grid grid-cols-3 gap-4">
								<Button
									variant="outline"
									type="button"
									className="col-span-3"
									disabled
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<title>Google</title>
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									<span>Signup with Google</span>
									<span className="border px-1 text-slate-500 rounded-sm">
										Coming soon
									</span>
								</Button>
							</Field> */}
							<FieldDescription className="text-center">
								Already have an account?{" "}
								<Link className="text-primary" to="/auth/signin">
									Sign in
								</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="/img/calendar-photo-2.jpg"
							alt="Calendar by Eric Rothermel on Unsplash"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
						<div>
							<p className="absolute bottom-0 left-0 p-4 text-sm text-white">
								<a
									href="https://unsplash.com/photos/white-printer-paperr-FoKO4DpXamQ"
									className="hover:underline"
								>
									Photo by Eric Rothermel on Unsplash
								</a>
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
			{/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link to=".">Terms of Service</Link> and{" "}
        <Link to=".">Privacy Policy</Link>
      </FieldDescription> */}
		</div>
	);
}

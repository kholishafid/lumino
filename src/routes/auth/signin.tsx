import { createFileRoute } from "@tanstack/react-router";
import { SigninForm } from "@/features/auth/signin-form";

export const Route = createFileRoute("/auth/signin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grow grid place-items-center">
			<div className="max-w-3xl w-full">
				<SigninForm />
			</div>
		</div>
	)
}

import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/features/auth/signup-form";

export const Route = createFileRoute("/auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grow grid place-items-center">
			<div className="max-w-3xl w-full">
				<SignupForm />
			</div>
		</div>
	)
}

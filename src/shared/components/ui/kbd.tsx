import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const variants = cva(
	"bg-muted text-muted-foreground pointer-events-none inline-flex h-4 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 text-xs font-semibold select-none [&_svg:not([class*='size-'])]:size-3 font-mono",
	{
		variants: {
			variant: {
				default:
					"in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
				translucent:
					"bg-white/20 text-white border border-white/30 backdrop-blur-md",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Kbd({
	className,
	variant,
	...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof variants>) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(variants({ variant: variant, className: className }))}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Label } from "./ui/label";

type Props = {
	text: string | number;
	label?: string;
	className?: string;
	labelClassName?: string;
	iconClassName?: string;
	successMessage?: string;
};

let timeoutRef: number;

const CopyBtn = ({ text, label, className, labelClassName, iconClassName }: Props) => {
	const [showTickIcon, setShowTickIcon] = useState(false);
	const { toast } = useToast();
	const copyText = () => {
		try {
			clearTimeout(timeoutRef);
			navigator.clipboard.writeText(text.toString());
			setShowTickIcon(true);
			timeoutRef = window.setTimeout(() => {
				setShowTickIcon(false);
			}, 2_000);
		} catch (error) {
			toast({
				title: "Couldn't copy to clipboard !",
				description: "Try again or copy the text manually",
			});
		}
	};

	return (
		<div className="flex group items-center justify-center gap-2">
			{label && (
				<Label htmlFor={`copy-btn-${text}-${label}`} className={cn("cursor-pointer", labelClassName)}>
					{label}
				</Label>
			)}
			<Button
				size="icon"
				id={`copy-btn-${text}-${label}`}
				variant="ghost"
				aria-label="Copy"
				className={cn("shrink-0 flex items-center justify-center w-6 h-6", className)}
				onClick={copyText}
			>
				{showTickIcon ? (
					<CheckIcon className={cn("w-5 h-5 text-success-text", iconClassName)} />
				) : (
					<CopyIcon className={cn("w-3 h-3 text-foreground/50", iconClassName)} />
				)}
			</Button>
		</div>
	);
};

export default CopyBtn;
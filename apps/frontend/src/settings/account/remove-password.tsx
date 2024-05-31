import { TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormErrorMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/src/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { minPasswordLength } from "@root/config";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
	email: string;
	children: React.ReactNode;
	fetchPageData: () => Promise<void>;
};

const RemovePasswordForm = ({ email, children, fetchPageData }: Props) => {
	const { toast } = useToast();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const formSchema = z.object({
		email: z.string(),
		password: z.string().min(minPasswordLength, {
			message: "Enter your password",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: email,
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		if (loading) return;
		if (!values?.password || (values?.password?.length || 0) < minPasswordLength) {
			return setFormError("Invalid password");
		}
		setLoading(true);

		const response = await useFetch("/api/user/remove-account-password", {
			method: "POST",
			body: JSON.stringify({
				entered_password: values.password,
			}),
		});
		const result = await response.json();

		setLoading(false);
		if (result?.success === true) {
			toast({
				title: result.message || "TOAST",
			});
			await fetchPageData();
			setDialogOpen(false);
		} else {
			setFormError(result.message);
		}
	};

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={(open: boolean) => {
				if (open === false) {
					form.reset();
					setFormError("");
				}
				setDialogOpen(open);
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-foreground-muted font-semibold">Remove account password</DialogTitle>
				</DialogHeader>

				<div className="w-full flex flex-col items-center justify-center">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="w-full flex flex-col items-center justify-center gap-3"
						>
							<div className="w-full flex flex-col items-center justify-center gap-4">
								<div className="w-full flex flex-col items-center justify-center">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<>
												<FormItem aria-hidden={true} className="hidden">
													<FormControl>
														<Input
															placeholder="********"
															type="email"
															autoComplete="username"
															className="hidden"
															aria-hidden={true}
															{...field}
														/>
													</FormControl>
												</FormItem>
											</>
										)}
									/>
								</div>

								<div className="w-full flex flex-col items-center justify-center">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<>
												<FormItem className="w-full flex flex-col items-center justify-center space-y-1">
													<FormLabel className="w-full flex items-end justify-between text-left gap-12 min-h-4">
														<span className="text-foreground-muted my-1">Enter your current password</span>
														<FormMessage className="text-danger-text dark:text-danger-text leading-tight" />
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="********"
															type="password"
															name="password"
															autoComplete="password"
															className="w-full flex items-center justify-center"
															onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
																field.onChange(e);
																setFormError(null);
															}}
														/>
													</FormControl>
												</FormItem>
											</>
										)}
									/>
								</div>
							</div>

							<div className="w-full min-h-6">{formError && <FormErrorMessage text={formError} />}</div>

							<div className="w-full flex items-center justify-end gap-2">
								<DialogClose className="w-fit hover:bg-bg-hover rounded-lg" aria-label="Cancel">
									<p className="px-4 h-9 flex items-center justify-center text-foreground-muted">Cancel</p>
								</DialogClose>

								<Button
									type="submit"
									aria-label="Remove password"
									className="bg-danger-bg text-[hsla(var(--foreground-dark))] dark:text-foreground hover:bg-danger-bg/90"
									disabled={!form.getValues().password}
								>
									<TrashIcon className="h-4 w-4" />
									<p className="px-2">Remove password</p>
								</Button>
							</div>
						</form>
						{loading === true && (
							<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-xl flex items-center justify-center">
								<div className="w-full h-full flex items-center justify-center relative rounded-xl">
									<div className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-background opacity-60" />
									<Spinner size="1.5rem" />
								</div>
							</div>
						)}
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RemovePasswordForm;

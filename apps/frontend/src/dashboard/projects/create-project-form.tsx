import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormErrorMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/src/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { maxProjectNameLength, maxProjectSummaryLength, minProjectNameLength } from "@root/config";
import { createURLSafeSlug } from "@root/lib/utils";
import { ProjectType, ProjectVisibility } from "@root/types";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
	fetchProjects: () => Promise<void>;
	children: React.ReactNode;
};

const formSchema = z.object({
	name: z
		.string()
		.min(minProjectNameLength, "Enter the project name")
		.max(maxProjectNameLength, `Project name can contain only a maximum of ${maxProjectNameLength} characters`),
	url: z
		.string()
		.min(minProjectNameLength)
		.max(maxProjectNameLength, `Project url slug can contain only a maximum of ${maxProjectNameLength} characters`),
	visibility: z.enum([ProjectVisibility.PRIVATE, ProjectVisibility.PUBLIC, ProjectVisibility.UNLISTED]),
	project_type: z.enum([
		ProjectType.MOD,
		ProjectType.MODPACK,
		ProjectType.SHADER,
		ProjectType.RESOURCEPACK,
		ProjectType.DATAPACK,
		ProjectType.PLUGIN,
	]),
	summary: z.string().max(maxProjectSummaryLength).optional(),
});

const CreateProjectForm = ({ children, fetchProjects }: Props) => {
	const { toast } = useToast();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [keepNameAndUrlSynced, setKeepNameAndUrlSynced] = useState<boolean>(true);
	const [projectType, setProjectType] = useState<string>(ProjectType.MOD.toString());

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			url: "",
			project_type: ProjectType.MOD,
			visibility: ProjectVisibility.PUBLIC,
			summary: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		if (loading) return;
		if (!values?.name || !values.url || !values.visibility || !values.summary) {
			return setFormError("Missing required fields");
		}
		setLoading(true);
		const response = await useFetch("/api/project/create-new-project", {
			method: "POST",
			body: JSON.stringify({
				name: values.name,
				url: values.url,
				project_type: values.project_type,
				visibility: values.visibility,
				summary: values.summary,
			}),
		});
		const result = await response.json();
		setLoading(false);

		if (!response.ok) {
			return setFormError(result?.message);
		}

		toast({
			title: result.message,
		});
		setDialogOpen(false);
		await fetchProjects();
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
					<DialogTitle className="text-foreground-muted font-semibold">Create a project</DialogTitle>
				</DialogHeader>

				<ScrollArea className="max-h-[80vh] h-full">
					<div className="w-full flex flex-col items-center justify-center">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSubmit)}
								className="w-full flex flex-col items-center justify-center"
							>
								<div className="w-full flex flex-col items-center justify-center gap-4">
									<div className="w-full flex flex-col items-center justify-center">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel className="w-full flex items-end justify-between text-left gap-12 min-h-4">
														<span className="text-foreground font-semibold">Name</span>
														<FormMessage className="text-danger-text dark:text-danger-text leading-tight" />
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter project name..."
															type="text"
															{...field}
															onChange={(val: React.ChangeEvent<HTMLInputElement>) => {
																field.onChange(val);
																const generatedSlug = createURLSafeSlug(form.getValues().name).value;
																if (keepNameAndUrlSynced === true) {
																	form.setValue("url", generatedSlug);
																}
															}}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className="w-full flex flex-col items-center justify-center">
										<FormField
											control={form.control}
											name="url"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel className="w-full flex items-end justify-between text-left gap-12 min-h-4">
														<span className="text-foreground font-semibold">URL</span>
														<FormMessage className="text-danger-text dark:text-danger-text leading-tight" />
													</FormLabel>
													<FormControl>
														<div className="w-full flex items-center justify-center px-3 rounded-md bg-background-shallow border border-border focus-within:bg-transparent focus-within:border-border-hicontrast transition-colors">
															<label
																htmlFor="project-url-input"
																className="whitespace-nowrap text-foreground/50 text-sm cursor-text"
															>
																/{createURLSafeSlug(projectType).value}/
															</label>
															<Input
																id="project-url-input"
																type="text"
																className="px-0 border-none bg-transparent"
																{...field}
																onChange={(val: React.ChangeEvent<HTMLInputElement>) => {
																	field.onChange(val);
																	setKeepNameAndUrlSynced(false);
																}}
															/>
														</div>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className="w-full flex flex-col items-center justify-center">
										<FormField
											control={form.control}
											name="project_type"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormControl>
														<>
															<FormLabel className="w-full flex items-center justify-start text-foreground font-semibold">
																Project type
															</FormLabel>
															<Select
																value={field.value}
																onValueChange={(value) => {
																	setProjectType(value);
																	field.onChange(value);
																}}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select project type..." />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value={ProjectType.MOD}>{ProjectType.MOD}</SelectItem>
																	<SelectItem value={ProjectType.MODPACK}>{ProjectType.MODPACK}</SelectItem>
																	<SelectItem value={ProjectType.SHADER}>{ProjectType.SHADER}</SelectItem>
																	<SelectItem value={ProjectType.RESOURCEPACK}>{ProjectType.RESOURCEPACK}</SelectItem>
																	<SelectItem value={ProjectType.DATAPACK}>{ProjectType.DATAPACK}</SelectItem>
																	<SelectItem value={ProjectType.PLUGIN}>{ProjectType.PLUGIN}</SelectItem>
																</SelectContent>
															</Select>
														</>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className="w-full flex flex-col items-center justify-center">
										<FormField
											control={form.control}
											name="visibility"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormControl>
														<>
															<FormLabel className="w-full flex items-center justify-start text-foreground font-semibold">
																Visibility
															</FormLabel>
															<Select value={field.value} onValueChange={field.onChange}>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Project visibility..." />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value={ProjectVisibility.PRIVATE}>{ProjectVisibility.PRIVATE}</SelectItem>
																	<SelectItem value={ProjectVisibility.PUBLIC}>{ProjectVisibility.PUBLIC}</SelectItem>
																	<SelectItem value={ProjectVisibility.UNLISTED}>
																		{ProjectVisibility.UNLISTED}
																	</SelectItem>
																</SelectContent>
															</Select>
														</>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className="w-full flex flex-col items-center justify-center">
										<FormField
											control={form.control}
											name="summary"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel className="w-full flex items-end justify-between text-left gap-12 min-h-4">
														<span className="text-foreground font-semibold">Summary</span>
														<FormMessage className="text-danger-text dark:text-danger-text leading-tight" />
													</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Enter project summary..."
															cols={8}
															maxLength={maxProjectSummaryLength}
															className="resize-none"
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>

								<div className="w-full min-h-6 my-4">{formError && <FormErrorMessage text={formError} />}</div>

								<div className="w-full flex items-center justify-end gap-2">
									<DialogClose className="w-fit hover:bg-bg-hover rounded-lg" aria-label="Cancel">
										<p className="px-4 h-9 flex items-center justify-center text-foreground-muted">Cancel</p>
									</DialogClose>

									<Button
										type="submit"
										aria-label="Continue"
										className="bg-accent-bg dark:text-foreground hover:bg-accent-bg/80"
										disabled={
											!form.getValues().name ||
											!form.getValues().url ||
											!form.getValues().summary ||
											!form.getValues().project_type
										}
									>
										<ArrowRightIcon className="w-4 h-4" />
										<p className="px-2">Continue</p>
									</Button>
								</div>
							</form>
							{loading === true && (
								<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full flex items-center justify-center">
									<div className="w-full h-full flex items-center justify-center relative">
										<div className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-background opacity-60" />
										<Spinner size="1.5rem" />
									</div>
								</div>
							)}
						</Form>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProjectForm;

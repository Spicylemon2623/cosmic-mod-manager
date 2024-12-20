import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clientFetch from "@root/utils/client-fetch";
import { disableInteractions, enableInteractions } from "@root/utils/dom";
import { OrgPagePath } from "@root/utils/urls";
import { createURLSafeSlug } from "@shared/lib/utils";
import { createOrganisationFormSchema } from "@shared/schemas/organisation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button, CancelButton } from "~/components/ui/button";
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useNavigate } from "~/components/ui/link";
import { LoadingSpinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { useTranslation } from "~/locales/provider";

export default function CreateNewOrg_Dialog({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const [autoFillUrlSlug, setAutoFillUrlSlug] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof createOrganisationFormSchema>>({
        resolver: zodResolver(createOrganisationFormSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
        },
    });

    const createOrganisation = async (values: z.infer<typeof createOrganisationFormSchema>) => {
        try {
            if (isLoading || !isFormSubmittable()) return;
            setIsLoading(true);
            disableInteractions();

            const response = await clientFetch("/api/organization", {
                method: "POST",
                body: JSON.stringify(values),
            });
            const result = await response.json();

            if (!response.ok || !result?.success) {
                enableInteractions();
                return toast.error(result?.message || t.common.error);
            }

            navigate(OrgPagePath(values.slug));
        } finally {
            setIsLoading(false);
        }
    };

    const isFormSubmittable = () => {
        const values = form.getValues();
        const isFormInvalid = !values.name || !values.slug || !values.description;
        return !isFormInvalid;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t.dashboard.creatingOrg}</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>{t.dashboard.creatingOrg}</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <DialogBody>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(createOrganisation)}
                            className="w-full flex flex-col items-start justify-center gap-form-elements"
                        >
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="org-name-input">
                                            {t.form.name}
                                            <FormMessage />
                                        </FormLabel>
                                        <Input
                                            placeholder={t.dashboard.enterOrgName}
                                            id="org-name-input"
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (!autoFillUrlSlug) return;
                                                const name = e.target.value;
                                                form.setValue("slug", createURLSafeSlug(name).value);
                                            }}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="slug"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="org-url-slug-input">
                                            {t.form.url}
                                            <FormMessage />
                                        </FormLabel>
                                        <Input
                                            id="org-url-slug-input"
                                            placeholder="https://crmm.tech/organization/YOUR_URL"
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (autoFillUrlSlug === true) setAutoFillUrlSlug(false);
                                            }}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="org-description-input">
                                            {t.form.description}
                                            <FormMessage />
                                        </FormLabel>
                                        <Textarea
                                            placeholder={t.dashboard.enterOrgDescription}
                                            id="org-description-input"
                                            {...field}
                                            className="resize-none"
                                        />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <CancelButton type="button" />
                                </DialogClose>
                                <Button disabled={isLoading || !isFormSubmittable()}>
                                    {isLoading ? <LoadingSpinner size="xs" /> : <PlusIcon className="w-btn-icon-md h-btn-icon-md" />}
                                    {t.dashboard.createOrg}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}

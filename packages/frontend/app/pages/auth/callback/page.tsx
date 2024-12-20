import { getCookie } from "@root/utils";
import clientFetch from "@root/utils/client-fetch";
import { CSRF_STATE_COOKIE_NAMESPACE } from "@shared/config";
import { getAuthProviderFromString } from "@shared/lib/utils/convertors";
import { AuthActionIntent, AuthProvider } from "@shared/types";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import RefreshPage from "~/components/refresh-page";
import { FormErrorMessage } from "~/components/ui/form-message";
import Link, { useNavigate } from "~/components/ui/link";
import { LoadingSpinner } from "~/components/ui/spinner";
import { useTranslation } from "~/locales/provider";

export default function OAuthCallbackPage() {
    const { t } = useTranslation();
    const params = useParams();
    const [searchParams] = useSearchParams();

    const authProvider = params.authProvider || null;
    const csrfState = searchParams.get("state") || null;
    const code = searchParams.get("code") || null;

    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    async function submitCode(code: string, provider: AuthProvider, actionIntent: AuthActionIntent) {
        try {
            const response = await clientFetch(`/api/auth/${actionIntent}/${provider}`, {
                method: "POST",
                body: JSON.stringify({ code: code }),
            });
            const data = await response.json();

            if (!response?.ok) {
                setErrorMsg(data?.message || t.common.somethingWentWrong);
                return;
            }

            toast.success(data?.message || t.common.success);
            RefreshPage(navigate, "/dashboard");
        } catch (error) {
            console.error(error);
            setErrorMsg(`${error}` || t.common.somethingWentWrong);
        }
    }

    const actionIntent = csrfState?.startsWith(AuthActionIntent.SIGN_IN)
        ? AuthActionIntent.SIGN_IN
        : csrfState?.startsWith(AuthActionIntent.SIGN_UP)
          ? AuthActionIntent.SIGN_UP
          : AuthActionIntent.LINK;

    useEffect(() => {
        if (
            csrfState !== getCookie(CSRF_STATE_COOKIE_NAMESPACE, document.cookie) ||
            !authProvider ||
            !code ||
            !csrfState ||
            getAuthProviderFromString(authProvider) === AuthProvider.UNKNOWN
        ) {
            toast.error("CSRF state didn't match!");
            navigate("/");
            return;
        }

        submitCode(code, getAuthProviderFromString(authProvider), actionIntent);
    }, [authProvider]);

    return (
        <main className="w-full h-[100vh] min-h-[720px] flex flex-col gap-4 items-center justify-center">
            {errorMsg ? (
                <div className="w-full max-w-md flex flex-col gap-4 items-center justify-center">
                    <FormErrorMessage text={errorMsg} />
                    {actionIntent === AuthActionIntent.SIGN_IN ? (
                        <Link className="hover:underline underline-offset-2" to="/login">
                            {t.form.login_withSpace}
                        </Link>
                    ) : actionIntent === AuthActionIntent.SIGN_UP ? (
                        <Link className="hover:underline underline-offset-2" to="/signup">
                            {t.form.signup}
                        </Link>
                    ) : (
                        <Link className="hover:underline underline-offset-2" to="/settings/account">
                            {t.common.settings}
                        </Link>
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </main>
    );
}

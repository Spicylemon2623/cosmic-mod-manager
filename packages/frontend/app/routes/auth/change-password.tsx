import Config from "@root/utils/config";
import { MetaTags } from "@root/utils/meta";
import { SITE_NAME_SHORT } from "@shared/config";
import ChangePasswordPage from "~/pages/auth/change-password";

export default function _ChangePassword() {
    return <ChangePasswordPage />;
}

export function meta() {
    return MetaTags({
        title: "Change password",
        description: `Change your ${SITE_NAME_SHORT} account password`,
        image: `${Config.FRONTEND_URL}/icon.png`,
        url: `${Config.FRONTEND_URL}/change-password`,
        suffixTitle: true,
    });
}

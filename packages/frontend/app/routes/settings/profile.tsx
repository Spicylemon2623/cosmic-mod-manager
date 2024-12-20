import Config from "@root/utils/config";
import { MetaTags } from "@root/utils/meta";
import { PageUrl } from "@root/utils/urls";
import { SITE_NAME_SHORT } from "@shared/config";
import Redirect from "~/components/ui/redirect";
import { useSession } from "~/hooks/session";
import { ProfileSettingsPage } from "~/pages/settings/profile";

export default function _AccountSettings() {
    const session = useSession();

    if (!session?.id) return <Redirect to="/login" />;
    return <ProfileSettingsPage session={session} />;
}

export function meta() {
    return MetaTags({
        title: "Profile settings",
        description: `Your ${SITE_NAME_SHORT} profile settings`,
        image: `${Config.FRONTEND_URL}/icon.png`,
        url: `${Config.FRONTEND_URL}${PageUrl("settings/profile")}`,
        suffixTitle: true,
    });
}

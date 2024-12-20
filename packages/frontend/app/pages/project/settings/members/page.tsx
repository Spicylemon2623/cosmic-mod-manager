import { hasRootAccess } from "@shared/config/roles";
import { doesMemberHaveAccess } from "@shared/lib/utils";
import { type LoggedInUserData, ProjectPermission } from "@shared/types";
import type { Organisation, TeamMember } from "@shared/types/api";
import { UserXIcon } from "lucide-react";
import { useState } from "react";
import { type Location, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import RefreshPage from "~/components/refresh-page";
import { Button, CancelButton } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { LoadingSpinner } from "~/components/ui/spinner";
import { useProjectData } from "~/hooks/project";
import { useSession } from "~/hooks/session";
import { useTranslation } from "~/locales/provider";
import { OrgTeamMember, ProjectTeamMember } from "./edit-member";
import InviteMemberForm from "./invite-member";
import { RemoveProjectFromOrg, TransferProjectManagementCard } from "./transfer-management";
import { leaveTeam } from "./utils";

interface Props {
    userOrgs: Organisation[];
}

export default function ProjectMemberSettingsPage({ userOrgs }: Props) {
    const { t } = useTranslation();
    // Session cant be null here, as the user is redirected to login if they are not logged in
    const session = useSession() as LoggedInUserData;

    const ctx = useProjectData();
    const projectData = ctx.projectData;
    const currUsersMembership = ctx.currUsersMembership;

    const navigate = useNavigate();
    const location = useLocation();

    const canInviteMembers = doesMemberHaveAccess(
        ProjectPermission.MANAGE_INVITES,
        currUsersMembership?.permissions,
        currUsersMembership?.isOwner,
        session?.role,
    );

    async function refreshProjectData(path: string | Location = location) {
        RefreshPage(navigate, path);
    }

    return (
        <>
            <Card className="w-full flex flex-col p-card-surround gap-4">
                <CardTitle>{t.projectSettings.manageMembers}</CardTitle>
                <InviteMemberForm teamId={projectData.teamId} canInviteMembers={canInviteMembers} dataRefetch={refreshProjectData} />
                {currUsersMembership ? (
                    <LeaveTeam teamId={projectData.teamId} currUsersMembership={currUsersMembership} refreshData={refreshProjectData} />
                ) : null}
            </Card>

            {projectData.members
                .filter((member) => !projectData.organisation?.members?.some((orgMember) => orgMember.userId === member.userId))
                .map((member) => (
                    <ProjectTeamMember
                        session={session}
                        key={member.userId}
                        member={member}
                        currUsersMembership={currUsersMembership}
                        fetchProjectData={refreshProjectData}
                        projectTeamId={projectData.teamId}
                        doesProjectHaveOrg={!!projectData.organisation}
                    />
                ))}

            {userOrgs?.length && !projectData.organisation && hasRootAccess(currUsersMembership?.isOwner, session.role) ? (
                <TransferProjectManagementCard organisations={userOrgs} projectId={projectData.id} />
            ) : null}

            {projectData.organisation ? <RemoveProjectFromOrg org={projectData.organisation} projectId={projectData.id} /> : null}

            {projectData.organisation?.members?.map((member) => (
                <OrgTeamMember
                    session={session}
                    key={member.userId}
                    project={projectData}
                    orgMember={member}
                    currUsersMembership={currUsersMembership}
                    fetchProjectData={refreshProjectData}
                />
            ))}
        </>
    );
}

interface LeaveTeamProps {
    currUsersMembership: TeamMember;
    teamId: string;
    isOrgTeam?: boolean;
    refreshData: () => Promise<void>;
}

export function LeaveTeam({ currUsersMembership, teamId, refreshData, isOrgTeam }: LeaveTeamProps) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLeaveProject() {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const data = await leaveTeam(teamId);
            if (!data?.success) return toast.error(data?.message || t.common.error);

            await refreshData();
            return toast.success(t.projectSettings.leftProjectTeam);
        } finally {
            setIsLoading(false);
        }
    }

    const leaveTeamMsg = isOrgTeam ? t.projectSettings.leaveOrg : t.projectSettings.leaveProject;
    const leaveTeamDesc = isOrgTeam ? t.projectSettings.leaveOrgDesc : t.projectSettings.leaveProjectDesc;

    return (
        <div className="w-full flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div>
                <h2 className="text-lg font-semibold">{leaveTeamMsg}</h2>
                <p className="text-muted-foreground">{leaveTeamDesc}</p>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary-destructive" disabled={currUsersMembership.isOwner || currUsersMembership.teamId !== teamId}>
                        <UserXIcon className="w-btn-icon-md h-btn-icon-md" strokeWidth={2.5} />
                        {leaveTeamMsg}
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{leaveTeamMsg}</DialogTitle>
                    </DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        <p>{t.projectSettings.sureToLeaveTeam}</p>
                        <DialogFooter>
                            <DialogClose asChild>
                                <CancelButton />
                            </DialogClose>
                            <Button variant="destructive" disabled={isLoading} onClick={handleLeaveProject}>
                                {isLoading ? (
                                    <LoadingSpinner size="xs" />
                                ) : (
                                    <UserXIcon className="w-btn-icon-md h-btn-icon-md" strokeWidth={2.5} />
                                )}
                                {leaveTeamMsg}
                            </Button>
                        </DialogFooter>
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </div>
    );
}

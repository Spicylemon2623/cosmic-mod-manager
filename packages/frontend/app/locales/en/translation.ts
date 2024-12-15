import type { Translation } from "../types";
import { Rules } from "./legal";
import tags from "./tags";

export default {
    common: {
        settings: "Settings",
        success: "Success",
        error: "Error",
        home: "Home",
        somethingWentWrong: "Something went wrong!",
        redirecting: "Redirecting...",
        accept: "Accept",
        decline: "Decline",
        download: "Download",
        report: "Report",
        copyId: "Copy ID",
    },

    navbar: {
        mod: "mod",
        mods: "mods",
        datamod: "datamod",
        datamods: "datamods",
        "resource-pack": "resource pack",
        "resource-packs": "resource packs",
        shader: "shader",
        shaders: "shaders",
        modpack: "modpack",
        modpacks: "modpacks",
        plugin: "plugin",
        plugins: "plugins",
        signout: "Sign Out",
        dashboard: "Dashboard",
    },

    homePage: {
        title: "The place for Cosmic Reach",
        desc: "The best place for your Cosmic Reach mods. Discover, play, and create content, all in one spot.",
        exploreMods: "Explore mods",
    },

    auth: {
        email: "Email",
        password: "Password",
        changePassword: "Change Password",
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        forgotPassword: "Forgot Password?",
        signupWithProviders: "Signup using any of the auth providers:",
        aggrement: "By creating an account, you agree to our [Terms](/legal/terms) and [Privacy Policy](/legal/privacy).",
        invalidCode: "Invalid or expired code",
        didntRequest: "Didn't request this?",
        checkSessions: "Check loggedIn sessions",
        confirmNewPass: "Confirm new password",
        confirmNewPassDesc:
            "A new password was recently added to your account and is awaiting confirmation. Confirm below if this was you.",
        newPass: "New password",
        newPass_label: "Enter your new password",
        confirmPass: "Confirm password",
        confirmPass_label: "Re-enter your password",
        deleteAccount: "Delete account",
        deleteAccountDesc:
            "Deleting your account will remove all of your data from our database. There is no going back after you delete your account.",
        enterEmail: "Enter your email address",
    },

    settings: {
        preferences: "Preferences",
        publicProfile: "Public Profile",
        accountAndSecurity: "Account and Security",
        sessions: "Sessions",
        toggleFeatures: "Toggle features",
        enableOrDisableFeatures: "Enable or disable certain features on this device.",
        viewTransitions: "View Transitions",
        viewTransitionsDesc: "Enables transitions (morph and crossfade) when navigating between pages.",
        accountSecurity: "Account security",
        changePassTitle: "Change your account password",
        addPassDesc: "Add a password to use credentials login",
        manageAuthProviders: "Manage authentication providers",
        manageProvidersDesc: "Add or remove login methods from your account.",
        removePass: "Remove password",
        removePassTitle: "Remove your account password",
        removePassDesc: "After removing your password you won't be able to use credentials to log into your account",
        enterCurrentPass: "Enter your current password",
        addPass: "Add password",
        addPassDialogDesc: "You will be able to use this password to log into your account",
        manageProviders: "Manage providers",
        linkedProviders: "Linked auth providers",
        linkProvider: (provider: string) => `Link ${provider} to your account`,
        link: "Link",
        sureToDeleteAccount: "Are you sure you want to delete your account?",
        profileInfo: "Profile information",
        profileInfoDesc: (site: string) => `Your profile information is publicly viewable on ${site}.`,
        profilePic: "Profile picture",
        bio: "Bio",
        bioDesc: "A short description to tell everyone a little bit about you.",
        visitYourProfile: "Visit your profile",
        showIpAddr: "Show IP addresses",
        sessionsDesc:
            "These devices are currently logged into your account, you can revoke any session at any time. If you see something you don't recognize, immediately revoke the session and change the password of the associated auth provider.",
        ipHidden: "IP Hidden",
        lastAccessed: "Last accessed",
        created: "Created", // eg: Created a month ago
        sessionCreatedUsing: (providerName: string) => `Session created using ${providerName}`,
        currSession: "Current session",
        revokeSession: "Revoke session",
    },

    dashboard: {
        dashboard: "Dashboard",
        overview: "Overview",
        notifications: "Notifications",
        activeReports: "Active reports",
        analytics: "Analytics",
        projects: "Projects",
        organizations: "Organizations",
        collections: "Collections",
        revenue: "Revenue",
        manage: "Manage",
        seeAll: "See all",
        viewNotifHistory: "View notification history",
        noUnreadNotifs: "You don't have any unread notifications.",
        totalDownloads: "Total downloads",
        fromProjects: (count: number) => `from ${count} projects`,
        totalFollowers: "Total followers",
        viewHistory: "View history",
        markAllRead: "Mark all as read",
        markRead: "Mark as read",
        deleteNotif: "Delete notification",
        received: "Received",
        history: "History",
        notifHistory: "Notification history",
        createProjectInfo: "You don't have any projects. Click the button above to create one.",
        type: "Type",
        status: "Status",
        createProject: "Create a project",
        creatingProject: "Creating a project",
        chooseProjectType: "Choose project type",
        projectTypeDesc: "Select the appropriate type for your project",
        createOrg: "Create organization",
        createAnOrg: "Create an organization",
        creatingOrg: "Creating an organization",
        enterOrgName: "Enter organization name",
        enterOrgDescription: "Enter a short description for your organization",
    },

    search: {
        // Search labels
        project: "Search projects",
        mod: "Search mods",
        "resource-pack": "Search resource packs",
        shader: "Search shaders",
        plugin: "Search plugins",
        modpack: "Search modpacks",
        datamod: "Search datamods",

        // Sorting methods
        sortBy: "Sort by",
        relevance: "Relevance",
        downloads: "Downloads",
        follow_count: "Follow count",
        recently_updated: "Recently updated",
        recently_published: "Recently published",

        filters: "Filters",
        searchFilters: "Search filters",
        loaders: "Loaders",
        gameVersions: "Game versions",
        channels: "Channels",
        environment: "Environment",
        categories: "Categories",
        features: "Features",
        resolutions: "Resolutions",
        performanceImpact: "Performance impact",
        license: "License",
        openSourceOnly: "Open source only",
        clearFilters: "Clear all filters",

        tags: tags,
    },

    project: {
        compatibility: "Compatibility",
        environments: "Environments",
        reportIssues: "Report issues",
        viewSource: "View source",
        visitWiki: "Visit wiki",
        joinDiscord: "Join discord server",
        featuredVersions: "Featured versions",
        creators: "Creators",
        organization: "Organization",
        project: "Project",
        details: "Details",
        updated: "Updated", // eg: Updated 3 days ago
        gallery: "Gallery",
        changelog: "Changelog",
        versions: "Versions",
        noProjectDesc: "No project description provided",
        uploadNewImg: "Upload a new gallery image",
        uploadImg: "Upload gallery image",
        galleryOrderingDesc: "Image with higher ordering will be listed first.",
        featuredGalleryImgDesc:
            "A featured gallery image shows up in search and your project card. Only one gallery image can be featured.",
        addGalleryImg: "Add gallery image",
        featureImg: "Feature image",
        unfeatureImg: "Unfeature image",
        sureToDeleteImg: "Are you sure you want to delete this gallery image?",
        deleteImgDesc: "This will remove this gallery image forever (like really forever).",
        editGalleryImg: "Edit gallery image",
        currImage: "Current image",

        // Version
        uploadVersion: "Upload a version",
        uploadNewVersion: "Upload a new project version",
        showDevVersions: "Show dev versions",
        noProjectVersions: "No project versions found",
        stats: "Stats",
        published: "Published", // Used for table headers
        downloads: "Downloads", // Used for table headers
        openInNewTab: "Open in new tab",
        copyLink: "Copy link",
        doesNotSupport: (project: string, version: string, loader: string) => {
            return `${project} does not support ${version} for ${loader}`;
        },
        downloadProject: (project: string) => `Download ${project}`,
        gameVersion: "Game version:",
        selectGameVersion: "Select game version",
        platform: "Platform:",
        selectPlatform: "Select platform",
        onlyAvailableFor: (project: string, platform: string) => `${project} is only available for ${platform}`,
        noVersionsAvailableFor: (gameVersion: string, loader: string) => `No versions available for ${gameVersion} on ${loader}`,
        declinedInvitation: "Declined invitation",
        teamInvitationTitle: (teamType: string) => `Invitation to join ${teamType}`, // teamType = organization | project
        teamInviteDesc: (teamType: string, role: string) =>
            `You've been invited be a member of this ${teamType} with the role of '${role}'.`,

        browse: {
            mod: "Browse mods",
            datamod: "Browse datamods",
            "resource-pack": "Browse resource packs",
            shader: "Browse shaders",
            modpack: "Browse modpacks",
            plugin: "Browse plugins",
        },
    },

    version: {
        deleteVersion: "Delete version",
        sureToDelete: "Are you sure you want to delete this version?",
        deleteDesc: "This will remove this version forever (like really forever).",
        enterVersionTitle: "Enter the version title...",
        feature: "Feature version",
        unfeature: "Unfeature version",
        featured: "Featured",
        releaseChannel: "Release channel",
        versionNumber: "Version number",
        selectLoaders: "Select loaders",
        selectVersions: "Select versions",
        cantAddCurrProject: "You cannot add the current project as a dependency",
        cantAddDuplicateDep: "You cannot add the same dependency twice",
        addDep: "Add dependency",
        enterProjectId: "Enter the project ID/Slug",
        enterVersionId: "Enter the version ID/Slug",
        dependencies: "Dependencies",
        files: "Files",

        depencency: {
            required: "Required",
            optional: "Optional",
            incompatible: "Incompatible",
            embedded: "Embedded",
            required_desc: (version: string) => `Version ${version} is required`,
            optional_desc: (version: string) => `Version ${version} is optional`,
            incompatible_desc: (version: string) => `Version ${version} is incompatible`,
            embedded_desc: (version: string) => `Version ${version} is embedded`,
        },

        primary: "Primary",
        noPrimaryFile: "No primary file chosen",
        chooseFile: "Choose file",
        replaceFile: "Replace file",
        uploadExtraFiles: "Upload additional files",
        uploadExtraFilesDesc: "Used for additional files like sources, documentation, etc.",
        selectFiles: "Select files",
        primaryFileRequired: "Primary file is required",
        metadata: "Metadata",
        devReleasesNote: "NOTE:- Older dev releases will be automatically deleted after a new dev release is published.",
        publicationDate: "Publication date",
        publisher: "Publisher",
        versionID: "Version ID",
        copySha1: "Copy SHA-1 hash",
        copySha512: "Copy SHA-512 hash",
        copyFileUrl: "Copy file URL",
    },

    projectSettings: {
        settings: "Project settings",
        general: "General",
        tags: "Tags",
        links: "Links",
        members: "Members",
        view: "View",
        upload: "Upload",
        externalLinks: "External links",
        issueTracker: "Issue tracker",
        issueTrackerDesc: "A place for users to report bugs, issues, and concerns about your project.",
        sourceCode: "Source code",
        sourceCodeDesc: "A page/repository containing the source code for your project.",
        wikiPage: "Wiki page",
        wikiPageDesc: "A page containing information, documentation, and help for the project.",
        discordInvite: "Discord invite",
        discordInviteDesc: "An invitation link to your Discord server.",
        licenseDesc1: (projectType: string) =>
            `It is very important to choose a proper license for your ${projectType}. You may choose one from our list or provide a custom license. You may also provide a custom URL to your chosen license; otherwise, the license text will be displayed.`,
        licenseDesc2:
            "Enter a valid [SPDX license identifier](https://spdx.org/licenses) in the marked area. If your license does not have a SPDX identifier (for example, if you created the license yourself or if the license is Cosmic Reach specific), simply check the box and enter the name of the license instead.",
        selectLicense: "Select license",
        custom: "Custom",
        licenseName: "License name",
        licenseUrl: "License URL (optional)",
        spdxId: "SPDX identifier",
        doesntHaveSpdxId: "License does not have a SPDX identifier",
        tagsDesc: "Accurate tagging is important to help people find your mod. Make sure to select all tags that apply.",
        tagsDesc2: (projectType: string) => `Select all categories that reflect the themes or function of your ${projectType}.`,
        featuredCategories: "Featured categories",
        featuredCategoriesDesc: (count: number) => `You can feature up to ${count} of your most relevant tags.`,
        selectAtLeastOneCategory: "Select at least one category in order to feature a category.",
        projectInfo: "Project information",
        clientSide: "Client-side",
        clientSideDesc: (projectType: string) => `Select based on if your ${projectType} has functionality on the client side.`,
        serverSide: "Server-side",
        serverSideDesc: (projectType: string) => `Select based on if your ${projectType} has functionality on the logical server.`,
        unknown: "Unknown",
        required: "Required",
        optional: "Optional",
        unsupported: "Unsupported",
        visibilityDesc:
            "Listed and archived projects are visible in search. Unlisted projects are published, but not visible in search or on user profiles. Private projects are only accessible by members of the project.",
        ifApproved: "If approved by the moderators:",
        visibleInSearch: "Visible in search",
        visibleOnProfile: "Visible on profile",
        visibleViaUrl: "Visible via URL",
        visibleToMembersOnly: "Only members will be able to view the project",
        listed: "Listed",
        private: "Pivate",
        unlisted: "Unlisted",
        archived: "Archived",
        deleteProject: "Delete project",
        deleteProjectDesc: (site: string) =>
            `Removes your project from ${site}'s servers and search. Clicking on this will delete your project, so be extra careful!`,
        sureToDeleteProject: "Are you sure you want to delete this project?",
        deleteProjectDesc2:
            "If you proceed, all versions and any attached data will be removed from our servers. This may break other projects, so be careful.",
        typeToVerify: (projectName: string) => `To verify, type **${projectName}** below:`,
    },

    footer: {
        company: "Company",
        terms: "Terms",
        privacy: "Privacy",
        rules: "Rules",
        resources: "Resources",
        docs: "Docs",
        status: "Status",
        support: "Support",
        socials: "Socials",
        about: "About",
        changeTheme: "Change theme",
    },

    legal: {
        rulesTitle: "Content Rules",
        rules: Rules,

        termsTitle: "Terms of Use",
        copyrightPolicyTitle: "Copyright Policy",
        securityNoticeTitle: "Security Notice",
        privacyPolicyTitle: "Privacy Policy",
    },

    form: {
        login: "Login",
        login_withSpace: "Log In",
        signup: "Sign Up",
        email: "Email",
        username: "Username",
        password: "Password",
        name: "Name",
        icon: "Icon",
        details: "Details",
        description: "Description",
        id: "ID",
        url: "URL",
        projectType: "Project type",
        visibility: "Visibility",
        summary: "Summary",
        title: "Title",
        ordering: "Ordering",
        featured: "Featured",
        continue: "Continue",
        submit: "Submit",
        remove: "Remove",
        confirm: "Confirm",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        saveChanges: "Save Changes",
        uploadIcon: "Upload icon",
        removeIcon: "Remove icon",
        noFileChosen: "No file chosen",
        showAllVersions: "Show all versions",
    },

    error: {
        sthWentWrong: "Oops! Something went wrong",
        errorDesc: "Seems like something broke, while we try to resolve the issue try refreshing the page.",
        refresh: "Refresh",
        pageNotFound: "404 | Page not found.",
        pageNotFoundDesc: "Sorry, we couldn't find the page you're looking for.",
        projectNotFound: "Project not found",
        projectNotFoundDesc: (type: string, slug: string) => `The ${type} with the slug/ID "${slug}" does not exist.`,
    },

    date: {
        justNow: "just now",
        minuteAgo: (mins: number) => {
            switch (mins) {
                case 1:
                    return "a minute ago";
                default:
                    return `${mins} minutes ago`;
            }
        },
        hourAgo: (hours: number) => {
            switch (hours) {
                case 1:
                    return "an hour ago";
                default:
                    return `${hours} hours ago`;
            }
        },
        dayAgo: (days: number) => {
            switch (days) {
                case 1:
                    return "yesterday";
                default:
                    return `${days} days ago`;
            }
        },
        weekAgo: (weeks: number) => {
            switch (weeks) {
                case 1:
                    return "last week";
                default:
                    return `${weeks} weeks ago`;
            }
        },
        monthAgo: (months: number) => {
            switch (months) {
                case 1:
                    return "last month";
                default:
                    return `${months} months ago`;
            }
        },
        yearAgo: (years: number) => {
            switch (years) {
                case 1:
                    return "last year";
                default:
                    return `${years} years ago`;
            }
        },
    },
} satisfies Translation;

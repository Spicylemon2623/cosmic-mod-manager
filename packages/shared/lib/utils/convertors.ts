import { loaders, projectTypes } from "../../config/project";
import { AuthProvider, ConfirmationType, FileType, GlobalUserRole, ProjectType, ProjectVisibility } from "../../types";
import { getTypeOfFile } from "./file-signature";

export const getUserRoleFromString = (roleName: string) => {
    switch (roleName) {
        case GlobalUserRole.ADMIN:
            return GlobalUserRole.ADMIN;
        case GlobalUserRole.MODERATOR:
            return GlobalUserRole.MODERATOR;
        case GlobalUserRole.USER:
            return GlobalUserRole.USER;
        default:
            return GlobalUserRole.USER;
    }
};

export const getProjectTypesFromNames = (list: string[]) => {
    const result = [];
    for (const projectType of projectTypes) {
        if (list.includes(projectType)) {
            result.push(projectType);
        }
    }

    return result;
};

export const getProjectTypeFromName = (type: string) => {
    return getProjectTypesFromNames([type])?.[0] || ProjectType.MOD;
};

export const getAuthProviderFromString = (providerName: string) => {
    switch (providerName.toLowerCase()) {
        case AuthProvider.GITHUB:
            return AuthProvider.GITHUB;
        case AuthProvider.GITLAB:
            return AuthProvider.GITLAB;
        case AuthProvider.DISCORD:
            return AuthProvider.DISCORD;
        case AuthProvider.GOOGLE:
            return AuthProvider.GOOGLE;
        case AuthProvider.CREDENTIAL:
            return AuthProvider.CREDENTIAL;
        default:
            return AuthProvider.UNKNOWN;
    }
};

export const getConfirmActionTypeFromStringName = (type: string) => {
    switch (type) {
        case ConfirmationType.CONFIRM_NEW_PASSWORD:
            return ConfirmationType.CONFIRM_NEW_PASSWORD;
        case ConfirmationType.CHANGE_ACCOUNT_PASSWORD:
            return ConfirmationType.CHANGE_ACCOUNT_PASSWORD;
        case ConfirmationType.DELETE_USER_ACCOUNT:
            return ConfirmationType.DELETE_USER_ACCOUNT;
        default:
            return null;
    }
};

export const getProjectVisibilityFromString = (visibility: string) => {
    switch (visibility.toLowerCase()) {
        case ProjectVisibility.PRIVATE:
            return ProjectVisibility.PRIVATE;
        case ProjectVisibility.UNLISTED:
            return ProjectVisibility.UNLISTED;
        case ProjectVisibility.ARCHIVED:
            return ProjectVisibility.ARCHIVED;
        default:
            return ProjectVisibility.LISTED;
    }
};

export const getFileTypeFromFileExtension = (fileName: string) => {
    const fileExtension = fileName.split(".").pop();
    if (!fileExtension) return null;

    switch (fileExtension.toLowerCase()) {
        case "jpg":
        case "jpeg":
            return FileType.JPEG;
        case "webp":
            return FileType.WEBP;
        case "png":
            return FileType.PNG;
        case "gif":
            return FileType.GIF;

        case "jar":
            return FileType.JAR;

        case "zip":
            return FileType.ZIP;
        case "7z":
            return FileType.SEVEN_Z;
        case "gz":
            return FileType.GZ;
        case "tar":
            return FileType.TAR;

        default:
            return null;
    }
};

export const getFileType = async (file: File) => {
    const fileExtensionType = getFileTypeFromFileExtension(file.name);
    if (!fileExtensionType) return null;

    const fileSignatureType = await getTypeOfFile(file);
    if (!fileSignatureType || !fileSignatureType.includes(fileExtensionType)) return null;

    return fileExtensionType;
};

export const getLoaderFromString = (loaderName: string) => {
    for (const LOADER of loaders) {
        if (LOADER.name === loaderName.toLowerCase()) {
            return LOADER;
        }
    }
    return null;
};

export const getLoadersFromNames = (loaderNames: string[]) => {
    const loadersList = [];

    for (const loaderName of loaderNames) {
        const loader = getLoaderFromString(loaderName);
        if (loader) {
            loadersList.push(loader);
        }
    }
    return loadersList;
};

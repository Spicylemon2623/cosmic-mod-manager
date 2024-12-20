import { ThemeOptions } from "@root/types";
import { loaders } from "@shared/config/project";
import { CapitalizeAndFormatString } from "@shared/lib/utils";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "~/locales/provider";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCookie(key: string, src: string) {
    for (const cookie of src.split("; ")) {
        if (cookie.split("=")[0] === key) {
            return cookie.split("=")[1];
        }
    }
    return null;
}

export function setCookie(key: string, value: string, expires = 365) {
    document.cookie = `${key}=${value}; expires=${new Date(Date.now() + expires * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
}

export function getThemeFromCookie(cookie?: string | null): ThemeOptions {
    return cookie === ThemeOptions.LIGHT ? ThemeOptions.LIGHT : ThemeOptions.DARK;
}

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function timeSince(pastTime: Date): string {
    try {
        const { t } = useTranslation();

        const now = new Date();
        const diff = now.getTime() - pastTime.getTime();

        const seconds = Math.abs(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.round(hours / 24);
        const weeks = Math.round(days / 7);
        const months = Math.round(days / 30.4375);
        const years = Math.round(days / 365.25);

        if (seconds < 60) {
            return t.date.justNow;
        }
        if (minutes < 60) {
            return t.date.minuteAgo(minutes);
        }
        if (hours < 24) {
            return t.date.hourAgo(hours);
        }
        if (days < 7) {
            return t.date.dayAgo(days);
        }
        if (weeks < 4) {
            return t.date.weekAgo(weeks);
        }
        if (months < 12) {
            return t.date.monthAgo(months);
        }
        return t.date.yearAgo(years);
    } catch (error) {
        console.error(error);
        return "";
    }
}

export function formatDate(
    date: Date,
    timestamp_template = "${month} ${day}, ${year} at ${hours}:${minutes} ${amPm}",
    useShortMonthNames = false,
    utc = false,
): string {
    try {
        const year = utc ? date.getUTCFullYear() : date.getFullYear();
        const monthIndex = utc ? date.getUTCMonth() : date.getMonth();
        const month = (useShortMonthNames ? shortMonthNames : monthNames)[monthIndex];
        const day = utc ? date.getUTCDate() : date.getDate();

        const hours = utc ? date.getUTCHours() : date.getHours();
        const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
        const amPm = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12; // Convert to 12-hour format

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

        return timestamp_template
            .replace("${month}", `${month}`)
            .replace("${day}", `${day}`)
            .replace("${year}", `${year}`)
            .replace("${hours}", `${adjustedHours}`)
            .replace("${minutes}", `${formattedMinutes}`)
            .replace("${amPm}", `${amPm}`);
    } catch (error) {
        console.error(error);
        return "";
    }
}

export function FormatProjectTypes(types: string[]) {
    if (types.length === 1) return CapitalizeAndFormatString(types[0]);
    if (types.length === 2) return `${CapitalizeAndFormatString(types[0])} and ${CapitalizeAndFormatString(types[1])}`;

    let str = "";
    for (const type of types.slice(0, -2)) {
        str += `${CapitalizeAndFormatString(type)}, `;
    }

    str += `${CapitalizeAndFormatString(types.at(-2))} and ${CapitalizeAndFormatString(types.at(-1))}`;
    return str;
}

export function projectFileUrl(pathname: string) {
    return `${pathname}`;
}

export function imageUrl(url: string | undefined | null): string {
    if (!url) return "";

    return url;
}

export function isLoaderVisibleInTagsList(loaderName: string) {
    for (const LOADER of loaders) {
        if (LOADER.name === loaderName) {
            if (LOADER.metadata.visibleInTagsList === false) return false;
            return true;
        }
    }

    return true;
}

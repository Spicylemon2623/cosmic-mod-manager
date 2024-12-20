import { useLocation } from "react-router";
import { formatLocaleCode, parseLocale } from "~/locales";
import SupportedLocales, { DefaultLocale } from "~/locales/meta";

export function isCurrLinkActive(targetUrl: string, currUrl: string, exactEnds = true) {
    if (exactEnds === true) {
        return currUrl === targetUrl || currUrl === `${targetUrl}/`;
    }
    return currUrl.includes(targetUrl);
}

// The url lang prefix can be any of the supported locales which follows a / after it or it's the end of the string
// eg: /en/search, /en
const langCodes = SupportedLocales.map((l) => formatLocaleCode(l));
const langRegex = new RegExp(`^\\/(${langCodes.join("|")})(?=\\/|$)`);

export function useUrlLocale(trimLeadingSlash = true, customPathname?: string) {
    const pathname = customPathname ? customPathname : usePathname();

    const match = pathname.match(langRegex);
    const matchString = match ? match[0] : "";

    let urlPrefix = parseLocale(removeLeading("/", matchString));
    if (urlPrefix === DefaultLocale.code && !matchString.includes(DefaultLocale.code)) urlPrefix = "";

    if (trimLeadingSlash === true) return urlPrefix;
    return prepend("/", urlPrefix);
}

export function usePathname() {
    // Can't use hooks outside of components, so we need to check if we're in a browser environments
    if (globalThis.window) {
        return window.location.pathname;
    }

    // We can totally use the hook during server-side rendering
    return useLocation().pathname;
}

// ? URL Formatters

/**
 * Constructs a URL path with an optional language prefix and additional path segment.
 *
 * @param _path - The main path segment of the URL.
 * @param extra - An optional additional path segment to append to the URL.
 * @param prefix - An optional language prefix to prepend to the URL.
 * @returns The constructed URL path as a string.
 */
export function PageUrl(_path: string, extra?: string, prefix?: string) {
    if (_path.startsWith("http") || _path.startsWith("mailto:")) return _path;

    const langPrefix = typeof prefix === "string" ? prefix : useUrlLocale(false);
    let p = _path === "/" ? "" : prepend("/", _path);

    // Make sure not to overwrite the language prefix if it already exists
    const match = p.match(langRegex);
    if (!match) p = prepend(langPrefix, p);

    if (extra) {
        p = removeTrailing("/", p);
        extra = removeLeading("/", extra);
        p += `/${extra}`;
    }

    return p;
}

export function ProjectPagePath(type: string, projectSlug: string, extra?: string) {
    let pathname = PageUrl(type, projectSlug);
    if (extra) pathname += `/${extra}`;
    return pathname;
}

export function VersionPagePath(type: string, projectSlug: string, versionSlug: string, extra?: string) {
    let pathname = `${ProjectPagePath(type, projectSlug)}/version/${versionSlug}`;
    if (extra) pathname += `/${extra}`;
    return pathname;
}

export function OrgPagePath(orgSlug: string, extra?: string) {
    let pathname = PageUrl("organization", orgSlug);
    if (extra) pathname += `/${extra}`;
    return pathname;
}

export function UserProfilePath(username: string, extra?: string) {
    let pathname = PageUrl("user", username);
    if (extra) pathname += `/${extra}`;
    return pathname;
}

export function prepend(str: string, path: string) {
    return path.startsWith(str) ? path : `${str}${path}`;
}

export function append(str: string, path: string) {
    return path.endsWith(str) ? path : `${path}${str}`;
}

export function removeLeading(str: string, path: string) {
    if (!str.length) return path;
    if (!path.startsWith(str)) return path;

    return removeLeading(str, path.slice(str.length || 1));
}

export function removeTrailing(str: string, path: string) {
    if (!str.length) return path;
    if (!path.endsWith(str)) return path;

    return removeTrailing(str, path.slice(0, -1 * str.length));
}

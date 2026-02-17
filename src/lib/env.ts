/**
 * Safe environment accessor
 * Does NOT crash during client hydration
 */

function getEnv(key: string): string {
    const value = process.env[key];

    if (!value) {
        if (typeof window === "undefined") {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        return "";
    }

    return value;
}

export const env = {
    NEXT_PUBLIC_SUPABASE_URL: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),

    SUPABASE_URL:
        process.env.SUPABASE_URL ??
        process.env.NEXT_PUBLIC_SUPABASE_URL ??
        "",

    SUPABASE_ANON_KEY:
        process.env.SUPABASE_ANON_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        "",

    SUPABASE_SERVICE_ROLE_KEY:
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
} as const;

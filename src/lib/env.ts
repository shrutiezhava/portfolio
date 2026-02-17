
/**
 * Application environment configuration
 * Validates required environment variables at runtime
 */

const requiredServerEnvVars = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
] as const;

const requiredClientEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

function validateUrl(url: string, key: string) {
    try {
        new URL(url);
    } catch {
        throw new Error(`Invalid URL format for environment variable ${key}: ${url}`);
    }
}

export function validateEnv() {
    // Validate Client Variables
    for (const key of requiredClientEnvVars) {
        if (!process.env[key]) {
            throw new Error(`Missing required client environment variable: ${key}`);
        }
    }

    // Validate URLs
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        validateUrl(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL');
    }

    // Validate Server Variables (only if running on server)
    if (typeof window === 'undefined') {
        const missing = requiredServerEnvVars.filter(key => !process.env[key]);
        if (missing.length > 0) {
            // Check if we can fallback securely
            // For example, SUPABASE_URL might fallback to NEXT_PUBLIC_SUPABASE_URL
            // But strict mode prefers explicit definition
            throw new Error(`Missing required server environment variables: ${missing.join(', ')}`);
        }

        if (process.env.SUPABASE_URL) {
            validateUrl(process.env.SUPABASE_URL, 'SUPABASE_URL');
        }
    }
}

// Perform validation immediately
validateEnv();

export const env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
} as const;


if (typeof window !== "undefined") {
    throw new Error("env.server.ts imported in client");
}

export const serverEnv = {
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};

if (!serverEnv.SUPABASE_URL) {
    throw new Error("SUPABASE_URL missing");
}

if (!serverEnv.SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY missing");
}

if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY missing");
}

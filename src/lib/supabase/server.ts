
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import type { Database } from './database.types'


// Define a placeholder for your Database types.
// Ideally, generate these using Supabase CLI: 
// npx supabase gen types typescript --project-id ... > src/lib/supabase/database.types.ts

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient<Database>(
        env.SUPABASE_URL,
        env.SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

/**
 * Creates a Supabase client with Service Role permissions.
 * STRICTLY for use in secure server actions/api routes.
 * NEVER expose this client to the browser.
 */
export async function createAdminClient() {
    const cookieStore = await cookies()

    return createServerClient<Database>(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Same handling as standard client
                    }
                },
            },
        }
    )
}

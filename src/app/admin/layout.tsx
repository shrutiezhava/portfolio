
import AdminSidebar from '@/components/AdminSidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';


// Force dynamic rendering for admin routes to ensure auth checks run on every request
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server-side Authentication Check
    // This is a defense-in-depth measure in addition to middleware
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.warn('Unauthorized access attempt to /admin', { error });
        redirect('/login');
    }

    // Role-based Access Control (RBAC)
    // Check if user has admin role in public.users table (synced from auth.users)
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    // Assuming 'ADMIN' is the required role. Adjust based on your schema.
    // If you don't have roles implemented yet, this protects broadly.
    // Ideally, ensure your 'users' table has a role column.
    if (!profile || profile.role !== 'ADMIN') {
        console.warn(`User ${user.id} attempted to access admin without ADMIN role.`);
        // Redirect to a forbidden page or back to home
        redirect('/');
    }

    return (
        <div className="flex bg-background h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-alt-section/50 p-8 h-full">
                <div className="max-w-7xl mx-auto py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

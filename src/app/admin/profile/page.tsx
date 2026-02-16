
import ProfileForm from "@/components/ProfileForm";
import { createClient } from '@/lib/supabase/server';

async function getProfile() {
    const supabase = await createClient();
    const { data: profile } = await supabase
        .from('profile')
        .select('*')
        .single();
    return profile;
}

export default async function AdminProfilePage() {
    const profile = await getProfile();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Profile</h1>
                <p className="text-slate">Update your public persona.</p>
            </div>

            <ProfileForm profile={profile} />
        </div>
    );
}

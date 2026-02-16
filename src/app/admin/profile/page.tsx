
import prisma from '@/lib/prisma';
import ProfileForm from '@/components/ProfileForm';

export default async function AdminProfilePage() {
    const profile = await prisma.profile.findFirst();

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-display font-bold mb-8">Operator Profile</h1>
            <ProfileForm profile={profile} />
        </div>
    );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { updateProfile } from '@/app/actions';
import { User, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

interface ProfileFormProps {
    profile?: any;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '');

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await updateProfile(formData);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile.');
            setIsSubmitting(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic client-side preview
        const objectUrl = URL.createObjectURL(file);
        setAvatarPreview(objectUrl);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                const input = document.getElementById('avatarUrl') as HTMLInputElement;
                if (input) input.value = data.url;
                setAvatarPreview(data.url); // Set to actual URL after upload
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-alt-section border-2 border-slate/20">
                    {avatarPreview ? (
                        <Image
                            src={avatarPreview}
                            alt="Avatar Preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate">
                            <User className="w-8 h-8" />
                        </div>
                    )}
                </div>
                <div>
                    <label className="cursor-pointer px-4 py-2 bg-ink text-background rounded-lg hover:bg-ink/90 transition-colors inline-flex items-center text-sm font-medium">
                        Change Avatar
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                    </label>
                    <input type="hidden" name="avatarUrl" id="avatarUrl" defaultValue={profile?.avatarUrl} />
                    <p className="text-xs text-slate mt-2">Recommended: 400x400px</p>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate">Display Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={profile?.name}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none"
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium text-slate">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    defaultValue={profile?.bio}
                    rows={4}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none resize-none"
                    required
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <label htmlFor="twitter" className="text-sm font-medium text-slate flex items-center gap-2"><Twitter className="w-3 h-3" /> Twitter</label>
                    <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        defaultValue={profile?.twitter}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="github" className="text-sm font-medium text-slate flex items-center gap-2"><Github className="w-3 h-3" /> GitHub</label>
                    <input
                        type="text"
                        name="github"
                        id="github"
                        defaultValue={profile?.github}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-medium text-slate flex items-center gap-2"><Linkedin className="w-3 h-3" /> LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        defaultValue={profile?.linkedin}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none text-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
            </div>
        </form>
    );
}

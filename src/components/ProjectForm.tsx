'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import TipTap from '@/components/editor/TipTap';
import { createProject, updateProject } from '@/app/actions';

interface ProjectFormProps {
    project?: any;
}

export default function ProjectForm({ project }: ProjectFormProps) {
    const [content, setContent] = useState(project?.content || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        formData.set('content', content);

        try {
            if (project) {
                await updateProject(project.id, formData);
            } else {
                await createProject(formData);
            }
        } catch (error) {
            console.error('Failed to submit:', error);
            alert('Failed to save project.');
            setIsSubmitting(false);
        }
    };

    const handleSlugGen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!project) {
            const title = e.target.value;
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const slugInput = document.getElementById('slug') as HTMLInputElement;
            if (slugInput) slugInput.value = slug;
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (data.success) {
            const input = document.getElementById('featuredImage') as HTMLInputElement;
            if (input) input.value = data.url;
        } else {
            alert('Upload failed');
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-slate">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={project?.title}
                        onChange={handleSlugGen}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-medium text-slate">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        id="slug"
                        defaultValue={project?.slug}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-slate">Short Description</label>
                <textarea
                    name="description"
                    id="description"
                    defaultValue={project?.description}
                    rows={3}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none resize-none"
                    required
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="liveUrl" className="text-sm font-medium text-slate">Live URL</label>
                    <input
                        type="text"
                        name="liveUrl"
                        id="liveUrl"
                        defaultValue={project?.liveUrl}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="githubUrl" className="text-sm font-medium text-slate">GitHub URL</label>
                    <input
                        type="text"
                        name="githubUrl"
                        id="githubUrl"
                        defaultValue={project?.githubUrl}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="techStack" className="text-sm font-medium text-slate">Tech Stack (comma separated)</label>
                <input
                    type="text"
                    name="techStack"
                    id="techStack"
                    defaultValue={project?.techStack}
                    placeholder="Next.js, Tailwind, Prisma..."
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="featuredImage" className="text-sm font-medium text-slate">Featured Image</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="featuredImage"
                        id="featuredImage"
                        defaultValue={project?.featuredImage}
                        placeholder="https://..."
                        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-alt-section rounded-lg hover:bg-slate/20 transition-colors flex items-center">
                        <span className="text-sm font-medium">Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate">Detailed Content</label>
                <TipTap content={content} onChange={setContent} />
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="published"
                        defaultChecked={project?.published}
                        className="w-4 h-4 rounded border-slate/20 text-accent-blue focus:ring-accent-blue/50"
                    />
                    <span className="text-sm font-medium text-slate">Publish immediately</span>
                </label>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (project ? 'Update Experiment' : 'Initialize Experiment')}
                </Button>
            </div>
        </form>
    );
}

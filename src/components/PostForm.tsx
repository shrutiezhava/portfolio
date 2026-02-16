'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import TipTap from '@/components/editor/TipTap';
import { createPost, updatePost } from '@/app/actions';

interface PostFormProps {
    post?: any; // Avoiding full Prisma type for brevity, but could import
}

export default function PostForm({ post }: PostFormProps) {
    const [content, setContent] = useState(post?.content || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        formData.set('content', content); // Add content manually as TipTap doesn't use name attribute

        try {
            if (post) {
                await updatePost(post.id, formData);
            } else {
                await createPost(formData);
            }
        } catch (error) {
            console.error('Failed to submit:', error);
            alert('Failed to save post.');
            setIsSubmitting(false);
        }
    };

    const handleSlugGen = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!post) { // Only auto-gen for new posts or if slug field is empty
            const title = e.target.value;
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            // We can't easily update another un-controlled input's value without refs or state.
            // So I'll make slug a controlled input or use setSlug state.
            // For simplicity, let's use document.getElementById since this is a quick MVP form.
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
                        defaultValue={post?.title}
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
                        defaultValue={post?.slug}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none font-mono text-sm"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium text-slate">Excerpt</label>
                <textarea
                    name="excerpt"
                    id="excerpt"
                    defaultValue={post?.excerpt}
                    rows={3}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-blue/50 outline-none resize-none"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="featuredImage" className="text-sm font-medium text-slate">Featured Image</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="featuredImage"
                        id="featuredImage"
                        defaultValue={post?.featuredImage}
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
                <label className="text-sm font-medium text-slate">Content</label>
                <TipTap content={content} onChange={setContent} />
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="published"
                        defaultChecked={post?.published}
                        className="w-4 h-4 rounded border-slate/20 text-accent-blue focus:ring-accent-blue/50"
                    />
                    <span className="text-sm font-medium text-slate">Publish immediately</span>
                </label>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (post ? 'Update Signal' : 'Broadcast Signal')}
                </Button>
            </div>
        </form>
    );
}

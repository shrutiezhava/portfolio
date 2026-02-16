'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getAuthUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        throw new Error('Unauthorized');
    }
    return user;
}

// --- POST ACTIONS ---

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';

    if (!title || !slug || !content) {
        throw new Error('Missing required fields');
    }

    const user = await getAuthUser();

    // Ensure user exists in Prisma (sync)
    let author = await prisma.user.findUnique({
        where: { id: user.id }
    });

    if (!author) {
        author = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email!,
                role: 'ADMIN', // First user is admin by default in this flow logic
            }
        });
    }

    await prisma.post.create({
        data: {
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            published,
            authorId: author.id,
        },
    });

    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';

    await getAuthUser();

    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            published,
        },
    });

    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}

export async function deletePost(formData: FormData) {
    await getAuthUser();
    const id = formData.get('id') as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
}

export async function togglePostPublish(formData: FormData) {
    await getAuthUser();
    const id = formData.get('id') as string;
    const current = formData.get('currentState') === 'true';
    await prisma.post.update({
        where: { id },
        data: { published: !current },
    });
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
}

// --- PROJECT ACTIONS ---

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const techStack = formData.get('techStack') as string;
    const liveUrl = formData.get('liveUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';

    if (!title || !slug) {
        throw new Error("Missing required fields");
    }

    await getAuthUser();

    await prisma.project.create({
        data: {
            title,
            slug,
            description,
            content,
            techStack,
            liveUrl,
            githubUrl,
            featuredImage,
            published
        }
    });

    revalidatePath('/lab');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const techStack = formData.get('techStack') as string;
    const liveUrl = formData.get('liveUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';

    await getAuthUser();

    await prisma.project.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            content,
            techStack,
            liveUrl,
            githubUrl,
            featuredImage,
            published
        }
    });

    revalidatePath('/lab');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
    await getAuthUser();
    const id = formData.get('id') as string;
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin/projects');
    revalidatePath('/lab');
}

export async function toggleProjectPublish(formData: FormData) {
    await getAuthUser();
    const id = formData.get('id') as string;
    const current = formData.get('currentState') === 'true';
    await prisma.project.update({
        where: { id },
        data: { published: !current },
    });
    revalidatePath('/admin/projects');
    revalidatePath('/lab');
}

// --- PROFILE ACTIONS ---

export async function updateProfile(formData: FormData) {
    await getAuthUser();

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatarUrl') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    const linkedin = formData.get('linkedin') as string;

    // Assuming single profile, or find first
    const profile = await prisma.profile.findFirst();

    if (profile) {
        await prisma.profile.update({
            where: { id: profile.id },
            data: { name, bio, avatarUrl, twitter, github, linkedin }
        });
    } else {
        await prisma.profile.create({
            data: { name, bio, avatarUrl, twitter, github, linkedin }
        });
    }

    revalidatePath('/admin/profile');
    revalidatePath('/blog'); // Revalidate blog as it shows profile
    redirect('/admin/profile');
}

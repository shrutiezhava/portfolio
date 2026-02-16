
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getAuthUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        throw new Error('Unauthorized');
    }
    return { user, supabase };
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

    const { user, supabase } = await getAuthUser();

    // Ensure user exists in public.users
    let { data: author } = await supabase.from('users').select('*').eq('id', user.id).single();

    if (!author) {
        // Create user in public.users
        const { data: newAuthor, error: createError } = await supabase.from('users').insert({
            id: user.id,
            email: user.email!,
            role: 'ADMIN' // Default to ADMIN for now as per logic
        }).select().single();

        if (createError) throw new Error(`Failed to create user: ${createError.message}`);
        author = newAuthor;
    }

    const { error } = await supabase.from('posts').insert({
        title,
        slug,
        content,
        excerpt,
        featured_image: featuredImage,
        published,
        author_id: author.id,
    });

    if (error) throw new Error(`Failed to create post: ${error.message}`);

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

    const { supabase } = await getAuthUser();

    const { error } = await supabase.from('posts').update({
        title,
        slug,
        content,
        excerpt,
        featured_image: featuredImage,
        published,
        updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) throw new Error(`Failed to update post: ${error.message}`);

    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}

export async function deletePost(formData: FormData) {
    const { supabase } = await getAuthUser();
    const id = formData.get('id') as string;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete post: ${error.message}`);
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
}

export async function togglePostPublish(formData: FormData) {
    const { supabase } = await getAuthUser();
    const id = formData.get('id') as string;
    const current = formData.get('currentState') === 'true';

    const { error } = await supabase.from('posts').update({
        published: !current,
        updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) throw new Error(`Failed to toggle post: ${error.message}`);

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

    const { supabase } = await getAuthUser();

    const { error } = await supabase.from('projects').insert({
        title,
        slug,
        description,
        content,
        tech_stack: techStack,
        live_url: liveUrl,
        github_url: githubUrl,
        featured_image: featuredImage,
        published
    });

    if (error) throw new Error(`Failed to create project: ${error.message}`);

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

    const { supabase } = await getAuthUser();

    const { error } = await supabase.from('projects').update({
        title,
        slug,
        description,
        content,
        tech_stack: techStack,
        live_url: liveUrl,
        github_url: githubUrl,
        featured_image: featuredImage,
        published,
        updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) throw new Error(`Failed to update project: ${error.message}`);

    revalidatePath('/lab');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
    const { supabase } = await getAuthUser();
    const id = formData.get('id') as string;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete project: ${error.message}`);
    revalidatePath('/admin/projects');
    revalidatePath('/lab');
}

export async function toggleProjectPublish(formData: FormData) {
    const { supabase } = await getAuthUser();
    const id = formData.get('id') as string;
    const current = formData.get('currentState') === 'true';

    const { error } = await supabase.from('projects').update({
        published: !current,
        updated_at: new Date().toISOString()
    }).eq('id', id);

    if (error) throw new Error(`Failed to toggle project: ${error.message}`);

    revalidatePath('/admin/projects');
    revalidatePath('/lab');
}

// --- PROFILE ACTIONS ---

export async function updateProfile(formData: FormData) {
    const { supabase } = await getAuthUser();

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatarUrl') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    const linkedin = formData.get('linkedin') as string;

    // Check if profile exists
    const { data: profile } = await supabase.from('profile').select('*').single();

    if (profile) {
        await supabase.from('profile').update({
            name, bio, avatar_url: avatarUrl, twitter, github, linkedin, updated_at: new Date().toISOString()
        }).eq('id', profile.id);
    } else {
        await supabase.from('profile').insert({
            name, bio, avatar_url: avatarUrl, twitter, github, linkedin
        });
    }

    revalidatePath('/admin/profile');
    revalidatePath('/blog');
    redirect('/admin/profile');
}

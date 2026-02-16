
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*, author:users(*)')
        .eq('slug', slug)
        .single();
    return post;
}

async function getProfile() {
    const supabase = await createClient();
    const { data: profile } = await supabase
        .from('profile')
        .select('*')
        .single();
    return profile;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Digital Lab',
        };
    }

    return {
        title: `${post.title} | Digital Lab`,
        description: post.excerpt || post.content.substring(0, 150),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const profile = await getProfile();

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="container mx-auto px-6 max-w-4xl py-12">
                <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate hover:text-ink mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Logs
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm font-mono text-accent-blue mb-4 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse"></span>
                        {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-tight mb-6">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-slate font-light leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {post.featured_image && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative w-full h-[400px]">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority
                        />
                    </div>
                )}

                <article className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-a:text-accent-blue hover:prose-a:text-accent-blue/80 prose-code:text-accent-coral prose-code:bg-alt-section prose-code:px-1 prose-code:rounded prose-pre:bg-dark-section prose-pre:text-slate-200 mb-20">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {profile && (
                    <div className="border-t border-border pt-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        {profile.avatar_url && (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate/20 flex-shrink-0">
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold font-display mb-2">{profile.name}</h3>
                            <p className="text-slate mb-4 leading-relaxed">{profile.bio}</p>
                            <div className="flex justify-center md:justify-start gap-4">
                                {profile.twitter && (
                                    <Link href={profile.twitter} target="_blank" className="text-slate hover:text-accent-blue transition-colors">Twitter</Link>
                                )}
                                {profile.github && (
                                    <Link href={profile.github} target="_blank" className="text-slate hover:text-accent-blue transition-colors">GitHub</Link>
                                )}
                                {profile.linkedin && (
                                    <Link href={profile.linkedin} target="_blank" className="text-slate hover:text-accent-blue transition-colors">LinkedIn</Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

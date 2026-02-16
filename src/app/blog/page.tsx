
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Logs | Digital Lab',
    description: 'Thoughts on code, design, and chaos.',
};

async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="bg-alt-section py-20 border-b border-slate/10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-6xl font-display font-black tracking-tighter mb-4">LOGS.</h1>
                    <p className="text-xl text-slate max-w-2xl font-light">
                        Observations from the field. Sometimes coherent, often experimental.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl py-20">
                <div className="grid grid-cols-1 gap-8">
                    {posts.map((post) => (
                        <Card key={post.id} variant="bordered" className="group">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {post.featuredImage && (
                                    <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden bg-slate/10">
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="mb-4 flex items-center gap-3 text-sm font-mono text-slate uppercase tracking-wider">
                                        <span className="w-2 h-2 rounded-full bg-accent-lime"></span>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4 hover:text-accent-blue transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-slate mb-6 leading-relaxed">
                                        {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 200) + '...'}
                                    </p>
                                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                                        Read Signal <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-20 text-slate">
                            <p className="text-xl font-mono">No signals detected yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

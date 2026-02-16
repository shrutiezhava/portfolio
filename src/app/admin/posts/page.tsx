
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import prisma from '@/lib/prisma';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { deletePost, togglePostPublish } from '@/app/actions';

async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function AdminPostsPage() {
    const posts = await getPosts();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Signals</h1>
                    <p className="text-slate">Manage your blog posts and broadcasts.</p>
                </div>
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> New Signal
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-6 bg-background border border-border rounded-xl hover:border-ink transition-colors group">
                        <div>
                            <h3 className="text-xl font-bold mb-1 flex items-center gap-3">
                                {post.title}
                                <span className={`text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${post.published ? "bg-accent-lime/20 text-accent-lime-dark" : "bg-accent-coral/20 text-accent-coral-dark"}`}>
                                    {post.published ? "LIVE" : "DRAFT"}
                                </span>
                            </h3>
                            <div className="text-sm text-slate font-mono">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <form action={togglePostPublish}>
                                <input type="hidden" name="id" value={post.id} />
                                <input type="hidden" name="currentState" value={String(post.published)} />
                                <Button type="submit" variant="ghost" size="sm" title={post.published ? "Unpublish" : "Publish"}>
                                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                            </form>
                            <Link href={`/admin/posts/edit/${post.id}`}>
                                <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </Link>
                            <form action={deletePost}>
                                <input type="hidden" name="id" value={post.id} />
                                <Button type="submit" variant="ghost" size="sm" className="text-accent-coral hover:bg-accent-coral/10 hover:text-accent-coral">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && (
                    <div className="text-center py-20 bg-background border border-border border-dashed rounded-xl">
                        <p className="text-slate">No signals detected.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

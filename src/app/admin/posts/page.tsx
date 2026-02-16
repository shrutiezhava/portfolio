
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { deletePost, togglePostPublish } from "@/app/actions";

async function getPosts() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
    return posts || [];
}

export default async function AdminPostsPage() {
    const posts = await getPosts();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Signals</h1>
                    <p className="text-slate">Manage your broadcast signals.</p>
                </div>
                <Link href="/admin/posts/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> New Signal
                    </Button>
                </Link>
            </div>

            <div className="bg-background border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-border bg-alt-section/50">
                            <th className="p-4 font-medium text-slate">Title</th>
                            <th className="p-4 font-medium text-slate">Status</th>
                            <th className="p-4 font-medium text-slate">Date</th>
                            <th className="p-4 font-medium text-slate text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-alt-section/30 transition-colors">
                                <td className="p-4 font-medium">{post.title}</td>
                                <td className="p-4">
                                    <form action={togglePostPublish}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <input type="hidden" name="currentState" value={String(post.published)} />
                                        <button type="submit" className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${post.published ? 'bg-accent-lime/10 text-emerald-500 border-accent-lime/20' : 'bg-slate/10 text-slate border-slate/20'}`}>
                                            {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {post.published ? 'Published' : 'Draft'}
                                        </button>
                                    </form>
                                </td>
                                <td className="p-4 text-slate font-mono text-xs">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 flex gap-2 justify-end">
                                    <Link href={`/admin/posts/edit/${post.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <form action={deletePost}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-500 hover:bg-red-500/10">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate">
                                    No posts found. Start broadcasting.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

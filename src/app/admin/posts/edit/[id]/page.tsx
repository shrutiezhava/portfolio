
import PostForm from "@/components/PostForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

async function getPost(id: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
    return post;
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Edit Signal</h1>
                <p className="text-slate">Refine your transmission.</p>
            </div>

            <PostForm post={post} />
        </div>
    );
}

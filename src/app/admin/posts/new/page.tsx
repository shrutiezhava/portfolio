
import PostForm from '@/components/PostForm';

// Ensure this page is never statically cached
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function NewPostPage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-display font-bold mb-8">Broadcast Signal</h1>
            <PostForm />
        </div>
    );
}

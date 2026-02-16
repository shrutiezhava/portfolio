
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PostForm from '@/components/PostForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-display font-bold mb-8">Refining Signal: {post.title}</h1>
            <PostForm post={post} />
        </div>
    );
}

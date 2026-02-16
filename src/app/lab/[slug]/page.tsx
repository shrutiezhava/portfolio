
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project) {
        return {
            title: 'Experiment Not Found | Digital Lab',
        };
    }

    return {
        title: `${project.title} | Digital Lab`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="container mx-auto px-6 max-w-4xl py-12">
                <Link href="/lab" className="inline-flex items-center text-sm font-medium text-slate hover:text-ink mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lab
                </Link>

                <header className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-tight">
                            {project.title}
                        </h1>
                        <div className="flex gap-4">
                            {project.githubUrl && (
                                <Link href={project.githubUrl} target="_blank" className="p-3 bg-alt-section rounded-full hover:bg-slate/20 transition-colors">
                                    <Github className="w-6 h-6" />
                                </Link>
                            )}
                            {project.liveUrl && (
                                <Link href={project.liveUrl} target="_blank" className="p-3 bg-ink text-background rounded-full hover:bg-ink/90 transition-colors">
                                    <ExternalLink className="w-6 h-6" />
                                </Link>
                            )}
                        </div>
                    </div>
                    <p className="text-xl text-slate font-light leading-relaxed max-w-2xl mb-6">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.split(',').map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-accent-lime/10 text-accent-lime-darker border border-accent-lime/20 rounded-full text-sm font-mono font-medium">
                                {tech.trim()}
                            </span>
                        ))}
                    </div>
                </header>

                {project.featuredImage && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative w-full h-[500px] border border-slate/10">
                        <Image
                            src={project.featuredImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority
                        />
                    </div>
                )}

                <article className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-a:text-accent-blue hover:prose-a:text-accent-blue/80 prose-code:text-accent-coral prose-code:bg-alt-section prose-code:px-1 prose-code:rounded prose-pre:bg-dark-section prose-pre:text-slate-200">
                    <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </article>
            </div>
        </main>
    );
}

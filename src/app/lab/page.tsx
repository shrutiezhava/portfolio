
import { Card } from '@/components/ui/Card';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lab Experiments | Digital Lab',
    description: 'Ongoing research and digital artifacts.',
};

async function getProjects() {
    return await prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });
}

export default async function LabPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="bg-alt-section py-20 border-b border-slate/10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-6xl font-display font-black tracking-tighter mb-4">THE LAB.</h1>
                    <p className="text-xl text-slate max-w-2xl font-light">
                        Active experiments and prototypes. Enter at your own risk.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id} variant="solid" className="p-0 overflow-hidden group h-full flex flex-col hover:border-accent-blue/50 border border-transparent transition-all">
                            {project.featuredImage && (
                                <div className="h-64 relative w-full overflow-hidden bg-slate/10">
                                    <Image
                                        src={project.featuredImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            )}
                            {!project.featuredImage && (
                                <div className="h-64 bg-slate/5 w-full flex items-center justify-center border-b border-border">
                                    <span className="font-mono text-slate/50">NO VISUAL</span>
                                </div>
                            )}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold hover:text-accent-blue transition-colors">
                                        <Link href={`/lab/${project.slug}`}>{project.title}</Link>
                                    </h2>
                                    <div className="flex gap-2">
                                        {project.githubUrl && (
                                            <Link href={project.githubUrl} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors" title="Source Code">
                                                <Github className="w-5 h-5" />
                                            </Link>
                                        )}
                                        {project.liveUrl && (
                                            <Link href={project.liveUrl} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors" title="Live Demo">
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <p className="text-slate mb-6 text-sm leading-relaxed flex-1 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                                    {project.techStack.split(',').map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-background/50 border border-slate/10 rounded-full text-xs font-mono font-medium text-slate">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                                <Link href={`/lab/${project.slug}`} className="w-full text-center py-2 border border-slate/20 rounded-lg hover:bg-ink hover:text-background transition-colors text-sm font-medium mt-2">
                                    View Data
                                </Link>
                            </div>
                        </Card>
                    ))}
                    {projects.length === 0 && (
                        <div className="text-center py-20 text-slate col-span-2">
                            <p className="text-xl font-mono">No active experiments found.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

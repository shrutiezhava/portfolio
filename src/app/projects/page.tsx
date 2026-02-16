
import { Card } from '@/components/ui/Card';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experiments | Digital Lab',
    description: 'Projects, prototypes, and failures.',
};

async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="bg-alt-section py-20 border-b border-slate/10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-6xl font-display font-black tracking-tighter mb-4">EXPERIMENTS.</h1>
                    <p className="text-xl text-slate max-w-2xl font-light">
                        A collection of digital artifacts. Some are useful, others are just for fun.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id} variant="solid" className="p-0 overflow-hidden group h-full flex flex-col">
                            {project.image && (
                                <div className="h-64 relative w-full overflow-hidden bg-slate/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            )}
                            {!project.image && (
                                <div className="h-64 bg-gradient-to-br from-slate/20 to-slate/5 w-full flex items-center justify-center">
                                    <span className="font-mono text-slate/50">NO PREVIEW</span>
                                </div>
                            )}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold">{project.title}</h2>
                                    <div className="flex gap-2">
                                        {project.github && (
                                            <Link href={project.github} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors" title="View Source">
                                                <Github className="w-5 h-5" />
                                            </Link>
                                        )}
                                        {project.link && (
                                            <Link href={project.link} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors" title="View Live">
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <p className="text-slate mb-6 text-sm leading-relaxed flex-1">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.split(',').map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-background/50 border border-slate/10 rounded-full text-xs font-mono font-medium text-slate">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                    {projects.length === 0 && (
                        <div className="text-center py-20 text-slate col-span-2">
                            <p className="text-xl font-mono">No experiments online yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

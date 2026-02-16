
import { Card } from '@/components/ui/Card';
import { Beaker, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lab | Digital Lab',
    description: 'Experimental projects and digital artifacts.',
};

async function getProjects() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
    return projects || [];
}

export default async function LabPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="bg-alt-section py-20 border-b border-slate/10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-6xl font-display font-black tracking-tighter mb-4">THE LAB.</h1>
                    <p className="text-xl text-slate max-w-2xl font-light">
                        Where ideas are tested. Some survive, others mutate. Failure is just data.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id} variant="bordered" className="group h-full flex flex-col">
                            {project.featured_image && (
                                <div className="w-full aspect-video relative rounded-t-lg overflow-hidden bg-slate/10">
                                    <Image
                                        src={project.featured_image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono border border-border">
                                        {project.tech_stack}
                                    </div>
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-2xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
                                    <Link href={`/lab/${project.slug}`}>{project.title}</Link>
                                </h2>
                                <p className="text-slate mb-6 line-clamp-3 leading-relaxed flex-1">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-dashed border-border/50">
                                    <Link href={`/lab/${project.slug}`} className="text-sm font-medium flex items-center gap-2 hover:text-accent-blue transition-all">
                                        <Beaker className="w-4 h-4" /> Inspect
                                    </Link>
                                    <div className="flex-1"></div>
                                    {project.github_url && (
                                        <Link href={project.github_url} target="_blank" className="text-slate hover:text-ink transition-colors">
                                            <Github className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {project.live_url && (
                                        <Link href={project.live_url} target="_blank" className="text-slate hover:text-ink transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate">
                            <p className="text-xl font-mono">Lab is currently empty. Experiments in progress.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

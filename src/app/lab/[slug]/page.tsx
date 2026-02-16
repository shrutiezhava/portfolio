
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
    const supabase = await createClient();
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
    return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

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

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-ink pb-20">
            <div className="container mx-auto px-6 max-w-5xl py-12">
                <Link href="/lab" className="inline-flex items-center text-sm font-medium text-slate hover:text-ink mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lab
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter leading-tight mb-4">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate font-light leading-relaxed">
                                {project.description}
                            </p>
                        </header>

                        {project.featured_image && (
                            <div className="mb-12 rounded-xl overflow-hidden shadow-2xl relative w-full aspect-video border border-border">
                                <Image
                                    src={project.featured_image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-accent-blue hover:prose-a:text-accent-blue/80 prose-code:text-accent-coral prose-code:bg-alt-section prose-code:px-1 prose-code:rounded">
                            <div dangerouslySetInnerHTML={{ __html: project.content }} />
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-alt-section p-6 rounded-xl border border-border">
                            <h3 className="font-display font-bold text-lg mb-4">Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-mono text-slate uppercase mb-1">Status</div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${project.published ? 'bg-accent-lime' : 'bg-orange-400'}`}></span>
                                        <span className="font-medium">{project.published ? 'Active' : 'Archived'}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-slate uppercase mb-1">Date</div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate" />
                                        <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-slate uppercase mb-1">Tech Stack</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.split(',').map((tech: string) => (
                                            <span key={tech} className="bg-background border border-border px-2 py-1 rounded text-xs font-mono">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {project.live_url && (
                                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button className="w-full gap-2">
                                        <ExternalLink className="w-4 h-4" /> Launch Experiment
                                    </Button>
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant="outline" className="w-full gap-2">
                                        <Github className="w-4 h-4" /> View Source
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

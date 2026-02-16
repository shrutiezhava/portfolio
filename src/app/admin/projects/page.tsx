
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { deleteProject, toggleProjectPublish } from '@/app/actions';

async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Experiments</h1>
                    <p className="text-slate">Manage your lab projects and prototypes.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> New Experiment
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-6 bg-background border border-border rounded-xl hover:border-ink transition-colors group">
                        <div>
                            <h3 className="text-xl font-bold mb-1 flex items-center gap-3">
                                {project.title}
                                <span className={`text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${project.published ? "bg-accent-lime/20 text-accent-lime-dark" : "bg-accent-coral/20 text-accent-coral-dark"}`}>
                                    {project.published ? "LIVE" : "DRAFT"}
                                </span>
                            </h3>
                            <div className="text-sm text-slate font-mono">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <form action={toggleProjectPublish}>
                                <input type="hidden" name="id" value={project.id} />
                                <input type="hidden" name="currentState" value={String(project.published)} />
                                <Button type="submit" variant="ghost" size="sm" title={project.published ? "Unpublish" : "Publish"}>
                                    {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                            </form>
                            <Link href={`/admin/projects/edit/${project.id}`}>
                                <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </Link>
                            <form action={deleteProject}>
                                <input type="hidden" name="id" value={project.id} />
                                <Button type="submit" variant="ghost" size="sm" className="text-accent-coral hover:bg-accent-coral/10 hover:text-accent-coral">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="text-center py-20 bg-background border border-border border-dashed rounded-xl">
                        <p className="text-slate">No active experiments.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

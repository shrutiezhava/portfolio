
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { deleteProject, toggleProjectPublish } from "@/app/actions";

async function getProjects() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
    return projects || [];
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Experiments</h1>
                    <p className="text-slate">Manage your lab projects.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> New Experiment
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
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-alt-section/30 transition-colors">
                                <td className="p-4 font-medium">{project.title}</td>
                                <td className="p-4">
                                    <form action={toggleProjectPublish}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <input type="hidden" name="currentState" value={String(project.published)} />
                                        <button type="submit" className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${project.published ? 'bg-accent-lime/10 text-emerald-500 border-accent-lime/20' : 'bg-slate/10 text-slate border-slate/20'}`}>
                                            {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {project.published ? 'Active' : 'Archived'}
                                        </button>
                                    </form>
                                </td>
                                <td className="p-4 text-slate font-mono text-xs">
                                    {new Date(project.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 flex gap-2 justify-end">
                                    <Link href={`/admin/projects/edit/${project.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <form action={deleteProject}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-500 hover:bg-red-500/10">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate">
                                    No experiments found. Start building.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

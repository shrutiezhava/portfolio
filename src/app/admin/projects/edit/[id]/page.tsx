
import ProjectForm from "@/components/ProjectForm";
import { createClient } from '@/lib/supabase/server';
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

async function getProject(id: string) {
    const supabase = await createClient();
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
    return project;
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Edit Experiment</h1>
                <p className="text-slate">Update experimental data.</p>
            </div>

            <ProjectForm project={project} />
        </div>
    );
}

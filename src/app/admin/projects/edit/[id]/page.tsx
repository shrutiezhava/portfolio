
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProjectForm from '@/components/ProjectForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-display font-bold mb-8">Refining Experiment: {project.title}</h1>
            <ProjectForm project={project} />
        </div>
    );
}

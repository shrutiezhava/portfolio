
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { HeroSection } from '@/components/HeroSection';

async function getRecentPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { author: true },
  });
}

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 2,
  });
}

export default async function Home() {
  const posts = await getRecentPosts();
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-background text-ink pb-20">
      <HeroSection />

      <section className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-display font-bold">Recent Signals</h2>
          <Link href="/blog" className="text-slate hover:text-accent-blue transition-colors flex items-center gap-2 group">
            View all logs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col justify-between" variant="bordered">
              <div>
                <div className="mb-4 flex items-center gap-2 text-xs font-mono text-slate uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-accent-lime"></span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-accent-blue transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-slate mb-6 line-clamp-3 text-sm">
                  {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                </p>
              </div>
              <Link href={`/blog/${post.slug}`} className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                Read Signal <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-alt-section py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-display font-bold">Lab Experiments</h2>
            <Link href="/projects" className="text-slate hover:text-accent-coral transition-colors flex items-center gap-2 group">
              View all output <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} variant="solid" className="p-0 overflow-hidden group">
                {project.image && (
                  <div className="h-48 relative w-full bg-slate/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                {!project.image && (
                  <div className="h-48 bg-gradient-to-br from-slate/20 to-slate/5 w-full flex items-center justify-center">
                    <span className="font-mono text-slate/50">NO PREVIEW</span>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <Link href={project.github} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors">
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                      {project.link && (
                        <Link href={project.link} target="_blank" className="p-2 hover:bg-background rounded-full transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="text-slate mb-6 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.split(',').map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-background/50 border border-slate/10 rounded-full text-xs font-mono font-medium text-slate">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

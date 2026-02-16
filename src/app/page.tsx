
import HeroSection from "@/components/HeroSection";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getRecentPosts() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, created_at, excerpt')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);
  return posts || [];
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="py-20 bg-background text-ink">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-black tracking-tighter mb-2">RECENT SIGNALS</h2>
              <p className="text-slate">Latest transmissions from the lab.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
              View All Logs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block border-b border-border pb-8 last:border-0 hover:border-accent-blue/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-2">
                  <span className="text-sm font-mono text-slate shrink-0">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <h3 className="text-2xl font-bold group-hover:text-accent-blue transition-colors">
                    {post.title}
                  </h3>
                </div>
                <p className="text-slate md:pl-32 max-w-2xl">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link href="/blog" className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
              View All Logs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

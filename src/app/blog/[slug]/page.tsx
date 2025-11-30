import Section from "@/components/Section";
import Link from "next/link";
import posts from "@/data/posts.json";
import { notFound } from "next/navigation";

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Section background="alt" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{post.title}</h1>
                </div>
            </Section>

            <Section>
                <div className="container" style={{ maxWidth: '700px' }}>
                    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} style={{ marginBottom: '1.5rem' }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <Link href="/blog" style={{ color: 'var(--color-text-muted)', fontWeight: '600' }}>
                            &larr; Back to Updates
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}

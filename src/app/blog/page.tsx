import Section from "@/components/Section";
import Link from "next/link";
import posts from "@/data/posts.json";

export default function BlogPage() {
    return (
        <>
            <Section background="dark" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>Farm Updates</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                        News and stories from the field.
                    </p>
                </div>
            </Section>

            <Section>
                <div className="container" style={{ maxWidth: '800px' }}>
                    {posts.map((post) => (
                        <div key={post.slug} style={{
                            marginBottom: '4rem',
                            paddingBottom: '4rem',
                            borderBottom: '1px solid #eee'
                        }}>
                            <div style={{
                                fontSize: '0.9rem',
                                color: 'var(--color-text-muted)',
                                marginBottom: '0.5rem'
                            }}>
                                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <h2 style={{ marginBottom: '1rem' }}>
                                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }} className="hover:text-primary">
                                    {post.title}
                                </Link>
                            </h2>
                            <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                                {post.excerpt}
                            </p>
                            <Link href={`/blog/${post.slug}`} style={{
                                color: 'var(--color-primary)',
                                fontWeight: '600',
                                borderBottom: '2px solid var(--color-accent)',
                                paddingBottom: '2px'
                            }}>
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </Section>
        </>
    );
}

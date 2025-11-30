import Section from "@/components/Section";
import data from "@/data/schemes.json";
import Image from "next/image";

export default function SchemesPage() {
    return (
        <>
            <Section background="dark" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>Schemes & Partnerships</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                        Collaborating for a sustainable future.
                    </p>
                </div>
            </Section>

            <Section>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>DEFRA Schemes</h2>
                    <div style={{ display: 'grid', gap: '4rem' }}>
                        {data.schemes.map((scheme, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: scheme.image ? '1fr 1fr' : '1fr',
                                gap: '2rem',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {scheme.image && (
                                    <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
                                        <Image
                                            src={scheme.image}
                                            alt={scheme.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div style={{ padding: '2rem' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        backgroundColor: scheme.status === 'Active' ? '#E8F5E9' : '#FFF3E0',
                                        color: scheme.status === 'Active' ? '#2E7D32' : '#EF6C00',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1rem'
                                    }}>
                                        {scheme.status}
                                    </div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{scheme.name}</h3>
                                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                        {scheme.description}
                                    </p>
                                    {scheme.details && scheme.details.length > 0 && (
                                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)' }}>
                                            {scheme.details.map((detail, i) => (
                                                <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section background="alt">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Partners</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {data.groups.map((group, index) => (
                            <div key={index} style={{
                                padding: '2rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>{group.name}</h3>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {group.role}
                                </div>
                                <p style={{ color: 'var(--color-text-muted)' }}>{group.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}

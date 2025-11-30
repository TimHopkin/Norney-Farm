import Section from "@/components/Section";
import historyData from "@/data/history.json";

export default function HistoryPage() {
    return (
        <>
            <Section background="dark" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>Our History</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                        Four generations of stewardship at Norney Farm.
                    </p>
                </div>
            </Section>

            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{
                        position: 'relative',
                        paddingLeft: '2rem',
                        borderLeft: '2px solid var(--color-primary-light)'
                    }}>
                        {historyData.map((item, index) => (
                            <div key={index} style={{ marginBottom: '4rem', position: 'relative' }}>
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-2.6rem',
                                    top: '0',
                                    width: '1.2rem',
                                    height: '1.2rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-accent)',
                                    border: '4px solid var(--color-bg-main)'
                                }}></div>

                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: 'var(--color-primary-light)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}>
                                    {item.year}
                                </span>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}

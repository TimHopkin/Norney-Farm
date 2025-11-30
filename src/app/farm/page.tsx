import Section from "@/components/Section";
import FarmMap from "@/components/FarmMap";
import FarmDashboard from "@/components/FarmDashboard";

export default function FarmPage() {
    return (
        <>
            <Section background="dark" className="py-20">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>The Farm</h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                        Explore our regenerative farming project in Godalming, Surrey.
                    </p>
                </div>
            </Section>

            <Section>
                <div className="container">
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
                        Norney Farm is a demonstration site for regenerative land use, combining sustainable agriculture with biodiversity conservation.
                    </p>

                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Farm Statistics</h2>
                    <FarmDashboard />

                    <div style={{ marginTop: '4rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Interactive Farm Map</h2>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', textAlign: 'center', marginBottom: '2rem' }}>
                            Explore our 34.5-hectare farm with color-coded land uses. Click on any area to see details.
                        </p>
                        <FarmMap />
                    </div>

                    <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Land Use Breakdown</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#8bc34a', borderRadius: '4px' }}></div>
                                <span>Grassland</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#4caf50', borderRadius: '4px' }}></div>
                                <span>Woodland & Scrub</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffc107', borderRadius: '4px' }}></div>
                                <span>Arable & Crops</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#2196f3', borderRadius: '4px' }}></div>
                                <span>Waterways</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#9e9e9e', borderRadius: '4px' }}></div>
                                <span>Buildings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}

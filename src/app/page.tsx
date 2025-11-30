import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero
        title="Norney Farm"
        subtitle="Regenerating the land for future generations in Godalming, Surrey."
        ctaText="Explore Our Story"
        ctaLink="/history"
        backgroundImage="/branding/Norney_Farm_logo_location_portrait_GR.png" // Placeholder, might need adjustment
      />

      <Section>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Welcome to Norney Farm</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
            I'm Tim Hopkin, the fourth generation of my family to farm this land.
            Our mission is to protect and regenerate the farm, serving as a demonstration site for
            sustainable land use and biodiversity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/farm" className="btn btn-outline">View Farm Layout</Link>
            <Link href="/schemes" className="btn btn-outline">Our Schemes</Link>
          </div>
        </div>
      </Section>

      <Section background="alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Family Heritage</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                A legacy of farming in Godalming, adapting through generations to meet the challenges of the future.
              </p>
              <Link href="/history" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Read History &rarr;</Link>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Digital Innovation</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                Home of Land App, a digital solution born from the need to protect our farm, now used across the UK supply chain.
              </p>
              <a href="https://thelandapp.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Visit Land App &rarr;</a>
            </div>

            {/* Card 3 */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Regeneration</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                Working with Surrey Wildlife Trust and DEFRA to implement schemes that enhance biodiversity and soil health.
              </p>
              <Link href="/schemes" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>View Schemes &rarr;</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

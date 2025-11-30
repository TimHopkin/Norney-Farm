export default function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--color-bg-dark)',
            color: 'var(--color-text-light)',
            padding: '4rem 2rem',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <div>
                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Norney Farm</h3>
                    <p style={{ opacity: 0.8, maxWidth: '300px' }}>
                        Regenerating the land for future generations. Home of Land App.
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p>&copy; {new Date().getFullYear()} Norney Farm. All rights reserved.</p>
                    <p style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.9rem' }}>
                        Godalming, Surrey
                    </p>
                </div>
            </div>
        </footer>
    );
}

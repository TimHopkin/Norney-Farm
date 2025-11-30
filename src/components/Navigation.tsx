import Link from 'next/link';

export default function Navigation() {
    return (
        <nav style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-main)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                <Link href="/">Norney Farm</Link>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <Link href="/history" className="nav-link">History</Link>
                <Link href="/farm" className="nav-link">The Farm</Link>
                <Link href="/schemes" className="nav-link">Schemes & Groups</Link>
                <Link href="/gallery" className="nav-link">Gallery</Link>
                <Link href="/blog" className="nav-link">Blog</Link>
            </div>
        </nav>
    );
}

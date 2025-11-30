import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            padding: '1rem 0',
            zIndex: 1000,
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Image
                        src="/logo.png"
                        alt="Norney Farm"
                        width={180}
                        height={60}
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </Link>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/farm" className="nav-link">The Farm</Link>
                    <Link href="/schemes" className="nav-link">Schemes & Groups</Link>
                    <Link href="/gallery" className="nav-link">Gallery</Link>
                    <Link href="/blog" className="nav-link">Blog</Link>
                </div>
            </div>
        </nav>
    );
}

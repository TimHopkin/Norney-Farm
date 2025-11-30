import Link from 'next/link';

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
}

export default function Hero({ title, subtitle, ctaText, ctaLink, backgroundImage }: HeroProps) {
    return (
        <section style={{
            height: '80vh',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: 'var(--color-primary)', // Fallback
            backgroundImage: backgroundImage ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'var(--color-text-light)',
            padding: '0 2rem'
        }}>
            <div style={{ maxWidth: '800px' }}>
                <h1 style={{
                    fontSize: '4rem',
                    marginBottom: '1.5rem',
                    color: 'var(--color-text-light)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    {title}
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    marginBottom: '2.5rem',
                    opacity: 0.9,
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    {subtitle}
                </p>
                {ctaText && ctaLink && (
                    <Link href={ctaLink} className="btn btn-primary" style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-primary)',
                        fontSize: '1.1rem',
                        padding: '1rem 2rem'
                    }}>
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
}

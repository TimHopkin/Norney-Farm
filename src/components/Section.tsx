interface SectionProps {
    children: React.ReactNode;
    className?: string;
    background?: 'light' | 'dark' | 'alt';
}

export default function Section({ children, className = '', background = 'light' }: SectionProps) {
    const bgMap = {
        light: 'var(--color-bg-main)',
        dark: 'var(--color-bg-dark)',
        alt: 'var(--color-bg-alt)'
    };

    const textColor = background === 'dark' ? 'var(--color-text-light)' : 'var(--color-text-main)';

    return (
        <section className={`section ${className}`} style={{
            backgroundColor: bgMap[background],
            color: textColor
        }}>
            <div className="container">
                {children}
            </div>
        </section>
    );
}

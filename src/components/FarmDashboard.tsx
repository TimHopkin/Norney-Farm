import farmStats from '@/data/farm-stats.json';

export default function FarmDashboard() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            {farmStats.map((stat, index) => (
                <div key={index} style={{
                    padding: '1.5rem',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '2px solid var(--color-primary)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                    className="dashboard-card"
                >
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: 'var(--color-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        {stat.value}
                    </div>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '600'
                    }}>
                        {stat.unit}
                    </div>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: stat.description ? '0.5rem' : '0'
                    }}>
                        {stat.label}
                    </div>
                    {stat.description && (
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.4'
                        }}>
                            {stat.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

'use client';

import { useState } from 'react';
import epcData from '@/data/epc-data.json';

type TabType = 'overview' | 'metrics' | 'scoring';

export default function EPCResilience() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const getRatingColor = (rating: string) => {
        const colors: { [key: string]: string } = {
            'D': '#8bc34a',
            'E': '#ffc107',
            'G': '#f44336'
        };
        return colors[rating] || '#9e9e9e';
    };

    const getValueColor = (value: number | null, category: string) => {
        if (value === null) return '#e0e0e0';

        // Color coding based on value ranges - higher is generally better for most metrics
        if (category === 'BIGGER') {
            if (value > 10) return '#4caf50';
            if (value > 5) return '#8bc34a';
            if (value > 1) return '#ffc107';
            return '#ff9800';
        }

        if (category === 'BETTER') {
            if (value > 0.4) return '#4caf50';
            if (value > 0.2) return '#8bc34a';
            if (value > 0) return '#ffc107';
            return '#ff9800';
        }

        // For connectivity, lower distances are better
        if (category === 'MORE JOINED UP') {
            if (value < 50) return '#4caf50';
            if (value < 100) return '#8bc34a';
            if (value < 300) return '#ffc107';
            return '#ff9800';
        }

        return '#9e9e9e';
    };

    const getScoreColor = (score: number) => {
        if (score === 4) return '#4caf50';
        if (score === 3) return '#8bc34a';
        if (score === 2) return '#ffc107';
        if (score === 1) return '#ff9800';
        return '#9e9e9e';
    };

    return (
        <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
        }}>
            <h2 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                textAlign: 'center',
                color: 'var(--color-text)'
            }}>
                Ecological Performance & Resilience
            </h2>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'metrics', label: 'Habitat Metrics' },
                    { id: 'scoring', label: 'Scoring Breakdown' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'white',
                            color: activeTab === tab.id ? 'white' : 'var(--color-text)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab.id) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab.id) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '3rem',
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            fontSize: '5rem',
                            fontWeight: 'bold',
                            color: getRatingColor(epcData.overview.rating),
                            marginBottom: '0.5rem',
                            lineHeight: '1'
                        }}>
                            {epcData.overview.score}
                        </div>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 2rem',
                            backgroundColor: getRatingColor(epcData.overview.rating),
                            color: 'white',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>
                            Rating {epcData.overview.rating}
                        </div>
                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: '600'
                        }}>
                            Combined EPC Score
                        </div>
                    </div>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--color-text)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        padding: '1.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 'var(--radius-md)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {epcData.overview.description}
                    </p>

                    {/* Habitat Scores Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginTop: '2rem'
                    }}>
                        {epcData.habitats.filter(h => h.score > 0).map(habitat => (
                            <div key={habitat.id} style={{
                                padding: '1.5rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.3s ease'
                            }}
                                className="habitat-card"
                            >
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: getRatingColor(habitat.rating),
                                    marginBottom: '0.25rem'
                                }}>
                                    {habitat.score}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: getRatingColor(habitat.rating),
                                    color: 'white',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}>
                                    {habitat.rating}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text)',
                                    fontWeight: '600'
                                }}>
                                    {habitat.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
                <div>
                    {epcData.metrics.map((categoryGroup, idx) => (
                        <div key={idx} style={{
                            marginBottom: '2.5rem',
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}>
                                    {categoryGroup.category}
                                </div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--color-text-muted)',
                                    fontStyle: 'italic'
                                }}>
                                    {categoryGroup.categoryDescription}
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: '0.9rem'
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                                            <th style={{
                                                padding: '0.75rem',
                                                textAlign: 'left',
                                                fontWeight: '600',
                                                borderBottom: '2px solid #e0e0e0'
                                            }}>
                                                Metric
                                            </th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', borderBottom: '2px solid #e0e0e0' }}>Crop Mgmt</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', borderBottom: '2px solid #e0e0e0' }}>Woodland</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', borderBottom: '2px solid #e0e0e0' }}>Grassland</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', borderBottom: '2px solid #e0e0e0' }}>Water</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryGroup.items.map((item, itemIdx) => (
                                            <tr key={itemIdx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                <td style={{
                                                    padding: '0.75rem',
                                                    fontWeight: '500',
                                                    color: 'var(--color-text)'
                                                }}>
                                                    {item.metric}
                                                </td>
                                                <td style={{
                                                    padding: '0.75rem',
                                                    textAlign: 'center',
                                                    backgroundColor: getValueColor(item.values.crop_management, categoryGroup.category),
                                                    color: item.values.crop_management !== null ? 'white' : '#999',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.values.crop_management ?? 'N/A'}
                                                </td>
                                                <td style={{
                                                    padding: '0.75rem',
                                                    textAlign: 'center',
                                                    backgroundColor: getValueColor(item.values.woodland_scrub, categoryGroup.category),
                                                    color: item.values.woodland_scrub !== null ? 'white' : '#999',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.values.woodland_scrub ?? 'N/A'}
                                                </td>
                                                <td style={{
                                                    padding: '0.75rem',
                                                    textAlign: 'center',
                                                    backgroundColor: getValueColor(item.values.heathland_grassland, categoryGroup.category),
                                                    color: item.values.heathland_grassland !== null ? 'white' : '#999',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.values.heathland_grassland ?? 'N/A'}
                                                </td>
                                                <td style={{
                                                    padding: '0.75rem',
                                                    textAlign: 'center',
                                                    backgroundColor: getValueColor(item.values.water_bodies, categoryGroup.category),
                                                    color: item.values.water_bodies !== null ? 'white' : '#999',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.values.water_bodies ?? 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Scoring Tab */}
            {activeTab === 'scoring' && (
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        Individual criteria scores (1-4) for each habitat type. Higher scores indicate better performance.
                    </p>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.95rem'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Criteria</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Crop Management</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Woodland & Scrub</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Grassland</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Water-bodies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {epcData.scoring.criteria.map((criterion) => (
                                    <tr key={criterion.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                        <td style={{
                                            padding: '1rem',
                                            fontWeight: '600',
                                            color: 'var(--color-text)'
                                        }}>
                                            {criterion.name}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            backgroundColor: getScoreColor(criterion.scores.crop_management),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}>
                                            {criterion.scores.crop_management}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            backgroundColor: getScoreColor(criterion.scores.woodland_scrub),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}>
                                            {criterion.scores.woodland_scrub}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            backgroundColor: getScoreColor(criterion.scores.heathland_grassland),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}>
                                            {criterion.scores.heathland_grassland}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            backgroundColor: getScoreColor(criterion.scores.water_bodies),
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}>
                                            {criterion.scores.water_bodies}
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                                    <td style={{ padding: '1rem' }}>Habitat Score</td>
                                    {epcData.habitats.filter(h => ['crop_management', 'woodland_scrub', 'heathland_grassland', 'water_bodies'].includes(h.id)).map(habitat => (
                                        <td key={habitat.id} style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            backgroundColor: getRatingColor(habitat.rating),
                                            color: 'white',
                                            fontSize: '1.2rem'
                                        }}>
                                            {habitat.score} ({habitat.rating})
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <style jsx>{`
                .habitat-card:hover {
                    transform: translateY(-5px);
                }
                
                @media (max-width: 768px) {
                    table {
                        font-size: 0.8rem;
                    }
                    th, td {
                        padding: 0.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

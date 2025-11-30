'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const GeoJSON = dynamic(
    () => import('react-leaflet').then((mod) => mod.GeoJSON),
    { ssr: false }
);

export default function FarmMap() {
    const [geoData, setGeoData] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetch('/data/farm-boundary.json')
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch((err) => console.error('Failed to load farm data:', err));
    }, []);

    if (!isClient || !geoData) {
        return (
            <div style={{
                height: '400px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)'
            }}>
                <p style={{ color: 'var(--color-text-muted)' }}>Loading map...</p>
            </div>
        );
    }

    const getColor = (feature: any) => {
        const type = feature.properties?.laCodeName || '';
        if (type.includes('grassland')) return '#8bc34a';
        if (type.includes('woodland') || type.includes('scrub')) return '#4caf50';
        if (type.includes('ley') || type.includes('crop')) return '#ffc107';
        if (type.includes('river') || type.includes('stream')) return '#2196f3';
        if (type.includes('Building')) return '#9e9e9e';
        return '#cddc39';
    };

    const style = (feature: any) => ({
        fillColor: getColor(feature),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.6,
    });

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const { laCodeName, name, area } = feature.properties;
            const areaHa = area ? (area / 10000).toFixed(2) : 'N/A';
            layer.bindPopup(`
        <div style="font-family: var(--font-inter);">
          <strong>${laCodeName || 'Feature'}</strong><br/>
          ${name ? `Name: ${name}<br/>` : ''}
          Area: ${areaHa} ha
        </div>
      `);
        }
    };

    return (
        <div style={{
            height: '400px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
        }}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />
            <MapContainer
                center={[51.185, -0.615]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
            </MapContainer>
        </div>
    );
}

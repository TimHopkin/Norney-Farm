'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import proj4 from 'proj4';

// Define British National Grid projection
proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs');

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
    const [mapCenter, setMapCenter] = useState<[number, number]>([51.185, -0.615]);
    const [showSatellite, setShowSatellite] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetch('/data/farm-boundary.json')
            .then((res) => res.json())
            .then((data) => {
                // Transform coordinates from EPSG:27700 to WGS84
                const transformedData = {
                    ...data,
                    features: data.features.map((feature: any) => {
                        if (feature.geometry.type === 'Polygon') {
                            return {
                                ...feature,
                                geometry: {
                                    ...feature.geometry,
                                    coordinates: feature.geometry.coordinates.map((ring: any) =>
                                        ring.map((coord: any) => {
                                            const [lng, lat] = proj4('EPSG:27700', 'EPSG:4326', coord);
                                            return [lng, lat];
                                        })
                                    ),
                                },
                            };
                        } else if (feature.geometry.type === 'MultiPolygon') {
                            return {
                                ...feature,
                                geometry: {
                                    ...feature.geometry,
                                    coordinates: feature.geometry.coordinates.map((polygon: any) =>
                                        polygon.map((ring: any) =>
                                            ring.map((coord: any) => {
                                                const [lng, lat] = proj4('EPSG:27700', 'EPSG:4326', coord);
                                                return [lng, lat];
                                            })
                                        )
                                    ),
                                },
                            };
                        } else if (feature.geometry.type === 'LineString') {
                            return {
                                ...feature,
                                geometry: {
                                    ...feature.geometry,
                                    coordinates: feature.geometry.coordinates.map((coord: any) => {
                                        const [lng, lat] = proj4('EPSG:27700', 'EPSG:4326', coord);
                                        return [lng, lat];
                                    }),
                                },
                            };
                        }
                        return feature;
                    }),
                };

                // Calculate the center from the first feature
                if (transformedData.features.length > 0) {
                    const firstFeature = transformedData.features[0];
                    if (firstFeature.geometry.type === 'Polygon') {
                        const firstCoord = firstFeature.geometry.coordinates[0][0];
                        setMapCenter([firstCoord[1], firstCoord[0]]); // [lat, lng]
                    }
                }

                setGeoData(transformedData);
            })
            .catch((err) => console.error('Failed to load farm data:', err));
    }, []);

    if (!isClient || !geoData) {
        return (
            <div style={{
                height: '500px',
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
        if (type.includes('grassland') || type.includes('Grassland')) return '#8bc34a';
        if (type.includes('woodland') || type.includes('scrub')) return '#4caf50';
        if (type.includes('ley') || type.includes('crop')) return '#ffc107';
        if (type.includes('river') || type.includes('stream') || type.includes('Water')) return '#2196f3';
        if (type.includes('Building') || type.includes('Developed')) return '#9e9e9e';
        return '#cddc39';
    };

    const style = (feature: any) => ({
        fillColor: getColor(feature),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
    });

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const { laCodeName, name, area, description } = feature.properties;
            const areaHa = area ? (area / 10000).toFixed(2) : 'N/A';
            layer.bindPopup(`
        <div style="font-family: var(--font-inter); min-width: 200px;">
          <strong style="font-size: 1.1rem; color: var(--color-primary);">${laCodeName || 'Feature'}</strong><br/>
          ${name ? `<strong>Name:</strong> ${name}<br/>` : ''}
          <strong>Area:</strong> ${areaHa} hectares<br/>
          ${description ? `<em>${description}</em>` : ''}
        </div>
      `);
        }
    };

    return (
        <div>
            <div style={{
                marginBottom: '1rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => setShowSatellite(false)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: !showSatellite ? 'var(--color-primary)' : 'white',
                        color: !showSatellite ? 'white' : 'var(--color-text)',
                        border: '2px solid var(--color-primary)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                    }}
                >
                    🗺️ Street Map
                </button>
                <button
                    onClick={() => setShowSatellite(true)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: showSatellite ? 'var(--color-primary)' : 'white',
                        color: showSatellite ? 'white' : 'var(--color-text)',
                        border: '2px solid var(--color-primary)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                    }}
                >
                    🛰️ Satellite View
                </button>
            </div>

            <div style={{
                height: '500px',
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
                    center={mapCenter}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    {showSatellite ? (
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                        />
                    ) : (
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                    )}
                    <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
                </MapContainer>
            </div>
        </div>
    );
}

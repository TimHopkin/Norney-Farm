'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapRecenterProps {
    bounds: [[number, number], [number, number]] | null;
    trigger: number;
}

export default function MapRecenter({ bounds, trigger }: MapRecenterProps) {
    const map = useMap();

    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, {
                padding: [50, 50],
                animate: true,
                duration: 1
            });
        }
    }, [bounds, trigger, map]);

    return null;
}

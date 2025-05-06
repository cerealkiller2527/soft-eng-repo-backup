// src/components/Map.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl, {Map} from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { myKey } from "./api_key.ts";
import {CreateLayer} from "./assets/createLayer.ts";
import {HOSPITAL_BUILDING_ATTRIBUTES} from "../../src/lib/constants.ts"

const MapboxMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = myKey;

        const map: Map = new mapboxgl.Map({
            container: mapContainer.current as HTMLDivElement,
            style: "mapbox://styles/mapbox/light-v11",
            center: HOSPITAL_BUILDING_ATTRIBUTES[0].sceneCoords,
            zoom: 18,
            pitch: 55,
            antialias: true,
        });

        CreateLayer(map, HOSPITAL_BUILDING_ATTRIBUTES[0])

        return () => map.remove();
    }, []);

    return (
        <div
            ref={mapContainer}
            style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
        />
    );
};

export default MapboxMap;
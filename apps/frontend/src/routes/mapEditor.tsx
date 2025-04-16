import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import MapEditorSelectForm from '../components/MapEditorSelectForm.tsx'
import { overlays } from "@/constants.tsx";
import { pNodeDTO } from "../../../../share/types.ts";

type formType = {
    building: string;
    floor: number;
};

const MapEditor = () => {
    const trpc = useTRPC();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const [form, setForm] = useState<formType | null>(null);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [Pin, setPin] = useState<typeof google.maps.marker.PinElement | null>(null);
    const [nodes, setNodes] = useState<pNodeDTO[]>([]);

    // Mutation for fetching floor map data
    const fetchFloorMap = useQuery(
        trpc.mapEditor.getFloorMap.queryOptions({
            buildingId: 4,
            floor: form?.floor ?? 1,

            onSuccess: (data) => {
                console.log('Floor map data:', data);
                // Set the nodes and edges after fetching data
                setNodes(data.nodes);
                // Optionally, set the edges if needed
                // setEdges(data.edges);
            },
            onError: (error) => {
                console.error('Error fetching floor map data:', error);
                alert("Failed to load floor map data.");
            },
        })
    );

    useEffect(() => {
        if (!form) return;

        const data = fetchFloorMap;
        console.log(data);
    }, [form]); // Trigger when `form` changes

    useEffect(() => {
        const loadGoogleLibraries = async () => {
            const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            setInfoWindow(new InfoWindow());
            setAdvancedMarker(() => AdvancedMarkerElement);
            setPin(() => PinElement);
        };

        loadGoogleLibraries();
    }, []);

    useEffect(() => {
        if (!mapInstance.current || !AdvancedMarker || nodes.length === 0) return;

        const markers = nodes.map((node) => {
            const marker = new AdvancedMarker({
                position: { lat: node.longitude, lng: node.latitude },
                map: mapInstance.current,
                title: node.description ?? '',
            });
            return marker;
        });

        return () => {
            markers.forEach((marker) => marker.setMap(null));
        };
    }, [nodes, AdvancedMarker]);

    useEffect(() => {
        if (!form) return;
        if (form.building === "22 Patriot Place") {
            mapInstance.current?.setCenter({ lat: 42.09280, lng: -71.266 });
        } else {
            mapInstance.current?.setCenter({ lat: 42.3260, lng: -71.1499 });
        }
        setImageIndex(form.floor - 1);
        console.log(form.floor);
    }, [form]);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = new google.maps.Map(mapRef.current, {
                zoom: 19,
                center: { lat: 42.09280, lng: -71.266 },
                disableDefaultUI: false,
                mapId: '57f41020f9b31f57',
            });

            mapInstance.current = map;

            directionsRenderer.current = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
            });
            directionsRenderer.current.setMap(map);
        }
    }, []);

    useEffect(() => {
        if (!mapInstance.current) return;

        overlaysRef.current.forEach(o => o.setMap(null));
        overlaysRef.current = [];

        overlays[imageIndex].forEach((overlayData) => {
            const overlay = new google.maps.GroundOverlay(
                overlayData.imageUrl,
                new google.maps.LatLngBounds(
                    { lat: overlayData.bounds.south, lng: overlayData.bounds.west },
                    { lat: overlayData.bounds.north, lng: overlayData.bounds.east }
                )
            );
            overlay.setMap(mapInstance.current);
            overlaysRef.current.push(overlay);
        });
    }, [imageIndex]);

    return (
        <div id="floorplan" className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-start mb-2">
                <img src="/BrighamAndWomensLogo.png" alt="Logo" className="h-12 ml-2" />
            </div>

            <Navbar />

            <div className="flex justify-center items-start bg-white shadow-xl rounded-lg p-2 mt-2">
                <MapEditorSelectForm onSubmit={(form) => {
                    setForm(form);
                }} />

                <div
                    id="google-map-container"
                    className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    ref={mapRef}
                    style={{ width: '100%', height: '600px' }}
                />
            </div>

            <Footer />
        </div>
    );
};

export default MapEditor;

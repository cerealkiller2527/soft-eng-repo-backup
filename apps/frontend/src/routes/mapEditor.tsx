import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';
const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

type formType = {
    location: string;
    destination: string;
    transport: string;
    building: string;
};

type OverlayImage = {
    imageUrl: string;
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
};

const MapEditor = () => {
    const trpc = useTRPC();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);

    const overlays: OverlayImage[][] = [
        [
            {
                imageUrl: "/chestnutFloorOne.png",
                bounds: {
                    north: 42.32624046941922,
                    south: 42.32567461058454,
                    east: -71.14920891056955,
                    west: -71.15014579333681,
                },
            },
            {
                imageUrl: "/20PatriotPlaceFloorOne.png",
                bounds: {
                    north: 42.09309,
                    south: 42.09249,
                    east: -71.26552,
                    west: -71.26656,
                },
            }
        ],
        [
            {
                imageUrl: "/chestnutFloorOne.png",
                bounds: {
                    north: 42.32624046941922,
                    south: 42.32567461058454,
                    east: -71.14920891056955,
                    west: -71.15014579333681,
                },
            },

        ],

    ];

    const marker = new AdvancedMarkerElement({
        position : { lat: 42.3262, lng: -71.1497 },
        map: mapInstance.current,
        gmpClickable: true,
    });

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = new google.maps.Map(mapRef.current, {
                zoom: 18,
                center: { lat: 42.09333, lng: -71.26546 },
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



    const handleImageSwitch = () => {
        console.log("switch");
        setImageIndex((prevIndex) => (prevIndex + 1) % overlays.length);
    };

    return (
        <div id="floorplan" className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-start mb-2">
                <img src="/BrighamAndWomensLogo.png" alt="Logo" className="h-12 ml-2" />
            </div>

            <Navbar />

            <div className="flex justify-center items-start bg-white shadow-xl rounded-lg p-2 mt-2">

                <div
                    id="google-map-container"
                    className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    ref={mapRef}
                    style={{ width: '100%', height: '600px' }}
                />
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleImageSwitch}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
                    >
                        Floor : {imageIndex + 1}
                    </button>
                </div>


            </div>

            <Footer />
        </div>
    );
};

export default MapEditor;

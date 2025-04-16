import React, { useRef, useEffect, useState, SetStateAction } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';
import { overlays } from "@/constants.tsx";

import {pNodeDTO} from "../../../../share/types.ts";

type formType = {
    location: string;
    destination: string;
    transport: string;
    building: string;
};



const FloorPlan = () => {
    const trpc = useTRPC();
    const [eta, setEta] = useState<string | undefined>(undefined);
    const [form, setForm] = useState<formType | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const polylineRef = useRef<google.maps.Polyline | null>(null);
    const [endMapsLocation, setEndMapsLocation] = useState([
        {lat : 0.00 , lng : 0.00}
    ]);
    const [pathCoords, setPathCoords] = useState([
        { latitude: .00, longitude: .00, floor: 1 },
    ]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [Pin, setPin] = useState<typeof google.maps.marker.PinElement | null>(null);

    useEffect(() => {
        const loadGoogleLibraries = async () => {
            const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            setInfoWindow(new InfoWindow());
            setAdvancedMarker(() => AdvancedMarkerElement);
            setPin(() => PinElement);
        };

        loadGoogleLibraries();
    }, [])

    useEffect(() => {
        if (!mapInstance.current || !AdvancedMarker) return;

        const marker = new AdvancedMarker({
            position : { lat: 42.3262, lng: -71.1497 },
            map: mapInstance.current,
            gmpClickable: true,
        });

        return () => marker.setMap(null); // Cleanup on unmount or dependency change
    }, [AdvancedMarker]);

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

        // Remove the previous polyline if it exists
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
            polylineRef.current = null;
        }

        // Filter the pathCoords to only those matching the current floor
        const filteredCoords = pathCoords
            .filter(node => node.floor === imageIndex + 1) // assuming floor index starts from 1
            .map(node => ({ lat: node.latitude, lng: node.longitude }));

        if (filteredCoords.length < 2) return; // Need at least 2 points to draw a line
        console.log(filteredCoords);

        // Create and display new polyline
        const polyline = new google.maps.Polyline({
            path: filteredCoords,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        polyline.setMap(mapInstance.current);
        polylineRef.current = polyline;

    }, [pathCoords, imageIndex]);

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

    const search = useMutation(
        trpc.search.getPath.mutationOptions({
            onSuccess: (data: pNodeDTO[]) => {

                console.log(data);
                const formattedCoords = data.map((node) => ({
                    latitude: node.longitude,
                    longitude: node.latitude,
                    floor: node.floor
                }));

                // const formattedCoords = data.map(([x, y]) => ({ x, y }));
                // setPathCoords(formattedCoords);

                setPathCoords(formattedCoords)

            },
            onError: (error) => {
                console.error('Username or password is incorrect!', error);
                alert("Username or password is incorrect!");
            },
        })
    );




    useEffect(() => {
        if (!form) return;

        search.mutate({
            startDesc: '1bottom entrance',
            endDesc: 'reception',
        });

        let travelMode = google.maps.TravelMode.DRIVING;
        switch (form.transport) {
            case "Public Transport": travelMode = google.maps.TravelMode.TRANSIT; break;
            case "Walking": travelMode = google.maps.TravelMode.WALKING; break;
        }

        if(form.building == "Patriot Place"){
            mapInstance.current?.setCenter({ lat: 42.09333, lng: -71.26546 });
        }else{
            mapInstance.current?.setCenter({ lat: 42.3262, lng: -71.1497 });
        }




        if (form.location && mapInstance.current && directionsRenderer.current) {
            const directionsService = new google.maps.DirectionsService();
            let address = "850 Boylston St Chestnut Hill, MA 02467";
            if(form.building ==  "20 Patriot Place"){
                address = "20 Patriot Pl, Foxborough, MA 02035";
            }else if(form.building ==  "22 Patriot Place"){
                address = "22 Patriot Pl, Foxborough, MA 02035";
            }
            directionsService.route(
                {
                    origin: form.location,
                    destination: address,
                    travelMode: travelMode,
                },
                (result, status) => {
                    if (status === 'OK' && result?.routes?.length > 0) {
                        directionsRenderer.current.setDirections(result);
                        const leg = result.routes[0].legs[0];
                        setEndMapsLocation(leg.end_location);



                        const durationText = leg?.duration?.text;
                        setEta(durationText);
                    } else {
                        console.warn("Directions failed:", status, result);
                    }
                }
            );
        }
    }, [form]);

    const handleImageSwitch = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % overlays.length);
    };

    return (
        <div id="floorplan" className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-start mb-2">
                <img src="/BrighamAndWomensLogo.png" alt="Logo" className="h-12 ml-2" />
            </div>

            <Navbar />

            <div className="flex justify-center items-start bg-white shadow-xl rounded-lg p-2 mt-2">
                <LocationRequestForm onSubmit={(form) => setForm(form)} />

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

                {eta && (
                    <div className="absolute top-25 left-120 bg-white border border-gray-300 rounded p-3 shadow-md z-10 w-64">
                        <div className="flex justify-between items-center mb-2">
                            <strong>ETA:</strong>
                        </div>
                        <p>{eta}.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default FloorPlan;

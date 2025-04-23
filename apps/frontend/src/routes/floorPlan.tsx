import React, { useRef, useEffect, useState, SetStateAction } from 'react';
import Layout from "../components/Layout";
import {useMutation, useQuery} from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';
import { overlays } from "@/constants.tsx";
import InstructionsBox from "@/components/InstructionsBox";


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
    const [driving, setDriving] = useState<boolean>(true);
    const [instructions, setInstructions] = useState<string[]>([]);

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
        if (mapRef.current && !mapInstance.current) {
            const map = new google.maps.Map(mapRef.current, {
                zoom: 18,
                center: { lat: 42.09333, lng: -71.26546 },
                disableDefaultUI: true,
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
            strokeColor: "#00d9ff",
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        polyline.setMap(mapInstance.current);
        polylineRef.current = polyline;
        console.log("polyline rendered")
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






    const search = useQuery(trpc.search.getPath.queryOptions({
        buildingName: form?.building ??  "",
        endSuite: form?.destination ?? "",
        startSuite: "ASDF",
        driving: true,
        algorithm: "BFS",
    }))


    useEffect(() => {
        if (search.data) {
            console.log("Search results:", search.data.path);
            const formattedCoords = search.data.path.map((node) => ({
                latitude: node.longitude,
                longitude: node.latitude,
                floor: node.floor,
            }));
            setPathCoords(formattedCoords);
            setInstructions((prev) => [...prev, ...search.data.directions]);

        }

    }, [search.status]);


    useEffect(() => {
        if (!form) return;


        let travelMode = google.maps.TravelMode.DRIVING;
        switch (form.transport) {
            case "Public Transport": travelMode = google.maps.TravelMode.TRANSIT;
            setDriving(false)
            break;
            case "Walking": travelMode = google.maps.TravelMode.WALKING;
            setDriving(false)
            break;
        }

        if(form.building == "Patriot Place"){
            mapInstance.current?.setCenter({ lat: 42.09333, lng: -71.26546 });
        }else if(form.building ==  "Faulkner Hospital"){
            mapInstance.current?.setCenter({lat: 42.30163258195755, lng: -71.12812875693645});
        }else{
            mapInstance.current?.setCenter({ lat: 42.3262, lng: -71.1497 });
        }




        if (form.location && mapInstance.current && directionsRenderer.current) {
            const directionsService = new google.maps.DirectionsService();
            let address = {lat: 42.32629494233723, lng: -71.14950206654193};
            if(form.building ==  "20 Patriot Place"){
                address = {lat: 42.09263772658629, lng: -71.26603830263363};
            }else if(form.building ==  "22 Patriot Place"){
                address = {lat: 42.09251994541246, lng: -71.26653442087988};
            }else if(form.building ==  "Faulkner Hospital"){
                address = {lat: 42.30163258195755, lng: -71.12812875693645};
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
                        const Mapsinstructions = leg.steps.map(step => step.instructions);
                        setInstructions(Mapsinstructions);
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
        <Layout>
        <div id="floorplan" className="min-h-screen bg-gray-100 flex flex-col pt-20">

            {/* Main content fills screen excluding navbar/footer */}
            <div className="relative flex-1">
                {/* Google Map full size */}
                <div
                    id="google-map-container"
                    className="absolute inset-0 z-0"
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-20 right-4 z-10 bg-white p-4 rounded-lg shadow-md w-80 h-64">
                    <InstructionsBox key={instructions.join()} instructions={instructions} />
                </div>
                {/* Overlay UI elements */}
                <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md w-80">
                    <LocationRequestForm onSubmit={(form) => setForm(form)} />
                </div>

                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleImageSwitch}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
                    >
                        Floor: {imageIndex + 1}
                    </button>
                </div>

            </div>
        </div>
        </Layout>
    );
};

export default FloorPlan;

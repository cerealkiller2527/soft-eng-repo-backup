import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../database/trpc.ts'; // or wherever your file is
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
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [building, setBuilding] = useState<number>(1);// Ref to store markers
    const polylinesRef = useRef<google.maps.Polyline[]>([]);


    // Mutation for fetching floor map data
    const fetchFloorMap = useQuery(
        trpc.mapEditor.getFloorMap.queryOptions({
            buildingId: Number(building),
            floor: Number(form?.floor ?? 1),

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
        if(!form) return;
        if(form.building == "22 Patriot Place"){
            setBuilding(3);
        }if(form.building == "20 Patriot Place"){
            setBuilding(2);
        }if(form.building == "Chestnut Hill"){
            setBuilding(1);
        }

        if (fetchFloorMap.status != 'success' ) return;


        console.log(fetchFloorMap.data);

        if (fetchFloorMap.data?.nodes) {
            // Clear existing markers when switching floors
            markersRef.current.forEach(marker => {
                marker.setMap(null); // Remove the marker from the map
            });
            markersRef.current = []; // Reset the markers array

            // Create new markers for the current floor
            const newMarkers = fetchFloorMap.data.nodes.map((node) => {
                const marker = new AdvancedMarker({
                    position: { lat: node.x, lng: node.y },
                    map: mapInstance.current,
                    title: node.description ?? '',
                });

                marker.addListener('click', () => {
                    infoWindow.setContent(`
                        <div>
                          <strong>${node.description ?? 'No description'}</strong><br/>
                          Type: ${node.type}<br/>
                          ID: ${node.id}
                        </div>
                      `);
                    infoWindow.open({
                        anchor: marker,
                        map: mapInstance.current,
                    });
                });
                markersRef.current.push(marker);  // Store the new marker in the ref

                return marker;
            });

            polylinesRef.current.forEach(line => line.setMap(null));
            polylinesRef.current = [];

            // Add new polylines for the current floor
            fetchFloorMap.data.edges.forEach((edge) => {
                const path = [
                    { lat: edge.fromX, lng: edge.fromY },
                    { lat: edge.toX, lng: edge.toY },
                ];

                const polyline = new google.maps.Polyline({
                    path,
                    geodesic: true,
                    strokeColor: "#4285F4",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    map:  mapInstance.current,
                });

                polylinesRef.current.push(polyline);
            });
        }

        queryClient.invalidateQueries({
            queryKey: ['mapEditor.getFloorMap', { buildingId: 5, floor: form.floor }],
        });
    }, [form, fetchFloorMap.status, fetchFloorMap.data?.nodes]); // Trigger when `form` changes

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
        if (form.building === "20 Patriot Place") {
            mapInstance.current?.setCenter({ lat: 42.09280, lng: -71.266 });
        }else if (form.building === "22 Patriot Place") {
            mapInstance.current?.setCenter({ lat: 42.09262, lng: -71.267 });
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
        <div id="floorplan" className="relative w-full h-screen overflow-hidden">
            {/* Fullscreen Google Map */}
            <div
                id="google-map-container"
                ref={mapRef}
                className="absolute inset-0 w-full h-full z-0"
            />

            {/* Fixed Navbar at the top */}
            <div className="fixed top-0 left-0 right-0 z-20">
                <Navbar />
            </div>

            {/* Floating Form on the left side */}
            <div className="absolute top-30 left-4 z-10 w-full max-w-md">
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">


                    {/* Form */}
                    <div className="p-4">
                        <MapEditorSelectForm onSubmit={(form) => setForm(form)} />
                    </div>
                </div>
            </div>

            {/* Footer fixed at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-20">
                <Footer />
            </div>
        </div>
    );
};

export default MapEditor;

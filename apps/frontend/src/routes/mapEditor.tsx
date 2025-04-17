import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../database/trpc.ts';
import { useTRPC } from '../database/trpc.ts';
import MapEditorSelectForm from '../components/MapEditorSelectForm.tsx'
import { overlays } from "@/constants.tsx";


type formType = {
    building: string;
    floor: number;
};

type Node = {
    id: string;
    x: number;
    y: number;
    type: string;
    description?: string | null;
};

type Edge = {
    id: string;
    fromNodeId: string;
    toNodeId: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
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
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [building, setBuilding] = useState<number>(1);
    const polylinesRef = useRef<google.maps.Polyline[]>([]);

    const fetchFloorMap = useQuery(
        trpc.mapEditor.getFloorMap.queryOptions({
            buildingId: Number(building),
            floor: Number(form?.floor ?? 1),
            onError: (error) => {
                console.error('Error fetching floor map data:', error);
                alert("Failed to load floor map data.");
            },
        })
    );

    const handleMarkerDragEnd = (nodeId: string, marker: google.maps.AdvancedMarkerElement) => {
        const newPosition = marker.position;
        if (newPosition) {
            const updatedNodes = nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, y: newPosition.lng, x: newPosition.lat }
                    : node
            );
            setNodes(updatedNodes);

        }
    };

    const handleEdgeClick = (edgeId: string) => {
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));

    };




    const edgeStartRef = useRef<Node | null>(null);



    const handleMarkerClick = (clickedNode: Node) => {
        if (!edgeStartRef.current) {
            edgeStartRef.current = clickedNode;
            console.log("Edge start set to", clickedNode.id);
        } else {
            if (edgeStartRef.current.id !== clickedNode.id) {
                const newEdge: Edge = {
                    id: `edge-${edgeStartRef.current.id}-${clickedNode.id}`,
                    fromNodeId: edgeStartRef.current.id,
                    toNodeId: clickedNode.id,
                    fromX: edgeStartRef.current.x,
                    fromY: edgeStartRef.current.y,
                    toX: clickedNode.x,
                    toY: clickedNode.y,
                };
                setEdges((prev) => [...prev, newEdge]);
                console.log("Edge created between", edgeStartRef.current.id, "and", clickedNode.id);
            }
            edgeStartRef.current = null;
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Backspace") {
            if (edgeStartRef.current) {

                setNodes((prev) => prev.filter((node) => node.id !== edgeStartRef.current.id));

                edgeStartRef.current = null;
            }
        }
    };
    document.addEventListener("keydown", handleKeyDown);



    useEffect(() => {
        if (fetchFloorMap.status === 'success' && fetchFloorMap.data?.nodes) {
            setNodes(fetchFloorMap.data.nodes);
            setEdges(fetchFloorMap.data.edges);
        }
    }, [fetchFloorMap.status, fetchFloorMap.data]);

    useEffect(() => {
        if (!form || nodes.length === 0) return;

        if (form.building === "22 Patriot Place") setBuilding(3);
        else if (form.building === "20 Patriot Place") setBuilding(2);
        else if (form.building === "Chestnut Hill") setBuilding(1);

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        polylinesRef.current.forEach(line => line.setMap(null));
        polylinesRef.current = [];

        edgeStartRef.current = null;

        const newMarkers = nodes.map((node) => {
            const marker = new AdvancedMarker({
                position: { lat: node.x, lng: node.y },
                map: mapInstance.current,
                title: node.description ?? '',
                gmpDraggable: true,

            });

            marker.addListener('dragend', () => handleMarkerDragEnd(node.id, marker));
            marker.addListener('dblclick', () => {
                console.log(marker);
                setNodes((prev) => prev.filter((n) => n.id !== node.id));
            });
            marker.addListener('mouseover', () => {
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
            marker.addListener('click', () => {
                handleMarkerClick(node);
            });

            markersRef.current.push(marker);
            return marker;
        });

        queryClient.invalidateQueries({
            queryKey: ['mapEditor.getFloorMap', { buildingId: 5, floor: form.floor }],
        });
    }, [form, nodes]);

    useEffect(() => {
        polylinesRef.current.forEach(line => line.setMap(null));
        polylinesRef.current = [];
        edges.forEach((edge) => {

            const fromNode = nodes.find((node) => node.id === edge.fromNodeId);
            const toNode = nodes.find((node) => node.id === edge.toNodeId);

            if (!fromNode || !toNode) return; // Skip if nodes are missing

            const path = [
                { lat: fromNode.x, lng: fromNode.y },
                { lat: toNode.x, lng: toNode.y },
            ];

            const polyline = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: "#4285F4",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: mapInstance.current,
            });

            polyline.addListener('click', () => handleEdgeClick(edge.id));
            polylinesRef.current.push(polyline);


        });


    }, [nodes, edges]);


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
                position: { lat: node.y, lng: node.x },
                map: mapInstance.current,
                title: node.description ?? '',
                draggable: true,
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
        } else if (form.building === "22 Patriot Place") {
            mapInstance.current?.setCenter({ lat: 42.09262, lng: -71.267 });
        } else {
            mapInstance.current?.setCenter({ lat: 42.3260, lng: -71.1499 });
        }
        setImageIndex(form.floor - 1);
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
            mapInstance.current.setOptions({
                gestureHandling: "none", // Disable dragging
                scrollwheel: false, // Disable scroll zooming
            });

            mapInstance.current.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
                console.log("dblclick");
                if (!e.latLng) return;

                const newNode: Node = {
                    id: `node-${Date.now()}`, // Replace with a UUID if you prefer
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    type: "Intermediary",
                    description: null,
                };

                setNodes(prev => [...prev, newNode]);
            });

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
            <div id="google-map-container" ref={mapRef} className="absolute inset-0 w-full h-full z-0" />

            <div className="fixed top-0 left-0 right-0 z-20">
                <Navbar />
            </div>

            <div className="absolute top-10 left-10 z-20">
                <MapEditorSelectForm onSubmit={(form) => setForm(form)} />
            </div>

            <Footer />
        </div>
    );
};

export default MapEditor;

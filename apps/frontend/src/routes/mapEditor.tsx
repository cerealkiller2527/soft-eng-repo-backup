import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../database/trpc.ts';
import { useTRPC } from '../database/trpc.ts';
import MapEditorSelectForm from '../components/MapEditorSelectForm.tsx'
import { overlays } from "@/constants.tsx";
import {formSchema} from "../components/MapEditorSelectForm.tsx";
import { HelpDialog } from "../components/helpDialog.tsx";
import { Button } from "@/components/ui/button";
import MapForm from "../components/MapForm.tsx";





//add alert popup if changes are made and not saved
//add save button


type FormData = z.infer<typeof formSchema>;
import * as z from "zod";



type Node = {
    id: number;
    x: number;
    y: number;
    description: string;
    suite: string;
    type: string;
};

type Edge = {
    id: number;
    fromNodeId: number;
    toNodeId: number;
};

const MapEditor = () => {
    const trpc = useTRPC();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [Pin, setPin] = useState<typeof google.maps.marker.PinElement | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [building, setBuilding] = useState<number>(1);
    const polylinesRef = useRef<google.maps.Polyline[]>([]);
    const [form, setForm] = useState<FormData | null>(null);
    const countRef = useRef(-1);



    const setFloorMap = useMutation(
        trpc.mapEditor.sendFloorMap.mutationOptions()
    )



    const handleSaveMap = async () => {
        try {

            const formattedNodes = nodes.map((node) => ({
                id: node.id,
                latitude: node.x,
                longitude: node.y,
                type: node.type,
                description: node.description ?? "",
                suite: node.suite ?? "",
            }));

            const formattedEdges = edges.map((edge) => ({
                fromNodeId: edge.fromNodeId,
                toNodeId: edge.toNodeId,
            }))
            const result = await setFloorMap.mutateAsync({
                buildingId: Number(building),
                floor: imageIndex + 1,
                nodes: formattedNodes,
                edges: formattedEdges,
            });

            if (result.success) {
                console.log('Floor map successfully updated');
            }
        } catch (error) {
            console.error('Failed to update floor map:', error);
        }
    };

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

    const handleMarkerDragEnd = (nodeId: number, marker: google.maps.AdvancedMarkerElement) => {
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

    const handleEdgeClick = (edgeId: number) => {
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));

    };





    const edgeStartRef = useRef<Node | null>(null);

    const handleFormSubmit = (values: { suite: string, type: string, description: string }) => {
        console.log("Received from child:", values)
        if (edgeStartRef.current) {
            edgeStartRef.current.suite = values.suite;
            edgeStartRef.current.type = values.type;
            edgeStartRef.current.description = values.description;
        }
    }

    const handleMarkerClick = (clickedNode: Node) => {
        if (!edgeStartRef.current) {
            edgeStartRef.current = clickedNode;
            console.log("Edge start set to", clickedNode.id);
        } else {
            if (edgeStartRef.current.id !== clickedNode.id) {
                const newEdge: Edge = {
                    id: countRef.current,
                    fromNodeId: edgeStartRef.current.id,
                    toNodeId: clickedNode.id,
                };

                countRef.current -= 1;
                setEdges((prev) => [...prev, newEdge]);
                console.log("Edge created between", edgeStartRef.current.id, "and", clickedNode.id);
            }
            edgeStartRef.current = null;
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Backspace") {
            const nodeToDelete = edgeStartRef.current;
            if (nodeToDelete) {
                // Remove the node
                setNodes((prev) => prev.filter((node) => node.id !== nodeToDelete.id));

                // Remove edges connected to the node
                setEdges((prev) =>
                    prev.filter(
                        (edge) =>
                            edge.fromNodeId !== nodeToDelete.id &&
                            edge.toNodeId !== nodeToDelete.id
                    )
                );

                edgeStartRef.current = null;
            }
        }
    };
    document.addEventListener("keydown", handleKeyDown);



    useEffect(() => {
        if (fetchFloorMap.status === 'success' && fetchFloorMap.data?.nodes) {
            console.log(fetchFloorMap.data.nodes)
            setNodes(fetchFloorMap.data.nodes);
            setEdges(fetchFloorMap.data.edges);
            console.log(nodes);
        }
    }, [fetchFloorMap.status, fetchFloorMap.data]);

    useEffect(() => {
        if (!form || nodes.length === 0) return;

        if (form.building === "22 Patriot Place") setBuilding(3);
        else if (form.building === "20 Patriot Place") setBuilding(2);
        else if (form.building === "Chestnut Hill") setBuilding(1);
        else if (form.building === "Faulkner Hospital") setBuilding(4);

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];


        edgeStartRef.current = null;

        const newMarkers = nodes.map((node) => {
            const marker = new AdvancedMarker({
                position: { lat: node.x, lng: node.y },
                map: mapInstance.current,
                title: node.description ?? '',
                gmpDraggable: true,


            });

            marker.addListener('dragend', () => handleMarkerDragEnd(node.id, marker));
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
            polyline.addListener("mouseover", () => {
                polyline.setOptions({
                    strokeColor: "#4285F4",
                    strokeWeight: 4,
                });
            });

            polyline.addListener("mouseout", () => {
                polyline.setOptions({
                    strokeColor: "#4285F4",
                    strokeWeight: 2,
                });
            });
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
        } else if(form.building ==  "Faulkner Hospital"){
            mapInstance.current?.setCenter({lat: 42.30163258195755, lng: -71.12812875693645});
        }else{
            mapInstance.current?.setCenter({ lat: 42.3262, lng: -71.1497 });
        }
        setImageIndex(form.floor - 1);
        countRef.current = -1;
        console.log("reset")
    }, [form]);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = new google.maps.Map(mapRef.current, {
                zoom: 19,
                center: { lat: 42.09280, lng: -71.266 },
                disableDefaultUI: true,
                mapId: '57f41020f9b31f57',
            });



            mapInstance.current = map;
            mapInstance.current.setOptions({
                disableDoubleClickZoom : true
            });

            mapInstance.current.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
                console.log("dblclick");
                if (!e.latLng) return;

                const newNode: Node = {
                    id: countRef.current, // Replace with a UUID if you prefer
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    type: "Intermediary",
                    description: "",
                    suite: "",
                };

                countRef.current -= 1;
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
                ), {clickable: true}
            );
            overlay.setMap(mapInstance.current);

            overlay.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
                console.log("dblclick");
                if (!e.latLng) return;

                const newNode: Node = {
                    id: countRef.current, // Replace with a UUID if you prefer
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    type: "Intermediary",
                    description: "",
                    suite: "",
                };
                countRef.current -= 1;
                setNodes(prev => [...prev, newNode]);
            });


            console.log(google.maps.version);



            overlaysRef.current.push(overlay);
        });
    }, [imageIndex]);

    return (
        <div id="floorplan" className="relative w-full h-screen overflow-hidden">
            <div
                id="google-map-container"
                ref={mapRef}
                className="absolute top-20 bottom-0 left-0 right-0 w-full z-0"
            />

            <HelpDialog />

            <div className="fixed top-0 left-0 right-0 z-20">
                <Navbar />
            </div>

            <Button
                className="absolute bottom-20 left-4 z-10"
                onClick={handleSaveMap}
            >
                Save Map
            </Button>
            <div className="absolute top-30 right-4 z-10">
                <MapForm onSubmit={handleFormSubmit}/>
            </div>

            <div className="absolute top-30 left-4 z-10">
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <div className="p-4">
                        <MapEditorSelectForm onSubmit={(form) => setForm(form)} />
                    </div>
                </div>
            </div>



        </div>
    );
};

export default MapEditor;

import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import MapEditorSelectForm from '../components/MapEditorSelectForm.tsx';
import { overlays } from "@/constants.tsx";
import { formSchema } from "../components/MapEditorSelectForm.tsx";
import { HelpDialog } from "../components/helpDialog.tsx";
import { Button } from "@/components/ui/button";
import MapForm from "../components/MapForm.tsx";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alertdialog";
import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";
import * as z from "zod";
import {NodeTypeZod} from "common/src/ZodSchemas.ts";

const typeEnum = NodeTypeZod

type FormData = z.infer<typeof formSchema>;

type Node = {
    id: number;
    x: number;
    y: number;
    description: string;
    suite: string;
    type: string;
    outside: boolean;
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
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [building, setBuilding] = useState<number>(1);
    const polylinesRef = useRef<google.maps.Polyline[]>([]);
    const [form, setForm] = useState<FormData | null>(null);
    const countRef = useRef(-1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const edgeStartRef = useRef<Node | null>(null);
    const setFloorMap = useMutation(
        trpc.mapEditor.sendFloorMap.mutationOptions()
    )

    const handleSaveMap = async () => {
        try {
            const result = await setFloorMap.mutateAsync({
                buildingId: Number(building),
                floor: imageIndex + 1,
                nodes: nodes.map(node => ({
                    id: node.id,
                    latitude: node.x,
                    longitude: node.y,
                    type: node.type,
                    description: node.description,
                    suite: node.suite,
                    outside: node.outside
                })),
                edges: edges.map(edge => ({
                    fromNodeId: edge.fromNodeId,
                    toNodeId: edge.toNodeId,
                })),
            });

            if (result.success) {
                setAlert({
                    visible: true,
                    message: 'Map saved successfully!',
                    variant: "default",
                });
                setTimeout(() => setAlert(prev => ({ ...prev, visible: false })), 3000);
            }
        } catch (error) {
            setAlert({
                visible: true,
                message: 'Failed to save map. Please try again.',
                variant: "destructive",
            });
            setTimeout(() => setAlert(prev => ({ ...prev, visible: false })), 3000);
        }
    };

    const fetchFloorMap = useQuery(trpc.mapEditor.getFloorMap.queryOptions({
        buildingId: Number(building),
        floor: Number(form?.floor ?? 1),

    }));

    const handleMarkerDragEnd = (nodeId: number, marker: google.maps.marker.AdvancedMarkerElement) => {
        const newPosition = marker.position;
        if (newPosition) {
            setNodes(prev => prev.map(node =>
                node.id === nodeId ? {
                    ...node,
                    x: newPosition.lat,
                    y: newPosition.lng
                } : node
            ));
        }
    };

    const handleEdgeClick = (edgeId: number) => {
        setEdges(prev => prev.filter(edge => edge.id !== edgeId));
    };

    const handleFormSubmit = (values: { suite: string, type: string, description: string }) => {
        if (selectedNode) {
            setNodes(prev => prev.map(node =>
                node.id === selectedNode.id ? { ...node, ...values } : node
            ));
            setSelectedNode(null);
            edgeStartRef.current = null;
        }
    };



    const handleMarkerClick = (clickedNode: Node) => {
        if (!edgeStartRef.current) {
            edgeStartRef.current = clickedNode;
            setSelectedNode(clickedNode);
        } else if (edgeStartRef.current.id !== clickedNode.id) {
            setEdges(prev => [...prev, {
                id: countRef.current--,
                fromNodeId: edgeStartRef.current!.id,
                toNodeId: clickedNode.id,
            }]);
            edgeStartRef.current = clickedNode;
            setSelectedNode(clickedNode);
        }

    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Delete") {
            const nodeToDelete = edgeStartRef.current;
            if (nodeToDelete) {
                setNodes((prev) => prev.filter((node) => node.id !== nodeToDelete.id));
                setEdges((prev) =>
                    prev.filter(
                        (edge) =>
                            edge.fromNodeId !== nodeToDelete.id &&
                            edge.toNodeId !== nodeToDelete.id
                    )
                );
                edgeStartRef.current = null;
                setSelectedNode(null);
            }
        }
    };
    document.addEventListener("keydown", handleKeyDown);

    const [alert, setAlert] = useState<{ visible: boolean; message: string; variant: "default" | "destructive" }>({
        visible: false,
        message: "",
        variant: "default",
    });

    useEffect(() => {
        if (fetchFloorMap.data?.nodes) {
            setNodes(fetchFloorMap.data.nodes.map(node => ({
                ...node,
                type: typeEnum.parse(node.type),
                outside: node.outside,
            })));
            setEdges(fetchFloorMap.data.edges);
            console.log(form?.floor);
        }

    }, [fetchFloorMap.data]);

    useEffect(() => {
        if (!form || !AdvancedMarker) return;


        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        nodes.forEach(node => {
            const pinElement = document.createElement("div");
            const img = document.createElement("img");
            img.src = getImageFromNodeType(node.type);
            img.alt = node.type;
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.objectFit = "contain";
            pinElement.appendChild(img);

            // Create marker
            const marker = new AdvancedMarker({
                position: { lat: node.x, lng: node.y },
                map: mapInstance.current,
                content: pinElement,
                gmpDraggable: true,
            });

            // Add event listeners
            marker.addListener('dragend', () => {
                const newPosition = marker.position;
                if (newPosition) {
                    setNodes(prev => prev.map(n =>
                        n.id === node.id ? {
                            ...n,
                            x: newPosition.lat,
                            y: newPosition.lng,
                        } : n
                    ));
                }
            });

            marker.addListener('click', () => {
                if (infoWindow) {
                    infoWindow.setContent(`
                    <div>
                        <strong>Department: ${node.suite}</strong>
                        <p>Type: ${node.type}</p>
                        <p>ID: ${node.id}</p>
                    </div>
                `);
                    infoWindow.open({
                        anchor: marker,
                        map: mapInstance.current,
                    });
                }
                handleMarkerClick(node);
            });

            markersRef.current.push(marker);
        });

        // Cleanup function
        return () => {
            markersRef.current.forEach(marker => {
                if (marker.map) marker.map = null;
            });
        };
    }, [nodes, form, AdvancedMarker, infoWindow]);

    useEffect(() => {
        polylinesRef.current.forEach(line => line.setMap(null));
        polylinesRef.current = [];

        edges.forEach(edge => {
            const fromNode = nodes.find(n => n.id === edge.fromNodeId);
            const toNode = nodes.find(n => n.id === edge.toNodeId);

            if (fromNode && toNode) {
                const polyline = new google.maps.Polyline({
                    path: [
                        { lat: fromNode.x, lng: fromNode.y },
                        { lat: toNode.x, lng: toNode.y },
                    ],
                    strokeColor: "#0A75C2FF", // Chart-2 on style guide
                    strokeWeight: 3,
                    map: mapInstance.current,
                });

                polyline.addListener('click', () => handleEdgeClick(edge.id));
                polylinesRef.current.push(polyline);
            }
        });
    }, [edges, nodes]);

    useEffect(() => {
        const loadGoogleLibraries = async () => {
            const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            const newInfoWindow = new InfoWindow();
            newInfoWindow.addListener('closeclick', () => {
                edgeStartRef.current = null;
                setSelectedNode(null);
            });

            setInfoWindow(newInfoWindow);
            setAdvancedMarker(() => AdvancedMarkerElement);
        };

        loadGoogleLibraries();
    }, []);

    useEffect(() => {
        if (!mapRef.current || !mapInstance.current) return;
        setImageIndex(Number(form?.floor ?? 1) - 1)
        if (form?.building === "20 Patriot Place") {
            mapInstance.current.setCenter({ lat: 42.09280, lng: -71.266 });
        } else if (form?.building === "22 Patriot Place") {
            mapInstance.current.setCenter({ lat: 42.09262, lng: -71.267 });
        } else if (form?.building === "Faulkner Hospital") {
            mapInstance.current.setCenter({ lat: 42.30163258195755, lng: -71.12812875693645 });
        } else if (form?.building === "Main Campus") {
            mapInstance.current.setCenter({ lat: 42.33510876646788,lng: -71.10665415417226 });
        } else {
            mapInstance.current.setCenter({ lat: 42.3262, lng: -71.1497 });
        }
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
            mapInstance.current.setOptions({ disableDoubleClickZoom: true });

            mapInstance.current.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
                if (!e.latLng) return;


                setNodes(prev => [...prev, {
                    id: countRef.current--,
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    type: "Intermediary",
                    description: "",
                    suite: "",
                    outside: false
                }]);
            });
        }
    }, []);

    useEffect(() => {
        if (!mapInstance.current) return;

        overlaysRef.current.forEach(o => o.setMap(null));
        overlaysRef.current = [];
        console.log(overlaysRef.current);
        overlays[imageIndex].forEach((overlayData) => {
            const overlay = new google.maps.GroundOverlay(
                overlayData.imageUrl,
                new google.maps.LatLngBounds(
                    { lat: overlayData.bounds.south, lng: overlayData.bounds.west },
                    { lat: overlayData.bounds.north, lng: overlayData.bounds.east }
                ), { clickable: true }
            );
            overlay.setMap(mapInstance.current);
            console.log(imageIndex);

            console.log(overlayData);
            overlay.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
                if (!e.latLng) return;
                console.log(form?.floor)
                setNodes(prev => [...prev, {
                    id: countRef.current--,
                    x: e.latLng.lat(),
                    y: e.latLng.lng(),
                    type: "Intermediary",
                    description: "",
                    suite: "",
                    outside: false
                }]);
            });

            overlaysRef.current.push(overlay);
        });
    }, [imageIndex]);

    useEffect(() => {
        if (!hasInitialized && !form) {
            setIsDialogOpen(true);
            setHasInitialized(true);
        }
    }, [hasInitialized, form]);

    return (
        <div id="floorplan" className="relative w-full h-screen overflow-hidden">
            {alert.visible && (
                <div className="fixed top-20 left-0 right-0 flex justify-center z-30">
                    <Alert variant={alert.variant} className="w-fit">
                        <AlertTitle>{alert.variant === "default" ? "Success" : "Error"}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                </div>
            )}
            <div
                id="google-map-container"
                ref={mapRef}
                className="absolute top-20 bottom-0 left-0 right-0 w-full z-0"
            />

            <div className="fixed top-0 left-0 right-0 z-20">
                <Navbar />
            </div>

            <div className="absolute bottom-10 left-8 z-10 grid grid-cols-1 md:grid-cols-2 gap-1 mx-auto pt-28">
                <Button
                    onClick={handleSaveMap}
                    className="bg-white/10"
                >
                    Save Map
                </Button>

                <HelpDialog />
            </div>

            <div className="absolute top-30 right-4 z-30">
                {(selectedNode || edgeStartRef.current) && (
                    <MapForm
                        onSubmit={handleFormSubmit}
                        initialValues={edgeStartRef.current ? {
                            suite: edgeStartRef.current.suite,
                            type: edgeStartRef.current.type,
                            description: edgeStartRef.current.description
                        } : undefined}
                    />
                )}
            </div>

            <div className="absolute top-26 left-4 z-10">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="bg-[#012D5A] text-white hover:text-[#012D5A] hover:bg-white
                            hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Select Location
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-[425px]">
                        <MapEditorSelectForm onSubmit={(form, ) => {
                            setForm(form);
                            setIsDialogOpen(false);
                        }} />
                        <Button
                            className="absolute right-4 top-4 rounded-sm bg-white hover:bg-gray-100 text-red-500"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            X
                        </Button>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

function getImageFromNodeType(type: string): string {
    const images = {
        Entrance: "/map-pins/BlueDoorNOBG.png",
        Intermediary: "/map-pins/BasicLocationNOBG.png",
        Staircase: "/map-pins/BlueStairNOBG.png",
        Elevator: "/map-pins/BlueElevatorNOBG.png",
        Location: "/map-pins/BasicLocationNOBG.png",
        Help_Desk: "/map-pins/BlueHelpNOBG.png",
    };
    return images[type] || "/map-pins/BasicLocationNOBG.png";
}

export default MapEditor;
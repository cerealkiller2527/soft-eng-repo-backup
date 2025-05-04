import React, { useRef, useEffect, useState } from 'react';
import NewNavbar from "../components/NewNavbar.tsx";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import MapEditorSelectForm from '../components/MapEditorSelectForm.tsx';
import { overlays } from "@/constants.tsx";
import { formSchema } from "../components/MapEditorSelectForm.tsx";
import { HelpDialog } from "../components/helpDialog.tsx";
import { Button } from "@/components/ui/button";
import MapForm from "../components/MapForm.tsx";
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
    departmentId?: number;
};

type Edge = {
    id: number;
    fromNodeId: number;
    toNodeId: number;
};

type Department = {
    id: number;
    name: string;
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
    const [building, setBuilding] = useState<number>();
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
            // Debug: Log nodes with department information
            const locationNodes = nodes.filter(node => node.type === "Location");
            console.log(`Found ${locationNodes.length} Location type nodes`);
            locationNodes.forEach(node => {
                console.log(`Location node ID: ${node.id}, Suite: ${node.suite}, Department ID: ${node.departmentId || 'none'}`);
            });

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
                    outside: node.outside,
                    departmentId: node.type === "Location" ? node.departmentId : undefined
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
                setTimeout(() => setAlert(prev => ({...prev, visible: false})), 3000);
            }
        } catch (error) {
            setAlert({
                visible: true,
                message: 'Failed to save map. Please try again.',
                variant: "destructive",
            });
            setTimeout(() => setAlert(prev => ({...prev, visible: false})), 3000);
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

    const handleFormSubmit = (values: {
        suite: string,
        type: string,
        description: string,
        isOutside: boolean,
        departmentId?: number
    }) => {
        if (selectedNode) {
            setNodes(prev => prev.map(node =>
                node.id === selectedNode.id ? {
                    ...node,
                    suite: values.suite,
                    type: values.type,
                    description: values.description,
                    outside: values.isOutside,
                    departmentId: values.type === "Location" ? values.departmentId : undefined
                } : node
            ));
            setSelectedNode(null);


            edgeStartRef.current = null;

            // Close info window after edit
            if (infoWindow) {
                infoWindow.close();
            }
        }
    };

    const handleMarkerClick = (clickedNode: Node) => {
        if (!edgeStartRef.current) {
            edgeStartRef.current = clickedNode;
            setSelectedNode(clickedNode);

            // Show info window
            if (infoWindow && mapInstance.current) {
                const marker = markersRef.current.find(m => {
                    const pos = m.position;
                    return pos && pos.lat === clickedNode.x && pos.lng === clickedNode.y;
                });

                if (marker) {
                    const content = `
                    <div class="p-2">
                        <p><strong>Type:</strong> ${clickedNode.type}</p>
                        <p><strong>Suite/Room:</strong> ${clickedNode.suite || 'N/A'}</p>
                        ${clickedNode.type === 'Location' && clickedNode.departmentId ?
                        `<p><strong>Department:</strong> ${getDepartmentName(clickedNode.departmentId)}</p>` : ''}
                        <p><strong>Description:</strong> ${clickedNode.description || 'N/A'}</p>
                        <p><strong>Outdoor Location:</strong> ${clickedNode.outside ? 'Yes' : 'No'}</p>
                        <p><strong>ID:</strong> ${clickedNode.id}</p>
                    </div>
                `;
                    infoWindow.setContent(content);
                    infoWindow.open({
                        anchor: marker,
                        map: mapInstance.current,
                    });
                }
            }
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
        }
    }, [fetchFloorMap.data]);

    useEffect(() => {
        if (!form || !AdvancedMarker) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];


        // Create new markers
        nodes.forEach(node => {
            const pinElement = document.createElement("div");
            const img = document.createElement("img");
            img.src = getImageFromNodeType(node.type);
            img.alt = node.type;
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.objectFit = "contain";
            pinElement.appendChild(img);

            const marker = new AdvancedMarker({
                position: {lat: node.x, lng: node.y},
                map: mapInstance.current,
                content: pinElement,
                gmpDraggable: true,
            });

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

            marker.addListener('click', () => handleMarkerClick(node));
            markersRef.current.push(marker);
        });

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
                        {lat: fromNode.x, lng: fromNode.y},
                        {lat: toNode.x, lng: toNode.y},
                    ],
                    strokeColor: "#0A75C2FF", // Chart-2 on style guide
                    strokeWeight: 10,
                    map: mapInstance.current,
                });

                polyline.addListener('click', () => handleEdgeClick(edge.id));
                polylinesRef.current.push(polyline);
            }
        });
    }, [edges, nodes]);

    useEffect(() => {
        const loadGoogleLibraries = async () => {
            const {InfoWindow} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

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

        // Update map center based on building
        const buildingCenters = {
            "20 Patriot Place": {lat: 42.09280, lng: -71.266},
            "22 Patriot Place": {lat: 42.09262, lng: -71.267},
            "Faulkner Hospital": {lat: 42.30163258195755, lng: -71.12812875693645},
            "Main Campus": {lat: 42.33510876646788, lng: -71.10665415417226},
        };

        const center = buildingCenters[form?.building as keyof typeof buildingCenters] || {lat: 42.3262, lng: -71.1497};
        mapInstance.current.setCenter(center);
    }, [form]);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = new google.maps.Map(mapRef.current, {
                zoom: 19,
                center: {lat: 42.09280, lng: -71.266},
                disableDefaultUI: true,
                mapId: '57f41020f9b31f57',
            });

            mapInstance.current = map;
            mapInstance.current.setOptions({disableDoubleClickZoom: true});

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
                    {lat: overlayData.bounds.south, lng: overlayData.bounds.west},
                    {lat: overlayData.bounds.north, lng: overlayData.bounds.east}
                ), {clickable: true}
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

    useEffect(() => {
        // Add event listener for edit node button
        const handleEditNode = (event: CustomEvent) => {
            const node = event.detail;
            setSelectedNode(node);
            edgeStartRef.current = node;
        };

        document.addEventListener('editNode', handleEditNode as EventListener);
        return () => {
            document.removeEventListener('editNode', handleEditNode as EventListener);
        };
    }, []);

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
                className="absolute top-14 bottom-0 left-0 right-0 w-full z-0"
            />

            <div className="fixed top-0 left-0 right-0 z-20">
                <NewNavbar />
            </div>

            {/* Node Form */}
            <div className="absolute top-30 right-4 z-30">
                {(selectedNode || edgeStartRef.current) && (
                    <MapForm
                        onSubmit={handleFormSubmit}
                        initialValues={edgeStartRef.current ? {
                            suite: edgeStartRef.current.suite,
                            type: edgeStartRef.current.type,
                            description: edgeStartRef.current.description,
                            isOutside: edgeStartRef.current.outside,
                            departmentId: edgeStartRef.current.departmentId,
                        } : undefined}
                        buildingId={building}
                        floor={Number(form?.floor ?? 1)}
                    />
                )}
            </div>

            {/* Control Panel in top left */}
            <div className="absolute top-16 left-4 z-10 bg-white p-4 rounded-lg shadow-lg max-w-xs w-full items-center">
                <div className="space-y-4">
                    {/* Location Selector */}
                    {!form ? (
                        <div className="space-y-4">
                            <MapEditorSelectForm
                                onSubmit={(form) => {
                                    setForm(form);
                                    const bd = form.building;
                                    let bdId = 1;

                                    if(bd == "Faulkner Hospital") {
                                        bdId = 4
                                    } else if(bd == "20 Patriot Place") {
                                        bdId = 2;
                                    } else if (bd == "22 Patriot Place") {
                                        bdId = 3;
                                    } else if (bd == "Main Campus") {
                                        bdId = 5;
                                    }
                                    setBuilding(bdId);
                                }}
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="font-bold">Current Location:</div>
                            <div>{form.building}, Floor {form.floor}</div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setForm(null)}
                            >
                                Change Location
                            </Button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-4">
                        <Button
                            onClick={handleSaveMap}
                            className="bg-primary hover:bg-chart-4 text-white hover:text-white"
                            disabled={!form}
                        >
                            Save Map
                        </Button>

                        <HelpDialog />
                    </div>
                </div>
            </div>
        </div>
    );
}

function getImageFromNodeType(type: string): string {
    const images = {
        Entrance: "/map-pins/BlueDoorNOBG.png",
        Intermediary: "/map-pins/BasicLocationNOBG.png",
        Staircase: "/map-pins/BlueStairNOBG.png",
        Elevator: "/map-pins/BlueElevatorNOBG.png",
        Location: "/map-pins/LocationIconNOBG.png",
        Help_Desk: "/map-pins/BlueHelpNOBG.png",
        Parking: "/map-pins/ParkingIconNOBG.png",
    };
    return images[type] || "/map-pins/BasicLocationNOBG.png";
}

function getDepartmentName(departmentId: number): string {
    const departments = fetchFloorMap.data?.departments || [];
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
}

export default MapEditor;
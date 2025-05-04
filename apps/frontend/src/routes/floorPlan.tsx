import React, { useRef, useEffect, useState, SetStateAction } from 'react';
import Layout from "../components/Layout";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { queryClient } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';
import { overlays } from "@/constants.tsx";
import InstructionsBox from "@/components/InstructionsBox";
import { DirectionsButton } from "@/components/DirectionsButton.tsx";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type formType = {
    location: string;
    destination: string;
    transport: string;
    building: string;
};

const FloorPlan = () => {
    const location = useLocation();
    const passedState = location.state as { building?: string; destination?: string };
    const [address, setAddress] = useState(
        {lat : 0.00 , lng : 0.00}
    );
    const trpc = useTRPC();
    const [eta, setEta] = useState<string | undefined>(undefined);
    //const [form, setForm] = useState<formType | null>(null);

    const [form, setForm] = useState<formType>({
        building: passedState?.building || "",
        destination: passedState?.destination || "",
        location: "",
        transport: "Driving", // Default transport mode
    });

    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const polylineRef = useRef<google.maps.Polyline | null>(null);
    const [endMapsLocation, setEndMapsLocation] = useState({ lat: 0.00, lng: 0.00 });
    const animationInterval = useRef<number>();
    const isFirstAnimating = useRef(true);
    const animationPaused = useRef(false);

    const [pathCoords, setPathCoords] = useState([
        { latitude: .00, longitude: .00, floor: 1 },
    ]);
    const [pathCoords2, setPathCoords2] = useState([
        { latitude: .00, longitude: .00, floor: 1 },
    ]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [Pin, setPin] = useState<typeof google.maps.marker.PinElement | null>(null);
    const [driving, setDriving] = useState<boolean>(true);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [mode, setMode] = useState<"DFS" | "BFS">("DFS");
    const toggleMode = () => {
        setMode((prev) => (prev === "DFS" ? "BFS" : "DFS"));
    };
    const [centerMode, setCenterMode] = useState<"Building" | "Path">("Building");
    const toggleCenterMode = () => {
        setCenterMode((prev) => (prev === "Building" ? "Path" : "Building"));
    };
    const [pathCenter, setPathCenter] = useState<google.maps.LatLngLiteral | null>(null);
    const [activeTab, setActiveTab] = useState("request");
    const polylineRef2 = useRef<google.maps.Polyline | null>(null);

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

        // Cleanup previous animations and polylines
        const cleanup = () => {
            if (animationInterval.current) {
                clearInterval(animationInterval.current);
                animationInterval.current = undefined;
            }
            if (polylineRef.current) {
                polylineRef.current.setMap(null);
                polylineRef.current = null;
            }
            if (polylineRef2.current) {
                polylineRef2.current.setMap(null);
                polylineRef2.current = null;
            }
        };
        cleanup();

        // Create polylines based on current mode
        const filteredCoords = pathCoords
            .filter(node => node.floor === imageIndex + 1)
            .map(node => ({ lat: node.latitude, lng: node.longitude }));

        const filteredCoords2 = pathCoords2
            .filter(node => node.floor === imageIndex + 1)
            .map(node => ({ lat: node.latitude, lng: node.longitude }));

        // First polyline (always visible if coordinates exist)
        if (filteredCoords.length >= 2) {
            polylineRef.current = new google.maps.Polyline({
                path: filteredCoords,
                geodesic: true,
                strokeColor: driving ? "#6db4fa" : "#00d9ff",
                strokeOpacity: 0.7,
                strokeWeight: 3,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                        scale: 3,
                        fillOpacity: 1,
                    },
                    offset: "0%"
                }]
            });
            polylineRef.current.setMap(mapInstance.current);
        }

        // Second polyline (only for driving mode if coordinates exist)
        if (driving && filteredCoords2.length >= 2) {
            polylineRef2.current = new google.maps.Polyline({
                path: filteredCoords2,
                geodesic: true,
                strokeColor: "#00d9ff",
                strokeOpacity: 0.7,
                strokeWeight: 3,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                        scale: 3,
                        fillColor: "#00d9ff",
                        fillOpacity: 1,
                    },
                    offset: "0%"
                }]
            });
            polylineRef2.current.setMap(mapInstance.current);
        }

        // Animation function that handles all cases
        const animatePath = () => {
            if (animationPaused.current) return;

            const hasFirstPolyline = polylineRef.current && polylineRef.current.getPath().getLength() > 0;
            const hasSecondPolyline = polylineRef2.current && polylineRef2.current.getPath().getLength() > 0;

            // If we have both polylines, alternate between them
            if (hasFirstPolyline && hasSecondPolyline) {
                const currentPolyline = isFirstAnimating.current ? polylineRef.current : polylineRef2.current;
                const otherPolyline = isFirstAnimating.current ? polylineRef2.current : polylineRef.current;

                // Highlight the active polyline
                currentPolyline.setOptions({
                    strokeOpacity: 1.0,
                    strokeWeight: 4
                });
                if (otherPolyline) {
                    otherPolyline.setOptions({
                        strokeOpacity: 0.3,
                        strokeWeight: 2
                    });
                }

                let count = 0;
                const totalSteps = 200;
                const duration = 20;

                const animateStep = () => {
                    if (animationPaused.current || !currentPolyline) return;

                    count = (count + 1) % (totalSteps + 1);
                    const percent = count / 2;

                    const icons = currentPolyline.get("icons");
                    icons[0].offset = `${percent}%`;
                    currentPolyline.set("icons", icons);

                    if (count >= totalSteps) {
                        // Switch to animating the other polyline
                        isFirstAnimating.current = !isFirstAnimating.current;
                        animatePath();
                    } else {
                        animationInterval.current = window.setTimeout(animateStep, duration);
                    }
                };

                animateStep();
            }
            // If we have only one polyline (either first or second), animate just that one
            else if (hasFirstPolyline || hasSecondPolyline) {
                const activePolyline = hasFirstPolyline ? polylineRef.current : polylineRef2.current;
                if (!activePolyline) return;

                // Highlight the active polyline
                activePolyline.setOptions({
                    strokeOpacity: 1.0,
                    strokeWeight: 4
                });

                let count = 0;
                const totalSteps = 200;
                const duration = 20;

                const animateStep = () => {
                    if (animationPaused.current || !activePolyline) return;

                    count = (count + 1) % (totalSteps + 1);
                    const percent = count / 2;

                    const icons = activePolyline.get("icons");
                    icons[0].offset = `${percent}%`;
                    activePolyline.set("icons", icons);

                    if (count < totalSteps) {
                        animationInterval.current = window.setTimeout(animateStep, duration);
                    } else {
                        animatePath(); // Restart animation
                    }
                };

                animateStep();
            }
        };

        // Start the animation
        animatePath();

        return () => {
            cleanup();
        };
    }, [pathCoords, pathCoords2, imageIndex, driving]);

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


    useEffect(() => {
        if (instructions.length > 0 && form?.location && form?.destination) {
            setActiveTab("directions");
        }
    }, [instructions, form]);

    const search = useQuery(trpc.search.getPath.queryOptions({
        buildingName: form?.building ??  "",
        endDeptName: form?.destination ?? "",
        dropOffLatitude: endMapsLocation.lat ?? 0,
        dropOffLongitude : endMapsLocation.lng ?? 0,
        driving: driving,
    },

    ) )

    const searchKey = trpc.search.getPath.queryKey()

    useEffect(() => {
        if (search.data) {
            const startPoint = {
                latitude: endMapsLocation.lat,
                longitude: endMapsLocation.lng,
                floor: 1,
            };

            // For walking mode, we only have one path
            if (!driving) {
                const formattedCoords = search.data.path.toDepartment.map((node) => ({
                    latitude: node.latitude,
                    longitude: node.longitude,
                    floor: node.floor,
                }));

                const hasValidEndLocation = endMapsLocation.lat !== 0 && endMapsLocation.lng !== 0;
                const path = [
                    ...(hasValidEndLocation ? [startPoint] : []),
                    ...formattedCoords,
                ];

                setPathCoords(path);
                setPathCoords2([]); // Clear the second path
            }
            // For driving mode, we have two paths (to parking and then to department)
            else {
                const formattedCoords = search.data.path.toParking.map((node) => ({
                    latitude: node.latitude,
                    longitude: node.longitude,
                    floor: node.floor,
                }));

                const formattedCoords2 = search.data.path.toDepartment.map((node) => ({
                    latitude: node.latitude,
                    longitude: node.longitude,
                    floor: node.floor,
                }));

                const hasValidEndLocation = endMapsLocation.lat !== 0 && endMapsLocation.lng !== 0;
                const path = [
                    ...(hasValidEndLocation ? [startPoint] : []),
                    ...(hasValidEndLocation ? formattedCoords : []),
                ];

                setPathCoords(path);
                setPathCoords2(formattedCoords2);
            }

            setInstructions((prev) => [...prev, ...search.data.directions]);
        }
    }, [search.data]);


    useEffect(() => {
        if (!form) return;
        queryClient.invalidateQueries({ queryKey: searchKey });


        let travelMode = google.maps.TravelMode.DRIVING;
        switch (form.transport) {
            case "Public Transport":
                travelMode = google.maps.TravelMode.TRANSIT;
                setDriving(false)
                break;
            case "Walking":
                travelMode = google.maps.TravelMode.WALKING;
                setDriving(false)
                break;
            case "Driving":
                travelMode = google.maps.TravelMode.DRIVING;
                setDriving(true)
                break;
        }


        if (form.location && mapInstance.current && directionsRenderer.current) {
            const directionsService = new google.maps.DirectionsService();
            //tempaddr used because useStates dont update variables fast enough, address useState passed to backend
            let tempAddr = {lat: 42.09263772658629, lng: -71.26603830263363}
            if(form.building ==  "20 Patriot Place"){
                setAddress({lat: 42.09252289293114, lng: -71.2665262516987});
                tempAddr = {lat: 42.09252289293114, lng: -71.2665262516987};
            }else if(form.building ==  "22 Patriot Place"){
                setAddress({lat: 42.09252289293114, lng: -71.2665262516987});
                tempAddr = {lat: 42.09252289293114, lng: -71.2665262516987};
            }else if(form.building ==  "Faulkner Hospital"){
                setAddress({lat: 42.3012168, lng: -71.12762714});
                tempAddr = {lat: 42.3012168, lng: -71.12762714};
            }else if(form.building ==  "Chestnut Hill Medical Center"){
                setAddress({lat: 42.3262626, lng: -71.14951471});
                tempAddr = {lat: 42.3262626, lng: -71.14951471};
            }else if(form.building ==  "Main Campus"){
                setAddress({lat: 42.33532599, lng: -71.10608207});
                tempAddr = {lat: 42.33532599, lng: -71.10608207};
            }
            directionsService.route(
                {
                    origin: form.location,
                    destination: tempAddr,
                    travelMode: travelMode,
                },
                (result, status) => {
                    if (status === 'OK' && result?.routes?.length > 0) {
                        directionsRenderer.current.setDirections(result);
                        const leg = result.routes[0].legs[0];
                        const Mapsinstructions = leg.steps.map(step => step.instructions);
                        setInstructions(Mapsinstructions);
                        setEndMapsLocation({
                            lat: leg.end_location.lat(),
                            lng: leg.end_location.lng()
                        });

                        console.log(address);

                        const route = result.routes[0];
                        const bounds = new google.maps.LatLngBounds();

                        route.legs.forEach(leg => {
                            bounds.extend(leg.start_location);
                            bounds.extend(leg.end_location);
                        });

                        const center = bounds.getCenter(); // This is a LatLng object

                        const pathCenter: google.maps.LatLngLiteral = {
                            lat: center.lat(),
                            lng: center.lng(),
                        };
                        setPathCenter(pathCenter);


                        const durationText = leg?.duration?.text;
                        setEta(durationText);
                    } else {
                        console.warn("Directions failed:", status, result);
                    }
                }
            );
        }
    }, [form]);

    const buildingCenters: Record<string, google.maps.LatLngLiteral> = {
        "20 Patriot Place": { lat: 42.09333, lng: -71.26546 },
        "22 Patriot Place": { lat: 42.09333, lng: -71.26546 },
        "Faulkner Hospital": { lat: 42.30163258195755, lng: -71.12812875693645 },
        "Chestnut Hill Medical Center": { lat: 42.3262, lng: -71.1497 },
        "Main Campus" : {lat: 42.33512312333498, lng: -71.10616901382942},
        "Default": { lat: 42.3262, lng: -71.1497 }
    };

    useEffect(() => {
        const building = form?.building ?? "Default";
        const buildingCenter = buildingCenters[building] ?? buildingCenters["Default"];

        const targetCenter = centerMode === "Building"
            ? buildingCenter
            : pathCenter ?? buildingCenter;


        mapInstance.current?.setCenter(targetCenter);

        if (centerMode === "Building") {
            mapInstance.current?.setZoom(18); // zoom in when showing the building
        }else{
            mapInstance.current?.setZoom(10);
        }
    }, [centerMode, form?.building, pathCenter]);

    const getFloorsWithVisiblePaths = () => {
        const floorNodeCounts = new Map<number, number>();

        // Count nodes on each floor from first path
        pathCoords.forEach(coord => {
            floorNodeCounts.set(coord.floor, (floorNodeCounts.get(coord.floor) || 0) + 1);
        });

        // Count nodes on each floor from second path (if driving)
        if (driving) {
            pathCoords2.forEach(coord => {
                floorNodeCounts.set(coord.floor, (floorNodeCounts.get(coord.floor) || 0) + 1);
            });
        }

        // Filter to only floors with at least 2 nodes
        return Array.from(floorNodeCounts.entries())
            .filter(([_, count]) => count >= 2)
            .map(([floor]) => floor)
            .sort((a, b) => a - b);
    };

    const handleImageSwitch = () => {
        const floorsWithPaths = getFloorsWithVisiblePaths();

        if (floorsWithPaths.length === 0) {
            // No paths with at least 2 nodes, just cycle through all floors
            setImageIndex((prevIndex) => (prevIndex + 1) % overlays.length);
            return;
        }

        // Find the next floor with visible paths
        const currentFloor = imageIndex + 1;
        const currentIndexInPaths = floorsWithPaths.indexOf(currentFloor);
        let nextIndex;

        if (currentIndexInPaths === -1) {
            // Current floor not in paths, start from first floor with paths
            nextIndex = floorsWithPaths[0] - 1;
        } else {
            // Move to next floor with paths
            nextIndex = floorsWithPaths[(currentIndexInPaths + 1) % floorsWithPaths.length] - 1;
        }

        setImageIndex(nextIndex);
    };

    return (
        <Layout>
            <div id="floorplan" className="min-h-screen bg-gray-100 flex flex-col pt-14">
                <div className="relative flex-1">
                    {/* Google Map full size */}
                    <div
                        id="google-map-container"
                        className="absolute inset-0 z-0"
                        ref={mapRef}
                        style={{ width: '100%', height: '100%' }}
                    />

                    {/* Combined tabs and controls container */}
                    <div className="absolute top-4 left-4 z-10 w-80 space-y-2 bg-white shadow-md">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 chart-4">
                                <TabsTrigger
                                    value="request"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Location Request
                                </TabsTrigger>
                                <TabsTrigger
                                    value="directions"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Directions
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="request" className="mt-0">
                                <LocationRequestForm
                                    onSubmit={(form) => {
                                        setForm(form);
                                        if (instructions.length > 0) {
                                            setActiveTab("directions");
                                        }
                                    }}
                                    initialForm={form}
                                />
                            </TabsContent>

                            <TabsContent value="directions" className="mt-0">
                                <div className="bg-white p-4 shadow-lg h-120 relative">
                                    <InstructionsBox key={instructions.join()} instructions={ instructions } />
                                    <div className="absolute top-4 right-4 z-50">
                                        <DirectionsButton directions={instructions} />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Floor Button Cycling */}
                    <div className="absolute grid grid-cols-2 gap-2 top-5 right-5">
                        <Button
                            onClick={handleImageSwitch}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            Floor: {imageIndex + 1}
                        </Button>
                        <Button
                            onClick={toggleCenterMode}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            {centerMode}
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FloorPlan;
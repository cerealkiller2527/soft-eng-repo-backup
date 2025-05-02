import React, { useRef, useEffect, useState, SetStateAction } from 'react';
import Layout from "../components/Layout";
import {useMutation, useQuery} from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { queryClient } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';
import { overlays } from "@/constants.tsx";
import InstructionsBox from "@/components/InstructionsBox";
import {DirectionsButton} from "@/components/DirectionsButton.tsx";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";




import {pNodeDTO} from "../../../../share/types.ts";

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
    const [mode, setMode] = useState<"DFS" | "BFS">("DFS");
    const toggleMode = () => {
        setMode((prev) => (prev === "DFS" ? "BFS" : "DFS"));
    };
    const [centerMode, setCenterMode] = useState<"Building" | "Path">("Building");
    const toggleCenterMode = () => {
        setCenterMode((prev) => (prev === "Building" ? "Path" : "Building"));
    };
    const [pathCenter, setPathCenter] = useState<google.maps.LatLngLiteral | null>(null);



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
        endDeptName: form?.destination ?? "",
        dropOffLatitude: address.lat ?? 0,
        dropOffLongitude : address.lng ?? 0,
        driving: driving,
    },

    ) )

    const searchKey = trpc.search.getPath.queryKey()

    useEffect(() => {
        console.log("Search results:", search.data);
        if (search.data) {
            console.log("Search results:", search.data.path);

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
            setPathCoords([...formattedCoords, ...formattedCoords2]);

            console.log(formattedCoords);
            setInstructions((prev) => [...prev, ...search.data.directions]);

        }

    }, [search.data]);


    useEffect(() => {
        if (!form) return;
        queryClient.invalidateQueries({ queryKey: searchKey });


        let travelMode = google.maps.TravelMode.DRIVING;
        switch (form.transport) {
            case "Public Transport": travelMode = google.maps.TravelMode.TRANSIT;
            setDriving(false)
            break;
            case "Walking": travelMode = google.maps.TravelMode.WALKING;
            setDriving(false)
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
                        setEndMapsLocation(leg.end_location);
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

    const handleImageSwitch = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % overlays.length);
    };

    return (
        <Layout>
        <div id="floorplan" className="min-h-screen bg-gray-100 flex flex-col pt-14">

            {/* Main content fills screen excluding navbar/footer */}
            <div className="relative flex-1">
                {/* Google Map full size */}
                <div
                    id="google-map-container"
                    className="absolute inset-0 z-0"
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-5 right-4 z-10 bg-white p-4 rounded-lg shadow-md w-80 h-64">
                    <InstructionsBox key={instructions.join()} instructions={instructions} />

                </div>
                <div className="absolute top-55 right-9 z-10 p-4 rounded-lg shadow-md w-80 h-64">
                    <DirectionsButton directions={instructions} />
                </div>

                {/* Overlay UI elements */}
                <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md w-80">
                    <LocationRequestForm onSubmit={(form) => setForm(form)} initialForm={form} />

                </div>

                <div className="absolute top-45 right-14 z-10 grid grid-cols-1 md:grid-cols-3 gap-1 mx-auto pt-28">
                    <Button
                        onClick={handleImageSwitch}
                        className="bg-[#012D5A] rounded-lg text-white hover:text-[#012D5A] hover:bg-white
                    hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                    >
                        Floor: {imageIndex + 1}
                    </Button>
                    <Button
                        onClick={toggleMode}
                        className="bg-[#012D5A] rounded-lg text-white hover:text-[#012D5A] hover:bg-white
                    hover:outline    hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                    >
                        {mode}
                    </Button>
                    <Button
                        onClick={toggleCenterMode}
                        className="bg-[#012D5A] rounded-lg text-white hover:text-[#012D5A] hover:bg-white
                    hover:outline    hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
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

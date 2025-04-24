import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import {pNodeDTO} from "../../../../share/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const buildings = ["22 Patriot Place" ,"20 Patriot Place", "Chestnut Hill Medical Center", "Faulkner Hospital"];

const transport = ["Public Transport", "Walking", "Driving"];

export default function LocationRequestForm({ onSubmit }) {
    const trpc = useTRPC();
    const buildingsQuery = useQuery(trpc.mapInfoRouter.getBuildingInfo.queryOptions());
    const [form, setForm] = useState<formType | null>(null);
    const [eta, setEta] = useState<string | undefined>(undefined);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [imageIndex, setImageIndex] = useState(0);
    const overlaysRef = useRef<google.maps.GroundOverlay[]>([]);
    const polylineRef = useRef<google.maps.Polyline | null>(null);
    const [endMapsLocation, setEndMapsLocation] = useState([{lat: 0.00, lng: 0.00}]);
    const [pathCoords, setPathCoords] = useState([{ latitude: .00, longitude: .00, floor: 1 }]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [AdvancedMarker, setAdvancedMarker] = useState<typeof google.maps.marker.AdvancedMarkerElement | null>(null);
    const [Pin, setPin] = useState<typeof google.maps.marker.PinElement | null>(null);
    const [driving, setDriving] = useState<boolean>(true);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [mode, setMode] = useState<"DFS" | "BFS">("DFS");
    const [centerMode, setCenterMode] = useState<"Building" | "Path">("Building");
    const [pathCenter, setPathCenter] = useState<google.maps.LatLngLiteral | null>(null);

    const [MGBHospitals, SetMGBHospitals] = useState([
        "Reception",
    ]);

    const nodesQuery = useQuery(trpc.mapInfoRouter.mapInfo.queryOptions({ buildingName: form?.building }));

    useEffect(() => {
        if (nodesQuery.data) {
            // const locations = nodesQuery.data
            //     .filter((node) => node.type === "Location" && node.description)
            //     .map((node) => node.description);

            const suites = nodesQuery.data
            console.log(suites)
                // .filter((suite) => )

            SetMGBHospitals(suites);
        }
    }, [form?.building, nodesQuery.status]);

    const [submittedRequests, setSubmittedRequests] = useState<typeof form[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleDelete = (index: number) => {
        setSubmittedRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const requiredFields = ["location", "destination"];
        const missingFields = requiredFields.filter((field) => !form[field as keyof typeof form]);
        if (missingFields.length > 0) {
            alert("Please fill all required fields.");
            return;
        }

        // Geocode the location
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: form.location }, (results, status) => {
            if (status === "OK") {
                const origin = results[0].geometry.location;
                console.log(results[0].geometry.location);
                // Call the parent component's onSubmit with the new origin
                onSubmit(form);
                setSubmittedRequests((prevRequests) => [...prevRequests, form]);
                console.log("Form submitted successfully.", form);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    // Initialize Autocomplete
    useEffect(() => {
        if (typeof google !== "undefined" && google.maps && google.maps.places) {
            const input = document.getElementById("location-input") as HTMLInputElement;
            const autocomplete = new google.maps.places.Autocomplete(input);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    setForm((prevForm) => ({
                        ...prevForm,
                        location: place.formatted_address || "",
                    }));
                }
            });
        }
    }, []);

    useEffect(() => {
        if (!form || !buildingsQuery.data) return;
        
        const building = buildingsQuery.data.find(b => b.name === form.building);
        if (!building) return;

        let travelMode = google.maps.TravelMode.DRIVING;
        switch (form.transport) {
            case "Public Transport": 
                travelMode = google.maps.TravelMode.TRANSIT;
                setDriving(false);
                break;
            case "Walking": 
                travelMode = google.maps.TravelMode.WALKING;
                setDriving(false);
                break;
        }

        if (form.location && mapInstance.current && directionsRenderer.current) {
            const directionsService = new google.maps.DirectionsService();
            const address = { lat: building.defaultLat, lng: building.defaultLng };
            
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

                        const route = result.routes[0];
                        const bounds = new google.maps.LatLngBounds();

                        route.legs.forEach(leg => {
                            bounds.extend(leg.start_location);
                            bounds.extend(leg.end_location);
                        });

                        const center = bounds.getCenter();
                        setPathCenter({ lat: center.lat(), lng: center.lng() });

                        const durationText = leg?.duration?.text;
                        setEta(durationText);
                    } else {
                        console.warn("Directions failed:", status, result);
                    }
                }
            );
        }
    }, [form, buildingsQuery.data]);

    useEffect(() => {
        if (!form || !buildingsQuery.data) return;
        
        const building = buildingsQuery.data.find(b => b.name === form.building);
        if (!building) return;

        const buildingCenter = { 
            lat: building.defaultLat, 
            lng: building.defaultLng 
        };

        const targetCenter = centerMode === "Building"
            ? buildingCenter
            : pathCenter ?? buildingCenter;

        mapInstance.current?.setCenter(targetCenter);
        mapInstance.current?.setZoom(centerMode === "Building" ? 18 : 10);
    }, [centerMode, form?.building, pathCenter, buildingsQuery.data]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl">
            <div className="bg-gray-200 w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Location Request</h2>
                <p>Select the starting address and destination.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
                <label className="p-2 text-gray-800">Enter your starting address:</label>
                <input
                    id="location-input"
                    type="text"
                    name="location"
                    value={form?.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"
                    placeholder="Enter location"
                />
                <br />
                <label className="p-2 text-gray-800">Building:</label>
                <select
                    name="building"
                    value={form?.building}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100"
                >
                    <option value="">Select Building</option>
                    {buildingsQuery.data?.map((building) => (
                        <option key={building.id} value={building.name}>
                            {building.name}
                        </option>
                    ))}
                </select>

                <label className="p-2 text-gray-800">Destination:</label>
                <select
                    name="destination"
                    value={form?.destination}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100"
                >
                    <option value="">Select Destination</option>
                    {MGBHospitals.map((hospital) => (
                        <option key={hospital} value={hospital}>
                            {hospital}
                        </option>
                    ))}
                </select>
                <label className="p-2 text-gray-800">Transport Type:</label>
                <select
                    name="transport"
                    value={form?.transport}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100"
                >
                    <option value="">Select Transport Type</option>
                    {transport.map((transportType) => (
                        <option key={transportType} value={transportType}>
                            {transportType}
                        </option>
                    ))}
                </select>
                <br />
                <button
                    type="submit"
                    className="border border-3 border-[#012D5A] w-full btn btn-primary p-3 px-8 bg-[#012D5A] text-white rounded-xl hover:bg-white hover:text-[#012D5A]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

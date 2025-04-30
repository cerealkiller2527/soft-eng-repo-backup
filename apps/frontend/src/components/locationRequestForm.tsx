import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { pNodeDTO } from "../../../../share/types.ts";

const buildings = ["22 Patriot Place", "20 Patriot Place", "Chestnut Hill Medical Center", "Faulkner Hospital"];
const transport = ["Public Transport", "Walking", "Driving"];

// ✏️ Added type for form
type formType = {
    location: string;
    destination: string;
    transport: string;
    building: string;
};

// ✏️ Added props type to accept initialForm
type LocationRequestFormProps = {
    onSubmit: (form: formType) => void;
    initialForm?: formType; // <-- added
};

// ✏️ Updated function to accept initialForm
export default function LocationRequestForm({ onSubmit, initialForm }: LocationRequestFormProps) {
    const trpc = useTRPC();

    const [MGBHospitals, SetMGBHospitals] = useState([
        "Reception",
    ]);

    // ✏️ EDIT: Initialize form with initialForm if provided
    const [form, setForm] = useState<formType>(
        initialForm ?? {
            location: "",
            destination: "",
            transport: "Walking",
            building: "Chestnut Hill Medical Center",
        }
    );

    const nodesQuery = useQuery(trpc.mapInfoRouter.mapInfo.queryOptions({ buildingName: form.building }));

    useEffect(() => {
        if (nodesQuery.data) {
            const suites = nodesQuery.data;
            console.log(suites);
            SetMGBHospitals(suites);
        }
    }, [form.building, nodesQuery.status]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
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
                onSubmit(form);
                console.log("Form submitted successfully.", form);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    useEffect(() => {
        if (typeof google !== "undefined" && google.maps && google.maps.places) {
            const input = document.getElementById("location-input") as HTMLInputElement;
            if (input) { // ✏️ Added null check
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
        }
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl">
            <div className="bg-gray-200 w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Location Request</h2>
                <p>Select the starting address and destination.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
                {/* Location input */}
                <label className="p-2 text-gray-800">Enter your starting address:</label>
                <input
                    id="location-input"
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"
                    placeholder="Enter location"
                />
                <br />

                {/* Building select */}
                <label className="p-2 text-gray-800">Building:</label>
                <select
                    name="building"
                    value={form.building}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100"
                >
                    <option value="">Select Building</option>
                    {buildings.map((building) => (
                        <option key={building} value={building}>
                            {building}
                        </option>
                    ))}
                </select>

                {/* Destination select */}
                <label className="p-2 text-gray-800">Destination:</label>
                <select
                    name="destination"
                    value={form.destination}
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

                {/* Transport select */}
                <label className="p-2 text-gray-800">Transport Type:</label>
                <select
                    name="transport"
                    value={form.transport}
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

                {/* Submit button */}
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

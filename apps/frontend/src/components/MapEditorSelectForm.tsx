import { useState, useEffect } from "react";

const buildings =["Patriot Place", "Chestnut Hill"];
const floors = [1,2,3,4,5];


export default function MapEditorSelectForm({ onSubmit }) {

    useEffect(() => {
        //useeffect for setting MGBHospitals once backend is made
        //should run on mount
    }, []);

    const [form, setForm] = useState({
        building: "",
        floor: 1,
    });

    const [submittedRequests, setSubmittedRequests] = useState<typeof form[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmittedRequests((prevRequests) => [...prevRequests, form]);
        onSubmit(form);
    };



    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl">
            <div className="bg-gray-200 w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Editor Menu</h2>
                <p>Select the building and floor.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
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
                <br />
                <label className="p-2 text-gray-800">Floor:</label>
                <select
                    name="floor"
                    value={form.floor}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100"
                >
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                        <option key={floor} value={floor}>
                            {floor}
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

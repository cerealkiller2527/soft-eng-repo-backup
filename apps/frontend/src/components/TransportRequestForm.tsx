import { useState } from "react";
import React from "react";


const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];
const transportTypes = ["Ambulance", "Shuttle", "Private Transport", "Helicopter"];
const priorityLevels = ["Urgent", "High", "Intermediate", "Low"];

export default function TransportRequestForm({ onSubmit }: { onSubmit: (data: any) => void }) {

    const [form, setForm] = useState({
        patientName: "",
        priority: "",
        transportType: "",
        pickupTransport: "",
        dropoffTransport: "",
        additionalNotes: "",
    });

    const [submittedRequests, setSubmittedRequests] = useState<typeof form[]>([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleDelete = (index: number) => {
        setSubmittedRequests(prevRequests => prevRequests.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const requiredFields = [
            "patientName",
            "priority",
            "transportType",
            "pickupTransport",
            "dropoffTransport",
        ];

        const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);
        if (missingFields.length > 0) {
            alert("Please fill all required fields.");
            return;
        }
        setSubmittedRequests(prevRequests => [...prevRequests, form]);
        onSubmit(form);

        console.log("Form submitted successfully.", form);

    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl">
            <div className=" w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Transportation Service Request</h2>
                <p>Select the following requests needed.</p>
            </div>
                <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <label className="p-2 text-gray-800">Patient Full Name:</label>
                 <input name="patientName" placeholder="Enter Patient Name" onChange={handleChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"  />
                    <br/>
                    <label className="p-2 text-gray-800">Priority:</label>
                 <select name="priority" onChange={handleChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                     <option value="">Select Priority Level</option>
                     {priorityLevels.map(priority => <option key={priority} value={priority}>{priority}</option>)}
                 </select>
                 <br/>
                    <label className="p-2 text-gray-800">Transport Type:</label>
                    <select name="transportType" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Transport Type</option>
                        {transportTypes.map(transport => <option key={transport} value={transport}>{transport}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Pickup From:</label>
                    <select name="pickupTransport" onChange={handleChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Pickup Location</option>
                        {MGBHospitals.map(hospital => <option key={hospital} value={hospital}>{hospital}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Dropoff To:</label>
                    <select name="dropoffTransport" onChange={handleChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Dropoff Location</option>
                        {MGBHospitals.map(hospital => <option key={hospital} value={hospital}>{hospital}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Additional Notes: </label>
                    <input name="additionalNotes" placeholder="Enter Additional Notes" className="p-8 w-full border border-gray-300 rounded-xl focus:outline-none" onChange={handleChange}></input>
                    <button type='submit' className="border border-3 border-[#012D5A] w-full btn btn-primary p-3 px-8 bg-[#012D5A] text-white rounded-xl hover:bg-white hover:text-[#012D5A]">Submit</button>
                </form>
        </div>
    )

}

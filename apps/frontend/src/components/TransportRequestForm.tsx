import {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];
const transportTypes = ["Ambulance", "Shuttle", "Private Transport", "Helicopter"];

export default function TransportRequestForm({ onSubmit }: { onSubmit: (data: object) => void }) {

    const [form, setForm] = useState({
        patientName: "",
        pickupTime: new Date(),
        transportType: "",
        pickupTransport: "",
        dropoffTransport: "",
        additionalNotes: "",
    });

    const [submittedRequests, setSubmittedRequests] = useState<typeof form[]>([]);

    const handleSelectChange = (event:ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(event);
        setForm({ ...form, [name]: value });
    };

    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(event);
        setForm({ ...form, [name]: value });
    };

    const handleDateChange = (date: Date) => {
        setForm({ ...form, pickupTime: date });
    };

    const handleDelete = (index: number) => {
        setSubmittedRequests(prevRequests => prevRequests.filter((_, i) => i !== index));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requiredFields = [
            "patientName",
            "pickupTime",
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


        const finalForm = {
            ...form,
            pickupTime: form.pickupTime?.toISOString(), // Optional formatting
        };

        if (!form.pickupTime || isNaN(new Date(form.pickupTime).getTime())) {
            alert("Please enter a valid pickup time.");
            return;
        }
        onSubmit(finalForm);

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
                 <input name="patientName" placeholder="Enter Patient Name" onChange={handleInputChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"  />
                    <br/>
                    <label className="p-2 text-gray-800">Pickup Time:</label>
                    <DatePicker
                        selected={form.pickupTime}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"
                        placeholderText="Select a date and time"
                    />
                    <br/>
                    <label className="p-2 text-gray-800">Transport Type:</label>
                    <select name="transportType" onChange={handleSelectChange} className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Transport Type</option>
                        {transportTypes.map(transport => <option key={transport} value={transport}>{transport}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Pickup From:</label>
                    <select name="pickupTransport" onChange={handleSelectChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Pickup Location</option>
                        {MGBHospitals.map(hospital => <option key={hospital} value={hospital}>{hospital}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Dropoff To:</label>
                    <select name="dropoffTransport" onChange={handleSelectChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Dropoff Location</option>
                        {MGBHospitals.map(hospital => <option key={hospital} value={hospital}>{hospital}</option>)}
                    </select>
                    <br/>
                    <label className="p-2 text-gray-800">Additional Notes: </label>
                    <input name="additionalNotes" placeholder="Enter Additional Notes" className="p-8 w-full border border-gray-300 rounded-xl focus:outline-none" onChange={handleInputChange}></input>
                    <button type='submit' className="border border-3 border-[#012D5A] w-full btn btn-primary p-3 px-8 bg-[#012D5A] text-white rounded-xl hover:bg-white hover:text-[#012D5A]">Submit</button>
                </form>
        </div>
    )

}

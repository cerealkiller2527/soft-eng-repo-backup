import {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@tanstack/react-query';
import { useTRPC, queryClient} from '../database/trpc.ts';

const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];
const transportTypes = ["Ambulance", "Shuttle", "Private Transport", "Helicopter"];
const priority = ["Low", "Medium", "High", "Emergency"];


type TransportFormProps = {
    onSubmit: (data: object) => void;
};

// onSubmit will be used to send the data to TransportCard.tsx so the popup of the form can go away or be used elsewhere
export default function TransportRequestForm({onSubmit}: TransportFormProps) {

    // Object that updates when user adds new data
    const [form, setForm] = useState({
        employeeName: "",
        patientName: "",
        priority: "",
        pickupTime: new Date(),
        transportType: "",
        pickupTransport: "",
        dropoffTransport: "",
        additionalNotes: "",
    });

    // tRPC intigration set up
    const trpc = useTRPC();
    const addReq = useMutation(trpc.service.addTransportationRequest.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['service.getExternalTransportation'] });
        }
    }))

    // Select handler that updates values when Select keyword is used
    const handleSelectChange = (event:ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(event);
        setForm({ ...form, [name]: value });
    };

    // Input handler that updates values when Input keyword is used
    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(event);
        setForm({ ...form, [name]: value });
    };

    // Date handler that updates values when Date needs to be changed
    const handleDateChange = (date: Date) => {
        setForm({ ...form, pickupTime: date });
    };

    // Submit handler
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // This part checks the fields to see if they have been filled in with values
        const requiredFields = [
            "patientName",
            "priority",
            "employeeName",
            "pickupTime",
            "transportType",
            "pickupTransport",
            "dropoffTransport",

        ];
        //If the missingFields list has values in it, it means there is still data that has not been filled in yet
        const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);
        if (missingFields.length > 0) {
            alert("Please fill all required fields.");
            return;
        }
        // These next few parts were from documents I found online to help implement the Datepicker in the form
        const finalForm = {
            ...form,
            pickupTime: form.pickupTime,
        };

        if (!form.pickupTime || isNaN(new Date(form.pickupTime).getTime())) {
            alert("Please enter a valid pickup time.");
            return;
        }

        // Adds the data from the form to the database
        addReq.mutate({
            employee: finalForm.employeeName,
            patientName: finalForm.patientName,
            pickupTime: new Date(finalForm.pickupTime),
            transportation: finalForm.transportType,
            pickupTransport: finalForm.pickupTransport,
            dropoffTransport: finalForm.dropoffTransport,
            additionalNotes: finalForm.additionalNotes,
            priority: finalForm.priority,

        });

        // onSubmit sends the data to the TransportCard.tsx so the pop up can go away on submit
        onSubmit(finalForm);

        //confirms submission
        console.log("Form submitted successfully.", finalForm);

    };

    return (
        <div className="transform scale-90 sm:scale-100 w-full max-w-md mx-auto bg-white shadow-md rounded-2xl px-4">
            <div className=" w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Transportation Service Request</h2>
                <p>Select the following requests needed.</p>
                <p>Created by: Matthew Nickerson - Iteration 1</p>
            </div>
                <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <label className="p-2 text-gray-800">Employee:</label>
                    <input name="employeeName" placeholder="Enter Employee Name" onChange={handleInputChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"  />
                    <br/>
                    <label className="p-2 text-gray-800">Patient Full Name:</label>
                 <input name="patientName" placeholder="Enter Patient Name" onChange={handleInputChange} className=" w-full border border-gray-300 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#012D5A]"  />
                    <br/>
                    <label className="p-2 text-gray-800">Priority:</label>
                    <select name="priority" onChange={handleSelectChange} className="w-full border border-gray-300 rounded-xl p-1 focus:outline-none hover:bg-blue-100">
                        <option value="">Select Priority</option>
                        {priority.map(priority => <option key={priority} value={priority}>{priority}</option>)}
                    </select>
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

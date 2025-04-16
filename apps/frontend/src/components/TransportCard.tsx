import React from "react";
import { useState } from "react";
import TransportRequest from "../routes/serviceRequest.tsx";
import transportImage from "../../public/transport.png"
import LanguageRequestForm from "../components/LanguageRequestForm.tsx";
import TransportationForm from "@/components/TransportationForm.tsx";
import {Button} from "../components/ui/button";


export default function TransportCard({ onAddRequest }: { onAddRequest: (data: object) => void}) {

        // useState to check if pop up should be open or not
    const [isOpen, setIsOpen] = useState(false);

    // when called, this moves the form data to the request form button page and sets popup to false
    const handleFormSubmit = (formData: object) => {
        onAddRequest(formData);
        setIsOpen(false);
    };

    return (
    <div>
        <Button onClick={() => {
            setIsOpen(true);
        }} className="bg-[#012D5A] text-xl font-bold text-center items-center flex flex-col p-19 hover:bg-white bg-opacity-10 text-[#012D5A] rounded-xl hover:text-white border border-4 border-[#012D5A]">Transport
            <img src="/transport.png"
            alt="Transport"
            className="w-12 h-12 object-contain flex items-center"
        /></Button>
        {isOpen && (
            <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
                <div className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg transform scale-95">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-4 text-2xl font-bold text-red-600 hover:text-red-800"
                    >
                        x
                    </button>
                    <TransportationForm onFormSubmit={handleFormSubmit} />

                </div>
            </div>
        )}
    </div>
    )
}


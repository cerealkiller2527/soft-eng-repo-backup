import React from "react";
import {useState} from "react";
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import TransportRequest from "../routes/serviceRequest.tsx";
import transportImage from "../../public/transport.png"

export default function TransportCard({ onAddRequest }: { onAddRequest: (data: object) => void}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = (formData: object) => {
        onAddRequest(formData);
        setIsOpen(false);
    };

    return (
    <div>
        <button onClick={() => {
            setIsOpen(true);
        }} className="text-xl font-bold text-center items-center flex flex-col p-12 bg-[#012D5A] bg-opacity-10 text-white rounded-xl hover:bg-white hover:text-[#012D5A] border border-4 border-[#012D5A]">Transport
            <img src={transportImage}
            alt="Transport"
            className="w-12 h-12 object-contain flex items-center"
        /></button>
        {isOpen && (
            <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
                <div className="relative w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-4 text-2xl font-bold text-red-600 hover:text-red-800"
                    >
                        x
                    </button>
                    <TransportRequestForm onSubmit={handleFormSubmit} />
                </div>
            </div>
        )}
    </div>
    )
}


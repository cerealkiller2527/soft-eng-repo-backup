import React from "react";
import {useState} from "react";
import TransportRequestForm from "../components/TransportRequestForm.tsx";

export default function TransportCard({ onAddRequest }: { onAddRequest: (data: any) => void}) {

    const [isOpen, setIsOpen] = useState(false);
    const handleFormSubmit = (formData) => {
        onAddRequest(formData);         // update dashboard
        setIsOpen(false);           // close modal
    };

    return (
    <div>
        <button onClick={() => {
            setIsOpen(true);
        }} className="font-bold p-2 bg-[#012D5A] bg-opacity-10 text-white rounded-xl hover:bg-white hover:text-[#012D5A] border border-[#012D5A]">Transport </button>
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


import React from "react";
import { useState } from "react";
import EquipmentForm from "@/components/EquipmentRequestForm.tsx"
import { Button } from "../components/ui/button.tsx";



export default function EquipmentCard({ onAddRequest }: { onAddRequest: (data: object) => void}) {

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
            }} className="text-xl font-bold text-center items-center flex flex-col p-20 hover:bg-[#012D5A] bg-opacity-10 text-[#012D5A] rounded-xl hover:text-white border border-4 border-[#012D5A]">Equipment
                <img src="/Equipment.png"
                     alt="Equipment"
                     className="w-12 h-12 object-contain flex items-center"
                /></Button>
            {isOpen && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg transform scale-95">
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-4 text-2xl font-bold text-red-600 hover:text-red-800 bg-white hover:bg-white"
                        >
                            x
                        </Button>
                        <EquipmentForm onFormSubmit={handleFormSubmit} />
                    </div>
                </div>
            )}
        </div>
    )
}


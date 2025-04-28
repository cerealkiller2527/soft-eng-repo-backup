"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EquipmentRequestForm from "@/components/EquipmentRequestForm"
import TransportationForm from "@/components/TransportationForm"
import SecurityForm from "@/components/SecurityRequestForm.tsx"
import LanguageForm from "@/components/LanguageRequestForm"

interface ServiceBannerProps {
    title: string
    description: string
    icon: LucideIcon
    formType: "transport" | "security" | "equipment" | "language"
}

export default function Services({ title, description, icon: Icon, formType }: ServiceBannerProps) {
    const [open, setOpen] = useState(false)
    const handleFormSubmit = (formData: object) => {
        setOpen(false);
    };

    return (
        <>
            <div
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-primary transition-transform duration-300 hover:scale-105 h-full"
                onClick={() => setOpen(true)}
            >
                <div className="p-4 text-white flex flex-col items-center text-center h-full">
                    <Icon className="h-8 w-8 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-xs text-white/80 mb-3">{description}</p>
                    <Button className="bg-white text-primary hover:bg-gray-100 mt-auto">Request</Button>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
                    <DialogHeader>
                        <DialogTitle className="text-primary flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            {title}
                        </DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {formType === "equipment" ? (
                        <EquipmentRequestForm onSubmit={() => setOpen(false)} />
                    ) : formType === "transport" ? (
                        <TransportationForm />
                    ) : formType === "security" ? (
                        <SecurityForm />
                    ) : formType === "language" ? (
                        <LanguageForm />
                    ) : null}
                </DialogContent>
            </Dialog>
        </>
    )
}

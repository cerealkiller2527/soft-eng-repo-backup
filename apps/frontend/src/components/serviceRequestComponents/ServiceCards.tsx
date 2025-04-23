import { useState } from "react";
import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Replace with actual form components
import EquipmentRequestForm from "@/components/EquipmentRequestForm";
import TransportationForm from "@/components/TransportationForm";
import SecurityRequestForm from "@/components/SecurityRequestForm";
import LanguageRequestForm from "@/components/LanguageRequestForm";

export default function ServiceCards() {
    const [openForm, setOpenForm] = useState<null | "transport" | "security" | "language" | "equipment">(null);

    const closeModal = () => setOpenForm(null);
    const handleFormSubmit = (formData: object) => {
        setOpenForm(null);
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 lg:px-6">

                        {/* Transportation Card */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Request transportation between Hospital Locations.</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    Transportation Request Form
                                </CardTitle>

                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm w-full">
                                <Button
                                    onClick={() => setOpenForm("transport")}
                                    className="w-full bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] border-2 border-[#012D5A]"
                                >
                                    Open Form
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Security Card */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription> Issue a Security Request at any Hospital Location.</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    Security Request Form
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm w-full">
                                <Button
                                    onClick={() => setOpenForm("security")}
                                    className="w-full bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] border-2 border-[#012D5A]"
                                >
                                    Open Form
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Language Card */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription> Request a Translator at any Hospital Location.</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    Language Request Form
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm w-full">
                                <Button
                                    onClick={() => setOpenForm("language")}
                                    className="w-full bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] border-2 border-[#012D5A]"
                                >
                                    Open Form
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Equipment Card */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription> Request Equipment in different parts of the Hospital.</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    Equipment Request Form
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm w-full">
                                <Button
                                    onClick={() => setOpenForm("equipment")}
                                    className="w-full bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] border-2 border-[#012D5A]"
                                >
                                    Open Form
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modals for Forms */}
            {openForm && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg transform scale-95">
                        <Button
                            onClick={closeModal}
                            className="absolute top-3 right-4 text-2xl font-bold text-red-600 hover:text-red-800 bg-white hover:bg-white"
                        >
                            x
                        </Button>

                        {openForm === "transport" && <TransportationForm onFormSubmit={handleFormSubmit}/>}
                        {openForm === "security" && <SecurityRequestForm onFormSubmit={handleFormSubmit}/>}
                        {openForm === "language" && <LanguageRequestForm onFormSubmit={handleFormSubmit}/>}
                        {openForm === "equipment" && <EquipmentRequestForm onFormSubmit={handleFormSubmit}/>}
                    </div>
                </div>
            )}
        </div>
    );
}

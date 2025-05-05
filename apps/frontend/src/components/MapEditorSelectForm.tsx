import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const buildingData = {
    "22 Patriot Place": { floors: 4 },
    "20 Patriot Place": { floors: 4 },
    "Chestnut Hill": { floors: 1 },
    "Faulkner Hospital": { floors: 1 },
    "Main Campus": { floors: 2 },
};

export const formSchema = z.object({
    building: z.string(),
    floor: z.string(),
});

export default function MapEditorSelectForm({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => void }) {
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            building: "",
            floor: "",
        },
    });

    const handleBuildingChange = (value: string) => {
        setSelectedBuilding(value);
        form.setValue('floor', '');
    };

    const getFloorOptions = () => {
        if (!selectedBuilding) return [];
        const floorCount = buildingData[selectedBuilding as keyof typeof buildingData].floors;
        return Array.from({ length: floorCount }, (_, i) => (i + 1).toString());
    };

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        if (!values.building || !values.floor) {
            toast.error("Please select both a building and a floor.");
            return;
        }

        try {
            onSubmit(values);
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="w-full"> {/* Removed fixed width and padding */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4"> {/* Reduced space-y from 6 to 4 */}
                    <h2 className="text-lg font-bold text-center text-primary mb-2"> {/* Reduced text size and margin */}
                        Where do you want to edit?
                    </h2>

                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                                    Building
                                </FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleBuildingChange(value);
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a building" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(buildingData).map((building) => (
                                            <SelectItem
                                                key={building}
                                                value={building}
                                            >
                                                {building}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                                    Floor
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!selectedBuilding}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={selectedBuilding ? "Select a floor" : "Select a building first"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {getFloorOptions().map((floor) => (
                                            <SelectItem
                                                key={floor}
                                                value={floor}
                                            >
                                                Floor {floor}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <div className="pt-2"> {/* Reduced padding */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-chart-4 text-white hover:text-white"
                        >
                            Continue to Editor
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
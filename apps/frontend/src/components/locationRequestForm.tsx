"use client"
import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { pNodeDTO } from "../../../../share/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const buildings = ["22 Patriot Place", "20 Patriot Place", "Chestnut Hill Medical Center", "Faulkner Hospital", "Main Campus"];
const transport = ["Public Transport", "Walking", "Driving"];

const formSchema = z.object({
    location: z.string().min(1, "Location is required"),
    destination: z.string().min(1, "Destination is required"),
    transport: z.string().default("Walking"),
    building: z.string().min(1, "Building is required"),
});

type FormValues = z.infer<typeof formSchema>;

type LocationRequestFormProps = {
    onSubmit: (form: FormValues) => void;
    initialForm?: FormValues;
};

export default function LocationRequestForm({ onSubmit, initialForm }: LocationRequestFormProps) {
    const trpc = useTRPC();
    const [MGBHospitals, setMGBHospitals] = useState(["Reception"]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialForm ?? {
            location: "",
            destination: "",
            transport: "Walking",
            building: "Chestnut Hill Medical Center",
        }
    });

    const buildingWatch = form.watch("building");

    const nodesQuery = useQuery(trpc.mapInfoRouter.mapInfo.queryOptions({ buildingName: buildingWatch }));

    useEffect(() => {
        if (nodesQuery.data) {
            const suites = nodesQuery.data;
            setMGBHospitals(suites);
            // Reset destination when building changes
            form.resetField("destination");
        }
    }, [nodesQuery.data, form]);

    useEffect(() => {
        if (typeof google !== "undefined" && google.maps && google.maps.places) {
            const input = document.getElementById("location-input") as HTMLInputElement;
            if (input) {
                const autocomplete = new google.maps.places.Autocomplete(input);

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        form.setValue("location", place.formatted_address || "");
                    }
                });
            }
        }
    }, [form]);

    const handleSubmit = async (values: FormValues) => {
        try {
            // Geocode the location
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: values.location }, (results, status) => {
                if (status === "OK") {
                    const origin = results[0].geometry.location;
                    console.log(results[0].geometry.location);
                    onSubmit(values);
                    toast.success("Request submitted successfully!");
                } else {
                    toast.error("Geocode was not successful for the following reason: " + status);
                }
            });
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl">
            <div className="bg-white w-full p-6 rounded-t-2xl">
                <h2 className="text-xl font-semibold text-primary">Select Destination</h2>
                <p className="text-muted-foreground">Select the starting address and department.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-6">
                    {/* Location input */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Enter your starting address:</FormLabel>
                                <FormControl>
                                    <Input
                                        id="location-input"
                                        placeholder="Enter location"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Building select */}
                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Building:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Building" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {buildings.map((building) => (
                                            <SelectItem key={building} value={building}>
                                                {building}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Destination select */}
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Destination:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Destination" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {MGBHospitals.map((hospital) => (
                                            <SelectItem key={hospital} value={hospital}>
                                                {hospital}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Transport select */}
                    <FormField
                        control={form.control}
                        name="transport"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Transport Type:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Transport Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {transport.map((transportType) => (
                                            <SelectItem key={transportType} value={transportType}>
                                                {transportType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit button */}
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
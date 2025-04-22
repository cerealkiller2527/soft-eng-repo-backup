import { useEffect } from "react";
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
import MapForm from "./MapForm";
export const formSchema = z.object({
    building: z.string(),
    floor: z.string(),
});

const buildings = ["22 Patriot Place", "20 Patriot Place", "Chestnut Hill", "Faulkner Hospital"];
const floors = ["1", "2", "3", "4"];

export default function MapEditorSelectForm({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            building: "",
            floor: "",
        },
    });

    useEffect(() => {
        // Fetch buildings/floors from backend in future
    }, []);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        // Check if both fields are filled
        if (!values.building || !values.floor) {
            toast.error("Please select both a building and a floor.");
            return;
        }

        try {
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
            onSubmit(values);
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div>
            <div>
            <MapForm />
            </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <FormField
                    control={form.control}
                    name="building"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Building</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a building" />
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
                            <FormDescription>Choose a building</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Floor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a floor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {floors.map((floor) => (
                                        <SelectItem key={floor} value={floor}>
                                            {floor}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>Choose a floor</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </div>
    );
}

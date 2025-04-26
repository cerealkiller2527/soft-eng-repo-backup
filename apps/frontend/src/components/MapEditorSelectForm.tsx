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
        if (!values.building || !values.floor) {
            toast.error("Please select both a building and a floor.");
            return;
        }

        try {
            toast(
                <div className="rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </div>
            );
            onSubmit(values);
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-64">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[#012D5A] mb-6">
                        Map Editor Selection
                    </h2>

                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Building
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a building" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {buildings.map((building) => (
                                            <SelectItem
                                                key={building}
                                                value={building}
                                            >
                                                {building}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription className="text-xs text-black">
                                    Choose the building you want to edit
                                </FormDescription>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Floor
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a floor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {floors.map((floor) => (
                                            <SelectItem
                                                key={floor}
                                                value={floor}
                                            >
                                                Floor {floor}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription className="text-xs text-black">
                                    Choose the floor level
                                </FormDescription>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                            hover:text-[#012D5A] hover:bg-white
                            hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                        >
                            Continue to Editor
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
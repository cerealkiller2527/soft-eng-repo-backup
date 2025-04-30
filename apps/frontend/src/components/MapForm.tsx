"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import {NodeTypeZod} from "common/src/ZodSchemas.ts";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "../database/trpc.ts";
import { useEffect } from "react";

const typeEnum = NodeTypeZod
const formSchema = z.object({
    suite: z.string(),
    type: typeEnum,
    description: z.string(),
    isOutside: z.boolean().default(false),
    departmentId: z.number().optional(),
})
type FormValues = z.infer<typeof formSchema>

interface MapFormProps {
    onSubmit: (values: FormValues) => void;
    initialValues?: {
        suite?: string;
        type?: string;
        description?: string;
        isOutside?: boolean;
        departmentId?: number;
    };
    buildingId?: number;
    floor?: number;
}

export default function MapForm({ onSubmit, initialValues, buildingId, floor }: MapFormProps) {
    const trpc = useTRPC();
    
    const { data: departments, isLoading: isLoadingDepartments } = useQuery(
        trpc.mapEditor.getDepartmentsByBuildingAndFloor.queryOptions({
            buildingId: buildingId || 0,
            floor: floor || 0,
        })
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            suite: initialValues?.suite || "",
            type: initialValues?.type || "Entrance",
            description: initialValues?.description || "",
            isOutside: initialValues?.isOutside || false,
            departmentId: initialValues?.departmentId,
        }
    });

    useEffect(() => {
        if (initialValues) {
            form.reset({
                suite: initialValues.suite || "",
                type: initialValues.type || "Entrance",
                description: initialValues.description || "",
                isOutside: initialValues.isOutside || false,
                departmentId: initialValues.departmentId,
            });
        }
    }, [initialValues, form]);

    const handleSubmit = (values: FormValues) => {
        try {
            if (values.type === "Location" && !values.departmentId) {
                toast.error("Please select a department for this location");
                return;
            }
            
            onSubmit(values);
            toast.success(initialValues ? "Node updated successfully!" : "Node added successfully!");
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center text-primary mb-6">
                        {initialValues ? "Edit Node" : "Add Node"}
                    </h2>
                    <FormField
                        control={form.control}
                        name="suite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Suite/Room Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Suite/Room Number"
                                        type="text"
                                        className="w-full"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Location Type
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {typeEnum.options.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    {form.watch("type") === "Location" && (
                        <FormField
                            control={form.control}
                            name="departmentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-black">
                                        Department
                                    </FormLabel>
                                    <Select 
                                        onValueChange={(value) => field.onChange(Number(value))} 
                                        value={field.value?.toString()}
                                        disabled={isLoadingDepartments}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={isLoadingDepartments ? "Loading..." : "Select a department"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments?.map((dept) => (
                                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none w-full min-h-[100px]"
                                        placeholder="Enter a description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isOutside"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium text-black">
                                        Outdoor Location
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-chart-4 text-white hover:text-white"
                        >
                            {initialValues ? "Update Node" : "Add Node"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
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

const typeEnum = NodeTypeZod
const formSchema = z.object({
    suite: z.string(),
    type: typeEnum,
    description: z.string(),
    isOutside: z.boolean().default(false),
})
type FormValues = z.infer<typeof formSchema>

interface MapFormProps {
    onSubmit: (values: FormValues) => void;
    initialValues?: {
        department?: string;
        type?: string;
        description?: string;
        isOutside?: boolean;
    };
}

export default function MapForm({ onSubmit, initialValues }: MapFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: "",
            type: "Entrance",
            description: "",
            isOutside: false,
            ...initialValues,
        }
    })

    const handleSubmit = (values: FormValues) => {
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
        <div className="bg-white rounded-lg shadow-md p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[#012D5A] mb-6">
                        {initialValues ? "Edit Node" : "Department Request Form"}
                    </h2>

                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-black">
                                    Department
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Department"
                                        type="text"
                                        className="w-full"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-black">
                                    Enter the Department name or number
                                </FormDescription>
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
                                    Type
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {typeEnum.options.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription className="text-xs text-black">
                                    Select the type of location
                                </FormDescription>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

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
                                <FormDescription className="text-xs text-black">
                                    Add any additional details about this location
                                </FormDescription>
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
                                    <FormDescription className="text-xs text-black">
                                        Check if this location is outside the building
                                    </FormDescription>
                                </div>
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
                            {initialValues ? "Update Node" : "Submit Request"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
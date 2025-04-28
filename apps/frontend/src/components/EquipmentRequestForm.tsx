"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl, FormDescription,
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
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { DatetimePicker } from "@/components/ui/datetimepicker.tsx"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { queryClient, useTRPC } from "@/database/trpc.ts"
import { useMutation } from '@tanstack/react-query'

const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"]
const equipmentTypes = ["Wheelchair", "Stretcher", "IV Pump", "Ventilator", "Monitor", "Other"]
const priority = ["Low", "Medium", "High", "Emergency"]

const formSchema = z.object({
    employeeName: z.string().min(1, "Employee name is required"),
    priority: z.string().min(1, "Priority is required"),
    deadline: z.coerce.date(),
    equipment: z.array(z.string()).min(1, "At least one equipment type is required"),
    location: z.string().min(1, "Location is required"),
    additionalNotes: z.string().optional(),
})

export default function EquipmentRequestForm({  onFormSubmit,}: {
    onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
}) {
    const trpc = useTRPC()
    const addReq = useMutation(trpc.service.addEquipmentDeliveryRequest.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service.getEquipmentRequests'] })
        }
    }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeName: "",
            priority: "",
            deadline: new Date(),
            equipment: [],
            location: "",
            additionalNotes: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addReq.mutate({
            employee: values.employeeName,
            priority: values.priority,
            deadline: new Date(values.deadline),
            equipment: values.equipment,
            toWhere: values.location,
            additionalNotes: values.additionalNotes,
        });
        onFormSubmit?.(values);
    }
    return (
        <div className="">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#012D5A] mb-2">Equipment Service Request</h2>
                <p className="text-sm text-gray-600">Created by Will and Christan</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="employeeName"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Employee Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Employee Name"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {priority.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Deadline</FormLabel>
                                <FormControl>
                                    <Input type={"datetime-local"} />
                                </FormControl>
                                <FormDescription>Select the requested deadline for service.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="equipment"
                        render={() => (
                            <FormItem className="space-y-2">
                                <FormLabel>Equipment Needed</FormLabel>
                                <div className="space-y-2">
                                    {equipmentTypes.map((item) => (
                                        <FormField
                                            key={item}
                                            control={form.control}
                                            name="equipment"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item])
                                                                    : field.onChange(
                                                                        field.value?.filter((value) => value !== item)
                                                                    );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{item}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Location</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Location" />
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

                    <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter any extra information or requests..."
                                        className="resize-none w-full min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center pt-4">
                        <Button
                            type="submit"
                            className="px-6 py-2 text-white bg-[#012D5A] hover:bg-[#01498C] transition-colors rounded-xl shadow-md"
                        >
                            Submit Request
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

}
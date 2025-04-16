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
    const addReq = useMutation(trpc.service.equipmentDeliveryRouter.addEquipmentDeliveryRequest.mutationOptions({
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
        <div className="transform scale-90 sm:scale-100 w-full max-w-md mx-auto bg-white shadow-md rounded-2xl px-4">
            <div className="w-full p-4 rounded-t-2xl rounded-b-xl">
                <h2 className="text-xl font-semibold">Equipment Service Request</h2>
                <p>Select the following requests needed.</p>
                <p>
                    Created by: Will Schieffer (based on transport request by Matt Nickerson) -
                    Iteration 2
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
                    <p>Created by Will and Christan</p>
                    <FormField
                        control={form.control}
                        name="employeeName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Employee Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem className="flex flex-col">
                                <FormLabel>Pick Up Time/Date</FormLabel>
                                <FormControl>
                                    <ReactDatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        showTimeSelect
                                        placeholder = "MM/DD/YYYY, HH:MM AM/PM"
                                        dateFormat="Pp"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                        popperClassName="!z-50"
                                        calendarClassName="rounded-lg border border-gray-300 shadow-lg bg-white text-sm p-7"
                                        dayClassName={() => "w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded"}
                                    />
                                </FormControl>
                                <FormDescription>Add the date and time of pickup.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="equipment"
                        render={() => (
                            <FormItem>
                                <FormLabel>Equipment Needed</FormLabel>
                                <div className="space-y-2">
                                    {equipmentTypes.map((item) => (
                                        <FormField
                                            key={item}
                                            control={form.control}
                                            name="equipment"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    item
                                                                )}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([
                                                                              ...field.value,
                                                                              item,
                                                                          ])
                                                                        : field.onChange(
                                                                              field.value?.filter(
                                                                                  (value) =>
                                                                                      value !== item
                                                                              )
                                                                          );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
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
                            <FormItem>
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
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter Additional Notes"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
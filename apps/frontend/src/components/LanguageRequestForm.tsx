"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {DatetimePicker} from "@/components/ui/datetimepicker"
import { Input } from "@/components/ui/input"
import {queryClient, useTRPC} from "@/database/trpc.ts";
import { useMutation } from '@tanstack/react-query';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];

const priority = ["Low", "Medium", "High", "Emergency"];

const formSchema = z.object({
    employeeName: z.string(),
    priority: z.string(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string(),
    language: z.string(),
    additionalNotes: z.string(),
})

export default function LanguageRequestForm ({  onFormSubmit,}: {
    onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
}) {

    const trpc = useTRPC();
    const addReq = useMutation(trpc.service.addLanguageRequest.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['service.getLanguageRequest'] });
        }
    }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeName: "",
            priority: "",
            location: "",
            language: "",
            startTime: new Date(),
            endTime: new Date(),
            additionalNotes: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        addReq.mutate({
            employee: values.employeeName,
            startTime: new Date(values.startTime),
            endTime: new Date(values.endTime),
            location: values.location,
            language: values.language,
            additionalNotes: values.additionalNotes,
            priority: values.priority,
        });
        onFormSubmit?.(values);
    }
    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#012D5A] mb-2">Language Request Form</h2>
                <p className="text-sm text-gray-600">Created by Brandon and Bobby</p>
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
                                        placeholder="Employee Name"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormDescription>Enter employee name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <ReactDatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            placeholderText="MM/DD/YYYY, HH:MM AM/PM"
                                            dateFormat="Pp"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                            popperClassName="!z-50"
                                            calendarClassName="rounded-lg border border-gray-300 shadow-lg bg-white text-sm p-7"
                                            dayClassName={() =>
                                                "w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded"
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>Add the start time.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                        <ReactDatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            placeholderText="MM/DD/YYYY, HH:MM AM/PM"
                                            dateFormat="Pp"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                            popperClassName="!z-50"
                                            calendarClassName="rounded-lg border border-gray-300 shadow-lg bg-white text-sm p-7"
                                            dayClassName={() =>
                                                "w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded"
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>Add the end time.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Location</FormLabel>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a location" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {MGBHospitals.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
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
                        name="language"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Translator Language</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Translator Language"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormDescription>Enter the language needed for translation.</FormDescription>
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
                                        placeholder="Please provide any additional notes here."
                                        className="resize-none w-full min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Add any additional context or info.</FormDescription>
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
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {priority.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
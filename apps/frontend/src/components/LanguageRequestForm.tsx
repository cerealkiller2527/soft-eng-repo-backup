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
import {useMutation, useQuery} from '@tanstack/react-query';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];

const priority = ["Low", "Medium", "High", "Emergency"];

const formSchema = z.object({
    employeeID: z.coerce.number().optional(),
    priority: z.string(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string(),
    language: z.string(),
    additionalNotes: z.string(),
})

export default function LanguageRequestForm ({  onFormSubmit, onSuccess}: {
    onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
    onSuccess?: () => void;
}) {

    const trpc = useTRPC();
    const addReq = useMutation(trpc.service.addLanguageRequest.mutationOptions({
        onSuccess: (data) => {
            onSuccess?.();
        }
    }))
    const listofEmployees = useQuery(trpc.employee.getEmployee.queryOptions());


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeID: undefined,
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
            employeeID: values.employeeID,
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
        <div className="">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-primary mb-2">Language Request Form</h2>
                <p className="text-sm text-gray-600">Created by Brandon and Bobby</p>
            </div>
            <br />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="employeeID"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Requested Employee</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Employee" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {listofEmployees.data?.map((employee) => (
                                                <SelectItem key={employee.id} value={String(employee.id)}>
                                                    {employee.firstName} {employee.lastName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input type={"datetime-local"} />
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
                                        <Input type={"datetime-local"} />
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
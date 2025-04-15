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

const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];

const priority = ["Low","Medium","High","Emergency"]

const formSchema = z.object({
    employeeName: z.string(),
    priority: z.string(),
    location: z.string(),
    additionalNotes: z.string(),
})

export default function SecurityRequestForm({  onFormSubmit,}: {
    onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
}) {


    const trpc = useTRPC();
    const addReq = useMutation(trpc.service.addSecurityRequest.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['service.getSecurityRequest'] });
        }
    }))


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeName: "",
            priority: "",
            location: "",
            additionalNotes: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        addReq.mutate({
            employee: values.employeeName,
            location: values.location,
            additionalNotes: values.additionalNotes,
            priority: values.priority,
        });
        onFormSubmit?.(values);
    }

    return (
        <Form {...form}>
            <h2>Security Request Form</h2>
            <p>Created by Sahana and Tina</p>
            <br />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="employeeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employee Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
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
                                        <SelectValue placeholder="Select a priority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {priority.map((p) => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                        <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {MGBHospitals.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
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
                                <Textarea placeholder="Please mention the security service needed here" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit Request</Button>
            </form>
        </Form>
    )
}

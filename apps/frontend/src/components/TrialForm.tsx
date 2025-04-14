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
    const transportTypes = ["Ambulance", "Shuttle", "Private Transport", "Helicopter"];
    const priority = ["Low", "Medium", "High", "Emergency"];

    // tRPC intigration set up


    const formSchema = z.object({
        employeeName: z.string(),
        patientName: z.string(),
        priority: z.string(),
        pickupTime: z.coerce.date(),
        transportType: z.string(),
        pickupTransport: z.string(),
        dropoffTransport: z.string(),
        additionalNotes: z.string(),
    })

    export default function TrialForm() {

        const trpc = useTRPC();
        const addReq = useMutation(trpc.service.addTransportationRequest.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['service.getExternalTransportation'] });
            }
        }))

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                employeeName: "",
                patientName: "",
                priority: "",
                pickupTime: new Date(),
                transportType: "",
                pickupTransport: "",
                dropoffTransport: "",
                additionalNotes: "",
            }
        })

        function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values);
            console.log(values.pickupTime);
            addReq.mutate({
                employee: values.employeeName,
                patientName: values.patientName,
                pickupTime: new Date(values.pickupTime),
                transportation: values.transportType,
                pickupTransport: values.pickupTransport,
                dropoffTransport: values.dropoffTransport,
                additionalNotes: values.additionalNotes,
                priority: values.priority,
            });

        }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="employeeName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Employee Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Employee Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter employee name.
                                </FormDescription>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="patientName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Patient Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Patient Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the patient name.
                                </FormDescription>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select defaultValue={field.value} onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Priority..." />
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
                            </FormItem>
                        )}/>

                    <FormField
                    control={form.control}
                    name="transportType"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Transport Type</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange} >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Transport Type..." />
                                </SelectTrigger>
                            </FormControl>
                                <SelectContent>
                                    {transportTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}/>
                    <FormField
                        control={form.control}
                        name="pickupTime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Pick Up Time/Date</FormLabel>
                                <DatetimePicker
                                    value={field.value}
                                    onChange={(date) => {
                                        console.log("Picked:", date);
                                        field.onChange(date);
                                    }}
                                    format={[
                                        ["months", "days", "years"],
                                        ["hours", "minutes", "am/pm"],
                                    ]}
                                />
                                <FormDescription>Add the date and time of pickup.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="pickupTransport"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Pick Up</FormLabel>
                                <Select defaultValue={field.value} onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pick up from..." />
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
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="dropoffTransport"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Drop off</FormLabel>
                                <Select defaultValue={field.value} onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Drop off to..." />
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
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Placeholder"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Add any additional notes.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        )
    }




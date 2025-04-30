"use client"
import { z } from "zod"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { useForm } from "react-hook-form"
    import { Button } from "@/components/ui/button"
    import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/select"
    import { Textarea } from "@/components/ui/textarea"
    import { Input } from "@/components/ui/input"
    import {queryClient, useTRPC} from "@/database/trpc.ts";
    import {useMutation, useQuery} from '@tanstack/react-query';
    import 'react-datepicker/dist/react-datepicker.css';


    const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
        "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];
    const transportTypes = ["Ambulance", "Shuttle", "Private Transport", "Helicopter"];
    const priority = ["Low", "Medium", "High", "Emergency"];

    // tRPC integration set up


    const formSchema = z.object({
        employee: z.coerce.number(),
        patientName: z.string(),
        priority: z.string(),
        pickupTime: z.date(),
        transportType: z.string(),
        pickupTransport: z.string(),
        dropoffTransport: z.string(),
        additionalNotes: z.string(),
    })


    export default function TransportationForm({  onFormSubmit,}: {
        onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
    }) {

        const trpc = useTRPC();
        const addReq = useMutation(trpc.service.addExternalTransportationRequest.mutationOptions({
            onSuccess: (data) => {
              queryClient.invalidateQueries({ queryKey: ['service', 'getExternalTransportation'] });
            }
        }))

        const listofEmployees = useQuery(trpc.employee.getEmployee.queryOptions());

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                employee: 0,
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
                patientName: values.patientName,
                pickupTime: new Date(values.pickupTime),
                transportation: values.transportType,
                pickupTransport: values.pickupTransport,
                dropoffTransport: values.dropoffTransport,
                additionalNotes: values.additionalNotes,
                priority: values.priority,
            });
            onFormSubmit?.(values);

        }

        return (
            <div className="">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#012D5A] mb-2">Transportation Request Form</h2>
                    <p className="text-sm text-gray-600">Created by Matt Nickerson (Iteration 1)</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="employee"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Employee</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Employee" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {listofEmployees.data?.map((employee) => (
                                                <SelectItem key={employee.id} value={String(employee.id)}>
                                                    {employee.name}
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
                            name="patientName"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Patient Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Patient Name" {...field} className="w-full" />
                                    </FormControl>
                                    <FormDescription>Enter the patient name.</FormDescription>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Priority</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
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
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="transportType"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Transport Type</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
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
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="pickupTime"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Pick Up Time/Date</FormLabel>
                                    <FormControl>
                                        <Input type={"datetime-local"} />
                                    </FormControl>
                                    <FormDescription>Add the date and time of pickup.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="pickupTransport"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Pick Up</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
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
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dropoffTransport"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Drop Off</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
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
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="additionalNotes"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add any additional context, comments, or instructions..."
                                            className="resize-none w-full min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>This field is optional.</FormDescription>
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




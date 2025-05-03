"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {queryClient, useTRPC} from "@/database/trpc.ts";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';


const MGBHospitals = ["Brigham and Women's Main Hospital", "Faulkner Hospital", "Dana-Farber Brigham Cancer Center", "Hale Building", "221 Longwood",
    "Chestnut Hill Healthcare Center", "Foxborough", "Pembroke", "Westwood", "Harbor Medical Associates", "Dana-Farber at South Shore Health", "Dana-Farber at Foxborough", "Dana-Farber at Chestnut Hill", "Dana-Farber at Milford"];

const priority = ["Low","Medium","High","Emergency"]

const formSchema = z.object({
    employeeID: z.coerce.number().optional(),
    priority: z.string(),
    location: z.string(),
    additionalNotes: z.string(),
})

export default function SecurityRequestForm({  onFormSubmit, onSuccess}: {
    onFormSubmit?: (data: z.infer<typeof formSchema>) => void;
    onSuccess?: () => void;
}) {


    const trpc = useTRPC();
    const addReq = useMutation(trpc.service.addSecurityRequest.mutationOptions({
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
            additionalNotes: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        addReq.mutate({
            employeeID: values.employeeID,
            location: values.location,
            additionalNotes: values.additionalNotes,
            priority: values.priority,
        });
        queryClient.invalidateQueries({ queryKey: ['getSecurityRequests'] });
        onFormSubmit?.(values);
    }

    return (
        <div className="">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#012D5A] mb-2">Security Request Form</h2>
                <p className="text-sm text-gray-600">Created by Sahana and Tina</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {priority.map((p) => (
                                            <SelectItem key={p} value={p}>
                                                {p}
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
                        name="location"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Location</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a location" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {MGBHospitals.map((loc) => (
                                            <SelectItem key={loc} value={loc}>
                                                {loc}
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
                                        placeholder="Please mention the security service needed here"
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

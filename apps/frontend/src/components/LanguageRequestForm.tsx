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
    const addReq = useMutation(trpc.service.languageRouter.addLanguageRequest.mutationOptions({
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2>Language Request Form </h2>
                <p>Created by Brandon and Bobby</p>
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
                    name="startTime"
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
                            <FormDescription>Add the date and time for the translator to start.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endTime"
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
                            <FormDescription>Add the date and time for the translator to end.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange} >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Location..." />
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
                    name="language"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Translator Language</FormLabel>
                            <FormControl>
                                <Input placeholder="Translator Language" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the language you need to translate.
                            </FormDescription>
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
                                    placeholder="Please provide any additional notes here."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Add any additional notes.</FormDescription>
                            <FormMessage />
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )

}
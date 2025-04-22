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
import { useMutation } from '@tanstack/react-query';

import 'react-datepicker/dist/react-datepicker.css';

    const typeEnum = z.enum(["Entrance", "Intermediary", "Staircase", "Elevator", "Location", "Help_Desk"])
    const formSchema = z.object({
    suite: z.string(),
    type: typeEnum,
    description: z.string(),
})
    type FormValues = z.infer<typeof formSchema>

    export default function MapForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            suite: "",
            type: "Entrance",
            description: "",
        }
    })




        return(
            <Form {...form}>
                <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#012D5A] mb-2">Suite Request Form</h2>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="suite"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Suite</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter suite"
                                            type="text"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {typeEnum.options.map((type) => (
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
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none w-full min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                className="px-6 py-2 text-white bg-[#012D5A] hover:bg-[#01498C] transition-colors rounded-xl shadow-md"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Form>
        )
}
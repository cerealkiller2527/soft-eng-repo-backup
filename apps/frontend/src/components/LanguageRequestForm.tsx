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

const formSchema = z.object({
    employeeName: z.string(),
    priority: z.string(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string(),
    language: z.string(),
    additionalNotes: z.string(),
})

export default function LanguageRequestForm () {

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

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            </form>
        </Form>
    )

}
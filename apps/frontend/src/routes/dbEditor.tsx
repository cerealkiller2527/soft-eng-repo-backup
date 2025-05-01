import Layout from "@/components/Layout.tsx";
import React from "react";

import { useTRPC } from '../database/trpc.ts';
import {useMutation, useQuery} from '@tanstack/react-query';


const trpc = useTRPC();

export default function DbEditor() {

    const trpc = useTRPC();

    const { data: employees, isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: () => trpc.data.getEmployees.query()
    });

    if (isLoading) return <p>... Loading ...</p>

    if (error) return <p> Error! </p>

    return (
        <Layout>
            <div className={"container max-w-full pt-8"}>
                <div className={"flex flex-wrap justify-center items-center p-8"}>
                    <h1>{JSON.stringify(data, null, 2)}</h1>
                </div>
            </div>
        </Layout>
    )
}
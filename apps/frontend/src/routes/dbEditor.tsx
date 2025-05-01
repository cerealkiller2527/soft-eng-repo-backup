import Layout from "@/components/Layout.tsx";
import React from "react";
import { useTRPC } from '../database/trpc.ts';
import {useQuery} from "@tanstack/react-query";




export default function DbEditor() {
    const trpc = useTRPC();

    const employees = useQuery(trpc.dbEditor.getParsedEmployees.queryOptions())

    const buildings = useQuery(trpc.dbEditor.getParsedBuildings.queryOptions())

    const departments = useQuery(trpc.dbEditor.getParsedDepartments.queryOptions())

    const nodesAndEdges = useQuery(trpc.dbEditor.getParsedNodesWithEdges.queryOptions())

    
    
    return (
        <Layout>
            <div className={'container max-w-full pt-8'}>
                <div className={'flex flex-wrap justify-center p-8'}>
                    <h1>{JSON.stringify(nodesAndEdges.data)}</h1>
                </div>
            </div>
        </Layout>
    );
}
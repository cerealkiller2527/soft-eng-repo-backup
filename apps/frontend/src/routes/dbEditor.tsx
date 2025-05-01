import Layout from "@/components/Layout.tsx";
import React from "react";
import { useTRPC } from '../database/trpc.ts';


const trpc = useTRPC();

const employees =

export default function DbEditor() {
    return (
        <Layout>
            <div className={"container max-w-full pt-8"}>
                <div className={"flex flex-wrap justify-center p-8"}>
                    <h1>Hello World</h1>
                </div>
            </div>
        </Layout>
    )
}
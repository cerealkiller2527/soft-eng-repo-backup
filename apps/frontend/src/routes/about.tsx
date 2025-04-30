import React from "react";
import Layout from "../components/Layout";


import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"

type teamProps = {
    name: string,
    position: string,
    about: string,
    picPath: string
}

function TeamCard(){
    return (
        <div className={"p-4"}>
            <Card className={"w-70 pb-1"}>
                <CardHeader className={"justify-items-center"}>
                    <img
                        src={"/headshots/minman.jpg"}
                        alt={"Team headshot"}
                        className={"h-54 w-full object-cover rounded-xl drop-shadow-xl/20"}
                    />
                    <CardTitle className={"flex-1"}>
                            Max Inman
                    </CardTitle>
                    <CardDescription className={"text-center italic"}>
                        <p>Documentation Analyst, Algorithms Dev</p>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>

    )
}

export default function About() {
    return (
        <Layout>
            <div className={"container max-w-full pt-8"}>
                <div className={"flex-col"}>

                    {/*about header section*/}
                    <div className={"flex-1 bg-blue-100"}>
                        <p>ABOOT</p>
                        <img
                            src={"/bwh_bg.jpg"}
                            alt={"BwH Background"}
                            className={"h-86 w-full object-cover"}
                        />
                    </div>

                    {/*blue seperator*/}
                    <div className={"flex-1 bg-blue-100 p-8"}/>

                    {/*student cards*/}
                    <div className={"flex flex-wrap justify-center p-8"}>
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                    </div>
                    <div className={"flex-1 bg-red-100 p-8"}>
                        <p>HOSPITAL THANK YOU</p>
                    </div>


                </div>
            </div>
        </Layout>
    );
}
import React from "react";
import Layout from "../components/Layout";


import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"

type teamProps = {
    name: string,
    position: string,
    path: string
}


const mattAlexProps = {
    name: "Matthew Alex",
    position: "Lead Engineer, Front End Dev",
    path: "/headshots/malex.jpg"
}

const bobbyProps = {
    name: "Robert Branchaud",
    position: "Scrum Master, Algos Dev",
    path: "/public/headshots/rbranchaud.jpg"
}

const tinaProps = {
    name: "Tina Cheng",
    position: "Back End Dev",
    path: "/public/headshots/tcheng.jpg"
}

const brandonProps = {
    name: "Brandon Contardi",
    position: "Front End Dev",
    path: "/public/headshots/bcontardi.jpg"
}

const christianProps = {
    name: "Christian Dell'Anno",
    position: "Assistant Lead, Front End Dev",
    path: "/public/headshots/cdellanno.jpg"
}

const sahanaProps = {
    name: "Sahana Gokulakrishnan",
    position: "Product Owner, Front End Dev",
    path: "/public/headshots/sgokulakrishnan.jpg"
}

const maxProps = {
    name: "Max Inman",
    position: "Documentation, Algorithms Dev",
    path: "/public/headshots/minman.jpg"
}

const madhavProps = {
    name: "Madhav Lodha",
    position: "Assistant Lead, Back End Dev",
    path: "/public/headshots/mlodha.jpg"
}

const mattNickersonProps = {
    name: "Matt Nickerson",
    position: "Assistant Lead, Front End Dev",
    path: "/public/headshots/mnickerson.jpg"
}

const kaylieProps = {
    name: "Kaylie Quach",
    position: "Back End Dev",
    path: "/public/headshots/kquach.jpg"
}

const willProps = {
    name: "William Schieffer",
    position: "Product Manager, Front End Dev",
    path: "public/headshots/wschieffer.jpg"
}



function TeamCard(props: teamProps){
    return (
        <div className={"p-4"}>
            <Card className={"w-70 pb-1"}>
                <CardHeader className={"justify-items-center"}>
                    <img
                        src={props.path}
                        alt={props.name + " Headshot"}
                        className={"h-54 w-full object-cover rounded-xl drop-shadow-xl/20"}
                    />
                    <CardTitle className={"flex-1"}>
                        {props.name}
                    </CardTitle>
                    <CardDescription className={"text-center italic"}>
                        <p>{props.position}</p>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>

    )
}

function WPICard(){
    return(
        <div className={"p-8 drop-shadow-xl/20"}>
        <Card className={"p-4 w-120"}>
            <div className={"p-4 text-center"}>
                <p>
                    This project is strictly for educational purposes, created by
                    a team of students from <strong> Worcester Polytechnic Institute </strong> in the class
                    <strong> CS3733-D25 Software Engineering</strong>.
                </p>
                <br/>
                <p>
                    This project was created with the guidance of <strong>Professor Wilson Wong </strong>
                    with much assistance from out team coach <strong>Ian Wright</strong>.
                </p>
            </div>
        </Card>
    </div>
    )
}

function ThanksCard() {
    return (
        <div className={"p-8 drop-shadow-xl/20"}>
            <Card className={"p-4 w-120"}>
                <div className={"p-4 text-center"}>
                    <p>
                        We would like to extend our sincere thanks to <strong>Brigham and Women’s Hospital</strong> for their support and collaboration on this project.
                    </p>
                    <br />
                    <p>
                        Special thanks to the representative, <strong>Andrew Shinn</strong>, for working with WPI to give us students a change to work on real-world applications.
                    </p>
                </div>
            </Card>
        </div>
    );
}



export default function About() {
    return (
        <Layout>
            <div className={"container max-w-full pt-8"}>
                <div className={"flex-col"}>

                    {/* About header */}
                    <div className={"bg-[url(/bwh_bg.jpg)] bg-cover bg-center p-16"}>
                        <h1 className={"w-fit mx-auto text-white text-5xl font-bold p-6 rounded text-shadow-lg/30"}>
                            About This Website
                        </h1>
                    </div>


                    {/*student cards*/}
                    <div className={"flex flex-wrap justify-center p-8"}>
                        <TeamCard {...mattAlexProps}/>
                        <TeamCard {...bobbyProps}/>
                        <TeamCard {...tinaProps}/>
                        <TeamCard {...brandonProps}/>
                        <TeamCard {...christianProps}/>
                        <TeamCard {...sahanaProps}/>
                        <TeamCard {...maxProps}/>
                        <TeamCard {...madhavProps}/>
                        <TeamCard {...mattNickersonProps}/>
                        <TeamCard {...kaylieProps}/>
                        <TeamCard {...willProps}/>

                    </div>


                    {/*/!*blue seperator*!/*/}
                    <div className={"flex-1 bg-primary p-8"}>
                    </div>

                    <div className={"bg-[url(/wpi_bg.jpg)] bg-cover bg-center p-16"}>
                        <div className={"flex flex-wrap justify-center p-8"}>

                            <WPICard>
                            </WPICard>

                            <ThanksCard>
                            </ThanksCard>
                        </div>

                    </div>







                    <div className={"flex-1 bg-red-100 p-8 justify-center"}>
                        <p className={"w-fit mx-auto text-center"}><strong>The Brigham & Women’s Hospital maps and data used in this application are
                            copyrighted and provided for the sole use of educational purposes.</strong> </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
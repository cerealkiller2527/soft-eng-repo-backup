import React from "react";
import Layout from "../components/Layout";


import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"

type teamProps = {
    name: string,
    position: string,
    path: string,
    quote: string
}


const mattAlexProps = {
    name: "Matthew Alex",
    position: "Lead Engineer, Front End Dev",
    path: "/headshots/malex.jpg",
    quote: "\"Believe you can and you're halfway there.\"\n" +
        "- Theodore Roosevelt"
}

const bobbyProps = {
    name: "Robert Branchaud",
    position: "Scrum Master, Algos Dev",
    path: "/public/headshots/rbranchaud.jpg",
    quote: " \"If you only do what you can do, you'll never be more than who you are.\" - Master Shifu, Kung Fu Panda 3"
}

const tinaProps = {
    name: "Tina Cheng",
    position: "Back End Dev",
    path: "/public/headshots/tcheng.jpg",
    quote: "\"Start where you are. Use what you have. Do what you can.\"\n" +
        "- Arthur Ashe"
}

const brandonProps = {
    name: "Brandon Contardi",
    position: "Front End Dev",
    path: "/public/headshots/bcontardi.jpg",
    quote:"\"Real G's move in silence like lasagna.\" - Lil Wayne\n"
}

const christianProps = {
    name: "Christian Dell'Anno",
    position: "Assistant Lead, Front End Dev",
    path: "/public/headshots/cdellanno.jpg",
    quote:" \"All you need is love. But a little chocolate now and then doesn't hurt.\" - Charles M. Schulz"
}

const sahanaProps = {
    name: "Sahana Gokulakrishnan",
    position: "Product Owner, Front End Dev",
    path: "/public/headshots/sgokulakrishnan.jpg",
    quote: "\"Hakuna Matata! It means no worries for the rest of your days.\"\n" +
        "- Timon & Pumbaa, The Lion King"
}

const maxProps = {
    name: "Max Inman",
    position: "Documentation, Algorithms Dev",
    path: "/public/headshots/minman.jpg",
    quote:"“It it what it is. Make the most of it.”- Grandpa\n",

}

const madhavProps = {
    name: "Madhav Lodha",
    position: "Assistant Lead, Back End Dev",
    path: "/public/headshots/mlodha.jpg",
    quote:"\"Everything you’ve ever wanted is on the other side of fear.\"\n" +
        "— George Addair"
}

const mattNickersonProps = {
    name: "Matt Nickerson",
    position: "Assistant Lead, Front End Dev",
    path: "/public/headshots/mnickerson.jpg",
    quote:"\"I Don't Even Have Any Good Skills. You Know, Like Nunchuck Skills, Bow Hunting Skills, Computer Hacking Skills.\" - Napoleon Dynamite"
}

const kaylieProps = {
    name: "Kaylie Quach",
    position: "Back End Dev",
    path: "/public/headshots/kquach.jpg",
    quote:" \"The gentleness that comes, not from the absence of violence, but despite the abundance of it.\" - Richard Siken"

}

const willProps = {
    name: "William Schieffer",
    position: "Product Manager, Front End Dev",
    path: "public/headshots/wschieffer.jpg",
    quote:"\"I swear I'm not commit farming I'm just stupid\" - Green Goblins"
}



function TeamCard(props: teamProps) {
    return (
        <div className="p-4 w-72 h-96 group" style={{ perspective: "1000px" }}>
            <div
                className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                style={{
                    transformStyle: "preserve-3d",
                }}
            >

                <div
                    className="absolute w-full h-full rounded-xl overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                >
                    <Card className="w-full h-full pb-1">
                        <CardHeader className="justify-items-center p-0">
                            <img
                                src={props.path}
                                alt={props.name + " Headshot"}
                                className="h-64 w-full object-cover rounded-t-xl"
                            />
                            <CardTitle className="text-center mt-2">{props.name}</CardTitle>
                            <CardDescription className="text-center italic">
                                {props.position}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>


                <div
                    className="absolute w-full h-full rounded-xl overflow-hidden flex items-center justify-center text-white text-center"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                    }}
                >

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${props.path})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(8px) brightness(60%)" ,

                        }}
                    />

                    <div className="z-20 p-4">
                        <p className="text-lg italic text-bold max-w-[90%] text-white drop-shadow-xl">{props.quote}</p>
                    </div>
                </div>
            </div>
        </div>
    );
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
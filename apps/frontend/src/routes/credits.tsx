import React from "react";
import Layout from "../components/Layout";

type CreditCardProps = {
    title: string;
    description: string;
    link: string;
    linkText: string;
};

function CreditCard({ title, description, link, linkText }: CreditCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="mb-4">{description}</p>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#004170] hover:underline"
            >
                {linkText}
            </a>
        </div>
    );
}

const technologies = [
    { title: "React", description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.", link: "https://reactjs.org/", linkText: "Visit React" },
    { title: "Express", description: "A web framework for Node.js that simplifies building web applications and APIs.", link: "https://expressjs.com/", linkText: "Visit Express" },
    { title: "PostgreSQL", description: "A powerful open-source object-relational database system with strong SQL compliance.", link: "https://www.postgresql.org/", linkText: "Visit PostgreSQL" },
    { title: "Node.js", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.", link: "https://nodejs.org/", linkText: "Visit Node.js" },
    { title: "Tailwind CSS", description: "A utility-first CSS framework for creating custom designs without writing any CSS.", link: "https://tailwindcss.com/", linkText: "Visit Tailwind CSS" },
    { title: "Clerk", description: "Authentication and user management for modern web apps.", link: "https://clerk.dev/", linkText: "Visit Clerk" },
    { title: "Heroicons", description: "A set of free, open-source SVG icons for your web projects, made by the creators of Tailwind CSS.", link: "https://heroicons.com/", linkText: "Visit Heroicons" },
    { title: "Shadcn UI", description: "Beautifully designed components built with Tailwind CSS, ready to customize.", link: "https://ui.shadcn.dev/", linkText: "Visit Shadcn UI" },
    { title: "tRPC", description: "End-to-end typesafe APIs without needing to manually define types.", link: "https://trpc.io/", linkText: "Visit tRPC" },
    { title: "PapaParse", description: "Powerful CSV parsing in-browser or Node.js. Handles big data efficiently.", link: "https://www.papaparse.com/", linkText: "Visit PapaParse" },
    { title: "Dotenv", description: "Loads environment variables from a `.env` file into `process.env`.", link: "https://dotenv.org/", linkText: "Visit Dotenv" },
    { title: "Prisma", description: "Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, SQLite and more.", link: "https://www.prisma.io/", linkText: "Visit Prisma" },
    { title: "Pnpify", description: "Part of Yarn Plug'n'Play, allows non-PnP compatible tools to work with PnP projects.", link: "https://yarnpkg.com/advanced/pnpify", linkText: "Visit Pnpify" },
    { title: "TypeScript", description: "Strongly typed programming language that builds on JavaScript.", link: "https://www.typescriptlang.org/", linkText: "Visit TypeScript" },
    { title: "Radix UI", description: "Unstyled, accessible UI primitives for building high-quality design systems.", link: "https://www.radix-ui.com/", linkText: "Visit Radix UI" },
    { title: "Google Maps", description: "Powerful, customizable maps APIs for web and mobile apps.", link: "https://developers.google.com/maps", linkText: "Visit Google Maps" },
    { title: "Zod", description: "TypeScript-first schema validation with static type inference.", link: "https://zod.dev/", linkText: "Visit Zod" },
    { title: "Vitest", description: "A blazing fast unit test framework powered by Vite.", link: "https://vitest.dev/", linkText: "Visit Vitest" },
    { title: "Yarn", description: "A fast, reliable, and secure package manager for JavaScript.", link: "https://yarnpkg.com/", linkText: "Visit Yarn" },
    { title: "Auth0", description: "Flexible, secure authentication and authorization platform.", link: "https://auth0.com/", linkText: "Visit Auth0" },
    { title: "Sonner", description: "An opinionated toast notification library for React.", link: "https://sonner.emilkowal.ski/", linkText: "Visit Sonner" },
    { title: "Tanstack", description: "Powerful, headless utilities for building tables, virtual lists, forms, queries, and routers in React.", link: "https://tanstack.com/", linkText: "Visit Tanstack" },
];

export default function Credits() {
    return (
        <Layout>
            <div className="container mx-auto p-8 pt-16">
                <h1 className="text-3xl font-bold mb-6">Credits</h1>

                <div className="bg-[#AEC8E0] p-4 rounded-md shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold">PERN Stack</h2>
                    <p className="mt-2 text-lg">
                        This application was built using the <strong>PERN stack</strong>, which stands for:
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li><strong>PostgreSQL</strong> - A powerful, open-source relational database.</li>
                        <li><strong>Express</strong> - A minimal and flexible Node.js web application framework.</li>
                        <li><strong>React</strong> - A JavaScript library for building user interfaces.</li>
                        <li><strong>Node.js</strong> - A JavaScript runtime environment for executing JavaScript code server-side.</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Software Libraries & Frameworks</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {technologies.map((tech, index) => (
                        <CreditCard
                            key={index}
                            title={tech.title}
                            description={tech.description}
                            link={tech.link}
                            linkText={tech.linkText}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

import React from "react";

export default function Credits() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Credits</h1>

            <div className="bg-gray-200 p-4 rounded-md shadow-lg mb-6">
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
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">React</h3>
                    <p className="mb-4">
                        A declarative, efficient, and flexible JavaScript library for building user interfaces.
                    </p>
                    <a
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit React
                    </a>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Express</h3>
                    <p className="mb-4">
                        A web framework for Node.js that simplifies building web applications and APIs.
                    </p>
                    <a
                        href="https://expressjs.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Express
                    </a>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">PostgreSQL</h3>
                    <p className="mb-4">
                        A powerful open-source object-relational database system with strong SQL compliance.
                    </p>
                    <a
                        href="https://www.postgresql.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit PostgreSQL
                    </a>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Node.js</h3>
                    <p className="mb-4">
                        A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.
                    </p>
                    <a
                        href="https://nodejs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Node.js
                    </a>
                </div>

                {/* Card 5 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
                    <p className="mb-4">
                        A utility-first CSS framework for creating custom designs without writing any CSS.
                    </p>
                    <a
                        href="https://tailwindcss.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Tailwind CSS
                    </a>
                </div>

                {/* Card 6 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Clerk</h3>
                    <p className="mb-4">
                        Clerk provides authentication and user management for modern web apps.
                    </p>
                    <a
                        href="https://clerk.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Clerk
                    </a>
                </div>

                {/* Card 7 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Heroicons</h3>
                    <p className="mb-4">
                        A set of free, open-source SVG icons for your web projects, made by the creators of Tailwind CSS.
                    </p>
                    <a
                        href="https://heroicons.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Heroicons
                    </a>
                </div>

            </div>
        </div>
    );
}

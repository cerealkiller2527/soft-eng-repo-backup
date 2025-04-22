import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Landing: React.FC = () => {
    // Images array
    const images = [
        '/HeroImageGirlSolo2.jpg',
        '/HeroImageFaulkner.jpg',
        '/HeroPatriotImage.jpg',
        '/HeroImageChestnutHill.jpeg'
    ];

    // State for image rotation
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // State for disclaimer visibility
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, isHovering]);

    return (
        <section className="relative bg-[#f2f2f2]">
            {showDisclaimer && (
                <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 max-w-md duration-500">
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>This web application is strictly a CS3733-D25 Software Engineering class project for Prof. Wilson Wong at WPI</span>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                        >
                            X
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            <section
                className="relative h-[90vh] w-full overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Image Carousel with Blue Overlay */}
                <div className="absolute inset-0 z-0">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div
                                className="w-full h-full bg-blue-300 bg-opacity-100 bg-blend-multiply"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
                        Welcome to Brigham and Women's Hospital
                    </h1>
                    <p className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl drop-shadow-md">
                        Get lost in our accessible navigation
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            to="/login"
                            className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-black transition-all hover:bg-gray-100 hover:shadow-lg"
                        >
                            Login
                        </Link>
                        <Link
                            to="/FloorPlan"
                            className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:shadow-lg"
                        >
                            Navigation
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative z-20 px-4 -mt-20">

                <div className="absolute inset-x-0 top-0 h-full w-full max-w-6xl mx-auto">
                    <div className="h-full bg-[#f2f2f2] rounded-lg p-6 backdrop-blur-sm">
                        <p className="text-center text-xl text-black pt-5">
                            More About Our Webpage
                        </p>
                    </div>
                </div>

                <div className="relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto pt-25">
                    <a href="/FloorPlan">
                    <Card className="bg-white shadow-lg flex flex-col h-full pb-0
                                    hover:outline-solid hover:outline-[#012D5A] hover:outline-5">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-center text-lg">
                                Intuitive Navigation Systems for Visitors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-lg px-6 flex-grow">
                            Our webpage offers visitors and employees alike swift
                            navigation to any of our supported hospitals! Whether it
                            be by car, bus, or even walking, we have an easy way to get you here!
                        </CardContent>
                        {/* I would rather use CardFooter, but just inserting it here seems to remove the bottom gap*/}
                        <div className="mt-auto w-full h-60 overflow-hidden rounded-b-lg">
                        <img
                            src="/FreeNaviHero.jpg"
                            alt="Navigation Image"
                            className="w-full h-full object-cover"
                        />
                        </div>
                    </Card>
                    </a>
                    <a href="/directory">
                        <Card className="bg-white shadow-lg flex flex-col h-full pb-0
                                    hover:outline-solid hover:outline-[#012D5A] hover:outline-5">
                            <CardHeader>
                                <CardTitle className="text-center text-lg">
                                    Comprehensive Directory Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-lg px-6 flex-grow">
                                Need specific information on a department you need to visit? Our directory page
                                offers a comprehensive breakdown of everything you could want to know, from the building,
                                floor, and suite, to the phone number and specialties.
                            </CardContent>
                            {/* I would rather use CardFooter, but just inserting it here seems to remove the bottom gap*/}
                            <div className="mt-auto w-full h-60 overflow-hidden rounded-b-lg">
                                <img
                                    src="/FreeAdminHero.jpg"
                                    alt="Service Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Card>
                    </a>
                    <a href="/login">
                        <Card className="bg-white shadow-lg flex flex-col h-full pb-0
                                    hover:outline-solid hover:outline-[#012D5A] hover:outline-5">
                            <CardHeader>
                                <CardTitle className="text-center text-lg">
                                    Quick Service Request Forms for Employees
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-lg px-6 flex-grow">
                                Need a translator? How about some specialized equipment? Maybe a ride
                                between Hospitals? Our service request forms allow for employees to
                                quickly request all that and more, seamlessly within the webpage.
                                Just make sure to login first!
                            </CardContent>
                            {/* I would rather use CardFooter, but just inserting it here seems to remove the bottom gap*/}
                            <div className="mt-auto w-full h-60 overflow-hidden rounded-b-lg">
                                <img
                                    src="/FreeServiceHero.jpg"
                                    alt="Service Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Card>
                    </a>
                </div>

                <div className="h-32 bg-[#f2f2f2]"></div>
            </section>
        </section>
    );
};

export default Landing;
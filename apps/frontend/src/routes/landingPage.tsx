import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

    // Auto-hide disclaimer after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDisclaimer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative bg-[#f2f2f2]">
            {showDisclaimer && (
                <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 duration-300 max-w-md w-[calc(100%-2rem)]">
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
                    <Card className="h-142 bg-white shadow-lg flex flex-col">
                        <CardTitle className="text-center text-lg px-6">
                            Intuitive Navigation Systems for Visitors
                        </CardTitle>
                        <CardContent className="text-lg px-6">
                            Our webpage offers visitors and employees alike swift
                            navigation to any of our supported hospitals! Whether it
                            be by car, bus, or even walking, we have an easy way to get you here!
                        </CardContent>
                        <CardFooter className="mt-auto w-full text-center py-2">
                        </CardFooter>
                    </Card>
                    <Card className="h-142 bg-white shadow-lg flex flex-col">
                        <CardTitle className="text-center text-lg px-6">
                            Quick Service Request Forms for Employees
                        </CardTitle>
                        <CardContent className="text-lg px-6">
                            Need a translator? How about some specialized equipment? Maybe a ride
                            between Hospitals? Our service request forms allow for employees to
                            quickly request all that and more, seamlessly within the webpage.
                        </CardContent>
                        <CardFooter className="mt-auto w-full text-center py-2">
                        </CardFooter>
                    </Card>
                    <Card className="h-142 bg-white shadow-lg flex flex-col">
                        <CardTitle className="text-center text-lg px-6">
                            In-Depth Map Editor for Admins
                        </CardTitle>
                        <CardContent className="text-lg px-6">
                            In addition to all it's regular functionalities, our webpage offers
                            some specialized features to admins. In the unlikely event that our navigation
                            runs into an error, Admins are able to directly add nodes to the map.
                        </CardContent>
                        <CardFooter className="mt-auto w-full text-center py-2">
                        </CardFooter>
                    </Card>
                </div>

                <div className="h-32 bg-[#f2f2f2]"></div>
            </section>
        </section>
    );
};

export default Landing;
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
                        Never get lost with our navigation systems
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
                    <div className="h-full bg- rounded-lg p-6 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto pt-6">
                    <Card className="h-142 bg-white shadow-lg">
                        <CardTitle className="text-center">
                            Test card 1
                        </CardTitle>
                        <CardContent className="text-lg">
                            This text should be large!
                        </CardContent>
                    </Card>
                    <Card className="h-96 bg-white shadow-lg">
                        <CardTitle className="text-center">
                            Test card 2
                        </CardTitle>
                        <CardContent className="text-md">
                            This text should be medium!
                        </CardContent>
                    </Card>
                    <Card className="h-48 bg-white shadow-lg">
                        <CardTitle className="text-center">
                            Test card 3
                        </CardTitle>
                        <CardContent className="text-sm">
                            This text should be small!
                        </CardContent>
                    </Card>
                </div>

                {/* OK, I know this is kinda scuffed butttt I don't have a better spacer */}
                <div className="h-32 bg-[#f2f2f2]"></div>
            </section>
        </section>
    );
};

export default Landing;
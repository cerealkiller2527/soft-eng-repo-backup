import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
    // Images array (you can add as many as you want, code should support it)
    const images = [
        '/HeroImageGirlSolo2.jpg',
        '/HeroImageFaulkner.jpg',
        '/HeroPatriotImage.jpg',
        '/HeroImageChestnutHill.jpeg'
    ];

    // Useful for rotation logic
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, isHovering]);

    // Handle dot navigation
    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden"
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
                <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                    Welcome to Brigham and Women's Hospital
                </h1>
                <p className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl">
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

            {/* Indicator Dots */}
            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex // Logic for switching indicator color
                                ? 'bg-white'
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Landing;
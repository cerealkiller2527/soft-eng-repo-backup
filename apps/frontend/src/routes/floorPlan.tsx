import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import LocationRequestForm from '../components/locationRequestForm.tsx';

const FloorPlan = () => {
    const trpc = useTRPC();
    const [showMap, setShowMap] = useState(false);
    const [originLocation, setOriginLocation] = useState<{ lat: number; lng: number } | null>(null); // Default to null
    const [destination, setDestination] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map>();
    const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
    const [pathCoords, setPathCoords] = useState([
        { x: 275, y: 450 },
        // Initial coords
    ]);



    const toggleView = () => {
        setShowMap((prev) => {
            if (!prev && mapInstance.current) {
                setTimeout(() => {
                    google.maps.event.trigger(mapInstance.current!, 'resize');
                    mapInstance.current!.setCenter({ lat: 42.326259, lng: -71.149766 });
                }, 50);
            }
            return !prev;
        });
    };


    const search = useMutation(
        trpc.search.getPath.mutationOptions({
            onSuccess: (data) => {
                console.log("HIT HERE");
                const formattedCoords = data.map(([x, y]) => ({ x, y }));
                setPathCoords(formattedCoords);
                console.log(formattedCoords);

            },
            onError: (error) => {
                console.error('Username or password is incorrect!', error);
                alert("Username or password is incorrect!");
            },
        })
    );

    useEffect(() => {
        if (destination) {
            search.mutate({
                startDesc: '1bottom entrance',
                endDesc: 'reception',
            });
        }
    }, [destination]);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = new google.maps.Map(mapRef.current, {
                center: { lat: 42.326259328131265, lng: -71.14976692050537 },
                zoom: 16,
                disableDefaultUI: true,
                streetViewControl: false,
            });

            directionsRenderer.current = new google.maps.DirectionsRenderer();
            directionsRenderer.current.setMap(mapInstance.current);
        }
    }, []);


    //useEffect for rerouting maps
    useEffect(() => {
        console.log('Updated originLocation:', originLocation); // Log whenever originLocation changes
        const travelMode = google.maps.TravelMode.DRIVE || 'DRIVING';
        if (originLocation && mapInstance.current && directionsRenderer.current) {
            const directionsService = new google.maps.DirectionsService();
            console.log(originLocation)
            directionsService.route(
                {
                    origin: originLocation,
                    destination: { lat: 42.326259328131265, lng: -71.14976692050537 }, // Fixed destination for now
                    travelMode: travelMode,
                },
                (result, status) => {
                    console.log(status);
                    if (status === 'OK') {
                        console.log('OK')
                        directionsRenderer.current.setDirections(result);
                    }
                }
            );
        }
    }, [originLocation]);



    useEffect(() => {
        if (showMap) return;

        const canvas = document.getElementById('overlay-canvas') as HTMLCanvasElement;
        const image = document.getElementById('floor-image') as HTMLImageElement;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;



        const dashPattern = [10, 6];
        const drawSpeed = 10;
        let drawProgress = 0;
        let dashOffset = 0;

        const drawCircles = () => {
            if (pathCoords.length === 0) return; // Optional: avoid errors if array is empty

            const lastPoint = pathCoords[pathCoords.length - 1];

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(lastPoint.x, lastPoint.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        };

        const getPathLength = (points: { x: number; y: number }[]) => {
            let length = 0;
            for (let i = 1; i < points.length; i++) {
                const dx = points[i].x - points[i - 1].x;
                const dy = points[i].y - points[i - 1].y;
                length += Math.sqrt(dx * dx + dy * dy);
            }
            return length;
        };

        const totalLength = getPathLength(pathCoords);

        const resizeCanvas = () => {
            canvas.width = image.clientWidth;
            canvas.height = image.clientHeight;
        };

        const drawSegmentedPath = (lengthToDraw: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.setLineDash(dashPattern);
            ctx.lineDashOffset = 0;

            ctx.beginPath();
            let lengthDrawn = 0;
            ctx.moveTo(pathCoords[0].x, pathCoords[0].y);

            for (let i = 1; i < pathCoords.length; i++) {
                const start = pathCoords[i - 1];
                const end = pathCoords[i];
                const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);

                if (lengthDrawn + segmentLength > lengthToDraw) {
                    const t = (lengthToDraw - lengthDrawn) / segmentLength;
                    const currentX = start.x + (end.x - start.x) * t;
                    const currentY = start.y + (end.y - start.y) * t;
                    ctx.lineTo(currentX, currentY);
                    break;
                } else {
                    ctx.lineTo(end.x, end.y);
                    lengthDrawn += segmentLength;
                }
            }

            ctx.stroke();
            drawCircles();
        };

        const drawFlowingPath = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.setLineDash(dashPattern);
            ctx.lineDashOffset = -dashOffset;

            ctx.beginPath();
            ctx.moveTo(pathCoords[0].x, pathCoords[0].y);
            for (let i = 1; i < pathCoords.length; i++) {
                ctx.lineTo(pathCoords[i].x, pathCoords[i].y);
            }
            ctx.stroke();
            drawCircles();
        };

        const animate = () => {
            if (drawProgress < totalLength) {
                drawSegmentedPath(drawProgress);
                drawProgress += drawSpeed;
            } else {
                drawFlowingPath();
                dashOffset += 0.1;
            }
            requestAnimationFrame(animate);
        };

        const startDrawing = () => {
            resizeCanvas();
            animate();
            window.addEventListener('resize', resizeCanvas);
        };

        if (image.complete) {
            startDrawing();
        } else {
            image.onload = startDrawing;
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [pathCoords]);

    return (
        <div id="floorplan" className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-start mb-2">
                <img
                    src="/BrighamAndWomensLogo.png"
                    alt="Brigham and Women's Hospital Logo"
                    className="h-12 ml-2"
                />
            </div>

            <Navbar />

            <div className="flex justify-center items-start bg-white shadow-xl rounded-lg p-2 mt-2">
                {/* Floor Plan */}
                <LocationRequestForm
                    onSubmit={(origin, destination) => {
                        setOriginLocation(origin);
                        setDestination(destination);
                        // You can also save it in state if needed
                    }}
                />                <div style={{ display: showMap ? 'none' : 'flex' }}>
                <div id="floorplan-map" className="p-4 relative">
                    <img
                        id="floor-image"
                        src="/chestnutHillCombined.png"
                        alt="Floor plan"
                        className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    />
                    <canvas
                        id="overlay-canvas"
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                </div>
            </div>

                {/* Google Map (always rendered) */}
                <div
                    id="google-map-container"
                    className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    ref={mapRef}
                    style={{
                        width: '100%',
                        height: '600px',
                        display: showMap ? 'block' : 'none',
                    }}
                />

                <div className="mb-4 flex justify-center">
                    <button
                        onClick={toggleView}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                    >
                        {showMap ? 'Show Floor Plan' : 'Show Google Map'}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default FloorPlan;

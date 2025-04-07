import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import {useRef , useEffect } from 'react';
import Navbar from "../components/Navbar.tsx";

const FloorPlan = () => {

    const pathCoords = [
        { x: 50, y: 250 },
        { x: 200, y: 250 },
        { x: 200, y: 375 },
        { x: 400, y: 320 },
    ];

    useEffect(() => {
        const canvas = document.getElementById("overlay-canvas") as HTMLCanvasElement;
        const image = document.getElementById("floor-image") as HTMLImageElement;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = image.clientWidth;
            canvas.height = image.clientHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Helper to get total path length
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
        const dashPattern = [10, 6];
        let drawProgress = 0;
        let dashOffset = 0;
        const drawSpeed = 3;

        const drawSegmentedPath = (lengthToDraw: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "red";
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
        };

        const drawFlowingPath = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.setLineDash(dashPattern);
            ctx.lineDashOffset = -dashOffset;

            ctx.beginPath();
            ctx.moveTo(pathCoords[0].x, pathCoords[0].y);
            for (let i = 1; i < pathCoords.length; i++) {
                ctx.lineTo(pathCoords[i].x, pathCoords[i].y);
            }
            ctx.stroke();
        };

        const animate = () => {
            if (drawProgress < totalLength) {
                drawSegmentedPath(drawProgress);
                drawProgress += drawSpeed;
            } else {
                drawFlowingPath();
                dashOffset += .1; // Speed of flowing motion
            }
            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const drawLines = (canvas: HTMLCanvasElement, points: { x: number; y: number }[]) => {
        const ctx = canvas.getContext("2d");
        if (!ctx || points.length < 2) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.beginPath();

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.stroke();
    };


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

                <div id="mapkey" className="p-4 w-52 border-gray-300">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Key</h2>
                    <ul className="list-none space-y-2 text-gray-700">
                        <li className={"flex items-center gap-2"}>
                            <img src={"/entrance-icon.svg"} alt="entrance icon" className={"h-5 w-5"} />
                            Entrance
                            <input type={"checkbox"} className={"w-4 h-4 accent-blue-600"} />
                        </li>
                        <li className={"flex items-center gap-2"}>
                            <img src={"/info-icon.svg"} alt="information desk icon" className={"h-5 w-5"}/>
                            Information Desk
                            <input type={"checkbox"} className={"w-4 h-4 accent-blue-600"} />
                        </li>
                        <li className={"flex items-center gap-2"}>
                            <img src={"/restroom-icon.svg"} alt="restroom icon" className={"h-5 w-5"}/>
                            Restroom
                            <input type={"checkbox"} className={"w-4 h-4 accent-blue-600"} />
                        </li>
                        <li className={"flex items-center gap-2"}>
                            <img src={"/elevator-icon.svg"} alt="elevator icon" className={"h-5 w-5"}/>
                            Elevator
                            <input type={"checkbox"} className={"w-4 h-4 accent-blue-600"} />
                        </li>
                        <li className={"flex items-center gap-2"}>
                            <img src={"/stairs-icon.svg"} alt="staircase icon" className={"h-5 w-5"}/>
                            Staircase
                            <input type={"checkbox"} className={"w-4 h-4 accent-blue-600"} />
                        </li>
                    </ul>
                </div>


                <div id="map" className="p-4 relative">
                    <img
                        id="floor-image"
                        src="/ChestnutHillFloor1.png"
                        alt="Placeholder floor plan"
                        className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    />
                    <canvas
                        id="overlay-canvas"
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                </div>

            </div>
        </div>
    );
};


export default FloorPlan;

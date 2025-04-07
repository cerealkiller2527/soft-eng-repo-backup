import React from 'react';
import axios from 'axios';
import {useRef , useEffect } from 'react';
import Navbar from "../components/Navbar.tsx";

const FloorPlan = () => {
    /*
    const [pathCoords, setPathCoords] = useState<{ x: number; y: number }[]>([]);


    useEffect(() => {
        axios.get('/api/pathcoords')
            .then((response) => {
                setPathCoords(response.data);
            })
            .catch((error) => {
                console.error('Error fetching path coordinates:', error);
            });
    }, []); //
    */

    useEffect(() => {
        const canvas = document.getElementById("overlay-canvas") as HTMLCanvasElement;
        const image = document.getElementById("floor-image") as HTMLImageElement;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;



        const pathCoords = [
            { x: 100, y: 227 }, //leftEntranceOutside, connects to leftEntrance
            { x: 190, y: 227 }, //leftEntrance, connects to leftEntranceOutside, hallwayAFloor1, hallwayCFloor1
            { x: 190, y: 130 }, //hallwayAFloor1, connects to leftEntranceOutside, hallwayBFloor1
            { x: 272, y: 130 }, //hallwayBFloor1, connects to hallwayAFloor1, topStairs
            { x: 272, y: 110 }, //topStairs, connects to hallwayBFloor1
            { x: 272, y: 130 },
            { x: 190, y: 130 },
            { x: 190, y: 227 },
            { x: 190, y: 239 }, //hallwayCFloor1, connects to leftEntrance, hallwayDFloor1
            { x: 163, y: 239 }, //hallwayDFloor1, connects to hallwayCFloor1, hallwayEFloor1
            { x: 163, y: 360 }, //hallwayEFloor1, connects to hallwayDFloor1, hallwayFFloor1
            { x: 275, y: 360 }, //hallwayFFloor1, connects to hallwayGFloor1, bottomEntrance, hallwayEFloor1
            { x: 275, y: 390 }, //bottomEntrance, connects to hallwayFFloor1,
            { x: 275, y: 450 }, //bottonEntranceOutside, connects to bottomEntrance
            { x: 275, y: 390 },
            { x: 275, y: 360 },
            { x: 275, y: 315 }, //hallwayGFloor1, connects to hallwayFFloor1, hallwayHFloor1
            { x: 357, y: 315 }, //hallwayHFloor1, connects to hallwayGFloor1, stairBottomRight, rightEntrance
            { x: 357, y: 300 }, //stairBottomRight, connects to hallwayHFloor1
            { x: 357, y: 315 },
            { x: 400, y: 315 }, //rightEntrance, connects to hallwayHFloor1, rightEntranceOutside
            { x: 450, y: 315 }, //rightEntranceOutside, connects to hallwayHFloor1
        ];



        const dashPattern = [10, 6];
        const drawSpeed = 10;
        let drawProgress = 0;
        let dashOffset = 0;


        //DISPLAYS NODES {DISABLE FOR PROD VERSIONS, ONLY FOR FINDING AND VERIFYING POINTS}
        const drawCircles = () => {
            ctx.fillStyle = "red";
            pathCoords.forEach((point) => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            });
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

            drawCircles();
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
            //comment this line out to hide nodes
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
            window.addEventListener("resize", resizeCanvas);
        };

        // Wait for image to be loaded before drawing
        if (image.complete) {
            startDrawing();
        } else {
            image.onload = () => {
                startDrawing();
            };
        }

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);



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
                        src="/chestnutHillCombined.png"
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

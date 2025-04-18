import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import Navbar from "../components/Navbar.tsx";

const FloorPlan = () => {
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


                <div id="map" className="p-4">
                    <img
                        src="/ChestnutHillFloor1.png"
                        alt="Placeholder floor plan"
                        className="w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};


export default FloorPlan;

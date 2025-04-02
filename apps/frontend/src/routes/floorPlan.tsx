import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import Navbar from "../components/Navbar.tsx";

const FloorPlan = () => {
    return (
        <div id={"floorplan"}>
            <div className={"flex justify-left"}>
                <img src={"/BrighamAndWomensLogo.png"} alt={"Brigham and Women's Hospital Logo"} className={"h-8 ml-2"}/>
            </div>
            <Navbar></Navbar>
            <div className={"flex justify-center items-start gap-8 mt-6"}>
            <div id={"mapkey"} className={"bg-white shadow-lg rounded-lg p-4 my-4 w-64"}>
                <h2 className={"text-xl font-semibold mb-2 text-gray-800"}>Key</h2>
                <ul id={"key"} className={"list-none list-inside space-y-2 text-gray-700"}>
                    <li>Entrance</li>
                    <li>Information Desk</li>
                    <li>Restroom</li>
                    <li>Elevator</li>
                    <li>Staircase</li>
                </ul>
            </div>
            <div id={"map"} className={"flex justify-center"}>
                <img src={"/ChestnutHillFloor1.png"} alt="placeholder floor plan" className={"w-full max-w-xl border-2 border-gray-300 rounded-lg shadow-md"}/>
            </div>
        </div>
        </div>
    );
};



export default FloorPlan;

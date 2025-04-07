import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import Navbar from "../components/Navbar.tsx";


const ServiceRequest = () => {
    return (
        <div className="p-10">

            <div className="flex justify-start mb-2">
                <img
                    src="/BrighamAndWomensLogo.png"
                    alt="Brigham and Women's Hospital Logo"
                    className="h-12 ml-2"
                />
            </div>


            <Navbar />
            <h1 className="font-bold text-xl pb-4">Service Request Page</h1>
            <TransportRequestForm />
        </div>
    );
};

export default ServiceRequest;

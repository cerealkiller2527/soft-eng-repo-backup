import React from 'react';
import ExampleComponent from '../components/ExampleComponent.tsx';
import TransportRequestForm from "../components/TransportRequestForm.tsx";

const ServiceRequest = () => {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Service Request Page</h1>
            <TransportRequestForm />
        </div>
    );
};

export default ServiceRequest;

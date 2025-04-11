import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServiceRequest from './routes/serviceRequest.tsx';
import FloorPlan from './routes/floorPlan.tsx';
import Directory from './routes/directory.tsx';
import Login from './routes/login.tsx';
import RequestDashboard from './routes/requestDashboard.tsx';
import CSVPage from './routes/csv.tsx';

export const routes = [
    {
        path: '/ServiceRequest',
        errorElement: <div />,
        element: <ServiceRequest />,
    },
    {
        path: '/FloorPlan',
        errorElement: <div />,
        element: <FloorPlan />,
    },
    {
        path: '/Directory',
        errorElement: <div />,
        element: <Directory />,
    },
    {
        path: '/',
        errorElement: <div />,
        element: <Login />,
    },
    {
        path: '/:serviceId',
        errorElement: <div />,
        element: <Directory />,
    },
    {
        path: '/requestdashboard',
        errorElement: <div />,
        element: <RequestDashboard />,
    },
    {
        path: '/csv',
        errorElement: <div />,
        element: <CSVPage />,
    },
];

export const router = createBrowserRouter(routes);

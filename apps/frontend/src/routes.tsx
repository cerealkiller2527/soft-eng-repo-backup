import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServiceRequest from './routes/serviceRequest.tsx';
import FloorPlan from './routes/floorPlan.tsx';
import Directory from './routes/directory.tsx';
import Login from './routes/login.tsx';
import RequestDashboard from './routes/requestDashboard.tsx';
import CSVPage from './routes/csv.tsx';
import LandingPage from "./routes/landingPage.tsx";
import MapEditor from "./routes/mapEditor.tsx"
import MapInfoTest from "./routes/mapinfotest.tsx";
import TestDirectory from "./routes/test.tsx";
import DepartmentPage from "./routes/department.tsx";

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
        path: '/Login',
        errorElement: <div />,
        element: <Login />,
    },
    {
        path: '/',
        errorElement: <div />,
        element: <LandingPage />,
    },
    {
        path: '/department/:id',
        errorElement: <div />,
        element: <DepartmentPage />,
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
    {
        path: '/mapeditor',
        errorElement: <div />,
        element: <MapEditor />,
    },
    {
        path: '/mapinfotest',
        errorElement: <div />,
        element: <MapInfoTest />,
    },
    {
        path: '/test',
        errorElement: <div />,
        element: <TestDirectory />,
    },
];

export const router = createBrowserRouter(routes);

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServiceRequest from './routes/serviceRequest.tsx';
import FloorPlan from './routes/floorPlan.tsx';
import Directory from './routes/directory.tsx';
import Login from './routes/login.tsx';
import RequestDashboard from './routes/requestDashboard.tsx';
import CSVPage from './routes/csv.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import {useAuth} from './Context/AuthContext.tsx';
import LandingPage from "./routes/landingPage.tsx";
import MapEditor from "./routes/mapEditor.tsx"
import MapInfoTest from "./routes/mapinfotest.tsx";
import TestDirectory from "./routes/test.tsx";
import DepartmentPage from "./routes/department.tsx";

export const routes = [
    {
        path: '/Login',
        errorElement: <div/>,
        element: <Login/>,
    },

    {
        path: '/Directory',
        errorElement: <div />,
        element: <Directory />,
    },


    {
        path: '/ServiceRequest',
        errorElement: <div />,
        element: (
            <ProtectedRoute>
            <ServiceRequest />
            </ProtectedRoute>
        ),
    },
    {
        path: '/FloorPlan',
        errorElement: <div />,
        element: <FloorPlan />,

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
        element: (
            <ProtectedRoute>
            <RequestDashboard />
            </ProtectedRoute>
),
    },
    {
        path: '/csv',
        errorElement: <div />,
        element: (
            <ProtectedRoute>
            <CSVPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mapeditor',
        errorElement: <div />,
        element: (
            <ProtectedRoute>
                <MapEditor />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mapinfotest',
        errorElement: <div />,
        element: (
                <MapInfoTest />
        ),
    },
    {
        path: '/test',
        errorElement: <div />,
        element: <TestDirectory />,
    },
];

export const router = createBrowserRouter(routes);

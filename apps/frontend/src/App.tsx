import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import {AuthProvider} from './Context/AuthContext.tsx';
import { ClerkProvider } from "@clerk/clerk-react";

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;

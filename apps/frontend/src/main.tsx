import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { TRPCProvider, trpcClient, queryClient } from '../src/database/trpc.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl'; // Mapbox GL JS library
import 'mapbox-gl/dist/mapbox-gl.css'; // Mapbox GL JS styles
import { MAPBOX_WORKER_COUNT } from './lib/constants'; // Worker count configuration

import {AuthProvider} from './Context/AuthContext.tsx';
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Configure Mapbox GL JS worker count for better performance
mapboxgl.workerCount = MAPBOX_WORKER_COUNT;

// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ClerkProvider publishableKey={clerkPublishableKey}>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                    <App />
                </TRPCProvider>
            </QueryClientProvider>
        </AuthProvider>
    </ClerkProvider>
);

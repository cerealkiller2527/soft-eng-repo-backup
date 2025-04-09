import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { TRPCProvider, trpcClient, queryClient } from '../src/database/trpc.ts';
import { QueryClientProvider } from '@tanstack/react-query';

// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                <App />
            </TRPCProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

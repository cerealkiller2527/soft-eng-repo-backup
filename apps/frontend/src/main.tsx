import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { trpc, trpcClient, queryClient } from './database/trpc';
import { QueryClientProvider } from '@tanstack/react-query';

// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <App />
            </trpc.Provider>
        </QueryClientProvider>
    </React.StrictMode>
);

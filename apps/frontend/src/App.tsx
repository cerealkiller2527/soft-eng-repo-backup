import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import {AuthProvider} from './Context/AuthContext.tsx';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
    return (
    <RouterProvider router={router} />


);
}

export default App;

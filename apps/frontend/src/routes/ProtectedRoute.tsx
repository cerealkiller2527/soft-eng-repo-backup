import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


/*
Research about useAuth:
- tells info about the authentication --> like if the user is logged in or not when accessing that particular page.
- example: isAuthenticated would be either true/false depending if they're logged in or not.
* */

type ProtectedRouteProps = {
    children: React.ReactNode;
};

//functional component of protected route
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{from: location}} replace />;
    }

    return children;
};

export default ProtectedRoute;

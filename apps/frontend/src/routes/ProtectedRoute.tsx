import React from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";


/*
Research about useAuth:
- tells info about the authentication --> like if the user is logged in or not when accessing that particular page.
- example: isAuthenticated would be either true/false depending if they're logged in or not.
* */

type ProtectedRouteProps = {
    children: React.ReactNode;
};

interface AdminRouteProps {
    children: React.ReactNode;
}

//functional component of protected route
export const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
    const { isSignedIn, isLoaded } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/Login" state={{from: location}} replace />;
    }

    return children;
};

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if ((user?.publicMetadata?.role) !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};


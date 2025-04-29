import React, { useState, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { Button } from '@/components/ui/button';

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
    const navigate = useNavigate();
    const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false);

    // sends alert for 2.5 seconds
    useEffect(() => {
        if (isLoaded && isSignedIn && user?.publicMetadata?.role !== "admin") {
            setShowUnauthorizedAlert(true);

            const timer = setTimeout(() => {
                navigate("/", { replace: true });
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [isLoaded, isSignedIn, user, navigate]);


    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const role = user?.publicMetadata?.role;

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    if (showUnauthorizedAlert) {
        return (
            <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 max-w-md duration-500">
                <AlertDescription className="flex items-center justify-between gap-4">
                    <span>Unauthorized access. You must be an Admin to view this page.</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setShowUnauthorizedAlert(false);
                            navigate("/", { replace: true });
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                    >
                        X
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    return <>{children}</>;
};


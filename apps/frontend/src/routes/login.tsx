import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { useAuth } from '../Context/AuthContext';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

const Login: React.FC = () => {
    const { setAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const trpc = useTRPC();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [transition, setTransition] = useState(false);

    const from = location.state?.from?.pathname || '/Directory';

    const checkLogin = useMutation(
        trpc.login.checkLogin.mutationOptions({
            onSuccess: (data) => {
                console.log('Login success', data);
                setAuthenticated(true);
                navigate(from);
            },
            onError: (error) => {
                console.error('Username or password is incorrect!', error);
                alert("Username or password is incorrect!");
            },
        })
    );

    const [showDisclaimer, setShowDisclaimer] = useState(true);

    return (
        <div className="h-screen flex">

            {showDisclaimer && (
                <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 max-w-md duration-500">
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>This web application is strictly a CS3733-D25 Software Engineering class project for Prof. Wilson Wong at WPI</span>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                        >
                            X
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            <div className="w-2/3 bg-cover bg-center opacity-90 relative" style={{ backgroundImage: "url('/newImageHero.png')" }}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-4 left-4 w-92 h-auto" />
                <div
                    onMouseEnter={() => setTransition(true)}
                    className={`flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${
                        transition ? "opacity-100 translate-y-1" : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="text-4xl font-bold">Accessing Health Care Made Easy</h1>
                    <p className="text-lg mt-2">Access maps, request services, and more—all in one application now.</p>
                </div>
            </div>


            <div className="w-1/3 flex flex-col justify-center items-center bg-[#F2F2F2] h-screen px-12">
                <div className="w-full max-w-md space-y-4">
                    <h1 className="text-2xl text-gray-800 mb-4 text-center">Sign In</h1>

                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-[#012D5A] focus:ring-[#012D5A]"

                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-[#012D5A] focus:ring-[#012D5A]"

                    />
                    <Button
                        onClick={() => checkLogin.mutate({ username, password })}
                        className="w-full bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                            hover:text-[#012D5A] hover:bg-white
                            hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid"
                    >
                        LOG IN
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;

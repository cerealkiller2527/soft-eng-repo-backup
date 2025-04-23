import  { useState } from "react";
import { useLocation } from "react-router-dom";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTRPC, trpcClient } from '../database/trpc.ts';
import { SignIn } from "@clerk/clerk-react";

const Login: React.FC = () => {

    // const {setAuthenticated} = useAuth();
    const location = useLocation();
    const trpc = useTRPC();
    const [email, setEmail] = useState("");
    const[transition, setTransition] = useState(false);
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/Directory';

    return (
        //dimensions for the hero image: 1152px width 1080px height
        <div className="h-screen flex">
            <div
                className="w-3/5 bg-cover bg-center opacity-90"
                style={{ backgroundImage: "url('/newImageHero.png')" }}
            >
                <img
                    src="/hospitalLogo.png"
                    alt="Hospital Logo"
                    className="absolute top-4 left-4 w-92 h-auto"
                />

                <div
                    onMouseEnter={() => {
                        setTransition(true);
                    }}
                    className={`flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${transition ? 'opacity-100 translate-y-1' : 'opacity-0 translate-y-8 '}`}
                >
                    <h1 className="text-4xl font-bold ">Accessing Health Care Made Easy</h1>
                    <p className="text-lg mt-2 y-0">
                        Access maps, request services, and more—all in one application now.
                    </p>
                </div>
            </div>

            {/* Sign-In / Sign-Up */}
            <div className="w-2/5 flex flex-col justify-center items-center h-screen bg-gray-100 px-12">
                <div>
                    {isSignUp ? (
                        <>
                            <h1 className="text-2xl text-gray-800 mb-4 text-center">
                                Create Account
                            </h1>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                Please enter the below details to sign up.
                            </p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                            />

                            <p className="mt-4 text-sm text-center">
                                Already have an account?{' '}
                                <span
                                    onClick={() => setIsSignUp(false)}
                                    className="text-blue-900 hover:underline cursor-pointer"
                                >
                                    Sign In
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <SignIn
                                forceRedirectUrl="/directory"
                                signUpUrl={null}
                                appearance={{
                                    elements: {
                                        formButtonPrimary:
                                            'bg-blue-900 hover:bg-white hover:text-blue-900',
                                        card: 'shadow-md border border-gray-200 p-6 rounded-md',

                                        footer: 'hidden',
                                        footerAction: 'hidden',
                                        footerActionText: 'hidden',
                                        footerActionLink: 'hidden',
                                    },
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;

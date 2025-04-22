import  { useState } from "react";
import { useLocation } from "react-router-dom";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useTRPC, trpcClient } from '../database/trpc.ts';
import { useSignIn, useSignUp, useAuth } from "@clerk/clerk-react";
import { SignIn, SignInButton } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-js";

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

    // Clerk Auth
    const { isLoaded: signInLoaded, signIn } = useSignIn();
    const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();
    const { getToken } = useAuth();

    const from = location.state?.from?.pathname || '/Directory';

    const handleSignIn = async () => {
        if (!signInLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: username,
                password,
            });

            const sessionId = await signInAttempt.createdSessionId;
            if (!sessionId) throw new Error("No session ID returned.");

            if (typeof window !== 'undefined' && window.Clerk) {
                const sessionToken = await window.Clerk.session?.getToken();
                if (!sessionToken) throw new Error("Failed to get session token.");

                // call backend to verify session
                await trpcClient.login.verifyClerkUser.mutate({
                    sessionId: sessionId,
                    sessionToken: sessionToken,
                });
            } else {
                throw new Error("Clerk is not available.");
            }

            navigate("/Directory");
        } catch (err: unknown) {
            if (isClerkAPIResponseError(err)) {
                alert(err.errors?.[0]?.message ?? "Login failed");
            } else {
                alert("Unknown error during login");
            }
        }
    };

    const handleSignUp = async () => {
        if (!signUpLoaded) return;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const result = await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            alert("Account created! Please check your email for verification.");

            await setActive({ session: result.createdSessionId });

            setIsSignUp(false);
        } catch (err: unknown) {
            if (isClerkAPIResponseError(err)) {
                alert("Signup failed: " + (err.errors?.[0]?.message ?? "Unknown error"));
            } else {
                alert("Signup failed: Unknown error");
            }
        }

    const addUser = useMutation(
        trpc.login.addLogin.mutationOptions({
            onSuccess: (data) => {
                console.log('Add user', data);
                alert("Account created successfully! You can now log in.");
                setIsSignUp(false); // Switch to login form after sign-up
            },
            onError: (error) => {
                console.error('Unable to add user', error);
                alert("Unable to add user! Try again later.");
            }
        })
    )
    };

    return (
    //dimensions for the hero image: 1152px width 1080px height
        <div className="h-screen flex">
            <div className = "w-3/5 bg-cover bg-center opacity-90" style={{backgroundImage:"url('/newImageHero.png')"}}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-4 left-4 w-92 h-auto"/>

                <div onMouseEnter={() => {
                    setTransition(true);
                }} className={`flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${transition? "opacity-100 translate-y-1": "opacity-0 translate-y-8 "}`}>
                    <h1 className="text-4xl font-bold ">Accessing Health Care Made Easy</h1>
                    <p className="text-lg mt-2 y-0">Access maps, request services, and more—all in one application now.</p>
                </div>
            </div>

            {/* Sign-In / Sign-Up */}
            <div className="w-2/5 flex flex-col justify-center items-center h-screen bg-gray-100 px-12">
                <div >
                    {isSignUp ? (
                        <>
                            <h1 className="text-2xl text-gray-800 mb-4 text-center">Create Account</h1>
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


                            <button
                                onClick={handleSignUp}
                                className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"
                            >
                                Sign Up
                            </button>


                            <p className="mt-4 text-sm text-center">
                                Already have an account?{" "}
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
                            <h1 className="text-2xl text-gray-800 mb-4 text-center">Sign In</h1>

                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Username"*/}
                            {/*    value={username}*/}
                            {/*    onChange={(e) => setUsername(e.target.value)}*/}
                            {/*    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    type="password"*/}
                            {/*    placeholder="Password"*/}
                            {/*    value={password}*/}
                            {/*    onChange={(e) => setPassword(e.target.value)}*/}
                            {/*    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                            {/*/>*/}
                            {/*<button*/}
                            {/*    onClick={handleSignIn}*/}
                            {/*    className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"*/}
                            {/*>*/}
                            {/*    Sign In*/}
                            {/*</button>*/}

                            {/*<SignIn*/}
                            {/*    path="/login"*/}
                            {/*    routing="path"*/}
                            {/*    redirectUrl="/Directory"*/}
                            {/*    appearance={{*/}
                            {/*        elements: {*/}
                            {/*            formButtonPrimary: "bg-blue-900 hover:bg-white hover:text-blue-900",*/}
                            {/*            card: "shadow-md border border-gray-200 p-6 rounded-md",*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<SignIn*/}
                            {/*    path="/login"*/}
                            {/*    routing="path"*/}
                            {/*    redirectUrl="/Directory"*/}
                            {/*/>*/}

                            <SignInButton mode="modal" redirectUrl="/Directory">
                                <button className="bg-blue-800 text-white px-4 py-2 rounded">
                                    Sign In
                                </button>
                            </SignInButton>

                            <p className="mt-4 text-sm text-center">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setIsSignUp(true)}
                                    className="text-blue-900 hover:underline cursor-pointer"
                                >
                Create Account
              </span>
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Login;

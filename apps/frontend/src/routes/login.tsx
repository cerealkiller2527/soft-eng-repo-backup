import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trpcClient } from '../database/trpc.ts';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [transition, setTransition] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await trpcClient.login.checkLogin.mutate({
                username,
                password
            });
            
            console.log('Login success', result);
            navigate("/Directory");
        } catch (err) {
            console.error('Username or password is incorrect!', err);
            setError("Username or password is incorrect!");
        } finally {
            setLoading(false);
        }
    };
    
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const result = await trpcClient.login.addLogin.mutate({
                username,
                password,
                email
            });
            
            console.log('Add user', result);
            alert("Account created successfully! You can now log in.");
            setIsSignUp(false); // Switch to login form after sign-up
        } catch (err) {
            console.error('Unable to add user', err);
            setError("Unable to add user! Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex">
            <div className="w-3/5 bg-cover bg-center opacity-90" style={{backgroundImage:"url('/newImageHero.png')"}}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-4 left-4 w-92 h-auto"/>

                <div onMouseEnter={() => {
                    setTransition(true);
                }} className={`flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${transition? "opacity-100 translate-y-1": "opacity-0 translate-y-8 "}`}>
                    <h1 className="text-4xl font-bold ">Accessing Health Care Made Easy</h1>
                    <p className="text-lg mt-2 y-0">Access maps, request services, and more—all in one application now.</p>
                </div>
            </div>

            <div className="w-2/5 flex flex-col justify-center items-center h-screen bg-gray-100 px-12">
                {error && (
                    <div className="w-full p-2 mb-4 bg-red-100 text-red-700 rounded-md text-center">
                        {error}
                    </div>
                )}
                
                <div>
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
                                disabled={loading}
                                className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
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

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all disabled:opacity-50"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
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

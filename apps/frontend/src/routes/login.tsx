import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (email === storedEmail && password === storedPassword) {
            setIsLoggedIn(true);
            navigate("/Directory");
        } else {
            alert("Email Address or password is incorrect!");
        }
    };

    const handleSignUp = () => {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Account created successfully! You can now log in.");
        setIsSignUp(false); // Switch to login form after sign-up
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                {isSignUp ? (
                    <>
                        <h1 className="text-2xl text-gray-800 mb-4">Create Account</h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Please enter your email and password to sign up.
                        </p>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={handleSignUp}
                            className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"
                        >
                            Sign Up
                        </button>
                        <p className="mt-4 text-sm">
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
                        <h1 className="text-2xl text-gray-800 mb-4">Sign In</h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Please sign in to access the application.
                        </p>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"
                        >
                            Sign In
                        </button>
                        <p className="mt-4 text-sm">
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
    );
};

export default Login;

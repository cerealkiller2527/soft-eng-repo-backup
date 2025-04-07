import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [email, setEmail] = useState("");

    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUsername && password === storedPassword) {
            navigate("/Directory");
        } else {
            alert("Username or password is incorrect!");
        }
    };

    const handleSignUp = () => {
        if(password!== confirmPassword){
            alert("Password do not match!");
            return;
        }

        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Account created successfully! You can now log in.");
        setIsSignUp(false); // Switch to login form after sign-up
    };

    return (


        <div className="h-screen flex">

            <div className = "w-3/5 bg-cover bg-center " style={{backgroundImage:"url('/HeroImage.png')"}}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-4 left-4 w-92 h-auto"/>
            </div>


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
                                className="w-full p-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"
                            >
                                Sign In
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

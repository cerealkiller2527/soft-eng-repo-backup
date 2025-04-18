import  { useState } from "react";
import { useLocation } from "react-router-dom";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import {useAuth} from '../Context/AuthContext';

const Login: React.FC = () => {

    const {setAuthenticated} = useAuth();
    const location = useLocation();
    const trpc = useTRPC();
    const [email, setEmail] = useState("");
    const[transition, setTransition] = useState(false);

    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

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
    /*
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

    */

    /*
    const handleSignUp = () => {
        if(password!== confirmPassword){
            alert("Password do not match!");
            return;
        }

        addUser.mutate({
            username: username,
            password: password,
            email: email
        })

    };
*/
    return (

//dimensions for the hero image: 1152px width 1080px height
        <div className="h-screen flex">
            <div className = "w-2/3 bg-cover bg-center opacity-90" style={{backgroundImage:"url('/newImageHero.png')"}}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-4 left-4 w-92 h-auto"/>

                <div onMouseEnter={() => {
                    setTransition(true);
                }} className={`flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${transition? "opacity-100 translate-y-1": "opacity-0 translate-y-8 "}`}>
                    <h1 className="text-4xl font-bold ">Accessing Health Care Made Easy</h1>
                    <p className="text-lg mt-2 y-0">Access maps, request services, and more—all in one application now.</p>
                </div>
            </div>


            <div className="w-1/3 flex flex-col justify-center items-center h-screen bg-gray-100 px-12">
                <div >
                    {/*
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

                    ) :
                     */}

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
                                onClick={()=>checkLogin.mutate({
                                    username: username,
                                    password: password
                                })}
                                className="w-full p-2 [background-color:#012D5A] text-white rounded-md hover:bg-white hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all"
                            >
                                LOG IN
                            </button>

                            {/*
                            <p className="mt-4 text-sm text-center">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setIsSignUp(true)}
                                    className="text-blue-900 hover:underline cursor-pointer"
                                >
                Create Account
              </span>
                            </p>

                            */}
                        </>


                </div>
            </div>
        </div>
    );
};

export default Login;

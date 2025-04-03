import React, { useState } from "react";
import { router } from "../routes.tsx"
import { useNavigate } from "react-router-dom";
import "../styles.css";


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
        <div className="login-container">
            <div className="login-box">
                {isSignUp ? (
                    <>
                        <h1>Create Account</h1>
                        <p>Please enter your email and password to sign up.</p>
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
                        <button onClick={handleSignUp}>Sign Up</button>
                        <p>
                            Already have an account?{" "}
                            <span onClick={() => setIsSignUp(false)} className="signup-link">
                                Sign In
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Sign In</h1>
                        <p>Please sign in to access the application.</p>
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
                        <button onClick={handleLogin}>Sign In</button>
                        <p>
                            Don't have an account?{" "}
                            <span onClick={() => setIsSignUp(true)} className="signup-link">
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

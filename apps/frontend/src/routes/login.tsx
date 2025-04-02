//import ExampleComponent from '../components/ExampleComponent.tsx';

/*
const ExamplePage = () => {
    return (
        <div className="p-10">
            <h1 className="font-bold text-xl pb-4">Example Page</h1>
            <ExampleComponent></ExampleComponent>
        </div>
    );
};

export default ExamplePage;
*/

import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const storedUser = localStorage.getItem(username);

        if (storedUser && JSON.parse(storedUser).password === password) {
            alert("Login successful");
        } else {
            setError("Login failed");
        }
    };

    const handleCreate = () => {
        if (username && password) {
            localStorage.setItem(username, JSON.stringify({ password }));
            alert("Account created successfully");
            setUsername("");
            setPassword("");
            setError("");
        } else {
            setError("Please enter a username and password");
        }
    };

    return (
        <div>
            <h2 className="Login">Login Page</h2>

            {/* Input for Username */}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {/* Input for Password */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Button for Login */}
            <button onClick={handleLogin}>Login</button>

            {/* Button for Account Creation */}
            <button onClick={handleCreate}>Create Account</button>
        </div>
    );
};

export default Login;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';
import { useAuth } from '../Context/AuthContext';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

    return (
        <div className="h-screen flex">

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
                        className="w-full bg-[#012D5A] text-white hover:bg-white hover:text-[#012D5A] border border-transparent hover:border-[#012D5A] transition-all"
                    >
                        LOG IN
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;

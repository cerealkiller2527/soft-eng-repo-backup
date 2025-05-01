import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

export default function CustomSignIn(){

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState<string | null>(null);
    const [userExists, setUserExists] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        if (!signInLoaded) return;

        try {
            console.log("[Submit] Signing in:", username);

            const signInAttempt = await signIn.create({
                identifier: username,
                password,
            });

            const sessionId = await signInAttempt.createdSessionId;
            if (!sessionId) throw new Error("No session ID returned.");

            await setActive({ session: sessionId });

            navigate("/Directory");
        } catch (err: unknown) {
            console.error("Error during sign-in:", err);

            if (isClerkAPIResponseError(err)) {
                const firstError = err.errors?.[0];
                setError(firstError?.message ?? "Login failed.");
            } else {
                setError("Unknown error during login.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [showDisclaimer, setShowDisclaimer] = useState(true);

    return (
        <div className="h-screen flex">

            {showDisclaimer && (
                <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 max-w-md duration-500">
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and
                            is not to be confused with the actual Brigham & Women’s Hospital website.</span>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                        >
                            X
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            <div className="w-full bg-cover bg-center min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: "url('/loginBGBlur2.jpg')" }}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-6 left-6 w-92 h-auto" />

                <div className="bg-white shadow-lg border border-gray-300 p-8 rounded-2xl w-full max-w-md flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center text-gray-900">
                        Sign in to Brigham and Women's Hospital
                    </h1>
                    <p className="text-sm text-center text-gray-600">
                        Welcome back! Please sign in to continue
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email address or username
                            </label>
                            <Input
                                type="text"
                                placeholder="email@domain.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Enter your password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <Button
                            type="submit"
                            className="bg-primary hover:bg-chart-4 hover:text-white transition-colors"
                            disabled={isSubmitting}
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        By clicking continue, you agree to our{" "}
                        <a href="#" className="underline">Terms of Service</a> and{" "}
                        <a href="#" className="underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTRPC, trpcClient } from '../database/trpc.ts';
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import { FaGithub as GitHubIcon, FaGoogle as GoogleIcon } from "react-icons/fa";

export default function CustomSignIn(){

    const location = useLocation();
    const[transition, setTransition] = useState(false);
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState<string | null>(null);
    const [stage, setStage] = useState<"username" | "password">("username");
    const [step, setStep] = useState<1 | 2>(1);
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();
    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
    const { getToken } = useAuth();

    const handleUsernameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!signInLoaded) return;

        try {
            console.log("[Username Submit] Checking existence:", username);

            const signInAttempt = await signIn.create({
                identifier: username,
            });

            console.log("[Username exists!] Moving to Step 2");

            setUserExists(true);
            setStep(2);
            setStage("password");

        } catch (err: unknown) {
            console.error("Error during username verification:", err);

            if (isClerkAPIResponseError(err)) {
                const firstError = err.errors?.[0];
                if (firstError?.code === "form_identifier_not_found") {
                    setError("User does not exist. Please check your email or username.");
                } else {
                    setError(firstError?.message ?? "Error verifying username.");
                }
            } else {
                setError("Unknown error verifying username.");
            }
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!signInLoaded) return;

        try {
            console.log("[Password Submit] Signing in:", username);

            // Try signIn.create with password
            const signInAttempt = await signIn.create({
                identifier: username,
                password,
            });

            const sessionId = await signInAttempt.createdSessionId;
            if (!sessionId) throw new Error("No session ID returned.");

            await setActive({ session: sessionId });

            const token = await getToken();

            const client = trpcClient(token || undefined);

            await client.login.verifyClerkUser.mutate({
                sessionId,
                sessionToken: token ?? '',
            });

            navigate("/Directory");

        } catch (err: unknown) {
            console.error("Error during password submit:", err);

            if (isClerkAPIResponseError(err)) {
                const firstError = err.errors?.[0];
                if (firstError?.code === "form_password_incorrect") {
                    setError("Incorrect password. Please try again.");
                } else {
                    setError(firstError?.message ?? "Login failed.");
                }
            } else {
                setError("Unknown error during login.");
            }
        }
    };

    const handleOAuthSignIn = async (provider: "oauth_google" | "oauth_github") => {
        if (!signInLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/Directory",
                redirectUrlComplete: "/Directory",
            });
        } catch (err: unknown) {
            if (isClerkAPIResponseError(err)) {
                setError(err.errors?.[0]?.message ?? "SSO Login failed");
            } else {
                setError("Unknown error during SSO login");
            }
        }
    };

    const [showDisclaimer, setShowDisclaimer] = useState(true);

    return (
        <div className="h-screen flex">

            {showDisclaimer && (
                <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-8 fade-in-20 max-w-md duration-500">
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>This web application is strictly a CS3733-D25 Software Engineering class project for Prof. Wilson Wong at WPI</span>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                        >
                            X
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            <div className="w-full bg-cover bg-center min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: "url('/loginBGBlur.png')" }}>
                <img src="/hospitalLogo.png" alt="Hospital Logo" className="absolute top-6 left-6 w-92 h-auto" />
                {/*<div*/}
                {/*    onMouseEnter={() => setTransition(true)}*/}
                {/*    className={flex flex-col items-center text-center text-white p-6 rounded-lg mt-90 mr-10 transition-all duration-1000 ease-in-out ${*/}
                {/*        transition ? "opacity-100 translate-y-1" : "opacity-0 translate-y-8"*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <h1 className="text-4xl font-bold">Accessing Health Care Made Easy</h1>*/}
                {/*    <p className="text-lg mt-2">Access maps, request services, and more—all in one application now.</p>*/}
                {/*</div>*/}

                <div className="bg-white shadow-lg border border-gray-300 p-8 rounded-2xl w-full max-w-md flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center text-gray-900">
                        Sign in to Brigham and Women's Hospital
                    </h1>
                    <p className="text-sm text-center text-gray-600">
                        Welcome back! Please sign in to continue
                    </p>

                    {stage === "username" && (
                        <>
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleOAuthSignIn("oauth_github")}
                                >
                                    <GitHubIcon className="w-5 h-5 mr-2" /> GitHub
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleOAuthSignIn("oauth_google")}
                                >
                                    <GoogleIcon className="w-5 h-5 mr-2" /> Google
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">or continue with</span>
                                </div>
                            </div>
                        </>
                    )}

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (stage === "username") {
                                await handleUsernameSubmit(e);
                            } else {
                                await handlePasswordSubmit(e);
                            }
                        }}
                        className="flex flex-col gap-4"
                    >
                        {stage === "username" && (
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
                        )}

                        {stage === "password" && (
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
                        )}

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <Button
                            type="submit"
                            className="bg-blue-900 hover:bg-white hover:text-blue-900 transition-colors"
                        >
                            {step === 1 ? "Next" : "Sign In"}
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

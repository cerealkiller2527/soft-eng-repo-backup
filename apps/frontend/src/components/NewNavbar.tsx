import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/database/trpc";
import { useMutation, useQuery } from '@tanstack/react-query';
import BnWLogo from "/BrighamAndWomensLogo.png";

type AlgorithmType = "BFS" | "DFS";

const primaryLink = { title: "Navigation", href: "/floorplan" };
const directoryLink = { title: "Directory", href: "/directory" };
const moreItems = [
    { title: "CSV Import", href: "/csv", show: u => u.isSignedIn && u.user?.publicMetadata?.role === "admin" },
    { title: "Map Editor", href: "/mapeditor", show: u => u.isSignedIn && u.user?.publicMetadata?.role === "admin" },
    { title: "Service Requests", href: "/ServiceRequest", show: u => u.isSignedIn },
    { title: "About", href: "/about", show: () => true },
    { title: "Credits", href: "/credits", show: () => true },
];

export default function NewNavbar() {
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const auth = { isSignedIn, user };
    const location = useLocation();
    const trpc = useTRPC();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

    // More dropdown hover/click state without ref
    const [moreOpen, setMoreOpen] = useState(false);
    const [moreClicked, setMoreClicked] = useState(false);

    const {
        data: currentAlgorithm,
        isLoading: isAlgLoading,
        refetch: refetchAlgorithm,
    } = useQuery(trpc.pathfinding.getCurrentAlgorithm.queryOptions());

    useEffect(() => {
        // handle algorithm updates if needed
    }, [currentAlgorithm]);

    const toggleAlgo = useMutation(
        trpc.pathfinding.toggleAlgorithm.mutationOptions({
            onSuccess() {
                refetchAlgorithm();
            },
        })
    );

    const getLinkClasses = (path: string) =>
        `px-4 py-2 rounded-md text-lg transition-colors ${
            location.pathname === path
                ? "bg-[#86A2B6] text-black underline"
                : "text-black hover:underline"
        }`;

    const mobileItemClasses =
        "block w-full text-left py-2 px-4 text-black text-lg hover:bg-[#86A2B6] transition-colors rounded-none";

    const nextAlg = currentAlgorithm === "BFS" ? "DFS" : "BFS";

    return (
        <Menubar className="fixed top-0 w-full shadow-md bg-primary-foreground z-50 h-14 rounded-none">
            <div className="flex items-center justify-between px-4 h-full w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={BnWLogo} alt="Brigham & Women's Logo" className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link to={primaryLink.href} className={getLinkClasses(primaryLink.href)}>
                        {primaryLink.title}
                    </Link>
                    <Link to={directoryLink.href} className={getLinkClasses(directoryLink.href)}>
                        {directoryLink.title}
                    </Link>

                    {/* More dropdown with hover+click stability using onOpenChange */}
                    <MenubarMenu
                        open={moreOpen}
                        onOpenChange={open => {
                            setMoreOpen(open);
                            if (!open) setMoreClicked(false);
                        }}
                    >
                        <MenubarTrigger
                            onClick={() => {
                                setMoreClicked(prev => !prev);
                                setMoreOpen(true);
                            }}
                            onMouseEnter={() => !moreClicked && setMoreOpen(true)}
                            onMouseLeave={() => !moreClicked && setMoreOpen(false)}
                            className="px-4 py-2 rounded-none text-lg bg-background font-normal hover:cursor-pointer focus:outline-none data-[state=open]:bg-transparent"
                        >
                            More
                        </MenubarTrigger>
                        <MenubarContent
                            align="end"
                            className="border rounded-none shadow-md bg-white"
                            onMouseEnter={() => !moreClicked && setMoreOpen(true)}
                            onMouseLeave={() => !moreClicked && setMoreOpen(false)}
                        >
                            {moreItems
                                .filter(item => item.show(auth))
                                .map(item => (
                                    <MenubarItem key={item.href}>
                                        <Link
                                            to={item.href}
                                            className="block w-full text-left py-2 px-4 text-black"
                                        >
                                            {item.title}
                                        </Link>
                                    </MenubarItem>
                                ))}
                        </MenubarContent>
                    </MenubarMenu>

                    {/* Profile dropdown */}
                    {isSignedIn ? (
                        <MenubarMenu>
                            <MenubarTrigger
                                className="p-2 rounded-full text-black bg-background hover:cursor-pointer focus:outline-none data-[state=open]:bg-transparent"
                            >
                                <UserCircleIcon className="h-8 w-8" />
                            </MenubarTrigger>
                            <MenubarContent align="end" className="border rounded-none shadow-md bg-white">
                                {user?.publicMetadata?.role === "admin" && (
                                    <MenubarItem>
                                        {isAlgLoading ? (
                                            <button disabled className="block w-full py-2 px-4 text-left">
                                                Loading…
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => toggleAlgo.mutate({ algorithm: nextAlg })}
                                                className="block w-full py-2 px-4 text-left"
                                            >
                                                Switch to {nextAlg}
                                            </button>
                                        )}
                                    </MenubarItem>
                                )}
                                <MenubarItem>
                                    <Link
                                        to="/profile"
                                        className="block w-full py-2 px-4 text-black hover:bg-accent"
                                    >
                                        My Profile
                                    </Link>
                                </MenubarItem>
                                <MenubarItem>
                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full py-2 px-4 text-left text-black"
                                    >
                                        Log Out
                                    </button>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-none text-black hover:bg-[#86A2B6] transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger & Dropdown */}
                <div className="md:hidden relative">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-black hover:bg-[#86A2B6] p-2 rounded-none"
                    >
                        {mobileMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                    </button>

                    {mobileMenuOpen && (
                        <div className="absolute top-full right-0 mt-1 bg-[#AEC8E0] w-36 p-2 rounded-none shadow-lg space-y-2 z-40 overflow-auto max-h-[calc(100vh-3.5rem)]">
                            <Link
                                to={primaryLink.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileItemClasses}
                            >
                                {primaryLink.title}
                            </Link>
                            <Link
                                to={directoryLink.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileItemClasses}
                            >
                                {directoryLink.title}
                            </Link>
                            <button
                                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                                className={`flex justify-between items-center ${mobileItemClasses}`}
                            >
                                More <ChevronDownIcon className="h-5 w-5" />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    mobileMoreOpen ? "max-h-96" : "max-h-0"
                                }`}
                            >
                                {mobileMoreOpen && (
                                    <div className="ml-2 space-y-1">
                                        {moreItems
                                            .filter((item) => item.show(auth))
                                            .map((item) => (
                                                <Link
                                                    key={item.href}
                                                    to={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={mobileItemClasses}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                                className={`flex justify-between items-center ${mobileItemClasses}`}
                            >
                                Profile <ChevronDownIcon className="h-5 w-5" />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    mobileProfileOpen ? "max-h-40" : "max-h-0"
                                }`}
                            >
                                {mobileProfileOpen && (
                                    <div className="ml-2 space-y-1">
                                        {isSignedIn ? (
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={mobileItemClasses}
                                            >
                                                Log Out
                                            </button>
                                        ) : (
                                            <Link
                                                to="/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={mobileItemClasses}
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Menubar>
    );
}

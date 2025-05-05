import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTRPC } from "@/database/trpc";
import { useMutation, useQuery } from '@tanstack/react-query';
import BnWLogo from "/BrighamAndWomensLogo.png";

const primaryLinks = [
    { title: "Navigation", href: "/floorplan" },
    { title: "Directory", href: "/directory" },
    { title: "Hospital Map", href: "/hospitalmap" }
];

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
    const location = useLocation();
    const trpc = useTRPC();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [filteredMoreItems, setFilteredMoreItems] = useState(moreItems);

    const { data: currentAlgorithm, isLoading: isAlgLoading } = useQuery(
        trpc.pathfinding.getCurrentAlgorithm.queryOptions()
    );

    const toggleAlgo = useMutation(
        trpc.pathfinding.toggleAlgorithm.mutationOptions()
    );

    useEffect(() => {
        setFilteredMoreItems(moreItems.filter(item => item.show({ isSignedIn, user })));
    }, [isSignedIn, user]);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const closeAll = () => {
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    const getLinkClasses = (path: string) =>
        `px-4 py-2 text-lg ${location.pathname === path ? "text-black underline" : "text-black hover:underline"}`;

    const nextAlg = currentAlgorithm === "BFS" ? "DFS" : "BFS";

    return (
        <nav className="fixed top-0 w-full shadow-md bg-white z-50 h-14 border-b">
            <div className="flex items-center justify-between px-4 h-full w-full">
                <Link to="/" className="flex items-center space-x-2" onClick={closeAll}>
                    <img src={BnWLogo} alt="Brigham & Women's Logo" className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    {primaryLinks.map(link => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={getLinkClasses(link.href)}
                            onClick={closeAll}
                        >
                            {link.title}
                        </Link>
                    ))}

                    {/* More dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('more')}
                            className={`px-4 py-2 text-lg ${openDropdown === 'more' ? 'underline' : 'hover:underline'}`}
                        >
                            More
                        </button>
                        {openDropdown === 'more' && (
                            <div className="absolute right-0 mt-2 bg-white border shadow-lg z-50 rounded-md min-w-[180px]">
                                {filteredMoreItems.map(item => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="block w-full text-left py-2 px-4 text-black hover:bg-[#86A2B6] hover:text-white"
                                        onClick={closeAll}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    <div className="relative">
                        {isSignedIn ? (
                            <>
                                <button
                                    onClick={() => toggleDropdown('profile')}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <UserCircleIcon className="h-8 w-8" />
                                </button>
                                {openDropdown === 'profile' && (
                                    <div className="absolute right-0 mt-2 bg-white border shadow-lg z-50 rounded-md w-48">
                                        {user?.publicMetadata?.role === "admin" && (
                                            <button
                                                onClick={() => toggleAlgo.mutate({ algorithm: nextAlg })}
                                                className="block w-full py-2 px-4 text-left text-black hover:bg-[#86A2B6] hover:text-white"
                                            >
                                                {isAlgLoading ? 'Loading...' : `Switch to ${nextAlg}`}
                                            </button>
                                        )}
                                        <Link
                                            to="/profile"
                                            className="block w-full py-2 px-4 text-black hover:bg-[#86A2B6] hover:text-white"
                                            onClick={closeAll}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full py-2 px-4 text-left text-black hover:bg-[#86A2B6] hover:text-white"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 hover:underline"
                                onClick={closeAll}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-black hover:bg-[#86A2B6] p-2 rounded-none"
                    >
                        {mobileOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                    </button>

                    {mobileOpen && (
                        <div className="absolute top-full right-0 mt-1 bg-white border shadow-lg z-40 w-56 rounded-md">
                            {primaryLinks.map(link => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={closeAll}
                                    className="block w-full text-left py-2 px-4 text-black text-lg border-b"
                                >
                                    {link.title}
                                </Link>
                            ))}

                            <button
                                onClick={() => toggleDropdown('mobileMore')}
                                className="flex justify-between items-center w-full text-left py-2 px-4 text-black text-lg border-b"
                            >
                                More <ChevronDownIcon className="h-5 w-5" />
                            </button>

                            {openDropdown === 'mobileMore' && filteredMoreItems.map(item => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeAll}
                                    className="block w-full text-left py-2 px-6 text-black text-lg border-b bg-gray-50"
                                >
                                    {item.title}
                                </Link>
                            ))}

                            {isSignedIn ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown('mobileProfile')}
                                        className="flex justify-between items-center w-full text-left py-2 px-4 text-black text-lg border-b"
                                    >
                                        Profile <ChevronDownIcon className="h-5 w-5" />
                                    </button>

                                    {openDropdown === 'mobileProfile' && (
                                        <>
                                            {user?.publicMetadata?.role === "admin" && (
                                                <button
                                                    onClick={() => toggleAlgo.mutate({ algorithm: nextAlg })}
                                                    className="block w-full text-left py-2 px-6 text-black text-lg border-b bg-gray-50"
                                                >
                                                    {isAlgLoading ? 'Loading...' : `Switch to ${nextAlg}`}
                                                </button>
                                            )}
                                            <Link
                                                to="/profile"
                                                onClick={closeAll}
                                                className="block w-full text-left py-2 px-6 text-black text-lg border-b bg-gray-50"
                                            >
                                                My Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    closeAll();
                                                }}
                                                className="block w-full text-left py-2 px-6 text-black text-lg border-b bg-gray-50"
                                            >
                                                Log Out
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeAll}
                                    className="block w-full text-left py-2 px-4 text-black text-lg border-b"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
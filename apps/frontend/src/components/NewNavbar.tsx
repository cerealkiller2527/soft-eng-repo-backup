import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
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
    const [openMenu, setOpenMenu] = useState<null | 'more' | 'profile'>(null);
    const [clickedMenu, setClickedMenu] = useState<null | 'more' | 'profile'>(null);
    const [filteredMoreItems, setFilteredMoreItems] = useState(moreItems);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        data: currentAlgorithm,
        isLoading: isAlgLoading,
        refetch: refetchAlgorithm,
    } = useQuery(trpc.pathfinding.getCurrentAlgorithm.queryOptions());

    const toggleAlgo = useMutation(
        trpc.pathfinding.toggleAlgorithm.mutationOptions({
            onSuccess() {
                refetchAlgorithm();
            },
        })
    );

    // Filter more items based on auth status
    useEffect(() => {
        setFilteredMoreItems(moreItems.filter(item => item.show(auth)));
    }, [isSignedIn, user]);

    // Handle hover interactions
    const handleMenuHover = (menu: 'more' | 'profile' | null) => {
        if (!clickedMenu) {
            setOpenMenu(menu);
        }
    };

    // Handle click interactions
    const handleMenuClick = (menu: 'more' | 'profile') => {
        if (clickedMenu === menu) {
            // Second click on same menu - close it
            setClickedMenu(null);
            setOpenMenu(null);
        } else {
            // First click - open and mark as clicked
            setClickedMenu(menu);
            setOpenMenu(menu);
        }
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setClickedMenu(null);
                setOpenMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getLinkClasses = (path: string) =>
        `px-4 py-2 text-lg transition-colors ${
            location.pathname === path
                ? "text-black underline"
                : "text-black hover:underline"
        }`;

    const mobileItemClasses =
        "block w-full text-left py-2 px-4 text-black text-lg transition-colors rounded-none";

    const nextAlg = currentAlgorithm === "BFS" ? "DFS" : "BFS";

    return (
        <nav className="fixed top-0 w-full shadow-md bg-white z-50 h-14 rounded-none border-b">
            <div className="flex items-center justify-between px-4 h-full w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={BnWLogo} alt="Brigham & Women's Logo" className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        to={primaryLink.href}
                        className={getLinkClasses(primaryLink.href)}
                        onMouseEnter={() => setOpenMenu(null)}
                    >
                        {primaryLink.title}
                    </Link>
                    <Link
                        to={directoryLink.href}
                        className={getLinkClasses(directoryLink.href)}
                        onMouseEnter={() => setOpenMenu(null)}
                    >
                        {directoryLink.title}
                    </Link>

                    {/* More dropdown */}
                    <div
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={() => handleMenuHover('more')}
                    >
                        <button
                            onClick={() => handleMenuClick('more')}
                            className={`px-4 py-2 text-lg ${openMenu === 'more' ? 'underline' : 'hover:underline'}`}
                        >
                            More
                        </button>
                        {openMenu === 'more' && (
                            <div
                                className="absolute right-0 mt-2 bg-white border shadow-lg z-50 rounded-md min-w-[180px]"
                                onMouseEnter={() => handleMenuHover('more')}
                            >
                                {filteredMoreItems.map(item => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="block w-full text-left py-2 px-4 text-black hover:bg-[#86A2B6] hover:text-white transition-colors"
                                        onClick={() => {
                                            setOpenMenu(null);
                                            setClickedMenu(null);
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMenuHover('profile')}
                    >
                        {isSignedIn ? (
                            <>
                                <button
                                    onClick={() => handleMenuClick('profile')}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <UserCircleIcon className="h-8 w-8" />
                                </button>
                                {openMenu === 'profile' && (
                                    <div className="absolute right-0 mt-2 bg-white border shadow-lg z-50 rounded-md w-48">
                                        {user?.publicMetadata?.role === "admin" && (
                                            <button
                                                onClick={() => toggleAlgo.mutate({ algorithm: nextAlg })}
                                                className="block w-full py-2 px-4 text-left text-black hover:bg-[#86A2B6] hover:text-white transition-colors"
                                            >
                                                {isAlgLoading ? 'Loading...' : `Switch to ${nextAlg}`}
                                            </button>
                                        )}
                                        <Link
                                            to="/profile"
                                            className="block w-full py-2 px-4 text-black hover:bg-[#86A2B6] hover:text-white transition-colors"
                                            onClick={() => {
                                                setOpenMenu(null);
                                                setClickedMenu(null);
                                            }}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setOpenMenu(null);
                                                setClickedMenu(null);
                                            }}
                                            className="block w-full py-2 px-4 text-left text-black hover:bg-[#86A2B6] hover:text-white transition-colors"
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
                                onMouseEnter={() => setOpenMenu(null)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
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
                        <div className="absolute top-full right-0 mt-1 bg-white border shadow-lg z-40 w-56 rounded-md overflow-hidden">
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
                                    <div className="bg-gray-50">
                                        {filteredMoreItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`${mobileItemClasses} pl-8`}
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
                                    <div className="bg-gray-50">
                                        {isSignedIn ? (
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={`${mobileItemClasses} pl-8`}
                                            >
                                                Log Out
                                            </button>
                                        ) : (
                                            <Link
                                                to="/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`${mobileItemClasses} pl-8`}
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
        </nav>
    );
}
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import BnWLogo from "/BrighamAndWomensLogo.png";

// Always visible
const primaryLink = { title: "Map", href: "/floorplan" };
const directoryLink = { title: "Directory", href: "/directory" };

// Under “More”
const moreItems = [
    { title: "Service Requests", href: "/service-request", show: (u) => true },
    { title: "CSV Import", href: "/csv", show: (u) => u.isSignedIn },
    { title: "Map Editor", href: "/mapeditor", show: (u) => u.isSignedIn && u.user?.unsafeMetadata.role === "admin" },
];

export default function NewNavbar() {
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const auth = { isSignedIn, user };
    const location = useLocation();

    // Helper: generate button styles
    const getLinkClasses = (path: string) =>
        `px-4 py-2 rounded-md font-bold transition-colors ${
            location.pathname === path
                ? "bg-[#86A2B6] text-black"  // Selected state
                : "text-black hover:bg-[#86A2B6]"  // Hover state
        }`;

    return (
        <nav className="fixed top-0 w-full bg-[#AEC8E0] shadow z-50 rounded-md">
            <div className="mx-auto flex items-center justify-between px-4 py-1">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={BnWLogo} alt="Brigham & Women's Logo" className="h-12" />
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">

                    {/* Map */}
                    <Link to={primaryLink.href} className={getLinkClasses(primaryLink.href)}>
                        {primaryLink.title}
                    </Link>

                    {/* Directory */}
                    <Link to={directoryLink.href} className={getLinkClasses(directoryLink.href)}>
                        {directoryLink.title}
                    </Link>

                    {/* More Dropdown */}
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="px-4 py-2 rounded-md font-bold text-black bg-transparent hover:bg-[#86A2B6] focus:bg-[#86A2B6] transition-colors">
                                More
                            </MenubarTrigger>
                            <MenubarContent align="end" className="border rounded-md shadow-md bg-white">
                                {moreItems
                                    .filter(item => item.show(auth))
                                    .map(item => (
                                        <MenubarItem key={item.href}>
                                            <Link
                                                to={item.href}
                                                className={`block w-full text-left py-2 px-4 transition-colors ${
                                                    location.pathname === item.href
                                                        ? "bg-[#86A2B6] text-black"
                                                        : "text-black"
                                                }`}
                                            >
                                                {item.title}
                                            </Link>
                                        </MenubarItem>
                                    ))}
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                    {/* Profile Icon or Login Button */}
                    {isSignedIn ? (
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger className="p-2 rounded-full text-blue-900 bg-transparent hover:bg-[#86A2B6] focus:bg-[#86A2B6] transition-colors">
                                    <UserCircleIcon className="h-8 w-8" />
                                </MenubarTrigger>
                                <MenubarContent align="end" className="border rounded-md shadow-md bg-white">
                                    <MenubarItem>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left py-2 px-4 text-black"
                                        >
                                            Log Out
                                        </button>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-md text-black font-bold hover:bg-[#86A2B6] transition-colors"
                        >
                            Login
                        </Link>
                    )}

                </div>

            </div>
        </nav>
    );
}
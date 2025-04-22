import { useState } from 'react';
import { Link } from 'react-router-dom';
import BnWLogo from '/BrighamAndWomensLogo.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-100 py-4 w-full border-b border-gray-400 shadow-sm fixed top-0 left-0 z-50">
            <nav className="flex items-center justify-between px-6">
                <img src={BnWLogo} alt="Hospital Logo" className="h-10" />

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <NavLinks />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-[#012D5A] focus:outline-none">
                        {isOpen ? (
                            <XMarkIcon className="h-8 w-8" />
                        ) : (
                            <Bars3Icon className="h-8 w-8" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Dropdown when on mobile */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-start px-6 space-y-3 mt-2 bg-gray-100 pb-4">
                    <NavLinks />
                </div>
            )}
        </div>
    );
};

const NavLinks = () => (
    <>
        <Link to="/Login" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            Login
        </Link>
        <Link to="/floorplan" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            Floor Plan
        </Link>
        <Link to="/ServiceRequest" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            Service Request
        </Link>
        <Link to="/Directory" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            Directory
        </Link>
        <Link to="/csv" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            CSV Import/Export
        </Link>
        <Link to="/mapeditor" className="text-[#012D5A] text-lg font-semibold hover:underline hover:decoration-[#F6BD38]">
            Map Editor
        </Link>
    </>
);

export default Navbar;
import { Link } from 'react-router-dom';
import BnWLogo from '/BrighamAndWomensLogo.png';

const Navbar = () => {
    return (
        <div
            className={
                'bg-gray-100 py-4 w-full border-b border-gray-400 shadow-sm fixed top-0 left-0 z-50'
            }
        >
            <nav id="navbar" className="flex justify-between px-6 space-x-8 mt-2">
                <img src={BnWLogo} alt="Hospital Logo" className={'flex justify-left  h-10 ml-2'} />
                <div className="flex space-x-6 ml-auto">
                    <Link
                        to="/Login"
                        className={
                            'text-[#0057B8] text-lg font-semibold hover:underline hover:text-[#009ca6]'
                        }
                    >
                        Login
                    </Link>
                    <Link
                        to="/floorplan"
                        className={
                            'text-[#0057B8] text-lg font-semibold hover:underline hover:text-[#009ca6]'
                        }
                    >
                        Floor Plan
                    </Link>
                    <Link
                        to="/ServiceRequest"
                        className={
                            'text-[#0057B8] text-lg font-semibold hover:underline hover:text-[#009ca6]'
                        }
                    >
                        Service Request
                    </Link>
                    <Link
                        to="/Directory"
                        className={
                            'text-[#0057B8] text-lg font-semibold hover:underline hover:text-[#009ca6]'
                        }
                    >
                        Directory
                    </Link>
                    <Link
                        to="/csv"
                        className={
                            'text-[#0057B8] text-lg font-semibold hover:underline hover:text-[#009ca6]'
                        }
                    >
                        CSV Import/Export
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

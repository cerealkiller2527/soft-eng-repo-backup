import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div className={"bg-[#0057B8] py-4"}>
            <nav id="navbar" className="flex justify-between px-24 space-x-8 mt-2">
                <Link to="/" className={"text-white text lg font-semibold hover:underline"}>
                    Login
                </Link>
                <Link to="/floorplan" className={"text-white text lg font-semibold hover:underline"}>
                    Floor Plan
                </Link>
                <Link to="/ServiceRequest" className={"text-white text lg font-semibold hover:underline"}>
                    Service Request
                </Link>
                <Link to="/Directory" className={"text-white text lg font-semibold hover:underline"}>
                    Directory
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;
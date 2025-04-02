

const Navbar = () => {
    return(
        <div className={"bg-[#0057B8] py-4"}>
            <nav id="navbar" className="flex justify-center space-x-8 mt-2">
                <a href={"#"} className={"text-white text lg font-semibold hover:underline"}>
                    Home
                </a>
                <a href={"#"} className={"text-white text lg font-semibold hover:underline"}>
                    Map
                </a>
                <a href={"#"} className={"text-white text lg font-semibold hover:underline"}>
                    Request Forms
                </a>
                <a href={"#"} className={"text-white text lg font-semibold hover:underline"}>
                    Directory
                </a>
            </nav>
        </div>
    );
};

export default Navbar;
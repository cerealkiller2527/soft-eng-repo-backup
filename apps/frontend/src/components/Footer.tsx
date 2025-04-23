import MSBLogo from '/MSBlogo.png';

const Footer = () => {
    return(
        <footer className=" footer mt-auto bg-[#012D5A] text-white py-6 mt-10 w-full">
            <div className="flex justify-between items-center px-6" >
                <div>
            <p className="text-sm">&copy; 2025 Brigham and Women's Hospital. All rights reserved.</p>
            <div className="flex space-x-4 mt-2">
                <a href="/privacy" className="hover:underline hover:decoration-[#F6BD38] text-sm">Privacy Policy</a>
                <a href="/privacy" className="hover:underline hover:decoration-[#F6BD38] text-sm">Patient Privacy Notice</a>
                <a href="/terms" className="hover:underline hover:decoration-[#F6BD38] text-sm">Terms of Service</a>
                <a href="/contact" className="hover:underline hover:decoration-[#F6BD38] text-sm">Contact Us</a>
            </div>
            </div>
                <a href='/'>
                    <img src={MSBLogo} className="h-12 justify-right" alt="Mass Ganeral Brigham Logo" />
                </a>
        </div>
        </footer>
    );
};
export default Footer;
import MSBLogo from '/MSBlogo.png';

const Footer = () => {
    return (
        <footer className=" footer mt-auto bg-[#0057B8] text-white py-6 mt-10 w-full">
            <div className="flex justify-between items-center px-6">
                <div>
                    <p className="text-sm">
                        &copy; 2025 Brigham and Women's Hospital. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <a href="/privacy" className="hover:underline text-sm">
                            Privacy Policy
                        </a>
                        <a href="/privacy" className="hover:underline text-sm">
                            Patient Privacy Notice
                        </a>
                        <a href="/terms" className="hover:underline text-sm">
                            Terms of Service
                        </a>
                        <a href="/contact" className="hover:underline text-sm">
                            Contact Us
                        </a>
                        <a href="/" className="hover:underline text-sm">
                            Home
                        </a>
                    </div>
                </div>
                <img src={MSBLogo} className="h-12 justify-right" alt="Mass Ganeral Brigham Logo" />
            </div>
        </footer>
    );
};
export default Footer;

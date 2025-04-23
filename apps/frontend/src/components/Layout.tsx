import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <div className={"min-h-screen flex flex-col"}>
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
import NewNavbar from "../components/NewNavbar.tsx";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <div className={"min-h-screen flex flex-col"}>
            <NewNavbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardButton() {
    return (
        <Link
            to="/requestdashboard"
            className="text-xl font-bold text-center items-center flex flex-col p-20 bg-[#012D5A] bg-opacity-10 text-white rounded-xl hover:text-[#012D5A] hover:bg-white border border-4 border-[#012D5A]">Request Form Dashboard
        </Link>
    );
}
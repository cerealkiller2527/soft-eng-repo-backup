import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardButton() {
    return (
        <Link
            to="/requestdashboard"
            className="w-[220px] h-[205px] text-xl font-bold text-center items-center flex flex-col justify-center bg-[#012D5A] text-white rounded-xl hover:bg-white hover:text-[#012D5A] border-[4px] border-[#012D5A]"
        >
            Request Dashboard
        </Link>
    );
}

import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

const DirectoryPage: React.FC = () => {
    const accordionItems: AccordionItem[] = [
        {
            id: 'section1',
            title: 'Centers Of Excellence',
            content: (
                <>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/bccc'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Backup Child Care Center
                        </Link>
                        <Link
                            to={'/copm'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Center of Pain Medicine
                        </Link>
                        <Link
                            to={'/cacc'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Crohn's and Colitis Center
                        </Link>
                    </div>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/ec'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Endoscopy Center
                        </Link>
                        <Link
                            to={'/gsea'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Gretchen S. and Edward A. Fish Center for Women's Health
                        </Link>
                        <Link
                            to={'/occ'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Osher Clinical Center for Integrative Health
                        </Link>
                    </div>
                </>
            )
        },
        {
            id: 'section2',
            title: 'General Patient Care',
            content: (
                <>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/aci'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Allergy and Clinical Immunology
                        </Link>
                        <Link
                            to={'/Laboratory'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Laboratory
                        </Link>
                        <Link
                            to={'/Multi-Speciality'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Multi-Speciality Clinic
                        </Link>
                    </div>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/pfs'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Patient Financial Services
                        </Link>
                        <Link
                            to={'/Pharmacy'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Pharmacy
                        </Link>
                        <Link
                            to={'/Radiology'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Radiology
                        </Link>
                    </div>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/MRI'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Radiology, MRI/CT scan
                        </Link>
                        <Link
                            to={'/rehab'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Rehabilitation Services
                        </Link>
                    </div>
                </>
            )
        },
        {
            id: 'section3',
            title: 'Brigham Groups and Associates',
            content: (
                <>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/bda'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Brigham Dermatology Associates
                        </Link>
                        <Link
                            to={'/bogg'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Brigham Obstetrics and Gynecology Group
                        </Link>
                        <Link
                            to={'/bpg'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Brigham Physicians Group
                        </Link>
                    </div>
                    <div className="flex justify-center gap-5 my-5 flex-wrap w-full">
                        <Link
                            to={'/bps'}
                            className="flex items-center justify-center text-center text-white bg-[#012D5A] rounded p-2 md:p-3 min-h-[60px] w-full max-w-[250px] flex-1 basis-[200px] text-xs md:text-sm leading-snug whitespace-normal break-words transition-colors duration-300 hover:bg-[#034080] min-w-[120px] box-border"
                        >
                            Brigham Psychiatric Specialities
                        </Link>
                    </div>
                </>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white p-2.5 overflow-y-auto">
            {/* Logo */}
            <div className="flex justify-start mb-2">
                <img
                    src="/BrighamAndWomensLogo.png"
                    alt="Brigham and Women's Hospital Logo"
                    className="h-12 ml-2"
                />
            </div>

            <Navbar />

            {/* Header */}
            <h2 className="bg-[#012D5A] text-white p-2.5 sticky top-0 z-0 text-lg md:text-xl">
                Brigham and Women's Directory
            </h2>

            {/* Accordion */}
            <div className="space-y-2.5 px-70">
                {accordionItems.map((item) => (
                    <div key={item.id} className="mb-2.5">
                        <input
                            type="checkbox"
                            id={item.id}
                            className="hidden peer"
                        />
                        <label
                            htmlFor={item.id}
                            className="block w-full p-4.5 bg-gray-200 text-gray-700 cursor-pointer text-center text-m mb-1 rounded transition-colors duration-300 hover:bg-gray-300 peer-checked:rounded-b-none"
                        >
                            {item.title}
                        </label>
                        <div className="bg-white overflow-hidden max-h-0 transition-all duration-200 ease-out mb-2.5 peer-checked:max-h-[1000px] peer-checked:p-4.5">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DirectoryPage;
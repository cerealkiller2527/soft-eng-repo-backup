import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

/* Setup for Accordion */
interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

/* Setup for Buttons */
const DirectoryPage: React.FC = () => {

    /* Extracted Styling so there aren't bricks of code */

    const buttonClass = "flex items-center justify-center text-center text-white bg-[#012D5A] " +
                                "rounded-lg p-4 h-24 w-64 text-sm md:text-base leading-tight whitespace-normal " +
                                "break-words transition-all duration-300 hover:bg-[#034080] hover:scale-105 transform shadow-md";
    const buttonRowClass = "flex justify-center gap-5 my-4 flex-wrap w-full max-w-4xl mx-auto";
    const accordionContentClass = "space-y-4 px-4 bg-white rounded-b-lg";

    const accordionItems: AccordionItem[] = [
        {
            id: 'section1',
            title: 'Centers Of Excellence',
            content: (
                <div className={accordionContentClass}>
                    <div className={buttonRowClass}>
                        <Link to={'/bccc'} className={buttonClass}>
                            Backup Child Care Center
                        </Link>
                        <Link to={'/copm'} className={buttonClass}>
                            Center of Pain Medicine
                        </Link>
                        <Link to={'/cacc'} className={buttonClass}>
                            Crohn's and Colitis Center
                        </Link>
                    </div>
                    <div className={buttonRowClass}>
                        <Link to={'/ec'} className={buttonClass}>
                            Endoscopy Center
                        </Link>
                        <Link to={'/gsea'} className={buttonClass}>
                            Gretchen S. and Edward A. Fish Center for Women's Health
                        </Link>
                        <Link to={'/occ'} className={buttonClass}>
                            Osher Clinical Center for Integrative Health
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 'section2',
            title: 'General Patient Care',
            content: (
                <div className={accordionContentClass}>
                    <div className={buttonRowClass}>
                        <Link to={'/aci'} className={buttonClass}>
                            Allergy and Clinical Immunology
                        </Link>
                        <Link to={'/Laboratory'} className={buttonClass}>
                            Laboratory
                        </Link>
                        <Link to={'/Multi-Speciality'} className={buttonClass}>
                            Multi-Speciality Clinic
                        </Link>
                    </div>
                    <div className={buttonRowClass}>
                        <Link to={'/pfs'} className={buttonClass}>
                            Patient Financial Services
                        </Link>
                        <Link to={'/Pharmacy'} className={buttonClass}>
                            Pharmacy
                        </Link>
                        <Link to={'/Radiology'} className={buttonClass}>
                            Radiology
                        </Link>
                    </div>
                    <div className={buttonRowClass}>
                        <Link to={'/MRI'} className={buttonClass}>
                            Radiology, MRI/CT scan
                        </Link>
                        <Link to={'/rehab'} className={buttonClass}>
                            Rehabilitation Services
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 'section3',
            title: 'Brigham Groups and Associates',
            content: (
                <div className={accordionContentClass}>
                    <div className={buttonRowClass}>
                        <Link to={'/bda'} className={buttonClass}>
                            Brigham Dermatology Associates
                        </Link>
                        <Link to={'/bogg'} className={buttonClass}>
                            Brigham Obstetrics and Gynecology Group
                        </Link>
                        <Link to={'/bpg'} className={buttonClass}>
                            Brigham Physicians Group
                        </Link>
                    </div>
                    <div className={buttonRowClass}>
                        <Link to={'/bps'} className={buttonClass}>
                            Brigham Psychiatric Specialities
                        </Link>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white p-4 overflow-y-auto pt-20">

            <Navbar />

            {/* Header */}
            <h2 className= "w-full p-4 text-5xl text-center font-[palladio] bg-[#012D5A] text-white">
                Services at Brigham and Women's Hospital
            </h2>

            <br/>

            {/* Accordion */}
            <div className="space-y-4 px-20 max-w-7xl mx-auto">
                {accordionItems.map((item) => (
                    <div key={item.id} className="mb-4 rounded-lg overflow-hidden shadow-sm">
                        <input
                            type="checkbox"
                            id={item.id}
                            className="hidden peer"
                        />
                        <label
                            htmlFor={item.id}
                            className="block w-full p-4 bg-gray-200 text-gray-700 cursor-pointer text-center text-lg font-medium rounded-t-lg transition-colors duration-300 hover:bg-gray-300 peer-checked:bg-gray-300 peer-checked:rounded-b-none"
                        >
                            {item.title}
                        </label>
                        <div className="bg-white overflow-hidden max-h-0 transition-all duration-300 ease-in-out peer-checked:max-h-[2000px]">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DirectoryPage;
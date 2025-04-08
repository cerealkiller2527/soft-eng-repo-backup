import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";

interface AccordionItemData {
    id: string;
    title: string;
    content: React.ReactNode;
}

const DirectoryPage: React.FC = () => {
    // Button styling
    const buttonClass = "flex items-center justify-center text-center text-[#012D5A] " +
        "p-4 h-32 w-64 text-base leading-tight whitespace-normal border border-[#012D5A] " +
        "break-words transition-all duration-200 hover:bg-[#012D5A]/5 rounded-lg";
    const buttonContainerClass = "flex flex-wrap justify-center gap-4 my-6 w-full";

    // Accordion styling
    const accordionContentClass = "px-2 pt-2 pb-6";
    const accordionTriggerClass = "w-full py-4 text-[#012D5A] text-left text-xl font-normal " +
        "hover:no-underline border-b border-[#012D5A]/20 hover:bg-gray-50 px-0";

    const accordionItems: AccordionItemData[] = [
        {
            id: 'section1',
            title: 'Centers Of Excellence',
            content: (
                <div className={accordionContentClass}>
                    <div className={buttonContainerClass}>
                        <Link to={'/bccc'} className={buttonClass}>
                            Backup Child Care Center
                        </Link>
                        <Link to={'/copm'} className={buttonClass}>
                            Center of Pain Medicine
                        </Link>
                        <Link to={'/cacc'} className={buttonClass}>
                            Crohn's and Colitis Center
                        </Link>
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
                    <div className={buttonContainerClass}>
                        <Link to={'/aci'} className={buttonClass}>
                            Allergy and Clinical Immunology
                        </Link>
                        <Link to={'/Laboratory'} className={buttonClass}>
                            Laboratory
                        </Link>
                        <Link to={'/Multi-Speciality'} className={buttonClass}>
                            Multi-Speciality Clinic
                        </Link>
                        <Link to={'/pfs'} className={buttonClass}>
                            Patient Financial Services
                        </Link>
                        <Link to={'/Pharmacy'} className={buttonClass}>
                            Pharmacy
                        </Link>
                        <Link to={'/Radiology'} className={buttonClass}>
                            Radiology
                        </Link>
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
                    <div className={buttonContainerClass}>
                        <Link to={'/bda'} className={buttonClass}>
                            Brigham Dermatology Associates
                        </Link>
                        <Link to={'/bogg'} className={buttonClass}>
                            Brigham Obstetrics and Gynecology Group
                        </Link>
                        <Link to={'/bpg'} className={buttonClass}>
                            Brigham Physicians Group
                        </Link>
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
            <br/>
            <Navbar />

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                    Services at Brigham and Women's Hospital
                </h1>
                <div className="h-px bg-[#012D5A]/20 w-full"></div>
            </div>

            {/* Accordion */}
            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-1">
                    {accordionItems.map((item) => (
                        <AccordionItem key={item.id} value={item.id} className="border-none">
                            <AccordionTrigger className={accordionTriggerClass}>
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent className={accordionContentClass}>
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default DirectoryPage;
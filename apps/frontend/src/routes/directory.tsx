import React from 'react';
import '../styles/directoryStyles.css';
import {Link} from "react-router-dom";

const DirectoryPage = () => {
    const accordionItems = [
        {
            id: 'section1',
            title: 'Centers Of Excellence',
            content: (
                <>
                    <div className="brighamButtonRow">
                        <Link to={'/bccc'} className="brighamButton">Backup Child Care Center</Link>
                        <Link to={'/copm'} className="brighamButton">Center of Pain Medicine</Link>
                        <Link to={'/cacc'} className="brighamButton">Crohn's and Colitis Center</Link>
                    </div>
                    <div className="brighamButtonRow">
                        <Link to={'/ec'} className="brighamButton">Endoscopy Center</Link>
                        <Link to={'/gsea'} className="brighamButton">Gretchen S. and Edward A. Fish Center for Women's Health</Link>
                        <Link to={'/occ'} className="brighamButton">Osher Clinical Center for Integrative Health</Link>
                    </div>
                </>
            )
        },
        {
            id: 'section2',
            title: 'General Patient Care',
            content: (
                <>
                    <div className="brighamButtonRow">
                        <Link to={'/aci'} className="brighamButton">Allergy and Clinical Immunology</Link>
                        <Link to={'/Laboratory'} className="brighamButton">Laboratory</Link>
                        <Link to={'/Multi-Speciality'} className="brighamButton">Multi-Speciality Clinic</Link>
                    </div>
                    <div className="brighamButtonRow">
                        <Link to={'/pfs'} className="brighamButton">Patient Financial Services</Link>
                        <Link to={'/Pharmacy'} className="brighamButton">Pharmacy</Link>
                        <Link to={'/Radiology'} className="brighamButton">Radiology</Link>
                    </div>
                    <div className="brighamButtonRow">
                        <Link to={'/MRI'} className="brighamButton">Radiology, MRI/CT scan</Link>
                        <Link to={'/rehab'} className="brighamButton">Rehabilitation Services</Link>
                    </div>
                </>
            )
        },
        {
            id: 'section3',
            title: 'Brigham Groups and Associates',
            content: (
                <>
                    <div className="brighamButtonRow">
                        <Link to={'/bda'} className="brighamButton">Brigham Dermatology Associates</Link>
                        <Link to={'/bogg'} className="brighamButton">Brigham Obstetrics and Gynecology Group</Link>
                        <Link to={'/bpg'} className="brighamButton">Brigham Physicians Group</Link>
                    </div>
                    <div className="brighamButtonRow">
                        <Link to={'/bps'} className="brighamButton">Brigham Psychiatric Specialities</Link>
                    </div>
                </>
            )
        }
    ];

    return (
        <body>
            <div>
                <h2 className={"directoryHeader"}>Brigham and Women's Directory</h2>

                {accordionItems.map((item) => (
                    <div key={item.id} className="accordion-container">
                        <input
                            type="checkbox"
                            id={item.id}
                            className="accordion"
                        />
                        <label htmlFor={item.id} className="accordion-label">
                            {item.title}
                        </label>
                        <div className="panel">
                            {item.content}
                        </div>
                    </div>
                ))}

        </div>
        </body>
    );
};

export default DirectoryPage;
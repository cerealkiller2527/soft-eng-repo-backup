import React from 'react';
import '../styles/directoryStyles.css';

const DirectoryPage = () => {
    const accordionItems = [
        {
            id: 'section1',
            title: 'Centers Of Excellence',
            content: (
                <>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Backup Child Care Center</button>
                        <button className="brighamButton">Center of Pain Medicine</button>
                        <button className="brighamButton">Crohn's and Colitis Center</button>
                    </div>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Endoscopy Center</button>
                        <button className="brighamButton">Gretchen S. and Edward A. Fish Center for Women's Health</button>
                        <button className="brighamButton">Osher Clinical Center for Integrative Health</button>
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
                        <button className="brighamButton">Allergy and Clinical Immunology</button>
                        <button className="brighamButton">Laboratory</button>
                        <button className="brighamButton">Multi-Specialty Clinic</button>
                    </div>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Patient Financial Services</button>
                        <button className="brighamButton">Pharmacy</button>
                        <button className="brighamButton">Radiology</button>
                    </div>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Radiology, MRI/CT scan</button>
                        <button className="brighamButton">Rehabilitation Services</button>
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
                        <button className="brighamButton">Brigham Dermatology Associates</button>
                        <button className="brighamButton">Brigham Obstetrics and Gynecology Group</button>
                        <button className="brighamButton">Brigham Physicians Group</button>
                    </div>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Brigham Psychiatric Specialities</button>
                    </div>
                </>
            )
        }
    ];

    return (
        <div className="directory-page">
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

            <div className="directory-image">
                <img
                    src="/placeholderDirectory.jpeg"
                    alt="Brigham and Women's Hospital"
                    className="directory-image"
                />
            </div>

        </div>
    );
};

export default DirectoryPage;
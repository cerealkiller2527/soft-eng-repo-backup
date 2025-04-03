import React from 'react';
import '../styles/directoryStyles.css';

const DirectoryPage = () => {
    const accordionItems = [
        {
            id: 'section1',
            title: 'Centers Of Exellence',
            content: <button className={"brighamButton"}>Test</button>
        },
        {
            id: 'section2',
            title: 'General Patient Care',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation...'
        },
        {
            id: 'section3',
            title: 'Section 3',
            content: 'Brigham Groups and Associates'
        }
    ];

    return (
        <>
            <h1>Directory</h1>

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
                        <p>{item.content}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DirectoryPage;
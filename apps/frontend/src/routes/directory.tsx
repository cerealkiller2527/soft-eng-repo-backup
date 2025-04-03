import React from 'react';
import '../styles/directoryStyles.css';

const DirectoryPage = () => {
    const accordionItems = [
        {
            id: 'section1',
            title: 'Centers Of Exellence',
            content: (
                <>
                    <div className="brighamButtonRow">
                        <button className="brighamButton">Test 1</button>
                        <button className="brighamButton">Test 2</button>
                        <button className="brighamButton">Test 3</button>
                    </div>
                </>
            )
        },
        {
            id: 'section2',
            title: 'General Patient Care',
            content: 'TEST'
        },
        {
            id: 'section3',
            title: 'Brigham Groups and Associates',
            content: 'TEST'
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
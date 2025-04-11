import React, { useEffect, useState } from 'react';
import '../../styles/directoryPagesStyles.css';
import { fetchDepartmentBySlug } from '../../database/trpc';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Define DirectoryItem interface
interface DirectoryItem {
    id: string;
    title: string;
    description?: string;
    contactInfo?: {
        phone?: string;
        location?: string;
        address?: string;
    };
    services?: string[];
}

// Define Department Service interface
interface DepartmentService {
    service: {
        name: string;
    };
}

const Radiology = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [department, setDepartment] = useState<DirectoryItem | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchDepartmentBySlug('radiology');
                console.log("Radiology data loaded:", data);
                if (data) {
                    setDepartment({
                        id: data.id?.toString() || 'unknown',
                        title: data.name || 'Radiology',
                        description: data.description || '',
                        contactInfo: {
                            phone: data.phoneNumber,
                            location: data.Location ? `Floor ${data.Location.floor}, Suite ${data.Location.suite}` : undefined,
                            address: data.building?.address
                        },
                        services: data.DepartmentServices?.map((ds: DepartmentService) => ds.service?.name).filter(Boolean) || []
                    });
                } else {
                    setError('Department not found');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching radiology department:', err);
                setError('Failed to load department data');
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 flex items-center justify-center">
                    <p>Loading Radiology Department data...</p>
                </div>
                <Footer />
            </div>
        );
    }
    
    if (error || !department) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 flex items-center justify-center">
                    <div className="bg-red-100 p-4 rounded">
                        <p className="text-red-700">{error || 'Department not found'}</p>
                        <p className="mt-2">Try refreshing the page or contact support if this issue persists.</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
            <Navbar />
            <div className="flex-grow p-4 max-w-4xl mx-auto">
                <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                    {department.title}
                </h1>
                <div className="h-px bg-[#012D5A]/20 w-full mb-6"></div>
                
                <div className="service-content">
                    {department.description && <p className="mb-6">{department.description}</p>}
                    
                    {department.contactInfo && (
                        <div className="mt-8">
                            <h2 className="text-xl font-medium text-[#012D5A] mb-2">
                                Contact Information
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-md">
                                {department.contactInfo.phone && (
                                    <p className="mb-2"><strong>Phone:</strong> {department.contactInfo.phone}</p>
                                )}
                                {department.contactInfo.location && (
                                    <p className="mb-2"><strong>Location:</strong> {department.contactInfo.location}</p>
                                )}
                                {department.contactInfo.address && (
                                    <p className="mb-2"><strong>Address:</strong> {department.contactInfo.address}</p>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {department.services && department.services.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-medium text-[#012D5A] mb-2">
                                Services Offered
                            </h2>
                            <ul className="list-disc pl-6">
                                {department.services.map((item: string, index: number) => (
                                    <li key={index} className="mb-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Radiology;
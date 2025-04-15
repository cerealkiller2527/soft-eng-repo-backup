import React, { useState, useEffect } from 'react';
import { fetchAllDepartments, checkPrismaModels } from '../database/trpc';



// NOTE FROM WILL: This page is redundant now since we no longer call it in directory, I'm leaving it here
// in case you need it to debug something again

// Define department interfaces
interface DepartmentService {
    service: {
        name: string;
    };
}

interface DepartmentLocation {
    floor: number;
    suite: string;
}

interface Building {
    address: string;
}

interface Department {
    id: number;
    name: string;
    description?: string;
    phoneNumber: string;
    Location?: DepartmentLocation;
    building?: Building;
    DepartmentServices?: DepartmentService[];
}

interface DirectoryItem {
    id: string;
    title: string;
    description: string;
    category: 'excellence' | 'patient-care' | 'brigham-groups';
    contactInfo: {
        phone?: string;
        location?: string;
        address?: string;
    };
    services: string[];
}

/**
 * Debug component to visualize directory data loading
 */
const DirectoryDebug: React.FC = () => {
    // Set up state
    const [directoryItems, setDirectoryItems] = useState<DirectoryItem[]>([]);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [directoryError, setDirectoryError] = useState<Error | null>(null);
    
    const [modelInfo, setModelInfo] = useState<Record<string, unknown>>(null);
    const [isLoadingModels, setIsLoadingModels] = useState(true);
    const [modelError, setModelError] = useState<Error | null>(null);
    
    // Load data on mount
    useEffect(() => {
        fetchDirectoryData();
        fetchModelInfo();
    }, []);
    
    // Function to fetch directory data
    const fetchDirectoryData = async () => {
        setIsLoadingItems(true);
        try {
            const data = await fetchAllDepartments();
            
            // Map the departments to DirectoryItems similar to the service code
            const mappedData = data.map((dept: Department) => ({
                id: dept.id.toString(),
                title: dept.name,
                description: dept.description || '',
                category: categorizeDepartment(dept),
                contactInfo: {
                    phone: dept.phoneNumber,
                    location: dept.Location ? `Floor ${dept.Location.floor}, Suite ${dept.Location.suite}` : undefined,
                    address: dept.building?.address
                },
                services: dept.DepartmentServices?.map((ds: DepartmentService) => ds.service?.name).filter(Boolean) || []
            }));
            
            setDirectoryItems(mappedData);
            setDirectoryError(null);
        } catch (error) {
            console.error("Error loading directory data:", error);
            setDirectoryError(error instanceof Error ? error : new Error('Unknown error'));
        } finally {
            setIsLoadingItems(false);
        }
    };
    
    // Function to categorize departments
    function categorizeDepartment(department: Department): 'excellence' | 'patient-care' | 'brigham-groups' {
        if (!department || !department.name) {
            return 'patient-care'; // Default
        }
    
        const name = department.name.toLowerCase();
        
        if (name.includes('center') || name.includes('fish') || name.includes('osher')) {
            return 'excellence';
        }
        
        if (name.includes('brigham')) {
            return 'brigham-groups';
        }
        
        return 'patient-care';
    }
    
    // Function to fetch model info
    const fetchModelInfo = async () => {
        setIsLoadingModels(true);
        try {
            const data = await checkPrismaModels();
            setModelInfo(data);
            setModelError(null);
        } catch (error) {
            console.error("Error loading model info:", error);
            setModelError(error instanceof Error ? error : new Error('Unknown error'));
        } finally {
            setIsLoadingModels(false);
        }
    };
    
    // Function to format error details
    const formatError = (error: Error & { data?: { message?: string; code?: string; cause?: unknown } }) => {
        if (!error) return 'No error';
        
        // Extract TRPC error data if available
        const trpcData = error.data || {};
        const message = error.message || trpcData.message || 'Unknown error';
        const code = trpcData.code || 'UNKNOWN';
        const cause = trpcData.cause;
        
        return (
            <div className="error-details">
                <p><strong>Error Type:</strong> {code}</p>
                <p><strong>Message:</strong> {message}</p>
                {cause && (
                    <div>
                        <p><strong>Cause:</strong></p>
                        <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-red-50 rounded">
                            {JSON.stringify(cause, null, 2)}
                        </pre>
                    </div>
                )}
                <p className="mt-2">
                    <strong>Full Error:</strong>
                </p>
                <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-red-50 rounded">
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        );
    };
    
    if (isLoadingItems && isLoadingModels) {
        return <div className="bg-blue-100 p-4 m-4 rounded">Loading directory data and model info...</div>;
    }
    
    return (
        <div className="bg-gray-100 p-4 m-4 rounded">
            <h3 className="font-bold text-lg mb-4">Directory API Debug</h3>
            
            {/* Directory data section */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Directory Data</h4>
                    <button 
                        onClick={fetchDirectoryData} 
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                        Retry
                    </button>
                </div>
                
                {directoryError ? (
                    <div className="bg-red-100 p-4 mt-2 rounded">
                        <h5 className="font-bold text-red-800">Directory Error</h5>
                        {formatError(directoryError)}
                    </div>
                ) : isLoadingItems ? (
                    <div className="bg-blue-50 p-2 mt-2 rounded">Loading...</div>
                ) : !directoryItems || directoryItems.length === 0 ? (
                    <div className="bg-yellow-100 p-2 mt-2 rounded">No directory data found</div>
                ) : (
                    <div className="bg-green-100 p-2 mt-2 rounded">
                        <p>Successfully loaded {directoryItems.length} directory items</p>
                        <details>
                            <summary className="cursor-pointer font-semibold mt-2">View Data</summary>
                            <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-green-50 rounded max-h-64 overflow-auto">
                                {JSON.stringify(directoryItems, null, 2)}
                            </pre>
                        </details>
                    </div>
                )}
            </div>
            
            {/* Model info section */}
            <div>
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Prisma Models</h4>
                    <button 
                        onClick={fetchModelInfo} 
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                        Retry
                    </button>
                </div>
                
                {modelError ? (
                    <div className="bg-red-100 p-4 mt-2 rounded">
                        <h5 className="font-bold text-red-800">Model Query Error</h5>
                        {formatError(modelError)}
                    </div>
                ) : isLoadingModels ? (
                    <div className="bg-blue-50 p-2 mt-2 rounded">Loading model info...</div>
                ) : !modelInfo ? (
                    <div className="bg-yellow-100 p-2 mt-2 rounded">No model info available</div>
                ) : (
                    <div className="bg-green-100 p-2 mt-2 rounded">
                        <p>Successfully retrieved Prisma model information</p>
                        <details>
                            <summary className="cursor-pointer font-semibold mt-2">View Models</summary>
                            <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-green-50 rounded max-h-64 overflow-auto">
                                {JSON.stringify(modelInfo, null, 2)}
                            </pre>
                        </details>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectoryDebug; 
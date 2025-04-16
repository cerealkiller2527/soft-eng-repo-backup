import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from "../database/trpc.ts";

const TestDirectory = () => {
    const trpc = useTRPC();

    const { data: departments, isLoading, error } = useQuery(
        trpc.directories.getAllDepartments.queryOptions()
    );

    if (isLoading) {
        return <div>Loading departments...</div>;
    }

    if (error) {
        return <div>Error loading departments: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Test Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments?.map((dept) => (
                    <div key={dept.id} className="border rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                        <p className="text-gray-600 mb-2">Phone: {dept.phoneNumber}</p>
                        
                        {dept.DepartmentServices && dept.DepartmentServices.length > 0 && (
                            <div className="mb-2">
                                <strong className="block mb-1">Services:</strong>
                                <ul className="list-disc list-inside">
                                    {dept.DepartmentServices.map((service, id) => (
                                        <li key={id} className="text-gray-700">{service.service.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {dept.node && dept.node.length > 0 && (
                            <div>
                                <strong className="block mb-1">Locations:</strong>
                                <ul className="list-disc list-inside">
                                    {dept.node.map((loc, id) => (
                                        <li key={id} className="text-gray-700">
                                            Suite {loc.suite}, Floor {loc.floor}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestDirectory; 
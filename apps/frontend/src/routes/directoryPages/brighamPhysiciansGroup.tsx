import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../../database/trpc.ts';

const brighamsPhysiciansGroup = () => {
    const trpc = useTRPC();

    const department = useQuery(
        trpc.department.getDepartment.queryOptions({
            name: 'Brigham Physicians Group (BPG)',
        })
    );

    return (
        <div>
            <h2>Welcome to the Brighams Physicians Group!</h2>
            {department.data ? (
                <div>
                    <p>
                        <strong>Phone Number:</strong> {department.data.phoneNumber}
                    </p>

                    <div>
                        <strong>Services:</strong>
                        <ul>
                            {department.data.DepartmentServices?.map((service, id) => (
                                <li key={id}>{service.service.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <strong>Locations:</strong>
                        <ul>
                            {department.data.Location?.map((loc, id) => (
                                <li key={id}>
                                    Suite {loc.suite}, Floor {loc.floor}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading or no department found.</p>
            )}
        </div>
    );
};

export default brighamsPhysiciansGroup;

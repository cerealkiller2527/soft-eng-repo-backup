import React from "react";
import {useState} from "react";
import TransportRequestForm from "../components/TransportRequestForm.tsx";
import TransportCard from "../components/TransportCard.tsx"

const requestDashboard = () => {

    type TransportRequest = {
        patientName: string;
        priority: string;
        transportType: string;
        pickupTransport: string;
        dropoffTransport: string;
        additionalNotes: string;
    };
    const [requests, setRequests] = useState<TransportRequest[]>([]);

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Request Dashboard</h2>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
                        <TransportRequestForm onSubmit={addRequest} />
                        <button
                            onClick={() => setShowForm(false)}
                            className="mt-4 w-full bg-red-500 text-white p-2 rounded-xl hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="grid gap-4 mt-4">
                {requests.map((req, i) => (
                    <div key={i} className="border p-4 rounded-xl shadow">
                        <p><strong>Patient:</strong> {req.patientName}</p>
                        <p><strong>Priority:</strong> {req.priority}</p>
                        <p><strong>Transport:</strong> {req.transportType}</p>
                        <p><strong>Pickup:</strong> {req.pickupTransport}</p>
                        <p><strong>Dropoff:</strong> {req.dropoffTransport}</p>
                        <p><strong>Notes:</strong> {req.additionalNotes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default requestDashboard;
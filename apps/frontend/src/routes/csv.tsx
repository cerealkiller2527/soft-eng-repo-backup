import React, { useState, useRef } from 'react';
import Layout from "../components/Layout";
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import Papa from 'papaparse';

// Simple interface for CSV row data
interface DeptRow {
    'Node Type': string;
    'Node Description': string;
    'Floor': string;
    'Suite': string;
    'Node (lat,long)': string;
    'Department Name': string;
    'Phone Number': string;
    'Department Description': string;
    'Services': string;
    'Building Name': string;
    'Building Address': string;
    'Building Phone Number': string;
    'Edge Connections (from -> to)': string;
    [key: string]: string; // Allow string indexing
}

export default function CSV() {
    const [file, setFile] = useState<File | null>(null);
    const [csvText, setCsvText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [previewData, setPreviewData] = useState<DeptRow[]>([]);

    // ref and trigger for hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => fileInputRef.current?.click();

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.length) return;

        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setMessage('');

        const text = await selectedFile.text();
        setCsvText(text);

        Papa.parse<DeptRow>(text, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setPreviewData(result.data);
            },
            error: (err: Error) => {
                console.error(err);
                setMessage('Could not parse file');
            },
        });
    }

    async function importCSV() {
        if (!csvText) return;
        setLoading(true);
        setMessage('');
        try {
            await fetch('/api/trpc/csv.clearDatabase', { method: 'POST' });
            const response = await fetch('/api/trpc/csv.importCSV', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ json: csvText }),
            });
            if (!response.ok) throw new Error('Import failed');
            setMessage('Import successful');
        } catch {
            setMessage('Import failed');
        } finally {
            setLoading(false);
        }
    }

    async function exportCSV() {
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('/api/trpc/csv.exportCSV', { method: 'POST' });
            if (!response.ok) throw new Error('Export failed');
            const { result } = await response.json();
            const blob = new Blob([result.data], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'departments.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setMessage('Export successful');
        } catch {
            setMessage('Export failed');
        } finally {
            setLoading(false);
        }
    }

    const buttonClass = `
    bg-[#0057B8] text-white
    hover:bg-white hover:text-[#0057B8]
    hover:ring-2 hover:ring-offset-1 hover:ring-[#F6BD38]
  `;


    return (
        <Layout>
        <div className="min-h-screen flex flex-col bg-[#f2f2f2]">
            <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-3xl font-bold text-[#0057B8] mb-8">
                    Department CSV Import/Export
                </h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Import CSV</h2>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <Button onClick={handleClick} className={buttonClass + " mb-4"}>
                        Choose CSV
                    </Button>

                    {previewData.length > 0 && (
                        <div className="mb-4 overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-2">Preview</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Showing {previewData.length} rows. Importing will clear existing records.
                            </p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Node Type</TableHead>
                                        <TableHead>Node Description</TableHead>
                                        <TableHead>Edge Connections (from → to)</TableHead>
                                        <TableHead>Node (lat,long)</TableHead>
                                        <TableHead>Floor</TableHead>
                                        <TableHead>Suite</TableHead>
                                        <TableHead>Building Name</TableHead>
                                        <TableHead>Building Address</TableHead>
                                        <TableHead>Building Phone Number</TableHead>
                                        <TableHead>Department Name</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Department Description</TableHead>
                                        <TableHead>Services</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {previewData.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{row['Node Type']}</TableCell>
                                            <TableCell>{row['Node Description']}</TableCell>
                                            <TableCell>{row['Edge Connections (from -> to)']}</TableCell>
                                            <TableCell>{row['Node (lat,long)']}</TableCell>
                                            <TableCell>{row['Floor']}</TableCell>
                                            <TableCell>{row['Suite']}</TableCell>
                                            <TableCell>{row['Building Name']}</TableCell>
                                            <TableCell>{row['Building Address']}</TableCell>
                                            <TableCell>{row['Building Phone Number']}</TableCell>
                                            <TableCell>{row['Department Name']}</TableCell>
                                            <TableCell>{row['Phone Number']}</TableCell>
                                            <TableCell>{row['Department Description']}</TableCell>
                                            <TableCell>{row['Services']}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <Button onClick={importCSV} disabled={loading || !file}>
                            {loading ? 'Working...' : 'Import CSV'}
                        </Button>
                        <Button onClick={exportCSV} disabled={loading} className={buttonClass}>
                            {loading ? 'Working...' : 'Export CSV'}
                        </Button>
                    </div>

                    {message && (
                        <p className={`mt-3 ${message.toLowerCase().includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
        </Layout>
    );
}

import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import { z } from 'zod';
import { useTRPC } from '../database/trpc.ts';
import { useMutation } from '@tanstack/react-query';

const nodeTypeEnum = z.enum(['Entrance', 'Intermediary', 'Staircase', 'Elevator', 'Location', 'Help_Desk']);

const CSVRowSchema = z.object({
    'Building ID': z.string().optional(),
    'Building Name': z.string(),
    'Building Address': z.string(),
    'Building Phone': z.string(),
    'Location ID': z.string().optional(),
    'Floor': z.string(),
    'Suite': z.string().optional(),
    'Node ID': z.string().optional(),
    'Node Type': nodeTypeEnum,
    'Node Description': z.string(),
    'Node Coordinates': z.string(),
    'From Edges': z.string(),
    'To Edges': z.string(),
    'Department ID': z.string().optional(),
    'Department Name': z.string(),
    'Department Phone': z.string(),
    'Department Description': z.string().optional(),
    'Services': z.string()
});

type CSVRow = z.infer<typeof CSVRowSchema>;

const allColumns = [
    // Building Information
    { key: 'Building Name', label: 'Building Name', group: 'Building' },
    { key: 'Building Address', label: 'Building Address', group: 'Building' },
    { key: 'Building Phone', label: 'Building Phone', group: 'Building' },
    { key: 'Building ID', label: 'Building ID', group: 'Building' },

    // Location Information
    { key: 'Floor', label: 'Floor', group: 'Location' },
    { key: 'Suite', label: 'Suite', group: 'Location' },
    { key: 'Location ID', label: 'Location ID', group: 'Location' },

    // Node Information
    { key: 'Node ID', label: 'Node ID', group: 'Node' },
    { key: 'Node Type', label: 'Node Type', group: 'Node' },
    { key: 'Node Description', label: 'Node Description', group: 'Node' },
    { key: 'Node Coordinates', label: 'Node Coordinates', group: 'Node' },
    { key: 'From Edges', label: 'From Edges', group: 'Node' },
    { key: 'To Edges', label: 'To Edges', group: 'Node' },

    // Department Information
    { key: 'Department ID', label: 'Department ID', group: 'Department' },
    { key: 'Department Name', label: 'Department Name', group: 'Department' },
    { key: 'Department Phone', label: 'Department Phone', group: 'Department' },
    { key: 'Department Description', label: 'Department Description', group: 'Department' },
    { key: 'Services', label: 'Services', group: 'Department' }
] as const;

const baseColumns = ['Building Name', 'Building Phone', 'Floor', 'Node ID', 'Node Type', 'Department Name', 'Department Description'] as const;

export default function CSV() {
    const [file, setFile] = useState<File | null>(null);
    const [csvText, setCsvText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [previewData, setPreviewData] = useState<CSVRow[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [filters, setFilters] = useState({
        building: '',
        floor: '',
        nodeType: '',
        department: ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => fileInputRef.current?.click();


    const trpc = useTRPC();

    const importCSVMutation = useMutation(
        trpc.csv.importCSV.mutationOptions({
            onSuccess: () => {
                setMessage('Import successful');
            },
            onError: (error) => {
                setMessage(error instanceof Error ? error.message : 'Import failed');
            },
        })
    );

    const exportCSVMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/trpc/csv.exportCSV', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Export failed');

            const result = await response.json();
            const csvData = result.result.data;

            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'departments.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },
        onError: (error) => {
            setMessage(error instanceof Error ? error.message : 'Export failed');
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setMessage('');

        const text = await selectedFile.text();
        setCsvText(text);

        Papa.parse<CSVRow>(text, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                try {
                    const validatedData = result.data.map(row => CSVRowSchema.parse(row));
                    setPreviewData(validatedData);
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        setMessage(`Validation error: ${error.errors[0].message}`);
                    } else {
                        setMessage('Invalid CSV format');
                    }
                }
            },
            error: () => {
                setMessage('Could not parse file');
            }
        });
    };

    const handleImport = async () => {
        if (!csvText) return;

        setLoading(true);
        setMessage('');

        try {
            await importCSVMutation.mutateAsync({ json: csvText });
        } catch (err) {
            setMessage(err instanceof Error ? err.message : 'Import failed');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        setLoading(true);
        setMessage('');

        try {
            await exportCSVMutation.mutateAsync();
        } catch (err) {
            setMessage(err instanceof Error ? err.message : 'Export failed');
        } finally {
            setLoading(false);
        }
    };

    const filteredData = useMemo(() => {
        return previewData.filter(row => {
            const matchesBuilding = !filters.building ||
                row['Building Name'].toLowerCase().includes(filters.building.toLowerCase());
            const matchesFloor = !filters.floor ||
                row['Floor'].toString().includes(filters.floor);
            const matchesNodeType = !filters.nodeType ||
                row['Node Type'] === filters.nodeType;
            const matchesDepartment = !filters.department ||
                row['Department Name'].toLowerCase().includes(filters.department.toLowerCase());

            return matchesBuilding && matchesFloor && matchesNodeType && matchesDepartment;
        });
    }, [previewData, filters]);

    useEffect(() => {
        if (selectedColumns.length === 0) {
            setSelectedColumns([...baseColumns]);
        }
    }, []);

    const visibleColumns = useMemo(() => {
        return allColumns
            .filter(column => selectedColumns.includes(column.key))
            .sort((a, b) => {
                // First sort by group
                const groupOrder = ['Building', 'Location', 'Node', 'Department'];
                const groupComparison = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
                if (groupComparison !== 0) return groupComparison;

                // Then sort by original order within group
                return allColumns.findIndex(col => col.key === a.key) -
                    allColumns.findIndex(col => col.key === b.key);
            });
    }, [selectedColumns]);

    return (
        <Layout>
            <div className="min-h-screen flex flex-col bg-[#f2f2f2]">
                <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
                    <h1 className="text-3xl font-bold text-[#0057B8] mb-8">
                        Department CSV Import/Export
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Import CSV</h2>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-4 items-center">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button onClick={handleClick} className="
                                      bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                                      hover:text-[#012D5A] hover:bg-white
                                      hover:ring-2 hover:ring-offset-1 hover:ring-offset-white hover:ring-[#F6BD38]
                                    ">
                                    Choose CSV
                                </Button>
                                <span className="ml-2 text-sm text-gray-500 truncate max-w-xs">
                                  {file ? file.name : "No file selected"}
                                </span>
                                <Button
                                    onClick={handleImport}
                                    disabled={loading || !file}
                                    className="
                                      ml-auto bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                                      hover:text-[#012D5A] hover:bg-white
                                      hover:ring-2 hover:ring-offset-1 hover:ring-offset-white hover:ring-[#F6BD38]
                                    "
                                >
                                    {loading ? "Working..." : "Import CSV"}
                                </Button>
                                <Button
                                    onClick={handleExport}
                                    disabled={loading}
                                    className="
                                      bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                                      hover:text-[#012D5A] hover:bg-white
                                      hover:ring-2 hover:ring-offset-1 hover:ring-offset-white hover:ring-[#F6BD38]
                                    "
                                >
                                    {loading ? "Working..." : "Export CSV"}
                                </Button>
                            </div>
                            {message && (
                                <div className={`p-4 rounded-md ${
                                    message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {message}
                                </div>
                            )}
                        </div>

                        {previewData.length > 0 && (
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Preview</h3>
                                    <Button
                                        onClick={() => setShowColumnSelector(!showColumnSelector)}
                                        className="
                                      bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
                                      hover:text-[#012D5A] hover:bg-white
                                      hover:ring-2 hover:ring-offset-1 hover:ring-offset-white hover:ring-[#F6BD38]
                                    "
                                    >
                                        {showColumnSelector ? "Hide Columns" : "Select Columns"}
                                    </Button>
                                </div>

                                {showColumnSelector && (
                                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-sm font-medium text-gray-700">Select Columns to Display</h4>
                                            <Button
                                                onClick={() => {
                                                    if (selectedColumns.length === allColumns.length) {
                                                        setSelectedColumns([...baseColumns]);
                                                    } else {
                                                        setSelectedColumns(allColumns.map(col => col.key));
                                                    }
                                                }}
                                                variant="outline"
                                                size="sm"
                                                className="whitespace-nowrap"
                                            >
                                                {selectedColumns.length === allColumns.length ? "Base Columns" : "All Columns"}
                                            </Button>
                                        </div>
                                        <div className="space-y-4">
                                            {['Building', 'Location', 'Node', 'Department'].map(group => (
                                                <div key={group} className="space-y-2">
                                                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{group}</h5>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                                        {allColumns
                                                            .filter(column => column.group === group)
                                                            .map(column => (
                                                                <div key={column.key} className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={column.key}
                                                                        checked={selectedColumns.includes(column.key)}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                setSelectedColumns([...selectedColumns, column.key]);
                                                                            } else {
                                                                                setSelectedColumns(selectedColumns.filter(col => col !== column.key));
                                                                            }
                                                                        }}
                                                                        className="h-4 w-4 text-[#0057B8] focus:ring-[#0057B8] border-gray-300 rounded"
                                                                    />
                                                                    <label htmlFor={column.key} className="text-sm text-gray-700">
                                                                        {column.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Building
                                        </label>
                                        <input
                                            type="text"
                                            value={filters.building}
                                            onChange={(e) => setFilters(prev => ({ ...prev, building: e.target.value }))}
                                            placeholder="Filter by building"
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Floor
                                        </label>
                                        <input
                                            type="text"
                                            value={filters.floor}
                                            onChange={(e) => setFilters(prev => ({ ...prev, floor: e.target.value }))}
                                            placeholder="Filter by floor"
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Node Type
                                        </label>
                                        <select
                                            value={filters.nodeType}
                                            onChange={(e) => setFilters(prev => ({ ...prev, nodeType: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-md"
                                        >
                                            <option value="">All Types</option>
                                            {nodeTypeEnum.options.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            value={filters.department}
                                            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                                            placeholder="Filter by department"
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">
                                    Showing {filteredData.length} of {previewData.length} rows
                                </p>

                                <div className="overflow-auto max-h-[500px] border rounded-lg">
                                    <div className="min-w-full inline-block align-middle">
                                        <Table>
                                            <TableHeader className="sticky top-0 bg-[#012D5A] text-white hover:bg-[#012D5A] z-10">
                                                <TableRow className="hover:bg-[#012D5A]">
                                                    {visibleColumns.map(column => (
                                                        <TableHead key={column.key} className="text-white whitespace-nowrap">
                                                            {column.label}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredData.map((row, i) => (
                                                    <TableRow key={i} className="bg-white even:bg-gray-50">
                                                        {visibleColumns.map(column => (
                                                            <TableCell key={column.key} className="whitespace-nowrap">
                                                                {row[column.key as keyof CSVRow] || ''}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
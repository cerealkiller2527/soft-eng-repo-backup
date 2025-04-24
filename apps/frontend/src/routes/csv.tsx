import React, { useState, useRef, useMemo, useEffect } from 'react';
import Layout from "../components/Layout";
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Papa from 'papaparse';
import { z } from 'zod';
import { useTRPC } from '../database/trpc.ts';
import { useMutation } from '@tanstack/react-query';
import {csvSchema} from "../../../../share/Schemas.ts";

// Define nodeType enum to match Prisma schema
const nodeTypeEnum = z.enum([
    "Entrance",
    "Intermediary",
    "Staircase",
    "Elevator",
    "Location",
    "Help_Desk",
]);

type CSVRow = z.infer<typeof csvSchema>;

interface ColumnDefinition {
    key: keyof CSVRow;
    label: string;
    group: 'Building' | 'Location' | 'Node' | 'Department';
}

const allColumns: ColumnDefinition[] = [
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

const baseColumns: (keyof CSVRow)[] = ['Building Name', 'Floor', 'Node ID', 'Node Type', 'Department Name', 'Department Description'] as const;

// Update the select options to use the enum values
const nodeTypeOptions = nodeTypeEnum.options.map((type) => ({
    value: type,
    label: type,
}));

const columnGroups = ['Building', 'Location', 'Node', 'Department'] as const;

interface FilterConfig {
    key: keyof CSVRow;
    label: string;
    type: 'text' | 'select';
    options?: string[];
}

const filterableColumns: FilterConfig[] = [
    { key: 'Building Name', label: 'Building', type: 'text' },
    { key: 'Floor', label: 'Floor', type: 'text' },
    { key: 'Node Type', label: 'Node Type', type: 'select', options: nodeTypeEnum.options },
    { key: 'Department Name', label: 'Department', type: 'text' },
    { key: 'Building Phone', label: 'Phone', type: 'text' },
    { key: 'Node Description', label: 'Description', type: 'text' },
    { key: 'Suite', label: 'Suite', type: 'text' },
];

// Add this after the import section
const importWarning = "Warning: Importing a new CSV will delete all existing data in the database. Please make sure you have exported your current data if you need to keep it.";

// Define a base style for the main action buttons
const actionButtonStyle = `
    bg-[#012D5A] text-white font-medium py-2 px-4 rounded-md
    hover:text-[#012D5A] hover:bg-white
    hover:ring-2 hover:ring-offset-1 hover:ring-offset-white hover:ring-[#F6BD38]
`;

export default function CSV() {
    const [file, setFile] = useState<File | null>(null);
    const [csvText, setCsvText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [previewData, setPreviewData] = useState<CSVRow[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<(keyof CSVRow)[]>([]);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
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
                    const validatedData = result.data.map(row => csvSchema.parse(row));
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
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                const columnValue = String(row[key as keyof CSVRow] || '').toLowerCase();
                return columnValue.includes(value.toLowerCase());
            });
        });
    }, [previewData, filters]);

    useEffect(() => {
        if (selectedColumns.length === 0) {
            setSelectedColumns(baseColumns);
        }
    }, []);

    const visibleColumns = useMemo(() => {
        return allColumns
            .filter(column => selectedColumns.includes(column.key))
            .sort((a, b) => {
                const groupOrder = columnGroups;
                const groupComparison = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
                if (groupComparison !== 0) return groupComparison;
                return allColumns.findIndex(col => col.key === a.key) - 
                       allColumns.findIndex(col => col.key === b.key);
            });
    }, [selectedColumns]);

    const handleColumnToggle = (columnKey: keyof CSVRow) => {
        setSelectedColumns(prev => {
            const newColumns = prev.includes(columnKey)
                ? prev.filter(key => key !== columnKey)
                : [...prev, columnKey];
            
            // Update filters when columns change
            const newFilters = { ...filters };
            if (!newColumns.includes(columnKey)) {
                delete newFilters[columnKey];
            }
            setFilters(newFilters);
            
            return newColumns;
        });
    };

    const toggleAllColumns = () => {
        setSelectedColumns(
            selectedColumns.length === allColumns.length
                ? [...baseColumns]
                : allColumns.map(col => col.key)
        );
    };

    const renderColumnSelector = () => (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-700">Select Columns to Display</h4>
                <Button
                    onClick={toggleAllColumns}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                >
                    {selectedColumns.length === allColumns.length ? "Base Columns" : "All Columns"}
                </Button>
            </div>
            <div className="space-y-4">
                {columnGroups.map(group => (
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
                                            onChange={() => handleColumnToggle(column.key)}
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
    );

    const renderFilters = () => {
        const activeFilters = filterableColumns.filter(config => 
            selectedColumns.includes(config.key)
        );

        if (activeFilters.length === 0) return null;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {activeFilters.map(config => (
                    <div key={config.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {config.label}
                        </label>
                        {config.type === 'select' ? (
                            <select
                                value={filters[config.key] || ''}
                                onChange={(e) => setFilters(prev => ({ ...prev, [config.key]: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">All {config.label}s</option>
                                {config.options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={filters[config.key] || ''}
                                onChange={(e) => setFilters(prev => ({ ...prev, [config.key]: e.target.value }))}
                                placeholder={`Filter by ${config.label.toLowerCase()}`}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderTable = () => (
        <div className="relative overflow-auto max-h-[500px] border rounded-lg pb-4">
            <Table className="min-w-full">
                <TableHeader className="sticky top-0 bg-[#012D5A] z-10">
                    <TableRow>
                        {visibleColumns.map(column => (
                            <TableHead 
                                key={column.key} 
                                className="text-white whitespace-nowrap px-4 py-2 font-medium h-10 min-w-[150px]"
                            >
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((row, i) => (
                        <TableRow key={i} className="bg-white even:bg-gray-50">
                            {visibleColumns.map(column => (
                                <TableCell 
                                    key={column.key} 
                                    className="whitespace-nowrap px-4 py-2 min-w-[150px]"
                                >
                                    {String(row[column.key] || '')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen flex flex-col bg-[#f2f2f2]">
                <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
                    <h1 className="text-3xl font-bold text-[#0057B8] mb-8">
                        Department CSV Import/Export
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-4 items-center">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button onClick={handleClick} className={actionButtonStyle}>
                                    Choose CSV
                                </Button>
                                <span className="text-sm text-gray-500 truncate max-w-xs">
                                    {file ? file.name : "No file selected"}
                                </span>
                                
                                <div className="text-sm text-yellow-600 flex items-center gap-1 ml-auto">
                                    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="whitespace-nowrap">Importing replaces data</span>
                                </div>

                                <Button
                                    onClick={handleImport}
                                    disabled={loading || !file}
                                    className={`${actionButtonStyle} ml-2`}
                                >
                                    {loading ? "Working..." : "Import CSV"}
                                </Button>
                                <Button
                                    onClick={handleExport}
                                    disabled={loading}
                                    className={actionButtonStyle}
                                >
                                    {loading ? "Working..." : "Export CSV"}
                                </Button>
                            </div>
                            {message && (
                                <div className={`p-4 rounded-md text-sm ${
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
                                        className={actionButtonStyle}
                                    >
                                        {showColumnSelector ? "Hide Columns" : "Select Columns"}
                                    </Button>
                                </div>

                                {showColumnSelector && renderColumnSelector()}
                                {renderFilters()}

                                <p className="text-sm text-gray-600 mb-4">
                                    Showing {filteredData.length} of {previewData.length} rows
                                </p>

                                {renderTable()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

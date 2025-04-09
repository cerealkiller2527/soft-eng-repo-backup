import React, { useState } from 'react';
import { useTRPC } from '../database/trpc';
import { useMutation } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface DepartmentRow {
  departmentId: string;
  departmentName: string;
  phoneNumber: string;
  locationId: string;
  floor: string;
  suite: string;
  buildingId: string;
  buildingName: string;
  buildingAddress: string;
  buildingPhoneNumber: string;
  serviceId: string;
  services: string;
}

const CSVPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<DepartmentRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const trpc = useTRPC();

  const importCSVMutation = useMutation(
    trpc.csv.importCSV.mutationOptions({
      onSuccess: (data) => {
        setImportSuccess(true);
        if (file) {
          file.text().then((text) => {
            const parsedData = parseCSVToArray(text);
            setCsvData(parsedData);
          });
        }
      },
      onError: (error) => {
        console.error('Import error:', error);
        setError('Failed to import CSV file. Please check the file format.');
      },
      onSettled: () => {
        setIsLoading(false);
      }
    })
  );

  const exportCSVMutation = useMutation(
    trpc.csv.exportCSV.mutationOptions({
      onSuccess: (csvText) => {
        // Create download link
        const blob = new Blob([csvText], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'department_export.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Display the exported data
        const parsedData = parseCSVToArray(csvText);
        setCsvData(parsedData);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('Export error:', error);
        setError('Failed to export CSV data.');
        setIsLoading(false);
      }
    })
  );

  const parseCSVToArray = (csvText: string): DepartmentRow[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const result: DepartmentRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const row: Partial<DepartmentRow> = {};
      
      headers.forEach((header, index) => {
        const cleanHeader = header.trim().replace(/"/g, '');
        let value = values[index] || '';
        value = value.trim().replace(/^"|"$/g, '');
        
        switch(cleanHeader) {
          case 'Department ID':
            row.departmentId = value;
            break;
          case 'Department Name':
            row.departmentName = value;
            break;
          case 'Phone Number':
            row.phoneNumber = value;
            break;
          case 'Location ID':
            row.locationId = value;
            break;
          case 'Floor':
            row.floor = value;
            break;
          case 'Suite':
            row.suite = value;
            break;
          case 'Building ID':
            row.buildingId = value;
            break;
          case 'Building Name':
            row.buildingName = value;
            break;
          case 'Building Address':
            row.buildingAddress = value;
            break;
          case 'Building Phone Number':
            row.buildingPhoneNumber = value;
            break;
          case 'Service ID':
            row.serviceId = value;
            break;
          case 'Services':
            row.services = value;
            break;
        }
      });
      
      result.push(row as DepartmentRow);
    }
    
    return result;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file to import');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const text = await file.text();
      importCSVMutation.mutate(text);
    } catch (err) {
      console.error('File reading error:', err);
      setError('Failed to read the CSV file.');
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    setIsLoading(true);
    setError(null);
    exportCSVMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-[#0057B8] mb-8">Department CSV Import & Export</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Import CSV</h2>
          <div className="mb-4">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-[#0057B8] file:text-white
                hover:file:bg-[#004795]"
            />
          </div>
          <button 
            onClick={handleImport}
            disabled={isLoading || !file}
            className="bg-[#0057B8] text-white py-2 px-4 rounded-md 
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Importing...' : 'Import CSV'}
          </button>
          {importSuccess && (
            <p className="mt-2 text-green-600">CSV imported successfully!</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Export CSV</h2>
          <button 
            onClick={handleExport}
            disabled={isLoading}
            className="bg-[#0057B8] text-white py-2 px-4 rounded-md 
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}
        
        {csvData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">CSV Data</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dept ID</th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building</th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{row.departmentId}</td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{row.departmentName}</td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{row.phoneNumber}</td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{`Floor ${row.floor}, Suite ${row.suite}`}</td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{row.buildingName}</td>
                    <td className="py-2 px-3 border-b border-gray-200 text-sm">{row.services}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CSVPage; 
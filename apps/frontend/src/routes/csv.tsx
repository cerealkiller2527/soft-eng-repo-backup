import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Papa from 'papaparse';
import { Button } from "../components/ui/button"

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
      // First clear database
      await fetch('/api/trpc/csv.clearDatabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      // Then import CSV
      const response = await fetch('/api/trpc/csv.importCSV', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: csvText })
      });
      
      if (!response.ok) throw new Error('Import failed');
      
      setMessage('Import successful');
    } catch (err) {
      setMessage('Import failed');
    } finally {
      setLoading(false);
    }
  }

  async function exportCSV() {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/trpc/csv.exportCSV', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const result = await response.json();
      const csvData = result.result.data;
      
      // Download file
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'departments.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setMessage('Export failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-[#012D5A] mb-8">Department CSV Import/Export</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Import CSV</h2>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="block w-full text-sm mb-4
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-[#012D5A] file:text-white
              hover:file:bg-[#004795]"
          />
          
          {previewData.length > 0 && (
            <div className="mb-4 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <p className="text-sm text-gray-600 mb-4">
                Showing {previewData.length} rows. Importing will clear existing records.
              </p>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border">Node Type</th>
                    <th className="py-2 px-3 border">Node Description</th>
                    <th className="py-2 px-3 border">Edge Connections (from -&gt; to)</th>
                    <th className="py-2 px-3 border">Node (lat,long)</th>
                    <th className="py-2 px-3 border">Floor</th>
                    <th className="py-2 px-3 border">Suite</th>
                    <th className="py-2 px-3 border">Building Name</th>
                    <th className="py-2 px-3 border">Building Address</th>
                    <th className="py-2 px-3 border">Building Phone Number</th>
                    <th className="py-2 px-3 border">Department Name</th>
                    <th className="py-2 px-3 border">Phone Number</th>
                    <th className="py-2 px-3 border">Department Description</th>
                    <th className="py-2 px-3 border">Services</th>

                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-3 border">{row["Node Type"]}</td>
                      <td className="py-2 px-3 border">{row["Node Description"]}</td>
                      <td className="py-2 px-3 border">{row["Edge Connections (from -> to)"]}</td>
                      <td className="py-2 px-3 border">{row["Node (lat,long)"]}</td>
                      <td className="py-2 px-3 border">{row["Floor"]}</td>
                      <td className="py-2 px-3 border">{row["Suite"]}</td>
                      <td className="py-2 px-3 border">{row["Building Name"]}</td>
                      <td className="py-2 px-3 border">{row["Building Address"]}</td>
                      <td className="py-2 px-3 border">{row["Building Phone Number"]}</td>
                      <td className="py-2 px-3 border">{row["Department Name"]}</td>
                      <td className="py-2 px-3 border">{row["Phone Number"]}</td>
                      <td className="py-2 px-3 border">{row["Department Description"]}</td>
                      <td className="py-2 px-3 border">{row["Services"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <Button
            onClick={importCSV}
            disabled={loading || !file}
            className="bg-[#012D5A] text-white py-2 px-4 rounded-md
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed mr-4"
          >
            {loading ? 'Working...' : 'Import CSV'}
          </Button>
          
          <Button
            onClick={exportCSV}
            disabled={loading}
            className="bg-[#012D5A] text-white py-2 px-4 rounded-md
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Working...' : 'Export CSV'}
          </Button>
          
          {message && (
            <p className={`mt-3 ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

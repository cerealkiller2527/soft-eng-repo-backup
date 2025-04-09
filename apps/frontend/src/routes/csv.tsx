import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Simple interface for CSV row data
interface DeptRow {
  departmentId: string;
  departmentName: string;
  phoneNumber: string;
  locationId: string;
  floor: string;
  suite: string;
  buildingId: string;
  buildingName: string;
  services: string;
  [key: string]: string; // Allow string indexing
}

export default function CSV() {
  const [file, setFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewData, setPreviewData] = useState<DeptRow[]>([]);
  
  // Parse a CSV line handling quotes
  function parseCSV(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current);
    return values.map(v => v.trim());
  }
  
  // Map CSV headers to object properties
  function headerToKey(header: string): string {
    const map: Record<string, string> = {
      'Department ID': 'departmentId',
      'Department Name': 'departmentName',
      'Phone Number': 'phoneNumber',
      'Location ID': 'locationId',
      'Floor': 'floor',
      'Suite': 'suite',
      'Building ID': 'buildingId',
      'Building Name': 'buildingName',
      'Services': 'services'
    };
    
    return map[header as keyof typeof map] || header;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    
    try {
      const text = await selectedFile.text();
      setCsvText(text);
      
      // Parse for preview
      const rows = text.split('\n');
      if (rows.length < 2) return;
      
      const headers = parseCSV(rows[0]);
      const preview: DeptRow[] = [];
      
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        
        const values = parseCSV(rows[i]);
        const row: DeptRow = {
          departmentId: '',
          departmentName: '',
          phoneNumber: '',
          locationId: '',
          floor: '',
          suite: '',
          buildingId: '',
          buildingName: '',
          services: ''
        };
        
        headers.forEach((header, idx) => {
          const key = headerToKey(header);
          if (key && idx < values.length) {
            row[key] = values[idx].replace(/^"|"$/g, '');
          }
        });
        
        preview.push(row);
      }
      
      setPreviewData(preview);
    } catch (err) {
      setMessage('Could not parse file');
    }
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
        <h1 className="text-3xl font-bold text-[#0057B8] mb-8">Department CSV Import/Export</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Import CSV</h2>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="block w-full text-sm mb-4
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-[#0057B8] file:text-white
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
                    <th className="py-2 px-3 border">ID</th>
                    <th className="py-2 px-3 border">Department</th>
                    <th className="py-2 px-3 border">Phone</th>
                    <th className="py-2 px-3 border">Location</th>
                    <th className="py-2 px-3 border">Floor</th>
                    <th className="py-2 px-3 border">Suite</th>
                    <th className="py-2 px-3 border">Building</th>
                    <th className="py-2 px-3 border">Services</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-3 border">{row.departmentId}</td>
                      <td className="py-2 px-3 border">{row.departmentName}</td>
                      <td className="py-2 px-3 border">{row.phoneNumber}</td>
                      <td className="py-2 px-3 border">{row.locationId}</td>
                      <td className="py-2 px-3 border">{row.floor}</td>
                      <td className="py-2 px-3 border">{row.suite}</td>
                      <td className="py-2 px-3 border">{row.buildingName}</td>
                      <td className="py-2 px-3 border">{row.services}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <button 
            onClick={importCSV}
            disabled={loading || !file}
            className="bg-[#0057B8] text-white py-2 px-4 rounded-md 
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed mr-4"
          >
            {loading ? 'Working...' : 'Import CSV'}
          </button>
          
          <button 
            onClick={exportCSV}
            disabled={loading}
            className="bg-[#0057B8] text-white py-2 px-4 rounded-md 
              hover:bg-[#004795] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Working...' : 'Export CSV'}
          </button>
          
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

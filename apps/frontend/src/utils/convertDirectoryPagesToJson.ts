import fs from 'fs';
import path from 'path';

/**
 * This utility script scans the directory pages folder and creates a JSON file
 * that can be used as a database seed or for migration purposes.
 * 
 * This script is meant to be run once during development to help with
 * transitioning from file-based pages to database-driven content.
 */

type DirectoryItemOutput = {
    id: string;
    path: string;
    title: string;
    category: 'excellence' | 'patient-care' | 'brigham-groups';
    description?: string;
};

/**
 * Maps file IDs to their categories
 */
const categoryMapping: Record<string, 'excellence' | 'patient-care' | 'brigham-groups'> = {
    // Centers Of Excellence
    'backupChildCareCenter': 'excellence',
    'centerOfPainMedicine': 'excellence',
    'crohnsAndColitisCenter': 'excellence',
    'endoscopyCenter': 'excellence',
    'gretchensAndEdwardA': 'excellence',
    'osherClinicalCenter': 'excellence',
    
    // General Patient Care
    'allergyAndClinicalImmunology': 'patient-care',
    'laboratory': 'patient-care',
    'multispecialityClinic': 'patient-care',
    'patientFinancialServices': 'patient-care',
    'pharmacy': 'patient-care',
    'radiology': 'patient-care',
    'mri': 'patient-care',
    'rehabilitation': 'patient-care',
    
    // Brigham Groups and Associates
    'brighamDermatologyAssociates': 'brigham-groups',
    'brighamObstetrics': 'brigham-groups',
    'brighamPhysiciansGroup': 'brigham-groups',
    'brighamPsychiatricSpecialities': 'brigham-groups',
};

/**
 * Maps file IDs to the path used in the router
 */
const pathMapping: Record<string, string> = {
    'backupChildCareCenter': '/bccc',
    'centerOfPainMedicine': '/copm',
    'crohnsAndColitisCenter': '/cacc',
    'endoscopyCenter': '/ec',
    'gretchensAndEdwardA': '/gsea',
    'osherClinicalCenter': '/occ',
    'allergyAndClinicalImmunology': '/aci',
    'laboratory': '/Laboratory',
    'multispecialityClinic': '/Multi-Speciality',
    'patientFinancialServices': '/pfs',
    'pharmacy': '/pharmacy',
    'radiology': '/radiology',
    'mri': '/MRI',
    'rehabilitation': '/rehab',
    'brighamDermatologyAssociates': '/bda',
    'brighamObstetrics': '/bogg',
    'brighamPhysiciansGroup': '/bpg',
    'brighamPsychiatricSpecialities': '/bps',
};

/**
 * Extracts ID from the filename
 * @param fileName The filename to extract ID from
 * @returns The ID extracted from the filename
 */
function getIdFromFileName(fileName: string): string {
    // Remove the .tsx extension
    return fileName.replace('.tsx', '');
}

/**
 * Extracts title from the file content
 * @param content The content of the file
 * @returns The title extracted from the file content
 */
function getTitleFromContent(content: string): string {
    // Look for the h2 tag content between <h2> and </h2>
    const match = content.match(/<h2>Welcome to the (.*?)!<\/h2>/);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}

/**
 * Gets the short ID for URLs from the file name
 * @param id The full ID from the file name
 * @returns The short ID for URLs
 */
function getShortId(id: string): string {
    return id in pathMapping ? pathMapping[id] : `/${id}`;
}

/**
 * Generates the JSON data for all directory pages
 */
async function generateDirectoryData(): Promise<void> {
    // Define the directory path containing all the directory page files
    const directoryPagesPath = path.resolve(__dirname, '../../routes/directoryPages');
    
    // Read all files in the directory
    const files = fs.readdirSync(directoryPagesPath);
    
    // Create an array to store the directory item data
    const directoryItems: DirectoryItemOutput[] = [];
    
    // Process each file
    files.forEach(file => {
        if (file.endsWith('.tsx')) {
            const filePath = path.join(directoryPagesPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            const id = getIdFromFileName(file);
            const title = getTitleFromContent(content);
            const category = categoryMapping[id] || 'patient-care'; // Default to patient-care if not found
            const shortId = id.split(/(?=[A-Z])/).join('-').toLowerCase();
            const routePath = getShortId(id);
            
            directoryItems.push({
                id: shortId,
                path: routePath,
                title,
                category,
            });
        }
    });
    
    // Write the data to a JSON file
    const outputPath = path.resolve(__dirname, '../data/directoryData.json');
    
    // Ensure the directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(directoryItems, null, 2));
    console.log(`Directory data written to ${outputPath}`);
}

// Run the function if this file is executed directly
if (require.main === module) {
    generateDirectoryData()
        .then(() => console.log('Done!'))
        .catch(error => console.error('Error:', error));
}

export default generateDirectoryData; 
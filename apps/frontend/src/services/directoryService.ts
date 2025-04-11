import { trpcClient } from '../database/trpc';

// Interface for directory item
export interface DirectoryItem {
    id: string;
    path: string;
    title: string;
    category: 'excellence' | 'patient-care' | 'brigham-groups';
    description?: string;
    contactInfo?: {
        phone?: string;
        location?: string;
        address?: string;
    };
    services?: string[];
}

// Define directory categories
export const directoryCategories = [
    { id: 'section1', title: 'Centers Of Excellence', category: 'excellence' },
    { id: 'section2', title: 'General Patient Care', category: 'patient-care' },
    { id: 'section3', title: 'Brigham Groups and Associates', category: 'brigham-groups' },
];

// Define proper types for the data returned from backend
interface DepartmentService {
  service: {
    name: string;
  };
}

interface DepartmentLocation {
  floor: number;
  suite: string;
}

interface Building {
  address: string;
}

interface Department {
  id: number;
  name: string;
  description?: string;
  phoneNumber: string;
  Location?: DepartmentLocation;
  building?: Building;
  DepartmentServices?: DepartmentService[];
}

// Function to categorize departments
function categorizeDepartment(department: Department): 'excellence' | 'patient-care' | 'brigham-groups' {
    if (!department || !department.name) {
        return 'patient-care'; // Default
    }

    const name = department.name.toLowerCase();
    
    if (name.includes('center') || name.includes('fish') || name.includes('osher')) {
        return 'excellence';
    }
    
    if (name.includes('brigham')) {
        return 'brigham-groups';
    }
    
    return 'patient-care';
}

// Function to map department data to our DirectoryItem interface
function mapDepartmentToDirectoryItem(department: Department): DirectoryItem {
    // Handle null/undefined department
    if (!department) {
        console.warn("Tried to map null/undefined department to DirectoryItem");
        return {
            id: 'unknown',
            path: '/',
            title: 'Unknown Service',
            category: 'patient-care'
        };
    }

    // Generate a path/slug from the department name
    const generateSlug = (name: string): string => {
        if (!name) return '/';
        
        if (name.includes('Backup Child Care Center')) return '/bccc';
        if (name.includes('Center for Pain Medicine')) return '/copm';
        if (name.includes('Crohn\'s and Colitis Center')) return '/cacc';
        if (name.includes('Endoscopy Center')) return '/ec';
        if (name.includes('Fish Center')) return '/gsea';
        if (name.includes('Osher Clinical Center')) return '/occ';
        if (name.includes('Allergy and Clinical Immunology')) return '/aci';
        if (name.includes('Laboratory')) return '/laboratory';
        if (name.includes('Multi-Specialty Clinic')) return '/multi-speciality';
        if (name.includes('Patient Financial Services')) return '/pfs';
        if (name.includes('Pharmacy')) return '/pharmacy';
        if (name.includes('Radiology, MRI')) return '/mri';
        if (name.includes('Radiology') && !name.includes('MRI')) return '/radiology';
        if (name.includes('Rehabilitation Services')) return '/rehab';
        if (name.includes('Brigham Dermatology Associates')) return '/bda';
        if (name.includes('Brigham Obstetrics')) return '/bogg';
        if (name.includes('Brigham Physicians Group')) return '/bpg';
        if (name.includes('Brigham Psychiatric Specialties')) return '/bps';
        
        // Fallback to lowercase first word if no matches
        return `/${name.split(' ')[0].toLowerCase()}`;
    };
    
    // Extract location information if available
    const locationInfo = department.Location 
        ? `Floor ${department.Location.floor}, Suite ${department.Location.suite}` 
        : undefined;
    
    // Extract services - now each is a separate record, not a comma-separated string
    const services = department.DepartmentServices && department.DepartmentServices.length > 0
        ? department.DepartmentServices.map((ds: DepartmentService) => ds.service?.name).filter(Boolean)
        : [];
    
    return {
        id: department.id?.toString() || 'unknown',
        path: generateSlug(department.name),
        title: department.name || 'Unknown Service',
        category: categorizeDepartment(department),
        description: department.description || '',
        contactInfo: {
            phone: department.phoneNumber,
            location: locationInfo,
            address: department.building?.address
        },
        services
    };
}

/**
 * Function to get all directory items
 */
export async function getAllDirectoryItems() {
    try {
        const data = await trpcClient.directory.getAllDepartments.query();
        return data.map(mapDepartmentToDirectoryItem);
    } catch (error) {
        console.error("Error fetching all directory items:", error);
        return [];
    }
}

/**
 * Function to get directory items by category
 */
export async function getDirectoryItemsByCategory(category: string) {
    try {
        const allItems = await getAllDirectoryItems();
        return allItems.filter(item => item.category === category);
    } catch (error) {
        console.error(`Error fetching directory items by category ${category}:`, error);
        return [];
    }
}

/**
 * Function to get a directory item by ID
 */
export async function getDirectoryItemById(id: string) {
    if (!id || isNaN(parseInt(id))) {
        return null;
    }
    
    try {
        const data = await trpcClient.directory.getDepartmentById.query(parseInt(id));
        return data ? mapDepartmentToDirectoryItem(data) : null;
    } catch (error) {
        console.error(`Error fetching directory item by ID ${id}:`, error);
        return null;
    }
}

/**
 * Function to get a directory item by slug
 */
export async function getDirectoryItemBySlug(slug: string) {
    if (!slug) {
        return null;
    }
    
    try {
        console.log(`Fetching directory item by slug: "${slug}"`);
        const data = await trpcClient.directory.getDepartmentBySlug.query(slug);
        return data ? mapDepartmentToDirectoryItem(data) : null;
    } catch (error) {
        console.error(`Error fetching directory item by slug "${slug}":`, error);
        return null;
    }
}

/**
 * Function to check Prisma models for debugging
 */
export async function checkPrismaModels() {
    try {
        return await trpcClient.directory.checkPrismaModels.query();
    } catch (error) {
        console.error("Error checking Prisma models:", error);
        return null;
    }
}

// Export all the functions
export default {
    getAllDirectoryItems,
    getDirectoryItemsByCategory,
    getDirectoryItemById,
    getDirectoryItemBySlug,
    checkPrismaModels,
    directoryCategories
}; 
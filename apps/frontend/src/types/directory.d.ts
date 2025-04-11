/**
 * Directory Item interface representing a service or department
 */
interface DirectoryItem {
    /**
     * Unique identifier for the directory item
     */
    id: string;
    
    /**
     * URL path for this directory item
     */
    path: string;
    
    /**
     * Display title for this directory item
     */
    title: string;
    
    /**
     * Category classification for organizing services
     */
    category: 'excellence' | 'patient-care' | 'brigham-groups';
    
    /**
     * Optional detailed description of the service
     */
    description?: string;
    
    /**
     * Optional contact information
     */
    contactInfo?: {
        /**
         * Phone number
         */
        phone?: string;
        
        /**
         * Email address
         */
        email?: string;
        
        /**
         * Physical location
         */
        location?: string;
        
        /**
         * Operating hours
         */
        hours?: string;
    };
    
    /**
     * Optional list of services offered
     */
    services?: string[];
}

/**
 * Directory Category interface for organizing services
 */
interface DirectoryCategory {
    /**
     * Unique identifier for the category
     */
    id: string;
    
    /**
     * Display title for the category
     */
    title: string;
    
    /**
     * Category key that maps to DirectoryItem.category
     */
    category: 'excellence' | 'patient-care' | 'brigham-groups';
}

/**
 * Directory Service interface for accessing directory data
 */
interface DirectoryService {
    /**
     * Get all directory items
     */
    getAllDirectoryItems(): Promise<DirectoryItem[]>;
    
    /**
     * Get directory items filtered by category
     */
    getDirectoryItemsByCategory(category: string): Promise<DirectoryItem[]>;
    
    /**
     * Get a specific directory item by ID
     */
    getDirectoryItemById(id: string): Promise<DirectoryItem | null>;
    
    /**
     * List of directory categories
     */
    directoryCategories: DirectoryCategory[];
} 
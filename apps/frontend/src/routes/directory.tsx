import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";
import "../styles/directoryStyles.css";
import { 
    getAllDirectoryItems, 
    getDirectoryItemBySlug, 
    directoryCategories, 
    DirectoryItem 
} from '../services/directoryService';

// The main component that will handle both directory listing and individual pages
const DirectoryPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId?: string }>();
    const navigate = useNavigate();
    
    // State for directory data
    const [directoryItems, setDirectoryItems] = useState<DirectoryItem[]>([]);
    const [serviceItem, setServiceItem] = useState<DirectoryItem | null>(null);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [isLoadingService, setIsLoadingService] = useState(true);
    const [itemsError, setItemsError] = useState<Error | null>(null);
    const [serviceError, setServiceError] = useState<Error | null>(null);
    
    // Load directory items on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoadingItems(true);
                const items = await getAllDirectoryItems();
                setDirectoryItems(items);
                setItemsError(null);
            } catch (error) {
                console.error("Error loading directory items:", error);
                setItemsError(error instanceof Error ? error : new Error('Unknown error'));
            } finally {
                setIsLoadingItems(false);
            }
        };
        
        loadData();
    }, []);
    
    // Load service item when serviceId changes
    useEffect(() => {
        const loadService = async () => {
            if (!serviceId) {
                setServiceItem(null);
                setIsLoadingService(false);
                return;
            }
            
            try {
                setIsLoadingService(true);
                const item = await getDirectoryItemBySlug(serviceId);
                setServiceItem(item);
                setServiceError(null);
            } catch (error) {
                console.error(`Error loading service ${serviceId}:`, error);
                setServiceError(error instanceof Error ? error : new Error('Unknown error'));
            } finally {
                setIsLoadingService(false);
            }
        };
        
        loadService();
    }, [serviceId]);
    
    // Debug logging to see what's happening
    console.log("Directory Data:", {
        serviceId,
        directoryItems,
        serviceItem,
        isLoadingItems,
        isLoadingService,
        itemsError,
        serviceError
    });
    
    // Loading state
    if ((serviceId && isLoadingService) || isLoadingItems) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 flex items-center justify-center">
                    <p>Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }
    
    // Error state
    if ((serviceId && serviceError) || itemsError) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 flex items-center justify-center">
                    <p className="text-red-500">Failed to load directory data.</p>
                </div>
                <Footer />
            </div>
        );
    }
    
    // If serviceId is provided and service was found, render the individual service page
    if (serviceId && serviceItem) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                        {serviceItem.title}
                    </h1>
                    <div className="h-px bg-[#012D5A]/20 w-full mb-6"></div>
                    
                    <div className="service-content">
                        <p className="mb-4">Welcome to the {serviceItem.title}!</p>
                        {serviceItem.description && <p className="mb-6">{serviceItem.description}</p>}
                        
                        {serviceItem.contactInfo && (
                            <div className="mt-8">
                                <h2 className="text-xl font-medium text-[#012D5A] mb-2">
                                    Contact Information
                                </h2>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    {serviceItem.contactInfo.phone && (
                                        <p className="mb-2"><strong>Phone:</strong> {serviceItem.contactInfo.phone}</p>
                                    )}
                                    {serviceItem.contactInfo.location && (
                                        <p className="mb-2"><strong>Location:</strong> {serviceItem.contactInfo.location}</p>
                                    )}
                                    {serviceItem.contactInfo.address && (
                                        <p className="mb-2"><strong>Address:</strong> {serviceItem.contactInfo.address}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {serviceItem.services && serviceItem.services.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-medium text-[#012D5A] mb-2">
                                    Services Offered
                                </h2>
                                <ul className="list-disc pl-6">
                                    {serviceItem.services.map((item, index) => (
                                        <li key={index} className="mb-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <button 
                            onClick={() => navigate('/Directory')}
                            className="mt-8 px-4 py-2 bg-[#012D5A] text-white rounded"
                        >
                            Back to Directory
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    
    // If serviceId was provided but no matching service was found
    if (serviceId && !serviceItem) {
        return (
            <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
                <Navbar />
                <div className="flex-grow p-4 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                        Service Not Found
                    </h1>
                    <p>The requested service could not be found.</p>
                    <button 
                        onClick={() => navigate('/Directory')}
                        className="mt-4 px-4 py-2 bg-[#012D5A] text-white rounded"
                    >
                        Return to Directory
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
    
    // Directory listing page
    // Button styling
    const buttonClass = "flex items-center justify-center text-center text-[#012D5A] " +
        "p-4 h-32 w-64 text-base leading-tight whitespace-normal border border-[#012D5A] " +
        "break-words transition-all duration-200 hover:bg-[#012D5A]/5 rounded-lg";
    const buttonContainerClass = "flex flex-wrap justify-center gap-4 my-6 w-full";

    // Accordion styling
    const accordionContentClass = "px-2 pt-2 pb-6";
    const accordionTriggerClass = "w-full py-4 text-[#012D5A] text-left text-xl font-normal " +
        "hover:no-underline border-b border-[#012D5A]/20 hover:bg-gray-50 px-0";

    // Generate accordion items based on categories
    const accordionItems = directoryCategories.map(category => {
        const itemsInCategory = directoryItems?.filter(item => item.category === category.category) || [];
        
        return {
            id: category.id,
            title: category.title,
            content: (
                <div className={accordionContentClass}>
                    <div className={buttonContainerClass}>
                        {itemsInCategory.map(item => (
                            <Link to={item.path} key={item.id} className={buttonClass}>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )
        };
    });

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto pt-20">
            <br/>
            <div className="flex-grow p-4">
                <Navbar />

                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-light text-[#012D5A] mb-2">
                        Services at Brigham and Women's Hospital
                    </h1>
                    <div className="h-px bg-[#012D5A]/20 w-full"></div>
                </div>

                {/* Accordion */}
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-1">
                        {accordionItems.map((item) => (
                            <AccordionItem key={item.id} value={item.id} className="border-none">
                                <AccordionTrigger className={accordionTriggerClass}>
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className={accordionContentClass}>
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DirectoryPage;
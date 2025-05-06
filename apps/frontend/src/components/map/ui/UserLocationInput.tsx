"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Loader2, LocateFixed, Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMap } from '@/contexts/MapContext';
import { toast } from "sonner";
import { UI_PLACEHOLDERS } from '@/lib/constants';
import { loadGoogleMapsApi } from '@/lib/utils';

interface UserLocationInputProps {
    getCurrentPosition: () => void; // Function to trigger geolocation
    isGeoLoading: boolean; // Is geolocation currently loading?
    className?: string;
}

export function UserLocationInput({ getCurrentPosition, isGeoLoading, className }: UserLocationInputProps) {
    const { setUserLocation, flyTo } = useMap();
    const [inputValue, setInputValue] = useState("");
    const [localLoading, setLocalLoading] = useState(false); // Separate loading state for input actions
    const [apiLoaded, setApiLoaded] = useState(false); // Track if Google Maps API is loaded
    const inputRef = useRef<HTMLInputElement>(null);

    // Load Google Maps API
    useEffect(() => {
        let isMounted = true;
        
        const initApi = async () => {
            try {
                setLocalLoading(true);
                await loadGoogleMapsApi();
                if (isMounted) {
                    setApiLoaded(true);
                    setLocalLoading(false);
                }
            } catch (error) {
                console.error("Failed to load Google Maps API:", error);
                if (isMounted) {
                    toast.error("Could not load location search. Please try again later.");
                    setLocalLoading(false);
                }
            }
        };
        
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            initApi();
        } else {
            setApiLoaded(true);
        }
        
        return () => {
            isMounted = false;
        };
    }, []);

    // Initialize Google Places Autocomplete
    useEffect(() => {
        // Skip if API isn't loaded or input ref is not available
        if (!apiLoaded || !inputRef.current) {
            return;
        }

        try {
            // Create autocomplete instance
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                fields: ["geometry", "formatted_address", "name"],
                types: ["geocode", "establishment"]
            });

            // Add listener for place selection
            const listener = autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                
                if (place && place.geometry?.location) {
                    setLocalLoading(true);
                    
                    try {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        const locationName = place.formatted_address || place.name || "";
                        
                        // Update input field with selected location name
                        setInputValue(locationName);
                        
                        // Update user location in context
                        setUserLocation([lng, lat]);
                        
                        // Fly map to selected location
                        flyTo([lng, lat], 14);
                        
                        // Show success toast
                        toast.success(`Location set to: ${locationName}`, { 
                            icon: <LocateFixed className="h-4 w-4" /> 
                        });
                        
                        // Blur input after selection
                        inputRef.current?.blur();
                    } catch (error) {
                        console.error("Error processing selected place:", error);
                        toast.error("Unable to set the selected location");
                    } finally {
                        setLocalLoading(false);
                    }
                } else {
                    toast.error("Selected location has no coordinates");
                }
            });

            // Return cleanup function
            return () => {
                if (window.google && window.google.maps && window.google.maps.event) {
                    window.google.maps.event.removeListener(listener);
                }
            };
        } catch (error) {
            console.error("Error initializing Google Places Autocomplete:", error);
            toast.error("Location search is experiencing issues");
        }
    }, [apiLoaded, setUserLocation, flyTo]);

    // Handle user typing in the input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // Handle "My Location" button click
    const handleMyLocationClick = () => {
        setInputValue(""); // Clear input when using current location
        getCurrentPosition(); // Trigger geolocation hook
        inputRef.current?.blur();
    };

    // Clear input
    const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setInputValue("");
        inputRef.current?.focus();
    };

    // Determine if we should show the loading indicator
    const isLoading = localLoading || isGeoLoading;

    return (
        <div className={cn("relative w-full", className)}>
            <div className="relative">
                {/* Search icon */}
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                
                {/* Location input */}
                <Input
                    ref={inputRef}
                    placeholder={UI_PLACEHOLDERS.LOCATION_SEARCH}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-16 h-10 bg-background hover:bg-accent/50 focus:bg-background"
                    disabled={!apiLoaded && localLoading} // Disable when API is loading
                />
                
                {/* Clear button - Only shown when there's text AND not loading */}
                {inputValue && !isLoading && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                        <button
                            type="button"
                            onClick={handleClearInput}
                            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
                
                {/* Location button with loading state */}
                <div className="absolute right-0 top-0 h-full flex items-center pr-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 flex-shrink-0 hover:bg-accent/50"
                        onClick={handleMyLocationClick}
                        disabled={isLoading} // Disable when any loading is happening
                        title="Use my location"
                        aria-label="Use my current location"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <LocateFixed className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Add TypeScript interface for window.google
declare global {
    interface Window {
        google: {
            maps: {
                places: {
                    Autocomplete: new (
                        input: HTMLInputElement,
                        options?: {
                            fields: string[];
                            types: string[];
                        }
                    ) => {
                        getPlace: () => {
                            geometry?: {
                                location: {
                                    lat: () => number;
                                    lng: () => number;
                                };
                            };
                            formatted_address?: string;
                            name?: string;
                        };
                        addListener: (
                            event: string,
                            callback: () => void
                        ) => number;
                    };
                };
                event: {
                    removeListener: (id: number) => void;
                };
            };
        };
    }
}
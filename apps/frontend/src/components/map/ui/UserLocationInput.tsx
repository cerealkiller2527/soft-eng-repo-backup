"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Loader2, LocateFixed, Search, X, Info, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMap } from '@/contexts/MapContext';
import { toast } from "sonner";
import { UI_PLACEHOLDERS } from '@/lib/constants';

interface UserLocationInputProps {
  getCurrentPosition: () => void; // Function to trigger geolocation
  isGeoLoading: boolean; // Is geolocation currently loading?
  className?: string;
}

export function UserLocationInput({ getCurrentPosition, isGeoLoading, className }: UserLocationInputProps) {
  const { setUserLocation, flyTo } = useMap();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Keep for geocoding/place details later if needed, but primarily for isGeoLoading now
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null); // Ref for the Google Autocomplete instance
  const listenerRef = useRef<google.maps.MapsEventListener | null>(null); // Ref for the listener

  // --- Initialize Google Autocomplete ---
  useEffect(() => {
    // Ensure Google Maps API is loaded and input ref is available
    if (typeof google !== 'undefined' && google.maps && google.maps.places && inputRef.current) {
      // Create Autocomplete instance
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          fields: ["place_id", "geometry", "name", "formatted_address"],
          types: ["geocode", "establishment"], // Optional: restrict to certain types
        }
      );

      // Add listener for place selection
      listenerRef.current = autocompleteRef.current.addListener('place_changed', () => {
          console.log("Autocomplete 'place_changed' event fired.");
          const place = autocompleteRef.current?.getPlace();
          console.log("Autocomplete place object:", place);
          
          if (place?.geometry?.location) {
              console.log("Place has geometry, proceeding to update location.");
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              const locationString = place.formatted_address || place.name || "";
              
              setInputValue(locationString); // Update input field
              setUserLocation([lng, lat]);  // Update context
              flyTo([lng, lat], 14);        // Fly map
              toast.success(`Location set to: ${locationString}`, { icon: <LocateFixed className="h-4 w-4" /> });
              inputRef.current?.blur(); // Blur input after selection
          } else {
              console.warn("Autocomplete place is missing geometry.location. Cannot update location.", place);
              // Optionally handle cases where a place without geometry is selected
              // toast.error("Could not get location details for the selected place.");
          }
      });
    }

    // Cleanup function
    return () => {
      // Remove the listener when component unmounts or dependencies change
      if (listenerRef.current) {
        google.maps.event.removeListener(listenerRef.current);
        listenerRef.current = null;
      }
      // Note: Google's API might handle the widget cleanup itself when the input is removed from DOM,
      // but explicit listener removal is good practice.
      // We don't nullify autocompleteRef here as it might be needed if dependencies change and useEffect reruns
    };
    // Run only once on mount (or if google object becomes available later, though unlikely)
  }, [flyTo, setUserLocation]);

  // --- Input Change Handler ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // No need to fetch suggestions manually, the widget does it
  };

  // --- "My Location" Button Click Handler ---
  const handleMyLocationClick = () => {
    setInputValue(""); // Clear input when using current location
    getCurrentPosition(); // Trigger geolocation hook
    inputRef.current?.blur();
  };

  // --- Clear Input Handler ---
  const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent potential side effects
    setInputValue("");
    inputRef.current?.focus(); // Keep focus
    // Potentially clear autocomplete selection if needed:
    // autocompleteRef.current?.set('place', null); // Needs testing if required
  };

  return (
    <div className={cn("flex gap-2 w-full", className)}>
        <div className="relative w-full flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            <Input
                ref={inputRef}
                placeholder={UI_PLACEHOLDERS.LOCATION_SEARCH}
                value={inputValue}
                onChange={handleInputChange}
                className="w-full pl-9 pr-9 h-10 text-base bg-secondary/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            {inputValue && !(isLoading || isGeoLoading) && (
                <button
                    type="button"
                    onClick={handleClearInput}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 p-1"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
            {isGeoLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin z-10" />
            )}
        </div>
        <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 flex-shrink-0 bg-secondary/30 border-0 hover:bg-secondary/50"
            onClick={handleMyLocationClick}
            disabled={isGeoLoading}
            title="Use my location"
            aria-label="Use my current location"
        >
            {isGeoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
        </Button>
    </div>
  );
} 
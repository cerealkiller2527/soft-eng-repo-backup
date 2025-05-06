import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { EARTH_RADIUS_MILES } from "@/lib/constants"
import { GOOGLE_PLACES_API_KEY } from "@/lib/constants"

// Combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create debounced function
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Loads the Google Maps API with Places library dynamically
export function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Skip if already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }

    // Don't attempt to load if API key is missing
    if (!GOOGLE_PLACES_API_KEY) {
      reject(new Error('Google Places API key is missing'));
      return;
    }

    // Create the script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Set up callbacks
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));

    // Add to document
    document.head.appendChild(script);
  });
}

// Calculate bearing between coordinates
export function calculateBearing(start: [number, number], end: [number, number]): number {
  const [startLng, startLat] = start;
  const [endLng, endLat] = end;
  
  const startLatRad = startLat * Math.PI / 180;
  const endLatRad = endLat * Math.PI / 180;
  const deltaLng = (endLng - startLng) * Math.PI / 180;

  const y = Math.sin(deltaLng) * Math.cos(endLatRad);
  const x = Math.cos(startLatRad) * Math.sin(endLatRad) -
    Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(deltaLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

// Calculate distance between coordinates
export function calculateDistance(point1: [number, number] | null | undefined, point2: [number, number] | null | undefined): number | null {
  if (!point1 || !point2) {
    return null;
  }

  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;

  const R = EARTH_RADIUS_MILES;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

// Format duration from seconds
export function formatDurationFromSeconds(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || seconds < 0) {
    return "-- min";
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 1) {
    return "<1 min";
  }
  return `${minutes} min`;
}

// Shorten and clean address string
export function shortenAddress(fullAddress: string | undefined): string {
  if (!fullAddress) return "Address unavailable";
  
  let address = fullAddress;
  
  // Remove State ZIP, Country (heuristic)
  const parts = address.split(", ");
  if (parts.length > 2) {
    address = parts.slice(0, -2).join(", ");
  }
  
  // Remove "Multispecialty Clinic" (case-insensitive) and extra commas/spaces
  address = address.replace(/,?\s*Multispecialty Clinic,?/gi, "").trim();
  // Remove trailing comma if present after replacement
  if (address.endsWith(',')) {
      address = address.slice(0, -1);
  }
  
  return address.trim(); // Trim again just in case
}

// Add TypeScript interface for window.google
declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
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
        event?: {
          removeListener: (id: number) => void;
        };
      };
    };
  }
}

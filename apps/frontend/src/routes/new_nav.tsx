"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { SidebarContainer } from "@/components/map/Layout"
import { MapProvider, useMap } from "../contexts/MapContext"
import { MapErrorBoundary } from "@/components/map/MapErrorBoundary"
import type { Hospital } from "@/types/hospital"
import {
  LAYOUT_DIMENSIONS,
  DEFAULT_FLY_TO_OPTIONS,
  HOSPITAL_SPECIFIC_VIEWS,
  Z_INDEX,
  ROUTE_FIT_BOUNDS_OPTIONS
} from "@/lib/constants";
import type { CameraOptions } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import {
  CheckCircle,
  AlertTriangle,
  Info,
  ParkingSquare,
  Footprints,
} from "lucide-react";
import { RouteLayerManager } from "@/components/map/RouteLayerManager";
import { useAppMapData } from "@/lib/hooks/useAppMapData";
import { calculateBearing } from '@/lib/utils';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MainMap } from "@/components/map/MainMap";
import { SidebarContent, type SidebarContentProps } from "@/components/map/SidebarContent";
import { MapElements, type MapElementsProps } from "@/components/map/MapElements";
import { Custom3DLayerManager } from "@/components/map/Custom3DLayerManager";
import { IndoorRouteManager } from "@/components/map/IndoorRouteManager";
import LayoutNoFooter from "../components/LayoutNoFooter";
import { useTRPC } from '@/database/trpc';
import { useQuery } from '@tanstack/react-query';

type CustomFlyToOptions = Omit<mapboxgl.CameraOptions & mapboxgl.AnimationOptions, 'center'>;

function AppContent() {
  const [routeLat, setRouteLat] = useState<number>(0);
  const [routeLng, setRouteLng] = useState<number>(0);
  const [routeCoordsAreReady, setRouteCoordsAreReady] = useState<boolean>(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [newDriving, setNewDriving] = useState(false);
  const [newHospital, setNewHospital] = useState<Hospital | undefined>(undefined);
  const [isIndoorPathAvailable, setIsIndoorPathAvailable] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const {
    map: mapInstance,
    selectedLocation, setSelectedLocation,
    popupLocation, setPopupLocation,
    flyTo,
    setAnimatingMarkerId,
    activeTab, setActiveTab,
    userLocation: contextUserLocation,
    transportMode,
  } = useMap()

  const {
    hospitalsLoading,
    hospitalsError,
    processedHospitals,
    userLocation,
    getCurrentPosition,
    geoLoading,
    geoError,
    allRoutes,
    currentRoute,
    directionsLoading,
    directionsError,
    selectRoute
  } = useAppMapData();

  const trpc = useTRPC();

  const handleDepartmentSelect = useCallback((department: string) => {
    console.log("Department selected in AppContent:", department);
    setNewDepartment(department);
  }, []);

  const handleNavigationModeSelect = useCallback((Driving: boolean) => {
    console.log("Was driving selected: ", Driving);
    setNewDriving(Driving);
  }, []);

  const handleSelectHospitalFromList = useCallback((hospital: Hospital) => {
    setSelectedLocation(hospital);
    setNewHospital(hospital);
    setPopupLocation(null);
    setAnimatingMarkerId(hospital.id);
    if (hospital.coordinates) {
        const specificView = HOSPITAL_SPECIFIC_VIEWS[hospital.id] || {};

        const targetCenter = specificView.coordinates || hospital.coordinates;

        let flyToOptions: CustomFlyToOptions & Pick<CameraOptions, 'zoom' | 'pitch' | 'bearing'> = {
          speed: DEFAULT_FLY_TO_OPTIONS.speed,
          curve: DEFAULT_FLY_TO_OPTIONS.curve,
          zoom: specificView.zoom ?? DEFAULT_FLY_TO_OPTIONS.zoom,
          pitch: specificView.pitch ?? DEFAULT_FLY_TO_OPTIONS.pitch,
          bearing: specificView.bearing ?? mapInstance?.getBearing() ?? 0,
        };

        if (specificView.bearing === undefined && contextUserLocation) {
            try {
            flyToOptions.bearing = calculateBearing(contextUserLocation, targetCenter as [number, number]);
            } catch (error) {
              console.error("Error calculating bearing:", error);
            }
          }

        flyTo(targetCenter as [number, number], flyToOptions.zoom, flyToOptions, hospital.id);
    }
  }, [setSelectedLocation, setNewHospital, setPopupLocation, setAnimatingMarkerId, flyTo, contextUserLocation, mapInstance]);

  const handleViewDirections = useCallback((hospital: Hospital) => {
    setSelectedLocation(hospital);
    setPopupLocation(null);
    setAnimatingMarkerId(null);
    setActiveTab("directions");
  }, [setSelectedLocation, setPopupLocation, setAnimatingMarkerId, setActiveTab]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
    // setTimeout(() => {
    //   mapInstance?.resize()
    // }, LAYOUT_DIMENSIONS.SIDEBAR_TRANSITION_MS)
  }, [mapInstance])

  useEffect(() => {
    if (activeTab === 'directions' && !selectedLocation) {
      toast.info("Please select a hospital from the list or map to view directions.", {
        icon: <Info className="h-4 w-4" />,
      });
    }
  }, [activeTab, selectedLocation]);

  useEffect(() => {
      if (allRoutes && allRoutes.length > 0) {
          const activeRoute = allRoutes.find(r => r.isActive) || allRoutes[0];
          if (activeRoute?.destinationCoordinate) {
              const [lng, lat] = activeRoute.destinationCoordinate;
              setRouteLng(lng);
              setRouteLat(lat);
              setRouteCoordsAreReady(true);
              console.log(`[Coordinates] Using route destinationCoordinate: [${lng}, ${lat}]`);
          } else if (activeRoute?.geometry?.coordinates?.length > 0) {
              const coords = activeRoute.geometry.coordinates;
              const lastCoord = coords[coords.length - 1];
              const [lng, lat] = lastCoord;
              setRouteLng(lng);
              setRouteLat(lat);
              setRouteCoordsAreReady(true);
              console.log(`[Coordinates] Using route geometry endpoint: [${lng}, ${lat}]`);
          } else {
              console.warn("[Coordinates] No destination or geometry coordinates found in active route.");
              setRouteCoordsAreReady(false);
          }
      } else {
          console.log("[Coordinates] No routes available.");
          setRouteCoordsAreReady(false);
      }
  }, [allRoutes]);

  type FormHandlers = {
      destination: string
      driving: boolean
      building: Hospital | undefined
  };

  const [form, setForm] = useState<FormHandlers>({
      destination: newDepartment,
      driving: newDriving,
      building: newHospital,
  });

  useEffect(() => {
      setForm({
          destination: newDepartment,
          driving: newDriving,
          building: newHospital ?? undefined
      });
  }, [newDepartment, newDriving, newHospital]);

  const hasValidCoords = routeCoordsAreReady && (routeLat !== 0 || routeLng !== 0);
  const queryEnabled =
      !!form.building &&
      !!form.destination &&
      !directionsLoading &&
      hasValidCoords;

  const search = useQuery(
      trpc.search.getPath.queryOptions({
          buildingName: form?.building?.name ?? '',
          endDeptName: form?.destination ?? '',
          dropOffLatitude: routeLat,
          dropOffLongitude: routeLng,
          driving: form?.driving ?? false,
      },
      {
          enabled: queryEnabled,
          staleTime: 1000 * 60 * 5,
          cacheTime: 1000 * 60 * 10,
          retry: 1,
      })
  );

  useEffect(() => {
      console.log("Search Query Enabled:", queryEnabled);
      console.log("Search Data:", search.data);
      console.log("Search Loading:", search.isLoading);
      console.log("Search Error:", search.error);
      console.log("Form State:", form);
      console.log("Route Coords Ready:", routeCoordsAreReady, `[${routeLng}, ${routeLat}]`);

      if (search.data && form.building?.name && routeCoordsAreReady) {
          console.log("Processing search data...");
          
          if (allRoutes && allRoutes.length > 0 && search.data.path.toParking.length > 0) {
              try {
                  const outdoorRoute = allRoutes.find(r => r.isActive) || allRoutes[0];
                  const outdoorCoords = outdoorRoute.geometry.coordinates;
                  const indoorCoords = search.data.path.toParking.map(n => [n.longitude, n.latitude]);
                  
                  const bounds = new mapboxgl.LngLatBounds();
                  
                  [...outdoorCoords, ...indoorCoords].forEach(coord => {
                      bounds.extend(coord as [number, number]);
                  });
                  
                  if (mapInstance && !mapInstance._removed) {
                      mapInstance.fitBounds(bounds, {
                          padding: ROUTE_FIT_BOUNDS_OPTIONS.padding,
                          pitch: ROUTE_FIT_BOUNDS_OPTIONS.pitch,
                          duration: ROUTE_FIT_BOUNDS_OPTIONS.duration,
                      });
                      
                      console.log("Map fitted to combined route bounds");
                  }
              } catch (error) {
                  console.error("Error fitting bounds to combined routes:", error);
              }
          }
      } else if (search.error) {
          console.error("tRPC search query error:", search.error);
      } else if (search.isLoading) {
           console.log("tRPC search query is loading...");
      } else if (queryEnabled && !search.isLoading && !search.data) {
           console.log("tRPC query enabled but no data yet (or fetch failed silently).")
      }

  }, [search.data, search.isLoading, search.error, form, routeLat, routeLng, routeCoordsAreReady, queryEnabled, allRoutes, mapInstance]);

  useEffect(() => {
    setIsIndoorPathAvailable(!!search.data?.path?.toParking && search.data.path.toParking.length >= 2);
  }, [search.data]);

  useEffect(() => {
    if (activeTab === 'directions') {
      if (!selectedLocation) {
        toast.info("Please select a hospital from the list or map to view directions.", {
          id: 'select-hospital-toast',
          icon: <Info className="h-4 w-4" />,
        });
      } else if (!isIndoorPathAvailable && !search.isLoading && !search.error) {
        toast.info("Please select a destination department to calculate the indoor path.", {
          id: 'select-department-toast',
          icon: <Info className="h-4 w-4" />,
        });
      }
    }
  }, [activeTab, selectedLocation, isIndoorPathAvailable, search.isLoading, search.error]);

  const fitToBounds = useCallback((coords: ([number, number] | mapboxgl.LngLatLike)[]) => {
    if (!mapInstance || mapInstance._removed || coords.length === 0) return;
    
    try {
      const bounds = new mapboxgl.LngLatBounds();
      coords.forEach(coord => bounds.extend(coord as mapboxgl.LngLatLike));
      
      mapInstance.fitBounds(bounds, {
        padding: ROUTE_FIT_BOUNDS_OPTIONS.padding,
        pitch: mapInstance.getPitch(),
        bearing: mapInstance.getBearing(),
        duration: 1000
      });
    } catch (error) {
      console.error("Error fitting bounds:", error);
    }
  }, [mapInstance]);
  
  const handleGoToParkingClick = useCallback(() => {
    if (isIndoorPathAvailable && search.data?.path?.toParking) {
      const parkingNodes = search.data.path.toParking;
      const parkingLocationNode = parkingNodes[parkingNodes.length - 1];
      
      if (parkingLocationNode?.longitude && parkingLocationNode?.latitude) {
          const parkingCoords: [number, number] = [parkingLocationNode.longitude, parkingLocationNode.latitude];
          
          flyTo(parkingCoords, 19.4, {
              pitch: 50,
              bearing: mapInstance?.getBearing() ?? DEFAULT_FLY_TO_OPTIONS.bearing,
              speed: DEFAULT_FLY_TO_OPTIONS.speed,
              curve: DEFAULT_FLY_TO_OPTIONS.curve,
          });
          
          toast.info("Focusing on parking location", { icon: <ParkingSquare className="h-4 w-4" /> });
      } else {
          toast.error("Parking location coordinates not found.");
      }
    } else {
      toast.error("Indoor path data (including parking) is not available.");
    }
  }, [isIndoorPathAvailable, search.data, mapInstance, flyTo]);
  
  const handleIndoorNavigationClick = useCallback(() => {
    if (selectedLocation?.coordinates) {
      const hospitalId = selectedLocation.id;
      const specificView = HOSPITAL_SPECIFIC_VIEWS[hospitalId] || {};
      const targetCenter = specificView.coordinates || selectedLocation.coordinates;

      let flyToOptions: CustomFlyToOptions & Pick<CameraOptions, 'zoom' | 'pitch' | 'bearing'> = {
        speed: DEFAULT_FLY_TO_OPTIONS.speed,
        curve: DEFAULT_FLY_TO_OPTIONS.curve,
        zoom: specificView.zoom ?? DEFAULT_FLY_TO_OPTIONS.zoom,
        pitch: specificView.pitch ?? DEFAULT_FLY_TO_OPTIONS.pitch,
        bearing: specificView.bearing ?? mapInstance?.getBearing() ?? 0,
      };

      if (specificView.bearing === undefined && contextUserLocation) {
          try {
            flyToOptions.bearing = calculateBearing(contextUserLocation, targetCenter as [number, number]);
          } catch (error) {
            console.error("Error calculating bearing for indoor flyTo:", error);
          }
      }
      
      flyTo(targetCenter as [number, number], flyToOptions.zoom, flyToOptions);
      
      toast.info(`Focusing on indoor view for ${selectedLocation.name}`, { icon: <Footprints className="h-4 w-4" /> });
    } else if (!selectedLocation) {
      toast.error("Please select a hospital first.");
    } else {
      toast.error("Selected hospital has no coordinates defined.");
    }
  }, [selectedLocation, contextUserLocation, mapInstance, flyTo]);

  const sidebarProps: SidebarContentProps = {
    getCurrentPosition, geoLoading, geoError, activeTab, setActiveTab,
    processedHospitals, selectedLocation, allRoutes, directionsLoading,
    directionsError, hospitalsLoading, hospitalsError, handleViewDirections,
    handleSelectHospitalFromList, selectRoute,
    onDepartmentSelect: handleDepartmentSelect,
    onDrivingSelect: handleNavigationModeSelect,
    currentRoute,
    hasIndoorPath: isIndoorPathAvailable,
    onGoToParkingClick: handleGoToParkingClick,
    onIndoorNavigationClick: handleIndoorNavigationClick,
  };

  const mapElementsProps: MapElementsProps = {
    mapInstance, hospitalsLoading, processedHospitals, popupLocation,
    currentRoute, handleViewDirections,
    userLocation, getCurrentPosition, geoLoading
  };

  return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="relative h-[calc(100vh-0px)]">
          <SidebarContainer
              isOpen={sidebarOpen}
              onToggleSidebar={toggleSidebar}
          >
            <SidebarContent {...sidebarProps} />
          </SidebarContainer>
          <div className="absolute top-0 bottom-0 left-0 right-0 h-full" style={{ zIndex: Z_INDEX.map }}>
            <MainMap />
            <RouteLayerManager routes={allRoutes} onSelectRoute={selectRoute} />
            {search.data && search.data.path && search.data.path.toParking && 
              <IndoorRouteManager pathNodes={search.data.path.toParking} />
            }
            <Custom3DLayerManager />
            <MapElements {...mapElementsProps} />
          </div>
        </div>
      </div>
  )
}

export default function App() {
  return (
      <MapErrorBoundary fallback={<p>Map failed to load. Please refresh.</p>}>
        <MapProvider>
          <LayoutNoFooter>
            <AppContent />
            <Toaster
                position="top-center"
                richColors
                closeButton
                toastOptions={{
                  style: { marginTop: `${LAYOUT_DIMENSIONS.HEADER_HEIGHT + 8}px` },
                }}
            />
          </LayoutNoFooter>
        </MapProvider>
      </MapErrorBoundary>
  )
}
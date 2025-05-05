import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { UserLocationInput } from "@/components/map/ui/UserLocationInput";
import { UserDepartmentInput } from "@/components/map/ui/UserDepartmentInput";
import { HospitalList } from "@/components/map/ui/HospitalList";
import { DirectionsCard } from "@/components/map/ui/DirectionsCard";
import { hospitalIconMapping } from '@/lib/icons';
import type { Hospital } from "@/types/hospital";
import type { EnrichedRoute } from '@/lib/services/directions';

export interface SidebarContentProps {
    getCurrentPosition: () => void;
    geoLoading: boolean;
    geoError: string | null;
    activeTab: "list" | "directions";
    setActiveTab: (value: "list" | "directions") => void;
    processedHospitals: Hospital[];
    selectedLocation: Hospital | null;
    allRoutes: EnrichedRoute[] | null;
    directionsLoading: boolean;
    directionsError: string | null;
    hospitalsLoading: boolean;
    hospitalsError: string | null;
    handleViewDirections: (hospital: Hospital) => void;
    handleSelectHospitalFromList: (hospital: Hospital) => void;
    selectRoute: (route: EnrichedRoute) => void;
    onDepartmentSelect: (department: string) => void;
    onDrivingSelect: (Driving: boolean) => void;
}

export function SidebarContent({
                                   getCurrentPosition,
                                   geoLoading,
                                   geoError,
                                   activeTab,
                                   setActiveTab,
                                   processedHospitals,
                                   selectedLocation,
                                   allRoutes,
                                   directionsLoading,
                                   directionsError,
                                   hospitalsLoading,
                                   hospitalsError,
                                   handleViewDirections,
                                   handleSelectHospitalFromList,
                                   selectRoute,
                                   onDepartmentSelect,
                                   onDrivingSelect,
                               }: SidebarContentProps) {
    return (
        <div className="flex flex-col h-full">
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "list" | "directions")}
                className="flex flex-col flex-1 h-0 min-h-0"
            >
                <TabsList className="grid w-full grid-cols-2 h-9 flex-shrink-0 mb-2">
                    <TabsTrigger value="list" className="text-xs">List View</TabsTrigger>
                    <TabsTrigger value="directions" className="text-xs">Directions</TabsTrigger>
                </TabsList>

                {/* List Tab */}
                <TabsContent
                    value="list"
                    className="flex-1 h-0 min-h-0 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
                >
                    <div className="flex-shrink-0 mb-4 px-1">
                        <UserLocationInput
                            getCurrentPosition={getCurrentPosition}
                            isGeoLoading={geoLoading}
                        />
                        {geoError && <p className="text-xs text-red-600 text-center mt-1">{geoError}</p>}
                    </div>
                    {hospitalsLoading ? (
                        <div className="space-y-2 p-1">
                            <Skeleton className="h-[110px] w-full" />
                            <Skeleton className="h-[110px] w-full" />
                            <Skeleton className="h-[110px] w-full" />
                        </div>
                    ) : hospitalsError ? (
                        <div className="text-center py-8 text-sm text-red-600">{hospitalsError}</div>
                    ) : (
                        <div className="flex-1 h-0 min-h-0">
                            <HospitalList
                                hospitals={processedHospitals}
                                onSelectItem={handleSelectHospitalFromList}
                                onViewDirections={handleViewDirections}
                                iconMapping={hospitalIconMapping}
                            />
                        </div>
                    )}
                </TabsContent>

                {/* Directions Tab */}
                <TabsContent
                    value="directions"
                    className="flex-1 h-0 min-h-0 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
                >
                    {selectedLocation && (
                        <UserDepartmentInput
                            buildingName={selectedLocation.name}
                            onDepartmentSelect={onDepartmentSelect}
                            className="mb-4 flex-shrink-0" // Add flex-shrink-0 here
                        />
                    )}
                    <div className="flex flex-col h-full min-h-0"> {/* Add this wrapper */}
                        <DirectionsCard
                            hospital={selectedLocation}
                            isLoading={directionsLoading}
                            error={directionsError}
                            allRoutes={allRoutes}
                            onSelectRoute={selectRoute}
                            onDrivingSelect={onDrivingSelect}
                            className="flex-1 min-h-0" // Add these classes
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Search, X, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTRPC } from '@/database/trpc';
import { useQuery } from '@tanstack/react-query';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface UserDepartmentInputProps {
    buildingName: string;
    onDepartmentSelect: (department: string) => void;
    className?: string;
}

export function UserDepartmentInput({
                                        buildingName,
                                        onDepartmentSelect,
                                        className
                                    }: UserDepartmentInputProps) {
    const trpc = useTRPC();
    const [inputValue, setInputValue] = useState("");
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const { data, isLoading, isError } = useQuery(
        trpc.mapInfoRouter.mapInfo.queryOptions({ buildingName })
    );

    useEffect(() => {
        if (data) {
            setDepartments(data);
        }
    }, [data]);

    const filteredDepartments = departments.filter(dept =>
        dept.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleSelect = (department: string) => {
        setInputValue(department);
        onDepartmentSelect(department);
        setIsCommandOpen(false); // This closes the dropdown
        inputRef.current?.blur(); // This removes focus from the input
    };

    const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setInputValue("");
        inputRef.current?.focus();
        setIsCommandOpen(true);
    };

    return (
        <div className={cn("relative w-full", className)}>
            {/* Input with icons */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    placeholder="Search departments..."
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsCommandOpen(true);
                    }}
                    onClick={() => setIsCommandOpen(true)}
                    onFocus={() => setIsCommandOpen(true)}
                    onBlur={() => setTimeout(() => setIsCommandOpen(false), 200)} // Small delay to allow click events
                    className={cn(
                        "w-full pl-9 pr-8 h-10 bg-background hover:bg-accent/50 focus:bg-background",
                        isCommandOpen && "outline-none ring-0 border-width-2 rounded-b-none"
                    )}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {inputValue && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClearInput}
                            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                </div>
            </div>

            {/* Dropdown menu */}
            {isCommandOpen && (
                <div className="absolute z-50 mt-1 w-full">
                    <Command className="w-full rounded-t-none border-width-2 shadow-lg bg-background">
                        <CommandList className="max-h-[300px] overflow-y-auto">
                            {isError ? (
                                <CommandEmpty className="py-4 text-center text-sm text-destructive">
                                    Failed to load departments
                                </CommandEmpty>
                            ) : filteredDepartments.length === 0 ? (
                                <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
                                    {inputValue ? "No matching departments" : "No departments available"}
                                </CommandEmpty>
                            ) : (
                                <CommandGroup>
                                    {filteredDepartments.map((department) => (
                                        <CommandItem
                                            key={department}
                                            value={department}
                                            onSelect={() => handleSelect(department)}
                                            className="aria-selected:bg-accent flex w-full cursor-pointer items-center px-4 py-2 hover:bg-accent/50"
                                        >
                                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="truncate text-sm">{department}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    );
}
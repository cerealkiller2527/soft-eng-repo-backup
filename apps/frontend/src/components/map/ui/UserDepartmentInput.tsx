"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Search, X, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTRPC } from '@/database/trpc.ts';
import { useQuery } from '@tanstack/react-query';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface UserDepartmentInputProps {
    buildingName: string;
    onDepartmentSelect: (department: string) => void;
    className?: string;
}

export function UserDepartmentInput({ buildingName, onDepartmentSelect, className }: UserDepartmentInputProps) {
    const trpc = useTRPC();
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Fetch departments for the current building
    const nodesQuery = useQuery(
        trpc.mapInfoRouter.mapInfo.queryOptions({ buildingName })
    );

    useEffect(() => {
        if (nodesQuery.data) {
            setDepartments(nodesQuery.data);
        }
    }, [nodesQuery.data]);

    const filteredDepartments = departments.filter(dept =>
        dept.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleSelect = (department: string) => {
        setInputValue(department);
        onDepartmentSelect(department);
        setOpen(false);
    };

    const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setInputValue("");
        inputRef.current?.focus();
        setOpen(true);
    };

    return (
        <div className={cn("flex gap-2 w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="relative w-full flex-1">
                    <PopoverTrigger asChild>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                            <Input
                                ref={inputRef}
                                placeholder="Search departments..."
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setOpen(true);
                                }}
                                onClick={() => setOpen(true)}
                                className="w-full pl-9 pr-9 h-10 text-base bg-secondary/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                            />
                            {inputValue && !nodesQuery.isLoading && (
                                <button
                                    type="button"
                                    onClick={handleClearInput}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 p-1"
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                            {nodesQuery.isLoading && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin z-10" />
                            )}
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command shouldFilter={false}>
                            <CommandInput
                                placeholder="Search departments..."
                                value={inputValue}
                                onValueChange={setInputValue}
                            />
                            <CommandList>
                                <CommandEmpty>No departments found</CommandEmpty>
                                <CommandGroup>
                                    {filteredDepartments.map((department) => (
                                        <CommandItem
                                            key={department}
                                            value={department}
                                            onSelect={() => handleSelect(department)}
                                            className="cursor-pointer"
                                        >
                                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {department}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </div>
            </Popover>
        </div>
    );
}
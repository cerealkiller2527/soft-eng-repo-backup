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

export function UserDepartmentInput({
                                        buildingName,
                                        onDepartmentSelect,
                                        className
                                    }: UserDepartmentInputProps) {
    const trpc = useTRPC();
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Fetch departments for the current building
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
        setOpen(false);
    };

    const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setInputValue("");
        inputRef.current?.focus();
        setOpen(true);
    };

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="relative">
                    <PopoverTrigger asChild>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                                ref={inputRef}
                                placeholder="Search departments..."
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setOpen(true);
                                }}
                                onClick={() => setOpen(true)}
                                className="w-full pl-9 pr-9 h-10 bg-background hover:bg-accent/50 focus:bg-background transition-colors"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {inputValue && !isLoading && (
                                    <button
                                        type="button"
                                        onClick={handleClearInput}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                                {isLoading && (
                                    <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                                )}
                            </div>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-[var(--radix-popover-trigger-width)] p-0 shadow-lg rounded-lg border"
                        align="start"
                        sideOffset={4}
                    >
                        <Command shouldFilter={false} className="rounded-lg">
                            <CommandInput
                                placeholder="Search departments..."
                                value={inputValue}
                                onValueChange={setInputValue}
                                className="border-b"
                            />
                            <CommandList className="max-h-[300px] overflow-y-auto">
                                {isError ? (
                                    <CommandEmpty className="py-6 text-center text-sm text-destructive">
                                        Failed to load departments
                                    </CommandEmpty>
                                ) : filteredDepartments.length === 0 ? (
                                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                                        {inputValue ? "No matching departments" : "No departments available"}
                                    </CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {filteredDepartments.map((department) => (
                                            <CommandItem
                                                key={department}
                                                value={department}
                                                onSelect={() => handleSelect(department)}
                                                className="px-4 py-2 cursor-pointer transition-colors hover:bg-accent/50 aria-selected:bg-accent"
                                            >
                                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="truncate">{department}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </div>
            </Popover>
        </div>
    );
}
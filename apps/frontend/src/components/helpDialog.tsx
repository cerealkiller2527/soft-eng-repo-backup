"use client"

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alertdialog"

import { Button } from "@/components/ui/button"

export function HelpDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="absolute top-28 right-6 z-30">
                    Help
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>How to Use This Menu</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ul className="list-disc pl-5">
                            <li>Use the dropdowns on the left side of the screen to select a building and floor. Once selected, nodes and edges for that floor will be displayed.</li>
                            <li>Doubleclick any point on the map to add a node.</li>
                            <li>Click on a node to select it (this will bring up the node editor menu).</li>
                            <li>When a node is selected:
                                <ul className="list-decimal pl-5">
                                    <li>Click Backspace to remove it and any edges.</li>
                                    <li>Click another node to create an edge between the two.</li>
                                </ul>
                            </li>
                            <li>Click an edge to delete it.</li>
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

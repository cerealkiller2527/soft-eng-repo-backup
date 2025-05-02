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
                <Button variant="outline" className="bg-primary hover:bg-chart-4 text-white hover:text-white">
                    Help
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>How to Use This Menu</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ul className="list-disc pl-5">
                            <li>First, select a building, then a floor. The map editor will center itself on the selected building.</li>
                            <li>If you want to change the floor or building, click the selected location button in the top right.</li>
                            <li>Doubleclick any point on the map to add a node.</li>
                            <li>Click on a node to select it (this will bring up the node editor menu on the left side of the screen).</li>
                            <li>When a node is selected:
                                <ul className="list-decimal pl-5">
                                    <li>Click Delete to remove it and any edges (Not Backspace!).</li>
                                    <li>Click another node to create an edge between the two.</li>
                                </ul>
                            </li>
                            <li>Click an edge to delete it.</li>
                            <li>In order to close a selected node without editing it, simply click the X on the info window.</li>
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

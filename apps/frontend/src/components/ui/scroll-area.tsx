// components/ui/scroll-area.tsx
import * as React from "react"
import { ScrollArea as RadixScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof RadixScrollArea>,
    React.ComponentPropsWithoutRef<typeof RadixScrollArea>
>(({ className, children, ...props }, ref) => (
    <RadixScrollArea ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <ScrollAreaViewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
            orientation="vertical"
            className="flex touch-none select-none p-0.5 transition-colors duration-160 ease-out hover:bg-gray-100"
        >
            <ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-400" />
        </ScrollAreaScrollbar>
    </RadixScrollArea>
))

ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
// components/InstructionsBox.tsx
import { ScrollArea } from "@/components/ui/scroll-area";

type InstructionsBoxProps = {
    instructions: string[];
};

const InstructionsBox: React.FC<InstructionsBoxProps> = ({ instructions }) => {
    return (
        <ScrollArea className="h-64 w-64 rounded-xl border p-4 bg-white shadow-md">
            <div className="space-y-2">
                {instructions.map((text, index) => (
                    <div key={index} className="text-sm text-gray-700">
                        {index + 1}. {text}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

export default InstructionsBox;

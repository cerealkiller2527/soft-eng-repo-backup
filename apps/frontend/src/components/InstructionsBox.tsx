import { ScrollArea } from "@/components/ui/scroll-area";

type InstructionsBoxProps = {
    instructions: string[];
};

const InstructionsBox = ({ instructions }: { instructions: string[] }) => {

    return (
        <ScrollArea className="max-h-128 overflow-auto">
            <div className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold mb-2 sticky top-0 bg-white z-10 pb-2">Step-by-Step Directions</h3>
                <ul className="list-disc list-inside">
                    {instructions.map((inst, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: inst }} />
                    ))}
                </ul>
            </div>
        </ScrollArea>
    );
};

export default InstructionsBox;

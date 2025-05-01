import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function DirectionsButton({ directions }: { directions: string[] }) {
    const [instructions, setInstructions] = useState<string[]>([]);

    function handleAddWithTTS() {
        setInstructions((prev) => {
            const updated = [...prev, ...directions];
            console.log("sounds");
            directions.forEach((dir) => {
                const utterance = new SpeechSynthesisUtterance(dir);
                const voices = window.speechSynthesis.getVoices();
                utterance.voice = voices.find(voice => voice.name === "Google UK English Male") || voices[0];
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.volume = 1;
                window.speechSynthesis.speak(utterance);
            });

            return updated;
        });
    }

    return (
        <div className="flex-auto justify-content-center">
            <Button onClick={handleAddWithTTS} className="bg-[#012D5A] text-white hover:text-[#012D5A] hover:bg-white
                    hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid">
                TTS
            </Button>
            <Button onClick={handleAddWithTTS} className="bg-[#012D5A] text-white hover:text-[#012D5A] hover:bg-white
                    hover:outline hover:outline-2 hover:outline-[#F6BD38] hover:outline-solid">
                TTS
            </Button>
        </div>
    );
}

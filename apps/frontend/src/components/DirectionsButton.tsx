import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function DirectionsButton({ directions }: { directions: string[] }) {
    const [instructions, setInstructions] = useState<string[]>([]);

    // Function to strip HTML tags from text
    function stripHtml(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    function handleAddWithTTS() {
        setInstructions((prev) => {
            const updated = [...prev, ...directions];
            directions.forEach((dir) => {
                // Strip HTML before speaking
                const cleanText = stripHtml(dir);
                if (cleanText) {
                    const utterance = new SpeechSynthesisUtterance(cleanText);
                    const voices = window.speechSynthesis.getVoices();
                    utterance.voice = voices.find(voice => voice.name === "Google UK English Male") || voices[0];
                    utterance.rate = 1;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    window.speechSynthesis.speak(utterance);
                }
            });
            return updated;
        });
    }

    return (
        <div className="flex-auto justify-content-center">
            <Button onClick={handleAddWithTTS} className="bg-primary hover:bg-primary/90">
                TTS
            </Button>
        </div>
    );
}
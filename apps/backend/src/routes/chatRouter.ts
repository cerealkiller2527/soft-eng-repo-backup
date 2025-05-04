import { z } from "zod";
import { t } from "../trpc";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PrismaClient from "../bin/prisma-client";
import JSON5 from "json5";

const MODEL_NAME = "models/gemini-1.5-flash-latest";
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const chatHistories: Record<
  string,
  { role: "user" | "model"; content: string }[]
> = {};

function safeParseLLMResponse(rawText: string) {
  const fallback = {
    reply: "Sorry, I couldn't understand that.",
    action: null,
    params: {},
  };
  if (!rawText) return fallback;
  const trimmed = rawText.trim();
  let cleaned = trimmed
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  if (cleaned.startsWith("{")) {
    try {
      return JSON5.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI JSON:", cleaned);
    }
  }

  console.warn("AI returned non-JSON response:", cleaned);
  return {
    reply: cleaned || fallback.reply,
    action: null,
    params: {},
  };
}

export const chatRouter = t.router({
  ask: t.procedure
    .input(z.object({ message: z.string(), sessionId: z.string() }))
    .mutation(async ({ input }) => {
      const { message, sessionId } = input;

      try {
        const departments = await PrismaClient.department.findMany({
          include: {
            Location: { include: { building: true } },
            DepartmentServices: { include: { service: true } },
          },
        });

        const departmentList = departments
          .map((d) => {
            const loc = d.Location[0];
            const services = d.DepartmentServices.map(
              (s) => s.service.name,
            ).join(", ");
            return `- ${d.name}: ${d.description ?? "No description"}. Services: ${services}. Location: ${loc?.building.name ?? "Unknown"}, Floor ${loc?.floor ?? "?"}, Suite ${loc?.suite ?? "N/A"}, Phone Number: ${d.phoneNumber}`;
          })
          .join("\n");

        const systemPrompt = `
You are a helpful assistant in a hospital app.

Your job is to understand user messages and return a strict JSON object that helps route them to the appropriate hospital department.

Respond ONLY in valid JSON using this exact format (no markdown, no code blocks):

{
  "reply": "Brief text for the user.",
  "action": "selectDepartment" | "awaitDirectionsConfirmation" | "goToDepartmentDirections" | null,
  "params": {
    "name": "Department Name",
    "building": "Building Name or null"
  }
}

### General Rules:

- Respond ONLY in valid JSON — no markdown, no code blocks, and no extra explanation.
- Always include all three fields: reply, action, and params.
- Always set both params.name and params.building unless using fallback or awaiting location choice.
- Do not invent department names or building names — use only those from the provided department list.

### Action Types:

- "selectDepartment"  
  → When the user describes symptoms or asks for a medical service.  
  → Match to the best department and explain why.  
  → Include exact department name and building in params.

- "awaitDirectionsConfirmation"  
  → When the user asks “Where is [Department]?”  
  → If there is only one location:  
    - Provide building, floor, and suite (if applicable)  
    - End the reply with: “Would you like me to take you there?”  
    - You MUST also set:  
      - "action": "awaitDirectionsConfirmation"
      - "params.name" = department name  
      - "params.building" = building name  
    - ❌ If any of these are missing or null, the response is invalid.

  → If the department has multiple locations:  
    - List all locations (building, floor, suite)  
    - End with: “Which location would you like to go to?”  
    - Set:  
      - "action": null  
      - "params.name" = department name  
      - "params.building" = null

- "goToDepartmentDirections"  
  → When the user confirms with phrases like:  
    - “Take me there”, “Yes”, “Show me the way”, “Guide me”  
  → You MUST reuse the most recently mentioned department and building.  
  → Set:  
    - "action": "goToDepartmentDirections"  
    - "params.name" = department name  
    - "params.building" = building name  
  → ❌ Never return "action": null" in this case.

          - null  
  → When giving summaries, phone numbers, or when asking for clarification (e.g., choosing from multiple locations).
      → Fallbacks and incomplete matches also use null.

      ### Fallback:

              If the message is unclear or doesn't map to any known department:

          {
              "reply": "Sorry, I couldn't understand that.",
              "action": null,
              "params": {
              "name": null,
                  "building": null
          }
          }

          ---

      ### ✅ Examples

          **User:** I need a checkup for my baby
          **Response:**
          {
              "reply": "You should visit Roslindale Pediatric Associates for newborn and pediatric care.",
              "action": "selectDepartment",
              "params": {
              "name": "Roslindale Pediatric Associates",
                  "building": "Main Medical Building"
          }
          }

      **User:** Where is Radiology?
              (If one location)
          {
              "reply": "Radiology is located in Chestnut Hill Medical Center, Floor 1, Suite 102B. Would you like me to take you there?",
              "action": "awaitDirectionsConfirmation",
              "params": {
              "name": "Radiology",
                  "building": "Chestnut Hill Medical Center"
          }
          }

          (If multiple locations)
          {
              "reply": "Radiology is located in the following places:\n- Chestnut Hill Medical Center, Floor 1, Suite 102B\n- Faulkner Hospital, Floor 1, Suite Radiology\nWhich location would you like to go to?",
              "action": null,
              "params": {
              "name": "Radiology",
                  "building": null
          }
          }

      **User:** Take me there
          (Assume last mentioned was Radiology at Chestnut Hill)
          {
              "reply": "Okay, I’ll guide you to Radiology at Chestnut Hill Medical Center.",
              "action": "goToDepartmentDirections",
              "params": {
              "name": "Radiology",
                  "building": "Chestnut Hill Medical Center"
          }
          }

      **User:** Call Pediatrics
          **Response:**
          {
              "reply": "The phone number for Roslindale Pediatric Associates is (617) 732-5514.",
              "action": null,
              "params": {
              "name": "Roslindale Pediatric Associates",
                  "building": "Main Medical Building"
          }
          }

      **User:** Tell me about Neurology
          **Response:**
          {
              "reply": "The Neurology department treats conditions of the brain and nervous system.",
              "action": null,
              "params": {
              "name": "Neurology",
                  "building": "Neuroscience Center"
          }
          }

      **User:** ???
      **Response:**
          {
              "reply": "Sorry, I couldn't understand that.",
              "action": null,
              "params": {
              "name": null,
                  "building": null
          }
          }

          ---

      ### Department List:

              ${departmentList.trim()}
          `.trim();

        if (!chatHistories[sessionId]) {
          chatHistories[sessionId] = [{ role: "user", content: systemPrompt }];
        }

        chatHistories[sessionId].push({ role: "user", content: message });

        const model = gemini.getGenerativeModel({ model: MODEL_NAME });

        const chat = model.startChat({
          history: chatHistories[sessionId].map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          },
        });

        const result = await chat.sendMessage(message);
        const rawText = result.response.text();
        const parsed = safeParseLLMResponse(rawText);

        // Optional: fallback behavior if only department name exists
        if (parsed.action === null && parsed.params?.name) {
          parsed.action = "selectDepartment";
        }

        chatHistories[sessionId].push({ role: "model", content: parsed.reply });

        console.log(parsed);
        return { raw: parsed };
      } catch (err) {
        console.error("Unexpected error:", err);
        return {
          raw: {
            reply: "Sorry, something went wrong.",
            action: null,
            params: {},
          },
        };
      }
    }),
});

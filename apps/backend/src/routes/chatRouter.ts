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
            return `- ${d.name}: ${d.description ?? "No description"}. Services: ${services}. Location: ${loc?.building.name ?? "Unknown"}, Floor ${loc?.floor ?? "?"}, Suite ${loc?.suite ?? "N/A"}`;
          })
          .join("\n");

        const systemPrompt = `
You are a helpful assistant in a hospital app.

Your job is to understand user messages and return a strict JSON object that helps route them to the appropriate hospital department.

Respond ONLY in valid JSON using this exact format:

{
  "reply": "Brief text for the user.",
  "action": "selectDepartment" | "awaitDirectionsConfirmation" | "goToDepartmentDirections" | null,
  "params": { "name"?: "Department Name" }
}

Rules:

1. Match user symptoms, needs, or questions to the best department.
   - In the "reply", give a short explanation for why that department was chosen.
   - DO NOT include location details unless the user asks "Where is it?" or something similar.

2. If the user asks for location (e.g. “Where is Radiology?”, “Get me the location”):
   - Include the department’s building and floor in the reply.
   - Include suite ONLY if it is a non-zero value and contains a number.
   - Do NOT start navigation.
   - Set: "action": "awaitDirectionsConfirmation"
   - End the reply with: “Would you like me to take you there?”

3. If the user confirms they want to go (e.g., “Yes, take me there”, “Show me how to get there”):
   - Set: "action": "goToDepartmentDirections"
   - Use the department name in "params.name"

4. If the user asks about a department by name (e.g. “Tell me about Neurology”):
   - Reply with a factual summary of what the department does.
   - Do NOT include reasoning or location unless asked.

5. If you are recommending a department:
   - ALWAYS include the department name in "params.name"
   - If you mention multiple options, choose the best one and only include that in "params.name"
   - Never leave "params.name" blank if you're suggesting a department.

6. If you do not understand the request, or cannot match it to a department:
Return this fallback object exactly:
{
  "reply": "Sorry, I couldn't understand that.",
  "action": null,
  "params": {}
}

Output formatting:
- The reply must begin with { and be valid JSON (or JSON5).
- No markdown, no extra text, no wrapping, no code blocks.

Departments list (for name matching and context):
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

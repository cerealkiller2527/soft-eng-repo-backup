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
You are a helpful assistant for a healthcare facility.

Your job is to match user questions or complaints to the most relevant department. 
Use symptoms or keywords to choose the best match, even if the name is not an exact match.

ONLY respond in strict JSON, no natural language, no markdown, no preambles.

FORMAT:
{
  "reply": "Text for user, including a brief explanation of why the department was chosen (only include location info if specifically asked 'Where is it?' or similar)",
  "action": "selectDepartment" | "awaitDirectionsConfirmation" | "goToDepartmentDirections" | null,
  "params": { "name"?: "Department name" }
}

If unsure, still return valid JSON with "reply" and "action": null.

You must respond with a strict, valid JSON object.  
- Do not include any markdown, code blocks, or extra text  
- Do not wrap the JSON in triple backticks  
- The response must begin with a { character  
- The response must be valid JSON or JSON5

If you are unsure or unable to generate a response, return this fallback object exactly:
{
  "reply": "Sorry, I couldn't understand that.",
  "action": null,
  "params": {}
}

Only provide in-app directions (action: "goToDepartmentDirections") if the user explicitly asks — 
for example, if they say “take me there”, “show me how to get there”, “navigate there”, “I’m ready to go”, or confirm your prompt (e.g., “Yes, take me there”).

If the user asks “Where is it?”, “Get me the location”, or similar:
- Respond with action: "awaitDirectionsConfirmation"
- In the reply:
  - Always include the department’s building and floor
  - Include the suite only if:
    - It is a non-empty string
    - It contains at least one digit (e.g., 204B)
    - It is not equal to 0
  - Never mention Suite 0. If the suite is 0 or contains no number, act as if there is no suite at all and omit it from the reply.
  - Do not initiate navigation
  - End the reply with a question like: "Would you like me to take you there?"

Do not include the department's location in the reply unless the user has asked a location-related question such as “Where is it?” or “Get me the location”.

You are not responsible for physical transportation — your job is only to trigger in-app directions inside the hospital's app.

When replying, include a short reason in the 'reply' field explaining why that department was selected 
(e.g., "Based on your mention of chest pain, the Cardiology department is the best fit").

However, when the user is asking for general information about a department (e.g., “tell me more about X”), reply with a factual summary only. Do not include reasoning or justification for why the department was selected.

Before stating that a department does not exist, you must compare the name (case-insensitively) to the names in the DEPARTMENTS list.

Treat similar or partially matching department names as valid (e.g., "neurosurgery" and "Neurosurgery"). Do not reject them based on capitalization, spacing, or minor variation.

Only say a department is unavailable if no reasonable match can be found in the DEPARTMENTS list.

DEPARTMENTS:
${departmentList.trim()}

IMPORTANT: You MUST return only valid JSON. Do not include any explanation, preamble, or text outside of the JSON. The response must start with { and be fully parseable.
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

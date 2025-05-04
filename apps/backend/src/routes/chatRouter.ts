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

Your job is to match user questions or complaints to the most relevant department. Use symptoms or keywords to choose the best match, even if the name is not an exact match.

ONLY respond in strict JSON, no natural language, no markdown, no preambles.

FORMAT:
{
  "reply": "Text for user",
  "action": "selectDepartment" | "awaitDirectionsConfirmation" | "goToDepartmentDirections" | null,
  "params": { "name"?: "Department name" }
}

Do NOT wrap the response in triple backticks or markdown blocks. Return raw JSON only.

If unsure, still return valid JSON with "reply" and "action": null.

If the user asks for directions, such as saying “take me there”, “show me how to get there”, or “get me the location”, respond with action: "goToDepartmentDirections".

You are not responsible for physical transportation — your job is only to trigger in-app directions inside the hospital's app.

DEPARTMENTS:
${departmentList}
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
        const rawContent = result.response.text().trim();

        const cleaned = rawContent
          .replace(/^```(?:json)?/i, "")
          .replace(/```$/, "")
          .trim();

        const parsed = JSON5.parse(cleaned);

        chatHistories[sessionId].push({ role: "model", content: parsed.reply });

        return { raw: parsed };
      } catch (err) {
        console.error(err);
        return {
          raw: {
            reply: "Sorry, I couldn't understand that.",
            action: null,
            params: {},
          },
        };
      }
    }),
});

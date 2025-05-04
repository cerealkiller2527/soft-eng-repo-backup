import { z } from "zod";
import { t } from "../trpc";
import axios from "axios";
import PrismaClient from "../bin/prisma-client";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct";

export const chatRouter = t.router({
  ask: t.procedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
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

Respond in **strict JSON only**, following this structure:
{
  "reply": "Text for user",
  "action": "selectDepartment" | "awaitDirectionsConfirmation" | "goToDepartmentDirections" | null,
  "params": { "name"?: "Department name" }
}

Do not include HTML or links.

Always choose the closest or most likely department based on the user's message.

DEPARTMENTS:
${departmentList}
`.trim();

        const response = await axios.post(
          OPENROUTER_API_URL,
          {
            model: OPENROUTER_MODEL,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: input.message },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );

        const content = response.data.choices?.[0]?.message?.content ?? "{}";
        return { raw: content };
      } catch (err) {
        console.error("OpenRouter chat failed:", err);
        throw new Error(
          "Assistant is currently unavailable. Please try again soon.",
        );
      }
    }),
});

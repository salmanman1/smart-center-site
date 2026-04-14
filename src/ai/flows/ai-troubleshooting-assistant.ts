'use server';
/**
 * @fileOverview An AI troubleshooting assistant flow.
 *
 * - aiTroubleshootingAssistant - A function that handles the AI troubleshooting process.
 * - AiTroubleshootingAssistantInput - The input type for the aiTroubleshootingAssistant function.
 * - AiTroubleshootingAssistantOutput - The return type for the aiTroubleshootingAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiTroubleshootingAssistantInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A natural language description of the appliance problem.'),
});
export type AiTroubleshootingAssistantInput = z.infer<
  typeof AiTroubleshootingAssistantInputSchema
>;

const AiTroubleshootingAssistantOutputSchema = z.object({
  diagnosis: z
    .string()
    .describe('The most likely diagnosis for the appliance problem.'),
  selfServiceSolutions: z
    .array(
      z.object({
        title: z.string().describe('Title of the solution step.'),
        steps: z.array(z.string()).describe('Detailed steps for the solution.'),
      })
    )
    .describe('A list of self-service solutions to try.'),
});
export type AiTroubleshootingAssistantOutput = z.infer<
  typeof AiTroubleshootingAssistantOutputSchema
>;

export async function aiTroubleshootingAssistant(
  input: AiTroubleshootingAssistantInput
): Promise<AiTroubleshootingAssistantOutput> {
  return aiTroubleshootingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTroubleshootingAssistantPrompt',
  input: { schema: AiTroubleshootingAssistantInputSchema },
  output: { schema: AiTroubleshootingAssistantOutputSchema },
  prompt: `You are an intelligent troubleshooting assistant for Franke appliances. Your goal is to help customers diagnose common appliance issues and suggest self-service solutions based on a comprehensive knowledge base of symptoms, diagnostics, and solutions.

The user has described an appliance problem. Analyze the description and provide a likely diagnosis and a list of actionable self-service solutions.

Appliance Problem Description:
{{{problemDescription}}}`,
});

const aiTroubleshootingAssistantFlow = ai.defineFlow(
  {
    name: 'aiTroubleshootingAssistantFlow',
    inputSchema: AiTroubleshootingAssistantInputSchema,
    outputSchema: AiTroubleshootingAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

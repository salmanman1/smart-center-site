'use server';
/**
 * @fileOverview An AI agent for analyzing appliance malfunction images.
 *
 * - analyzeApplianceImage - A function that handles the image analysis process.
 * - ImageAnalysisInput - The input type for the analyzeApplianceImage function.
 * - ImageAnalysisOutput - The return type for the analyzeApplianceImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an appliance malfunction, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional description of the malfunction or problem.'),
});
export type ImageAnalysisInput = z.infer<typeof ImageAnalysisInputSchema>;

const ImageAnalysisOutputSchema = z.object({
  problemIdentified: z
    .boolean()
    .describe('Whether or not a specific malfunction problem was identified.'),
  diagnosis: z
    .string()
    .describe('A detailed diagnosis of the identified problem or observation.'),
  severity: z
    .enum(['low', 'medium', 'high', 'critical', 'unknown'])
    .describe('The severity level of the identified problem.'),
  recommendedActions: z
    .array(z.string())
    .describe('A list of recommended actions to resolve the problem.'),
  knowledgeBaseLinks: z
    .array(z.string().url())
    .describe('A list of URLs to relevant knowledge base articles or solutions.'),
});
export type ImageAnalysisOutput = z.infer<typeof ImageAnalysisOutputSchema>;

export async function analyzeApplianceImage(
  input: ImageAnalysisInput
): Promise<ImageAnalysisOutput> {
  return analyzeApplianceImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeApplianceImagePrompt',
  input: {schema: ImageAnalysisInputSchema},
  output: {schema: ImageAnalysisOutputSchema},
  prompt: `You are an expert appliance repair technician AI. Your task is to analyze an image of an appliance and diagnose any visible malfunctions. Based on your analysis, provide a detailed diagnosis, severity level, recommended actions, and relevant links to knowledge base solutions.

Here is the input:
Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Follow these steps:
1. Carefully examine the provided image for any signs of malfunction, damage, or unusual conditions.
2. If a specific problem is identified, set 'problemIdentified' to true. Otherwise, set it to false and provide a general observation.
3. Provide a clear and concise 'diagnosis' of the problem.
4. Assign a 'severity' level (low, medium, high, critical, unknown) to the problem. 'Critical' should be used for issues that pose immediate safety risks or render the appliance completely unusable.
5. List 'recommendedActions' that a user or technician can take to address the problem.
6. Provide 'knowledgeBaseLinks' to external resources (e.g., manufacturer's troubleshooting guides, repair forums) that could help resolve the issue. If no specific links are immediately obvious, you can provide general appliance repair search queries or suggest contacting a professional.

Ensure your output strictly adheres to the JSON schema provided.
`,
});

const analyzeApplianceImageFlow = ai.defineFlow(
  {
    name: 'analyzeApplianceImageFlow',
    inputSchema: ImageAnalysisInputSchema,
    outputSchema: ImageAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input, { model: 'googleai/gemini-1.5-flash-latest' });
    return output!;
  }
);

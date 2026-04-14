"use client";

import { useState } from 'react';
import { aiTroubleshootingAssistant, type AiTroubleshootingAssistantOutput } from '@/ai/flows/ai-troubleshooting-assistant';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Send, Loader2, Info } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function AITroubleshootingTool() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiTroubleshootingAssistantOutput | null>(null);

  const handleDiagnose = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const response = await aiTroubleshootingAssistant({ problemDescription: description });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-secondary/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Instant Diagnostics
          </CardTitle>
          <CardDescription>
            Describe the issue you're facing for immediate AI-powered troubleshooting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea 
              placeholder="e.g., My Franke coffee machine is showing an E05 error code and leaking water from the bottom..."
              className="min-h-[120px] pr-12 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button 
              size="icon" 
              className="absolute bottom-3 right-3 rounded-full"
              onClick={handleDiagnose}
              disabled={loading || !description.trim()}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-primary">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg">Diagnosis</CardTitle>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <p>{result.diagnosis}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Recommended Self-Service Steps</h4>
              <Accordion type="single" collapsible className="w-full">
                {result.selfServiceSolutions.map((sol, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      {sol.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-2">
                        {sol.steps.map((step, si) => (
                          <li key={si}>{step}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p className="text-sm text-muted-foreground">Didn't solve the issue?</p>
                <Button variant="default" className="font-bold">Create Service Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

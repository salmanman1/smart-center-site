"use client";

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AITroubleshootingTool from '@/components/AITroubleshootingTool';
import ImageAnalysisTool from '@/components/ImageAnalysisTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Camera, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TroubleshootPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold font-headline">AI Engineering Assistant</h1>
            <p className="text-muted-foreground">Get instant diagnosis using our cutting-edge Gemini Vision and Flash models.</p>
          </div>

          <Alert className="bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="font-bold">Proactive Diagnosis</AlertTitle>
            <AlertDescription className="text-sm">
              90% of service requests can be resolved through self-service. Try our AI tools before creating a ticket to save time.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="text" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Describe Problem
              </TabsTrigger>
              <TabsTrigger value="vision" className="gap-2">
                <Camera className="h-4 w-4" />
                Scan Malfunction
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="animate-in fade-in duration-300">
              <AITroubleshootingTool />
            </TabsContent>
            
            <TabsContent value="vision" className="animate-in fade-in duration-300">
              <ImageAnalysisTool />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

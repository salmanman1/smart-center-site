"use client";

import { useState } from 'react';
import { analyzeApplianceImage, type ImageAnalysisOutput } from '@/ai/flows/ai-image-analysis-diagnostics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Loader2, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function ImageAnalysisTool() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageAnalysisOutput | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await analyzeApplianceImage({ photoDataUri: image });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-muted hover:bg-muted-foreground';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Visual Diagnosis
        </CardTitle>
        <CardDescription>
          Upload a photo of the malfunction for automated visual analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 bg-muted/20 transition-colors hover:bg-muted/30">
          {image ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
              <Image src={image} alt="Malfunction upload" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm" onClick={() => setImage(null)}>Change Photo</Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <Input type="file" className="hidden" id="file-upload" accept="image/*" onChange={handleFileChange} />
              <Button asChild variant="outline" size="sm">
                <label htmlFor="file-upload">Select Image</label>
              </Button>
            </div>
          )}
        </div>

        {image && !result && (
          <Button 
            className="w-full font-bold" 
            disabled={loading} 
            onClick={handleAnalyze}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Pixels...
              </>
            ) : "Analyze Image"}
          </Button>
        )}

        {result && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {result.problemIdentified ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                <h4 className="font-bold">Result</h4>
              </div>
              <Badge className={getSeverityColor(result.severity)}>{result.severity.toUpperCase()}</Badge>
            </div>
            
            <p className="text-sm leading-relaxed text-muted-foreground bg-muted/50 p-4 rounded-lg">
              {result.diagnosis}
            </p>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recommended Actions</h5>
              <div className="grid gap-2">
                {result.recommendedActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </div>
                    {action}
                  </div>
                ))}
              </div>
            </div>

            {result.knowledgeBaseLinks.length > 0 && (
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Resources</h5>
                <div className="flex flex-wrap gap-2">
                  {result.knowledgeBaseLinks.map((link, i) => (
                    <Button key={i} variant="outline" size="sm" asChild className="gap-2">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        Guide {i + 1}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <Button variant="ghost" className="w-full text-xs" onClick={() => {setResult(null); setImage(null)}}>
              Clear Result
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

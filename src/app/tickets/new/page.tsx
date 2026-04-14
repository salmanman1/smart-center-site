"use client";

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Zap, Calendar, MapPin, Cpu } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function NewTicketPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Ticket Created Successfully",
        description: "Your request #FR-29401 has been assigned to our queue.",
      });
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-primary/10">
            <CardHeader className="bg-primary text-primary-foreground p-8 rounded-t-xl">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="h-8 w-8" />
                <CardTitle className="text-3xl font-headline">New Service Request</CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80 font-medium">
                Provide engineering details to help our technicians prepare the right tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Device Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="appliance-type" className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      Appliance Type
                    </Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Appliance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coffee">Coffee System</SelectItem>
                        <SelectItem value="oven">Oven/Range</SelectItem>
                        <SelectItem value="dishwasher">Dishwasher</SelectItem>
                        <SelectItem value="refrigeration">Refrigeration</SelectItem>
                        <SelectItem value="ventilation">Ventilation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model-number" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Model/Serial Number
                    </Label>
                    <Input id="model-number" placeholder="e.g., FR-500-XT" required />
                  </div>
                </div>

                {/* Urgency and Location */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-primary" />
                      Urgency Level
                    </Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Standard Maintenance</SelectItem>
                        <SelectItem value="medium">Performance Issue</SelectItem>
                        <SelectItem value="high">Urgent Repair</SelectItem>
                        <SelectItem value="critical">Critical Malfunction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location
                    </Label>
                    <Input id="location" placeholder="City or Postal Code" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Problem Description
                  </Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the malfunction in detail..." 
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <Button type="submit" size="lg" className="w-full font-bold h-14 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting to Engineering Hub..." : "Confirm & Submit Request"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By submitting, you agree to our Service Terms and Technician Access Protocol.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

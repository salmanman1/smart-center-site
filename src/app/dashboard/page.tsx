"use client";

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StatusStepper from '@/components/StatusStepper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Wrench, MapPin, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data for the demonstration
  const activeTickets = [
    {
      id: 'FR-29401',
      appliance: 'Franke Coffee System XT',
      status: 'in-progress' as const,
      urgency: 'high',
      location: 'Zurich, Switzerland',
      technician: 'Marcus V.',
      lastUpdate: '14 minutes ago'
    },
    {
      id: 'FR-28112',
      appliance: 'Precision Range Oven 900',
      status: 'assigned' as const,
      urgency: 'medium',
      location: 'Zurich, Switzerland',
      technician: 'Pending Assignment',
      lastUpdate: '2 hours ago'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">Manage your appliance engineering requests and tracking.</p>
          </div>
          <Button className="font-bold gap-2" asChild>
            <Link href="/tickets/new">
              New Service Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Tickets List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold font-headline flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Active Maintenance
            </h2>
            
            {activeTickets.map((ticket) => (
              <Card key={ticket.id} className="hover-lift overflow-hidden border-primary/10">
                <CardHeader className="bg-card flex flex-row items-center justify-between py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground tracking-widest">{ticket.id}</span>
                      <Badge variant={ticket.urgency === 'high' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                        {ticket.urgency} Priority
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{ticket.appliance}</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">Details</Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <StatusStepper currentStatus={ticket.status} />
                  
                  <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {ticket.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4 text-primary" />
                      Tech: {ticket.technician}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Updated {ticket.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Stats / Quick Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engineering Score</CardTitle>
                <CardDescription>Performance health of your appliances.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8 rounded-full border-8 border-primary/20 h-40 w-40 mx-auto">
                  <div className="text-center">
                    <div className="text-4xl font-bold">92</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Excellent</div>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[98%]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Protection Plus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90 leading-relaxed">
                  Your premium warranty is active until Dec 2025. All labor and genuine Franke parts are fully covered.
                </p>
                <Button variant="secondary" className="w-full font-bold">View Coverage</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Wrench className="h-4 w-4" />
                  Support
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Manuals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { Check, Clock, Wrench, Truck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'requested' | 'assigned' | 'in-progress' | 'completed';

interface StatusStepperProps {
  currentStatus: Status;
}

const steps = [
  { id: 'requested', label: 'Requested', icon: Clock },
  { id: 'assigned', label: 'Assigned', icon: Truck },
  { id: 'in-progress', label: 'In Progress', icon: Wrench },
  { id: 'completed', label: 'Completed', icon: Sparkles },
];

export default function StatusStepper({ currentStatus }: StatusStepperProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="w-full py-6 px-4">
      <div className="relative flex justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-700 ease-in-out" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,215,0,0.4)]" : "bg-muted text-muted-foreground",
                  isCurrent && "animate-pulse ring-4 ring-primary/20"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <span className={cn(
                "mt-2 text-xs font-semibold tracking-tight whitespace-nowrap",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

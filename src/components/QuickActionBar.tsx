
"use client";

import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function QuickActionBar() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`floating-action-bar ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="flex items-center gap-2 pr-4 border-r border-white/10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary hidden sm:inline">
          {language === 'ar' ? 'مساعدة سريعة' : 'Quick Help'}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-primary/20 text-primary"
        onClick={() => window.open(t.common.whatsappUrl, '_blank')}
        title="WhatsApp Support"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-primary/20 text-primary"
        onClick={() => window.location.href = `tel:${t.common.phoneNumber}`}
        title="Call Support"
      >
        <Phone className="h-5 w-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-white/10 text-muted-foreground"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to Top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}

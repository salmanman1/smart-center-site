
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Phone, MessageCircle, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoImg = PlaceHolderImages.find(img => img.id === 'company-logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#contact", label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 py-3 md:py-4",
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-white/5 py-2" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-primary/10 flex items-center justify-center p-1.5 border border-primary/20">
 <Image 
  src="/images/Logo.png" 
  alt="Smart Center" 
  width={40} 
  height={40} 
  className="object-contain filter brightness-110"
/>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-lg md:text-2xl font-black tracking-tighter gold-text-gradient leading-none">
                  {t.common.brandName}
                </span>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.common.engineeringHub}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-sm font-bold text-gray-400 hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
            
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 text-gray-400 hover:text-primary font-bold">
              <Globe className="h-4 w-4" />
              {t.nav.langSwitch}
            </Button>

            <Button size="sm" className="gap-2 font-black gold-gradient text-background px-6 h-10 rounded-lg shadow-xl" asChild>
              <a href={t.common.whatsappUrl} target="_blank">
                <MessageCircle className="h-4 w-4" />
                {t.nav.whatsapp}
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/5 border border-white/10" onClick={toggleLanguage}>
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/5 border border-white/10" asChild>
              <a href={`tel:${t.common.phoneNumber}`}>
                <Phone className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/5 border border-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 bg-background/98 backdrop-blur-3xl p-6 flex flex-col items-center justify-center animate-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-2xl md:text-4xl font-black text-center p-4 border-b border-white/5 gold-text-gradient"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <Button className="h-14 md:h-16 gap-3 font-black text-lg gold-gradient text-background rounded-2xl shadow-xl" asChild>
                <a href={t.common.whatsappUrl}>
                  <MessageCircle className="h-6 w-6" />
                  {t.nav.whatsapp}
                </a>
              </Button>
              <Button variant="outline" className="h-14 md:h-16 gap-3 font-bold text-lg rounded-2xl border-white/10" onClick={() => setIsMenuOpen(false)}>
                {language === 'ar' ? 'إغلاق القائمة' : 'Close Menu'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

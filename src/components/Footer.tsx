
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Phone, MapPin, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, dir } = useLanguage();
  const logoImg = PlaceHolderImages.find(img => img.id === 'company-logo');

  const footerLinks = [
    { label: t.footer.links[0], href: "#home" },
    { label: t.footer.links[1], href: "#services" },
    { label: t.footer.links[2], href: "#contact" },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-xl border-t border-white/5 pt-12 md:pt-24 pb-8 md:pb-12" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20 text-right">
          <div className="space-y-6 md:space-y-8 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                 <Image 
                  src={logoImg?.imageUrl || ''} 
                  alt="Smart Center" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <span className="font-headline text-xl md:text-2xl font-black gold-text-gradient">
                {t.common.brandName}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.desc}
            </p>
            
            <div className="space-y-3 pt-2">
              <h5 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">{t.footer.coverageTag}</h5>
              <div className="flex flex-wrap gap-2">
                {t.footer.areas.map((area, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-[10px] md:text-xs font-bold rounded-full border border-primary/20">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <a 
                href={t.common.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-all border border-white/10 group"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-primary" />
              </a>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="font-black text-lg md:text-xl gold-text-gradient">{t.footer.linksTitle}</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-primary/30" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="font-black text-lg md:text-xl gold-text-gradient">{t.footer.contactTitle}</h4>
            <div className="space-y-5 md:space-y-6">
              <a href={`tel:${t.common.phoneNumber}`} className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold text-gray-300">{t.common.phoneNumber}</div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  <span className="text-primary font-bold block mb-1">{t.footer.locationLabel}</span>
                  {t.common.address}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="font-black text-lg md:text-xl gold-text-gradient">{t.footer.hoursTitle}</h4>
            <div className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-400">{t.footer.daysWeek}</span>
                <span className="text-primary font-bold">{t.footer.hoursWeek}</span>
              </div>
              <div className="flex justify-between items-center text-xs md:text-sm border-t border-white/5 pt-4">
                <span className="text-gray-400">{t.footer.dayFri}</span>
                <span className="text-green-500 font-bold">{t.footer.statusFri}</span>
              </div>
              
              <div className="pt-4 md:pt-6 border-t border-white/5 flex items-start gap-3">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Zap className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                  <span className="text-primary block mb-1">{t.footer.coverageSpecial}</span>
                  {t.footer.areas.join(" - ")}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center">
          <p>{t.footer.copy}</p>
          <div className="flex gap-4 md:gap-8">
            <Link href="#" className="hover:text-primary">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-primary">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

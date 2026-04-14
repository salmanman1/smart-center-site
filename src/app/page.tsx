"use client";

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuickActionBar from '@/components/QuickActionBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessageCircle, Phone, Star, Wrench, ShieldCheck, Clock, Settings, User, Quote } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// ─── Static Brand Logos ────────────────────────────────────────────────────────
const brandLogos = [
  { id: 'brand-franke',   name: 'Franke',   imageUrl: '/images/logos/franke.png'   },
  { id: 'brand-zanussi',  name: 'Zanussi',  imageUrl: '/images/logos/zanussi.png'  },
  { id: 'brand-lg',       name: 'LG',       imageUrl: '/images/logos/lglg.png'       },
  { id: 'brand-ariston',  name: 'Ariston',  imageUrl: '/images/logos/ariston.png'  },
  // ✅ تم تعديل الاسم هنا ليطابق ملف Hansa.png (حرف H كبير)
  { id: 'brand-hansa',    name: 'Hansa',    imageUrl: '/images/logos/Hansa.png'    },
  { id: 'brand-samsung',  name: 'Samsung',  imageUrl: '/images/logos/samsung.png'  },
];

// ─── Service Image Resolver (Fuzzy Match) ─────────────────────────────────────
function getServiceImage(key: string): string {
  const serviceImageMap: Record<string, string> = {
    'service-washing': '/images/washing_machine.png',
    'service-dishwasher': '/images/dishwasher.png',
    'service-refrigerator': '/images/refrigerator.png',
    'service-microwave': '/images/microwave.png',
    'service-cooker': '/images/stove.png',
    'service-ac': '/images/air_conditioner.png',
    'service-hoods': '/images/extractor_fan.png',
    
    'washingMachine': '/images/washing_machine.png',
    'dishwasher': '/images/dishwasher.png',
    'refrigerator': '/images/refrigerator.png',
    'microwave': '/images/microwave.png',
    'cooker': '/images/stove.png',
    'stove': '/images/stove.png',
    'oven': '/images/stove.png',
    'airConditioner': '/images/air_conditioner.png',
    'hoods': '/images/extractor_fan.png',
  };

  const k = key.toLowerCase();
  
  if (serviceImageMap[k]) {
    return serviceImageMap[k];
  }

  if (k.includes('wash') || k.includes('laundry'))
    return '/images/washing_machine.png';
  if (k.includes('dish'))
    return '/images/dishwasher.png';
  if (k.includes('refrig') || k.includes('fridge'))
    return '/images/refrigerator.png';
  if (k.includes('micro') || k.includes('wave'))
    return '/images/microwave.png';
  if (k.includes('cook') || k.includes('stove') || k.includes('oven') || k.includes('بوتاجاز'))
    return '/images/stove.png';
  if (k.includes('ac') || k.includes('air') || k.includes('condition'))
    return '/images/air_conditioner.png';
  if (k.includes('hood') || k.includes('extract') || k.includes('fan'))
    return '/images/extractor_fan.png';

  return '/images/Front_panel.png';
}

export default function Home() {
  const { t, language, dir } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const [description, setDescription] = useState("");

  const phoneNumber = t.common.phoneNumber;

  const handleWhatsappDirect = () => {
    if (typeof window !== 'undefined') {
      window.open(t.common.whatsappUrl, '_blank');
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceInfo = (t.services.items as any)[deviceType];
    const deviceLabel = serviceInfo?.title || deviceType;
    const message =
      language === 'ar'
        ? `*طلب صيانة جديد من الموقع*\n\n*نوع الجهاز:* ${deviceLabel}\n*وصف العطل:* ${description}`
        : `*New Service Request from Website*\n\n*Device Type:* ${deviceLabel}\n*Fault Description:* ${description}`;

    const whatsappUrl = `${t.common.whatsappUrl}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      toast({
        title:
          language === 'ar' ? 'جاري التوجيه لواتساب' : 'Redirecting to WhatsApp',
        description:
          language === 'ar'
            ? 'سيتم إرسال تفاصيل طلبك للدعم الفني الآن.'
            : 'Your request details are being sent to technical support now.',
      });
    }, 800);
  };

  const serviceKeys = Object.keys(t.services.items);
  const whyUsIcons = [
    <Settings className="h-6 w-6 md:h-8 md:w-8" />,
    <ShieldCheck className="h-6 w-6 md:h-8 md:w-8" />,
    <Clock className="h-6 w-6 md:h-8 md:w-8" />,
    <Wrench className="h-6 w-6 md:h-8 md:w-8" />,
  ];

  return (
    <div className="min-h-screen flex flex-col scroll-smooth font-body" dir={dir}>
      <Navigation />

      <main className="flex-grow overflow-x-hidden">
        {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
        <section
          id="home"
          className="relative min-h-[85vh] md:h-[90vh] flex items-center overflow-hidden py-20 md:py-0"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/front_panel.png"
              alt="Smart Center – luxury appliance maintenance"
              fill
              className="object-cover brightness-[0.25] md:brightness-[0.3] scale-105 animate-in zoom-in-125 [animation-duration:10s]"
              priority
              data-ai-hint="luxury kitchen"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-white text-center">
            <div className="max-w-5xl space-y-6 md:space-y-10 mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">

              {/* Logo above hero title */}
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/Logo.png"
                  alt="Smart Center Logo"
                  width={200}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 md:px-6 py-1.5 md:py-2.5 rounded-full mb-2 mx-auto">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase gold-text-gradient">
                  {t.hero.tag}
                </span>
              </div>

              <h1 className="text-3xl md:text-8xl font-black leading-tight tracking-tight flex flex-wrap justify-center items-center gap-y-2 md:gap-y-4">
                {t.hero.titlePre && (
                  <span className="inline-block whitespace-nowrap">{t.hero.titlePre}</span>
                )}
                <span className="gold-text-gradient italic px-4 md:px-8 inline-block drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] whitespace-nowrap">
                  {t.common.brandName}
                </span>
                <span className="inline-block whitespace-nowrap">{t.hero.titlePost}</span>
              </h1>

              <p className="text-base md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light mx-auto px-4 opacity-90">
                {t.hero.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 md:pt-12 justify-center px-4">
                <Button
                  size="lg"
                  className="h-14 md:h-18 px-8 md:px-14 font-black gap-3 text-lg md:text-2xl rounded-2xl gold-gradient shadow-[0_20px_40px_rgba(160,130,90,0.3)] transition-all hover:scale-105 active:scale-95"
                  onClick={handleWhatsappDirect}
                >
                  {t.hero.cta}
                  <MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 md:h-18 px-8 md:px-14 font-bold gap-3 text-lg md:text-2xl bg-white/5 text-white border-white/20 rounded-2xl backdrop-blur-md transition-all hover:bg-white/10"
                  onClick={handleWhatsappDirect}
                >
                  <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  {language === 'ar' ? 'مراسلة واتساب' : 'WhatsApp Us'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Brands Marquee ───────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-white/[0.02] border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
            <h2 className="text-xl md:text-3xl font-black gold-text-gradient uppercase tracking-[0.3em] mb-3">
              {t.brands.title}
            </h2>
            <p className="text-xs md:text-base text-muted-foreground font-medium opacity-60 max-w-4xl mx-auto leading-relaxed px-4">
              {t.brands.subtitle}
            </p>
          </div>

          <div className="relative flex overflow-hidden group">
            <div className="animate-marquee flex gap-12 md:gap-32 items-center py-6 md:py-10">
              {[...brandLogos, ...brandLogos].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  // ✅ تم إزالة filter invert و brightness لضمان ظهور الألوان الأصلية
                  className="relative h-14 w-36 md:h-24 md:w-56 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center"
                >
                  <Image src={brand.imageUrl} alt={brand.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Stats Banner ─────────────────────────────────────────────────── */}
        <section className="relative z-20 -mt-12 md:-mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {t.stats.map((stat, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-primary/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                  <div className="professional-card relative p-4 py-8 sm:p-6 md:p-12 text-center border-t-4 border-t-primary/80 bg-background/90 backdrop-blur-xl hover:border-primary shadow-2xl transition-all duration-500 rounded-3xl flex flex-col items-center justify-center overflow-visible">
                    <div
                      className={cn(
                        'font-black gold-text-gradient mb-2 drop-shadow-xl inline-block leading-none',
                        stat.value.length > 5
                          ? 'text-xl sm:text-2xl md:text-5xl'
                          : 'text-2xl sm:text-4xl md:text-7xl',
                      )}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed px-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Why Us ───────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-40 bg-primary/[0.03] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 md:mb-28 space-y-4 md:space-y-6">
              <Badge
                variant="outline"
                className="text-primary border-primary px-4 md:px-8 py-1.5 md:py-2.5 text-[10px] md:text-xs font-black tracking-widest uppercase"
              >
                {t.whyUs.tag}
              </Badge>
              <h2 className="text-3xl md:text-7xl font-black tracking-tight">{t.whyUs.title}</h2>
              <div className="w-20 md:w-32 h-1.5 gold-gradient mx-auto rounded-full" />
              <p className="text-muted-foreground text-sm md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                {t.whyUs.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {t.whyUs.items.map((item, index) => (
                <div
                  key={index}
                  className="professional-card reveal-card p-8 md:p-12 flex flex-col items-center text-center group bg-card/40 border-white/5 hover:border-primary/20 transition-all rounded-[32px]"
                >
                  <div className="h-16 w-16 md:h-24 md:w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    {whyUsIcons[index]}
                  </div>
                  <h3 className="text-xl md:text-3xl font-black mb-4">{item.title}</h3>
                  <div className="description-container">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Services Grid ────────────────────────────────────────────────── */}
        <section id="services" className="py-20 md:py-40 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16 md:mb-32 space-y-4 md:space-y-8">
              <Badge
                variant="outline"
                className="text-primary border-primary px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-sm font-black uppercase tracking-[0.4em]"
              >
                {t.services.tag}
              </Badge>
              <h2 className="text-3xl md:text-8xl font-black leading-tight tracking-tighter">
                {t.services.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
              {serviceKeys.map((key, index) => {
                const serviceData = (t.services.items as any)[key];
                const title = serviceData.title;
                const brands = serviceData.brands;
                const serviceWhatsappUrl = `${t.common.whatsappUrl}?text=${encodeURIComponent(
                  language === 'ar'
                    ? `*طلب صيانة جديد من الموقع*\n\nأريد صيانة لـ: ${title}`
                    : `*New Service Request*\n\nI want maintenance for: ${title}`,
                )}`;

                return (
                  <div
                    key={index}
                    className="professional-card group bg-card/20 border-white/5 rounded-[40px] overflow-hidden flex flex-col"
                  >
                    <div className="relative h-56 md:h-80 w-full overflow-hidden">
                      <Image
                        src={getServiceImage(key)}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        data-ai-hint="appliance repair"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div
                        className={cn(
                          'absolute bottom-6 md:bottom-10',
                          language === 'ar' ? 'right-6 md:right-10' : 'left-6 md:left-10',
                        )}
                      >
                        <h3 className="text-2xl md:text-4xl font-black text-white drop-shadow-2xl">
                          {title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 flex-grow flex flex-col">
                      <div className="mb-6">
                        <h4 className="text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 opacity-80">
                          {language === 'ar' ? 'الماركات المدعومة:' : 'Supported Brands:'}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                          {brands}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 mt-auto">
                        {t.services.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 text-[10px] md:text-xs font-black rounded-xl border border-white/10 text-gray-400 uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        className="w-full justify-between font-black h-14 md:h-18 rounded-2xl gold-gradient text-background text-lg md:text-xl shadow-xl transition-all hover:translate-y-[-4px]"
                        asChild
                      >
                        <a href={serviceWhatsappUrl} target="_blank" rel="noopener noreferrer">
                          {t.services.cta}
                          <ArrowRight
                            className={cn('h-5 w-5 md:h-7 md:w-7', language === 'ar' && 'rotate-180')}
                          />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Customer Reviews ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-40 bg-white/[0.01] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16 md:mb-28 space-y-4 md:space-y-6">
              <Badge
                variant="outline"
                className="text-primary border-primary px-4 md:px-8 py-1.5 md:py-2.5 text-[10px] md:text-xs font-black tracking-widest uppercase"
              >
                {t.reviews.tag}
              </Badge>
              <h2 className="text-3xl md:text-7xl font-black tracking-tight">{t.reviews.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {t.reviews.items.map((review, i) => (
                <div
                  key={i}
                  className="professional-card p-10 md:p-14 bg-card/40 border-white/5 hover:border-primary/30 transition-all rounded-[40px] flex flex-col gap-6 md:gap-10 relative overflow-hidden group"
                >
                  <Quote className="absolute -top-4 -right-4 h-24 w-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
                  <div className="flex gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary" />
                    ))}
                  </div>
                  <p className="text-base md:text-xl text-gray-300 leading-relaxed font-medium italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-black">
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-black text-lg md:text-xl">{review.name}</h4>
                      <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-40 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
              <div className="space-y-6 md:space-y-10">
                <Badge
                  variant="outline"
                  className="text-primary border-primary px-4 md:px-8 py-1.5 md:py-2.5 text-[10px] md:text-xs font-black tracking-widest uppercase"
                >
                  {t.faq.tag}
                </Badge>
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-none">
                  {t.faq.title}
                </h2>
                <p className="text-gray-400 text-base md:text-2xl font-light leading-relaxed">
                  {t.faq.desc}
                </p>
                <Button
                  size="lg"
                  variant="link"
                  className="text-primary font-black text-lg md:text-2xl p-0 h-auto gap-4 group"
                  onClick={handleWhatsappDirect}
                >
                  {t.faq.moreQuestions}
                  <MessageCircle className="h-6 w-6 md:h-8 md:w-8 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="professional-card p-6 md:p-14 bg-card/20 border-white/5 rounded-[40px]">
                <Accordion type="single" collapsible className="w-full">
                  {t.faq.items.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-white/5 py-4">
                      <AccordionTrigger className="text-lg md:text-2xl font-black text-right hover:no-underline hover:text-primary transition-colors">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-xl text-gray-400 leading-relaxed pt-4 font-medium">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Contact & Request ────────────────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-40 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
              <div className="space-y-10 md:space-y-16">
                <div className="space-y-6 md:space-y-10">
                  <Badge className="gold-gradient text-background px-4 md:px-8 py-1.5 md:py-2.5 text-[10px] md:text-xs font-black tracking-widest uppercase">
                    {t.contact.tag}
                  </Badge>
                  <h2 className="text-4xl md:text-8xl font-black leading-[1.1] tracking-tighter">
                    {t.contact.title}
                  </h2>
                  <p className="text-base md:text-2xl text-gray-400 leading-relaxed max-w-2xl font-light">
                    {t.contact.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-10">
                  <div
                    className="flex items-center gap-4 sm:gap-6 md:gap-10 p-5 sm:p-8 md:p-14 bg-white/[0.03] rounded-[40px] border border-white/10 cursor-pointer shadow-2xl transition-all hover:bg-white/[0.05] hover:border-primary/30 group"
                    onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                  >
                    <div className="h-10 w-10 sm:h-16 sm:w-16 md:h-24 md:w-24 rounded-[14px] sm:rounded-[28px] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      <Phone className="h-4 w-4 sm:h-8 sm:w-8 md:h-12 md:w-12" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[9px] md:text-sm font-black text-gray-500 uppercase tracking-widest mb-1 md:mb-4">
                        {t.contact.phoneLabel}
                      </h4>
                      <div className="text-xl sm:text-3xl md:text-5xl font-black gold-text-gradient tracking-tighter whitespace-nowrap overflow-visible leading-none">
                        {phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Card className="shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-none rounded-[40px] md:rounded-[60px] overflow-hidden professional-card bg-card/40 backdrop-blur-3xl">
                  <CardHeader className="gold-gradient text-background p-10 md:p-16">
                    <CardTitle className="text-2xl md:text-5xl font-black flex items-center gap-4 md:gap-6">
                      <Wrench className="h-10 w-10 md:h-14 md:w-14" />
                      {t.contact.formTitle}
                    </CardTitle>
                    <CardDescription className="text-background/80 text-base md:text-2xl font-bold mt-2">
                      {t.contact.formDesc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-10 md:p-16">
                    <form onSubmit={handleSubmitRequest} className="space-y-8 md:space-y-12">
                      <div className="space-y-4 md:space-y-6">
                        <Label className="font-black block text-base md:text-2xl uppercase tracking-widest text-gray-400">
                          {t.contact.deviceLabel}
                        </Label>
                        <Select required onValueChange={setDeviceType}>
                          <SelectTrigger
                            dir={dir}
                            className="h-14 md:h-20 rounded-2xl md:rounded-[28px] bg-white/[0.05] border-white/10 text-lg md:text-2xl px-6 md:px-10"
                          >
                            <SelectValue placeholder={t.contact.devicePlaceholder} />
                          </SelectTrigger>
                          <SelectContent
                            dir={dir}
                            className="rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl"
                          >
                            {serviceKeys.map((key) => {
                              const service = (t.services.items as any)[key];
                              return (
                                <SelectItem
                                  key={key}
                                  value={key}
                                  className="text-lg md:text-xl py-3 md:py-4 cursor-pointer"
                                >
                                  {service.title}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <Label className="font-black block text-base md:text-2xl uppercase tracking-widest text-gray-400">
                          {t.contact.faultLabel}
                        </Label>
                        <Textarea
                          placeholder={t.contact.faultPlaceholder}
                          className="min-h-[140px] md:min-h-[200px] rounded-2xl md:rounded-[28px] resize-none bg-white/[0.05] border-white/10 p-6 md:p-10 text-lg md:text-2xl focus:border-primary/50 transition-all"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full font-black h-16 md:h-24 text-xl md:text-3xl rounded-2xl md:rounded-[32px] shadow-2xl gold-gradient transition-all hover:scale-[1.02] active:scale-95"
                        disabled={isSubmitting}
                      >
                        {t.contact.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuickActionBar />
    </div>
  );
}
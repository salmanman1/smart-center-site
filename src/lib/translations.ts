
/**
 * هـذا المـلف هـو المـكان الوحـيد لتـعديل نـصوص المـوقع بـالكامل.
 * يمكنك تـغيير الأرقام، الروابط، الأسـئلة، وآراء العمـلاء مـن هـنا فـقط.
 * التعديل هنا يغير النص في كل أنحاء الموقع تلقائياً.
 */

export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    common: {
      phoneNumber: "01023013408",
      whatsappUrl: "https://wa.me/201023013408",
      facebookUrl: "https://www.facebook.com/share/1An2Z4evVi/",
      address: "عمارات السعودية - سور المخابرات العامة - كوبري القبة",
      brandName: "Smart Center",
      engineeringHub: "Engineering Hub"
    },
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      contact: "اتصل بنا",
      langSwitch: "English",
      whatsapp: "واتساب"
    },
    hero: {
      tag: "نحن متاحون الآن لخدمتكم",
      titlePre: "صيانة",
      titlePost: "المعتمدة",
      desc: "نقدم خدمات صيانة وإصلاح جميع الأجهزة المنزلية بجودة عالية وباستخدام قطع غيار أصلية بضمان معتمد.",
      cta: "اطلب الصيانة الآن",
      whatsapp: "مراسلة واتساب"
    },
    stats: [
      { label: "سنة من الخبرة", value: "+20" },
      { label: "أكثر من 35 ألف عميل", value: "+35k" },
      { label: "أكثر من 45 فني معتمد", value: "+45" },
      { label: "القاهرة الجديدة - السخنة - الساحل", value: "تغطية حصرية" }
    ],
    brands: {
      title: "شركاء النجاح المعتمدون",
      subtitle: "نحن وكلاء صيانة معتمدون لأكبر الماركات العالمية خدمة صيانة احترافية لكل الأجهزة سواء كان جهازك قديماً أو جديداً، نحن في خدمتك. مركزنا يقدم خدماته بنظام (خارج الضمان الرسمي للجهاز ) مما يضمن لك قطع غيار أصلية وسرعه فى التنفيذ"
    },
    whyUs: {
      tag: "لماذا نحن؟",
      title: "التميز في كل تفصيلة",
      subtitle: "نحن لا نقوم فقط بالإصلاح، بل نعيد الحياة لجهازك.",
      items: [
        { title: "فنيون معتمدون", description: "نخبة من المهندسين والحاصلين على شهادات خبرة دولية." },
        { title: "ضمان ثلاث شهور", description: "شهادة ضمان معتمدة على قطع الغيار الأصلية والصيانة." },
        { title: "خدمة سريعة", description: "نصلك خلال 24 ساعة من تلقي طلبك في أي مكان." },
        { title: "قطع غيار أصلية", description: "نستخدم قطع الغيار الواردة من الوكيل المعتمد مباشرة." }
      ]
    },
    services: {
      tag: "خدمات الصيانة المعتمدة",
      title: "تغطية شاملة لجميع الماركات العالمية",
      cta: "طلب صيانة فورية",
      tags: ["معتمد", "قطع أصلية", "صيانة منزلية"],
      items: {
        "service-washing": {
          title: "غسالات ملابس",
          brands: "أريستون - فرانكي - سامسونج - إل جي - زانوسي - جورينيا - إندست - والمزيد..."
        },
        "service-dishwasher": {
          title: "غسالات أطباق",
          brands: "إل جي - سامسونج - أريستون - فرانكي - بوش - إندست - تورنيدو - ميديا - شارب - والمزيد..."
        },
        "service-refrigerator": {
          title: "ثلاجات",
          brands: "سامسونج - إل جي - شارب - بوش - أريستون - هاير - والمزيد..."
        },
        "service-microwave": {
          title: "ميكروويف",
          brands: "بيكو - إل جي - سامسونج - جالانتز - بوش - شارب - كينوود - فريش - فرانكي - دايو - جورينيا - هاير - البا - هوفر - سوكاني - والمزيد..."
        },
        "service-cooker": {
          title: "بوتاجازات",
          brands: "فرانكي - فريش - أريستون - جليم جاز - هوفر - جورينيا - تورنيدو - والمزيد..."
        },
        "service-ac": {
          title: "تكييفات",
          brands: "كاريير - إل جي - شارب - تورنيدو - ميديا - والمزيد..."
        },
        "service-hoods": {
          title: "شفاطات",
          brands: "أريستون - فرانكي - سامسونج - زانوسي - جورينيا - تورنيدو - ميديا - بوش - بيكو - فريش - والمزيد..."
        }
      }
    },
    reviews: {
      tag: "آراء شركاء النجاح",
      title: "ثقة نعتز بها من عملائنا",
      items: [
        { name: "م. أحمد علي", role: "التجمع الخامس", text: "زي الفل تسلم ايديكم والله" },
        { name: "أ. سارة حسن", role: "مدينتي", text: "انا تعاملت معاهم فعلا فوق الممتازين ما شاء الله عليهم بيعرفوا يتعاملوا مع كل حاجه كمان في قمة الذوق والاخلاق والاحترام ومنتهى الامانه ربنا يبارك لهم فعلا" },
        { name: "أ. محمود فؤاد", role: "الرحاب", text: "شكرا لتعبكم معايا" }
      ]
    },
    faq: {
      tag: "الأسئلة الشائعة",
      title: "كل ما تود معرفته",
      desc: "فريقنا الهندسي مستعد دائماً للإجابة على جميع استفساراتكم لضمان تجربة صيانة مريحة وآمنة.",
      moreQuestions: "هل لديك سؤال آخر؟",
      items: [
        { q: "هل قطع الغيار المستخدمة أصلية؟", a: "نعم، نستخدم حصرياً قطع الغيار الأصلية الواردة من الوكيل المعتمد لضمان أعلى أداء وطول عمر للجهاز." },
        { q: "ما هي مدة الضمان على الصيانة؟", a: "نقدم ضماناً معتمداً لمدة 3 أشهر على قطع الغيار المستبدلة وعلى عملية الصيانة بالكامل." },
        { q: "هل تتم الصيانة في المنزل أم يجب نقل الجهاز للمركز؟", a: "تتم جميع عمليات الصيانة والإصلاح في منزل العميل لضمان الشفافية وراحة البال، ولا يتم نقل الجهاز للمركز إلا في حالات نادرة جداً تتطلب تجهيزات هندسية خاصة." }
      ]
    },
    contact: {
      tag: "تواصل مباشر",
      title: "جاهزون لإعادة جهازك للعمل بكفاءة",
      desc: "فريقنا الهندسي متاح دائماً لخدمتكم بأسرع وقت وأعلى جودة.",
      phoneLabel: "رقم الصيانة الموحد",
      formTitle: "احجز موعدك",
      formDesc: "سنتصل بك لتأكيد الموعد عبر واتساب.",
      deviceLabel: "نوع الجهاز",
      devicePlaceholder: "اختر الجهاز",
      faultLabel: "وصف العطل",
      faultPlaceholder: "كيف يمكننا مساعدتك اليوم؟",
      submit: "تأكيد عبر الواتساب"
    },
    footer: {
      desc: "المركز الهندسي المعتمد لصيانة الأجهزة المنزلية المتطورة. خبرة طويلة وتقنيات تشخيص حديثة.",
      coverageTag: "نطاق التغطية الجغرافي",
      areas: ["القاهرة الجديدة", "السخنة", "الساحل"],
      linksTitle: "روابط سريعة",
      links: ["الرئيسية", "خدماتنا", "اتصل بنا"],
      contactTitle: "التواصل الهندسي",
      locationLabel: "الموقع:",
      hoursTitle: "ساعات الدعم",
      daysWeek: "السبت - الخميس",
      hoursWeek: "9ص - 10م",
      dayFri: "الجمعة",
      statusFri: "استقبال مكالمات فقط",
      coverageSpecial: "تغطية خاصة:",
      copy: "© 2024 Smart Center Global Engineering.",
      privacy: "Privacy",
      terms: "Terms"
    }
  },
  en: {
    common: {
      phoneNumber: "01023013408",
      whatsappUrl: "https://wa.me/201023013408",
      facebookUrl: "https://www.facebook.com/share/1An2Z4evVi/",
      address: "Saudi Buildings - G.I.S. Wall - Kobri El Qobba",
      brandName: "Smart Center",
      engineeringHub: "Engineering Hub"
    },
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      langSwitch: "العربية",
      whatsapp: "WhatsApp"
    },
    hero: {
      tag: "We are available now to serve you",
      titlePre: "",
      titlePost: "Certified Maintenance",
      desc: "We provide maintenance and repair services for all household appliances with high quality and original spare parts with a certified warranty.",
      cta: "Request Repair Now",
      whatsapp: "WhatsApp Message"
    },
    stats: [
      { label: "Years of Experience", value: "+20" },
      { label: "Over 35,000 Clients", value: "+35k" },
      { label: "Over 45 Certified Techs", value: "+45" },
      { label: "New Cairo - Sokhna - Coastal", value: "Exclusive Coverage" }
    ],
    brands: {
      title: "Authorized Brand Partners",
      subtitle: "We are authorized service providers for global leading brands. Professional maintenance service for all devices, whether old or new. Our center provides its services under an (out-of-original-warranty) system, ensuring original parts and speed of execution."
    },
    whyUs: {
      tag: "Why Us?",
      title: "Excellence in Every Detail",
      subtitle: "We don't just repair, we breathe life back into your appliances.",
      items: [
        { title: "Certified Technicians", description: "A select group of engineers with international experience certifications." },
        { title: "3-Month Warranty", description: "Certified warranty certificate on original parts and labor." },
        { title: "Fast Service", description: "We reach you within 24 hours of receiving your request anywhere." },
        { title: "Original Spare Parts", description: "We use spare parts sourced directly from authorized agents." }
      ]
    },
    services: {
      tag: "Certified Services",
      title: "Comprehensive Coverage for All Global brands",
      cta: "Request Immediate Repair",
      tags: ["Certified", "Original Parts", "On-Site"],
      items: {
        "service-washing": {
          title: "Washing Machines",
          brands: "Ariston - Franke - Samsung - LG - Zanussi - Gorenje - Indesit - and more..."
        },
        "service-dishwasher": {
          title: "Dishwashers",
          brands: "LG - Samsung - Ariston - Franke - Bosch - Indesit - Tornado - Midea - Sharp - and more..."
        },
        "service-refrigerator": {
          title: "Refrigerators",
          brands: "Samsung - LG - Sharp - Bosch - Ariston - Haier - and more..."
        },
        "service-microwave": {
          title: "Microwaves",
          brands: "Beko - LG - Samsung - Galanz - Bosch - Sharp - Kenwood - Fresh - Franke - Daewoo - Gorenje - Haier - Elba - Hoover - Sokany - and more..."
        },
        "service-cooker": {
          title: "Cookers & Ovens",
          brands: "Franke - Fresh - Ariston - Glem Gas - Hoover - Gorenje - Tornado - and more..."
        },
        "service-ac": {
          title: "Air Conditioners",
          brands: "Carrier - LG - Sharp - Tornado - Midea - and more..."
        },
        "service-hoods": {
          title: "Hoods",
          brands: "Ariston - Franke - Samsung - Zanussi - Gorenje - Tornado - Midea - Bosch - Beko - Fresh - and more..."
        }
      }
    },
    reviews: {
      tag: "Success Partners",
      title: "The Trust of Our Clients",
      items: [
        { name: "Eng. Ahmed Ali", role: "New Cairo", text: "Great job, thank you very much!" },
        { name: "Ms. Sarah Hassan", role: "Madinaty", text: "I've dealt with them and they are truly excellent. Very professional, polite, and extremely honest. May God bless them." },
        { name: "Mr. Mahmoud Fouad", role: "Rehab", text: "Thank you for your effort with me" }
      ]
    },
    faq: {
      tag: "FAQs",
      title: "Everything You Need to Know",
      desc: "Our engineering team is always ready to answer all your inquiries to ensure a comfortable and safe maintenance experience.",
      moreQuestions: "Have another question?",
      items: [
        { q: "Are the spare parts used original?", a: "Yes, we exclusively use original spare parts sourced from authorized agents to ensure performance." },
        { q: "What is the warranty period?", a: "We provide a certified 3-month warranty on replaced spare parts and the maintenance process." },
        { q: "Is the repair done at home or must the appliance be moved?", a: "All maintenance and repair operations are carried out at the client's home to ensure transparency and peace of mind. Devices are only moved to the center in very rare cases requiring special engineering equipment." }
      ]
    },
    contact: {
      tag: "Direct Contact",
      title: "Ready to Restore Your Appliance Efficiency",
      desc: "Our engineering team is always available to serve you with the fastest speed and highest quality.",
      phoneLabel: "Unified Support Number",
      formTitle: "Book Your Appointment",
      formDesc: "We will contact you to confirm via WhatsApp.",
      deviceLabel: "Device Type",
      devicePlaceholder: "Select Device",
      faultLabel: "Fault Description",
      faultPlaceholder: "How can we help you today?",
      submit: "Confirm via WhatsApp"
    },
    footer: {
      desc: "Certified engineering center for advanced home appliance maintenance. Long experience and modern diagnostics.",
      coverageTag: "Geographical Coverage",
      areas: ["New Cairo", "Sokhna", "Coastal Areas"],
      linksTitle: "Quick Links",
      links: ["Home", "Services", "Contact"],
      contactTitle: "Engineering Contact",
      locationLabel: "Location:",
      hoursTitle: "Support Hours",
      daysWeek: "Sat - Thu",
      hoursWeek: "9 AM - 10 PM",
      dayFri: "Friday",
      statusFri: "Calls Only",
      coverageSpecial: "Special Coverage:",
      copy: "© 2024 Smart Center Global Engineering.",
      privacy: "Privacy",
      terms: "Terms"
    }
  }
};

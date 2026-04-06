import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('prime_garage_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('prime_garage_lang', lang);
  };

  // This will be populated by the translations file
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations dictionary
const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      detailing: 'Detailing',
      ceramic: 'Ceramic Coating',
      ppf: 'PPF',
      gallery: 'Gallery',
      about: 'About',
      contact: 'Contact',
      bookNow: 'Book Now',
    },
    footer: {
      desc: "Belgrade's premier automotive protection studio. We specialize in preserving the value and aesthetics of luxury vehicles.",
      services: 'Services',
      studio: 'Studio',
      newsletter: 'Newsletter',
      newsletterDesc: 'Get maintenance tips and exclusive offers.',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      address: 'Bulevar Oslobođenja 123, Belgrade, Serbia',
      hours: 'Mon - Sat: 09:00 - 18:00',
    },
    home: {
      hero: {
        tag: "Belgrade's Premier Detailing Studio",
        title1: "THE ART OF",
        title2: "PRESERVATION.",
        desc: "Beyond a car wash. We provide expert-level protection and precision detailing for those who demand absolute perfection.",
        book: "Book Your Session",
        explore: "Explore Services",
      },
      trust: {
        experience: "Years Experience",
        protected: "Cars Protected",
        precision: "Precision Work",
        rating: "Client Rating",
      },
      expertise: {
        tag: "Our Expertise",
        title: "UNCOMPROMISING PROTECTION.",
        viewAll: "View All Services",
      },
      transformation: {
        title: "THE TRANSFORMATION.",
        desc: "Witness the difference that precision paint correction and protection can make.",
        before: "Before",
        after: "After",
      },
      process: {
        tag: "Our Methodology",
        title: "THE PROCESS.",
        steps: [
          { title: "Inspection", desc: "Detailed diagnostic of paint condition and surfaces." },
          { title: "Preparation", desc: "Multi-stage decontamination and deep cleaning." },
          { title: "Correction", desc: "Expert machine polishing to remove imperfections." },
          { title: "Protection", desc: "Application of PPF or Ceramic Coating layers." },
          { title: "Delivery", desc: "Final quality control and handover to the client." }
        ]
      },
      testimonials: {
        title: "VOICES OF EXCELLENCE.",
        desc: "Our reputation is built on the satisfaction of Belgrade's most discerning car owners.",
        items: [
          { text: '"The level of detail Prime Garage puts into their work is unmatched. My Porsche looks better than the day I picked it up from the dealership."', author: "Marko V., Porsche 911 GT3" },
          { text: '"I chose the full PPF package for my G-Wagon. The installation is invisible and the peace of mind is worth every penny."', author: "Stefan D., Mercedes G63 AMG" }
        ]
      },
      cta: {
        title: "READY FOR PERFECTION?",
        desc: "Limited slots available for April. Secure your vehicle's protection today.",
        button: "Request a Quote",
      }
    },
    services: {
      title: "SERVICES.",
      desc: "A comprehensive suite of protection and restoration services designed for the modern automotive enthusiast.",
      details: "Service Details",
      ppf: {
        title: "PAINT PROTECTION FILM (PPF)",
        subtitle: "The Ultimate Invisible Armor",
        desc: "Our high-grade PPF provides a thick, transparent barrier against physical damage. It features self-healing properties that make swirl marks and light scratches disappear with heat.",
        benefits: ["Stone Chip Resistance", "Self-Healing Technology", "10-Year Warranty", "Non-Yellowing Formula"]
      },
      ceramic: {
        title: "CERAMIC COATING",
        subtitle: "Molecular Level Protection",
        desc: "We apply multi-layer ceramic coatings that bond to your paint, creating a hard, hydrophobic shield. This enhances gloss and makes maintenance effortless.",
        benefits: ["Extreme Hydrophobicity", "Chemical Resistance", "Deep Mirror Gloss", "UV Protection"]
      },
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precision Restoration",
        desc: "From deep interior sanitization to multi-stage paint correction, our detailing services are about restoring every square inch of your vehicle to perfection.",
        benefits: ["Paint Correction", "Interior Sanitization", "Engine Bay Detailing", "Leather Conditioning"]
      }
    },
    serviceDetail: {
      processTitle: "The Process",
      investmentTitle: "Investment",
      startingFrom: "Starting from",
      pricingNote: "* Prices vary based on vehicle size and condition. Contact us for a precise quote.",
      bookNow: "Book Now",
      faqTitle: "FREQUENTLY ASKED QUESTIONS",
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precision Restoration",
        desc: "Our detailing service is a multi-stage process designed to restore your vehicle's aesthetic value. We go beyond the surface to ensure every detail is perfect.",
        benefits: ["Paint Correction", "Interior Sanitization", "Leather Care", "Engine Detailing"],
        pricing: [
          { label: "Essential Detailing", price: "€150" },
          { label: "Premium Restoration", price: "€350" },
          { label: "Paint Correction (Stage 1)", price: "€250" }
        ],
        process: [
          { title: "Decontamination", desc: "Chemical and mechanical removal of iron, tar, and sap." },
          { title: "Paint Correction", desc: "Machine polishing to remove swirls and light scratches." },
          { title: "Interior Refresh", desc: "Steam cleaning and conditioning of all surfaces." }
        ],
        faq: [
          { q: "How long does it take?", a: "A full detailing session typically takes 1-2 days depending on the vehicle condition." },
          { q: "Do you offer mobile detailing?", a: "No, we operate exclusively from our controlled studio environment to ensure absolute quality." }
        ]
      },
      ceramic: {
        title: "CERAMIC COATING",
        subtitle: "Molecular Protection",
        desc: "Ceramic coating provides a permanent bond with your paint, creating a hard, glass-like layer that protects against UV, chemicals, and environmental fallout.",
        benefits: ["9H Hardness", "Extreme Gloss", "Hydrophobic Effect", "UV Resistance"],
        pricing: [
          { label: "2-Year Protection", price: "€400" },
          { label: "5-Year Protection", price: "€750" },
          { label: "Wheel & Glass Coating", price: "€150" }
        ],
        process: [
          { title: "Surface Prep", desc: "Ensuring the paint is 100% clean and corrected before application." },
          { title: "Application", desc: "Precise, panel-by-panel application of the ceramic liquid." },
          { title: "Curing", desc: "Infrared curing to ensure maximum bond and hardness." }
        ],
        faq: [
          { q: "Does it prevent scratches?", a: "It provides resistance against light swirls, but it is not scratch-proof. For physical impact protection, we recommend PPF." },
          { q: "How do I wash a coated car?", a: "We provide a full maintenance guide. Generally, it requires pH-neutral soaps and touchless drying." }
        ]
      },
      ppf: {
        title: "PPF PROTECTION",
        subtitle: "The Invisible Armor",
        desc: "Paint Protection Film (PPF) is the ultimate solution for stone chips and physical damage. Our films are self-healing and virtually invisible.",
        benefits: ["Stone Chip Proof", "Self-Healing", "10-Year Warranty", "UV Protection"],
        pricing: [
          { label: "Front End Package", price: "€900" },
          { label: "Full Vehicle Wrap", price: "€2,500" },
          { label: "Track Package", price: "€1,400" }
        ],
        process: [
          { title: "Digital Cutting", desc: "Precision templates cut specifically for your car model." },
          { title: "Installation", desc: "Expert application with tucked edges for a seamless look." },
          { title: "Final Inspection", desc: "24-hour settling period and edge check." }
        ],
        faq: [
          { q: "Is it visible?", a: "When installed correctly with tucked edges, it is virtually invisible to the naked eye." },
          { q: "Can it be removed?", a: "Yes, it can be removed safely without damaging the original factory paint." }
        ]
      }
    },
    contact: {
      title: "GET IN TOUCH.",
      desc: "Ready to elevate your vehicle's protection? Fill out the form or reach us directly.",
      callUs: "Call Us",
      whatsapp: "WhatsApp",
      available: "Available 24/7",
      visit: "Visit Studio",
      address: "Bulevar Oslobođenja 123, Belgrade",
      form: {
        name: "Full Name",
        phone: "Phone",
        vehicle: "Vehicle Model & Year",
        service: "Service Required",
        message: "Message",
        submit: "Send Inquiry",
        options: ["PPF Protection", "Ceramic Coating", "Full Detailing", "Paint Correction"],
        success: {
          title: "INQUIRY SENT",
          desc: "Thank you for choosing Prime Garage. Our team will contact you within 2 hours.",
          another: "Send another message"
        }
      }
    },
    gallery: {
      title: "GALLERY.",
      desc: "A showcase of precision and perfection. Explore our recent automotive transformations."
    },
    about: {
      title: "ABOUT US.",
      subtitle: "Precision is not a goal. It is our standard.",
      p1: "Founded in Belgrade, Prime Garage was born from a singular passion: automotive perfection. We realized that standard car washes and detailing shops often lacked the technical precision required for high-end vehicles.",
      p2: "Today, we are a certified studio specializing in advanced surface protection. We don't just clean cars; we preserve investments using the world's most advanced materials and techniques.",
      stats: {
        inHouseTitle: "100%",
        inHouseDesc: "In-House Work",
        certifiedTitle: "Certified",
        certifiedDesc: "Technicians"
      }
    },
    titles: {
      home: "Premium Auto Detailing & Protection",
      services: "Our Services",
      detailing: "Auto Detailing",
      ceramic: "Ceramic Coating",
      ppf: "PPF Protection",
      gallery: "Portfolio",
      about: "Our Story",
      contact: "Contact & Bookings"
    }
  },
  sr: {
    nav: {
      home: 'Početna',
      services: 'Usluge',
      detailing: 'Detailing',
      ceramic: 'Keramička Zaštita',
      ppf: 'PPF',
      gallery: 'Galerija',
      about: 'O Nama',
      contact: 'Kontakt',
      bookNow: 'Zakažite',
    },
    footer: {
      desc: "Vodeći studio za zaštitu automobila u Beogradu. Specijalizovani smo za očuvanje vrednosti i estetike luksuznih vozila.",
      services: 'Usluge',
      studio: 'Studio',
      newsletter: 'Newsletter',
      newsletterDesc: 'Dobijte savete o održavanju i ekskluzivne ponude.',
      rights: 'Sva prava zadržana.',
      privacy: 'Politika privatnosti',
      terms: 'Uslovi korišćenja',
      address: 'Bulevar Oslobođenja 123, Beograd, Srbija',
      hours: 'Pon - Sub: 09:00 - 18:00',
    },
    home: {
      hero: {
        tag: "Vodeći Detailing Studio u Beogradu",
        title1: "UMETNOST",
        title2: "OČUVANJA.",
        desc: "Više od pranja automobila. Pružamo zaštitu na ekspertskom nivou i precizan detailing za one koji zahtevaju apsolutno savršenstvo.",
        book: "Zakažite Termin",
        explore: "Istražite Usluge",
      },
      trust: {
        experience: "Godina Iskustva",
        protected: "Zaštićenih Vozila",
        precision: "Precizan Rad",
        rating: "Ocena Klijenata",
      },
      expertise: {
        tag: "Naša Ekspertiza",
        title: "BESKOMPROMISNA ZAŠTITA.",
        viewAll: "Pogledajte Sve Usluge",
      },
      transformation: {
        title: "TRANSFORMACIJA.",
        desc: "Svedočite razlici koju donose precizna korekcija boje i zaštita.",
        before: "Pre",
        after: "Posle",
      },
      process: {
        tag: "Naša Metodologija",
        title: "PROCES.",
        steps: [
          { title: "Inspekcija", desc: "Detaljna dijagnostika stanja boje i površina." },
          { title: "Priprema", desc: "Višestepena dekontaminacija i dubinsko čišćenje." },
          { title: "Korekcija", desc: "Ekspertsko mašinsko poliranje za uklanjanje nesavršenosti." },
          { title: "Zaštita", desc: "Nanošenje PPF folije ili slojeva keramičke zaštite." },
          { title: "Isporuka", desc: "Finalna kontrola kvaliteta i primopredaja klijentu." }
        ]
      },
      testimonials: {
        title: "GLASOVI IZVRSNOSTI.",
        desc: "Naša reputacija je izgrađena na zadovoljstvu najzahtevnijih vlasnika automobila u Beogradu.",
        items: [
          { text: '"Nivo detalja koji Prime Garage unosi u svoj rad je bez premca. Moj Porsche izgleda bolje nego onog dana kada sam ga preuzeo iz salona."', author: "Marko V., Porsche 911 GT3" },
          { text: '"Izabrao sam pun PPF paket za svoj G-Wagon. Instalacija je nevidljiva, a mir koji imam vredi svakog evra."', author: "Stefan D., Mercedes G63 AMG" }
        ]
      },
      cta: {
        title: "SPREMNI ZA SAVRŠENSTVO?",
        desc: "Ograničen broj termina za april. Osigurajte zaštitu svog vozila danas.",
        button: "Zatražite Ponudu",
      }
    },
    services: {
      title: "USLUGE.",
      desc: "Sveobuhvatan set usluga zaštite i restauracije dizajniran za moderne ljubitelje automobila.",
      details: "Detalji Usluge",
      ppf: {
        title: "ZAŠTITNA FOLIJA (PPF)",
        subtitle: "Vrhunski Nevidljivi Oklop",
        desc: "Naš visokokvalitetni PPF pruža debelu, providnu barijeru protiv fizičkih oštećenja. Poseduje svojstva samoisceljenja koja čine da ogrebotine nestanu pod toplotom.",
        benefits: ["Otpornost na kamenčiće", "Tehnologija samoisceljenja", "10 godina garancije", "Formula koja ne žuti"]
      },
      ceramic: {
        title: "KERAMIČKA ZAŠTITA",
        subtitle: "Zaštita na Molekularnom Nivou",
        desc: "Nanosimo višeslojne keramičke premaze koji se vezuju za vašu boju, stvarajući čvrst, hidrofobni štit. Ovo poboljšava sjaj i olakšava održavanje.",
        benefits: ["Ekstremna hidrofobnost", "Otpornost na hemikalije", "Duboki ogledalo sjaj", "UV zaštita"]
      },
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precizna Restauracija",
        desc: "Od dubinske sanitacije enterijera do višestepene korekcije boje, naše detailing usluge su usmerene na vraćanje svakog milimetra vašeg vozila u savršeno stanje.",
        benefits: ["Korekcija boje", "Sanitacija enterijera", "Detailing motornog prostora", "Kondicioniranje kože"]
      }
    },
    serviceDetail: {
      processTitle: "Proces",
      investmentTitle: "Investicija",
      startingFrom: "Počevši od",
      pricingNote: "* Cene variraju u zavisnosti od veličine i stanja vozila. Kontaktirajte nas za preciznu ponudu.",
      bookNow: "Zakažite Sada",
      faqTitle: "ČESTO POSTAVLJANA PITANJA",
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precizna Restauracija",
        desc: "Naša detailing usluga je višestepeni proces dizajniran da povrati estetsku vrednost vašeg vozila. Idemo dalje od površine kako bismo osigurali da svaki detalj bude savršen.",
        benefits: ["Korekcija boje", "Sanitacija enterijera", "Nega kože", "Detailing motora"],
        pricing: [
          { label: "Essential Detailing", price: "€150" },
          { label: "Premium Restoration", price: "€350" },
          { label: "Korekcija boje (Stage 1)", price: "€250" }
        ],
        process: [
          { title: "Dekontaminacija", desc: "Hemijsko i mehaničko uklanjanje gvožđa, katrana i smole." },
          { title: "Korekcija boje", desc: "Mašinsko poliranje za uklanjanje holograma i lakih ogrebotina." },
          { title: "Osvežavanje enterijera", desc: "Čišćenje parom i kondicioniranje svih površina." }
        ],
        faq: [
          { q: "Koliko dugo traje?", a: "Kompletna detailing sesija obično traje 1-2 dana u zavisnosti od stanja vozila." },
          { q: "Da li nudite mobilni detailing?", a: "Ne, radimo isključivo u našem kontrolisanom studijskom okruženju kako bismo osigurali apsolutni kvalitet." }
        ]
      },
      ceramic: {
        title: "KERAMIČKA ZAŠTITA",
        subtitle: "Molekularna Zaštita",
        desc: "Keramička zaštita stvara trajnu vezu sa vašom bojom, formirajući čvrst sloj nalik staklu koji štiti od UV zračenja, hemikalija i spoljnih uticaja.",
        benefits: ["9H tvrdoća", "Ekstremni sjaj", "Hidrofobni efekat", "UV otpornost"],
        pricing: [
          { label: "2 godine zaštite", price: "€400" },
          { label: "5 godina zaštite", price: "€750" },
          { label: "Zaštita felni i stakala", price: "€150" }
        ],
        process: [
          { title: "Priprema površine", desc: "Osiguravanje da je boja 100% čista i korigovana pre nanošenja." },
          { title: "Nanošenje", desc: "Precizno nanošenje keramičke tečnosti, panel po panel." },
          { title: "Sušenje", desc: "Infracrveno sušenje kako bi se osigurala maksimalna veza i tvrdoća." }
        ],
        faq: [
          { q: "Da li sprečava ogrebotine?", a: "Pruža otpornost na lake holograme, ali nije otporna na duboke ogrebotine. Za zaštitu od fizičkih udaraca preporučujemo PPF." },
          { q: "Kako da perem zaštićen auto?", a: "Dajemo kompletan vodič za održavanje. Generalno, zahteva pH-neutralne šampone i beskontaktno sušenje." }
        ]
      },
      ppf: {
        title: "PPF ZAŠTITA",
        subtitle: "Nevidljivi Oklop",
        desc: "Zaštitna folija (PPF) je vrhunsko rešenje za kamenčiće i fizička oštećenja. Naše folije su samoisceljujuće i praktično nevidljive.",
        benefits: ["Otpornost na kamenčiće", "Samoisceljenje", "10 godina garancije", "UV zaštita"],
        pricing: [
          { label: "Front End paket", price: "€900" },
          { label: "Kompletno vozilo", price: "€2,500" },
          { label: "Track paket", price: "€1,400" }
        ],
        process: [
          { title: "Digitalno sečenje", desc: "Precizni šabloni isečeni specifično za vaš model automobila." },
          { title: "Instalacija", desc: "Ekspertsko nanošenje sa podvijenim ivicama za besprekoran izgled." },
          { title: "Finalna inspekcija", desc: "Period od 24 sata za slegnuće i provera ivica." }
        ],
        faq: [
          { q: "Da li se vidi?", a: "Kada se pravilno instalira sa podvijenim ivicama, praktično je nevidljiva golim okom." },
          { q: "Može li se ukloniti?", a: "Da, može se bezbedno ukloniti bez oštećenja originalne fabričke boje." }
        ]
      }
    },
    contact: {
      title: "KONTAKTIRAJTE NAS.",
      desc: "Spremni da podignete zaštitu svog vozila na viši nivo? Popunite formu ili nas kontaktirajte direktno.",
      callUs: "Pozovite Nas",
      whatsapp: "WhatsApp",
      available: "Dostupni 24/7",
      visit: "Posetite Studio",
      address: "Bulevar Oslobođenja 123, Beograd",
      form: {
        name: "Ime i Prezime",
        phone: "Telefon",
        vehicle: "Model i Godište Vozila",
        service: "Potrebna Usluga",
        message: "Poruka",
        submit: "Pošaljite Upit",
        options: ["PPF Zaštita", "Keramička Zaštita", "Full Detailing", "Korekcija Boje"],
        success: {
          title: "UPIT POSLAT",
          desc: "Hvala vam što ste izabrali Prime Garage. Naš tim će vas kontaktirati u roku od 2 sata.",
          another: "Pošaljite novu poruku"
        }
      }
    },
    gallery: {
      title: "GALERIJA.",
      desc: "Prikaz preciznosti i savršenstva. Istražite naše nedavne transformacije automobila."
    },
    about: {
      title: "O NAMA.",
      subtitle: "Preciznost nije cilj. To je naš standard.",
      p1: "Osnovan u Beogradu, Prime Garage je rođen iz jedne strasti: automobilske perfekcije. Shvatili smo da standardnim perionicama i detailing radnjama često nedostaje tehnička preciznost potrebna za visoku klasu vozila.",
      p2: "Danas smo sertifikovani studio specijalizovan za naprednu zaštitu površina. Mi ne samo da čistimo automobile; mi čuvamo investicije koristeći najnaprednije materijale i tehnike na svetu.",
      stats: {
        inHouseTitle: "100%",
        inHouseDesc: "In-House Rad",
        certifiedTitle: "Sertifikovani",
        certifiedDesc: "Tehničari"
      }
    },
    titles: {
      home: "Premium Auto Detailing i Zaštita",
      services: "Naše Usluge",
      detailing: "Auto Detailing",
      ceramic: "Keramička Zaštita",
      ppf: "PPF Zaštita",
      gallery: "Portfolio",
      about: "Naša Priča",
      contact: "Kontakt i Zakazivanje"
    }
  }
};

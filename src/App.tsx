/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MessageSquare, Shield, Sparkles, 
  ChevronRight, ChevronDown, Instagram, Facebook, MapPin, Clock,
  CheckCircle2, ArrowRight, Star
} from 'lucide-react';

// --- Language Context ---

const LanguageContext = createContext<any>(null);

const translations: any = {
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
      services: "Services",
      studio: "Studio",
      newsletter: "Newsletter",
      newsletterDesc: "Get maintenance tips and exclusive offers.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    home: {
      hero: {
        subtitle: "Belgrade's Premier Detailing Studio",
        title: "THE ART OF PRESERVATION.",
        desc: "Beyond a car wash. We provide expert-level protection and precision detailing for those who demand absolute perfection.",
        book: "Book Your Session",
        explore: "Explore Services"
      },
      trust: {
        exp: "Years Experience",
        cars: "Cars Protected",
        precision: "Precision Work",
        rating: "Client Rating"
      },
      services: {
        subtitle: "Our Expertise",
        title: "UNCOMPROMISING PROTECTION.",
        viewAll: "View All Services",
        learnMore: "Learn More",
        ppf: {
          title: "PPF PROTECTION",
          desc: "The ultimate invisible shield against stone chips, scratches, and UV damage. Self-healing technology for absolute peace of mind."
        },
        ceramic: {
          title: "CERAMIC COATING",
          desc: "Permanent liquid glass protection. Extreme hydrophobicity, deep gloss, and chemical resistance that lasts for years."
        },
        detailing: {
          title: "AUTO DETAILING",
          desc: "Precision cleaning and paint correction. We restore your vehicle to a showroom condition, inside and out."
        }
      },
      transformation: {
        title: "THE TRANSFORMATION.",
        desc: "Witness the difference that precision paint correction and protection can make.",
        before: "Before",
        after: "After"
      },
      process: {
        subtitle: "Our Methodology",
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
        button: "Request a Quote"
      }
    },
    servicesPage: {
      title: "SERVICES.",
      desc: "A comprehensive suite of protection and restoration services designed for the modern automotive enthusiast.",
      ppf: {
        title: "PAINT PROTECTION FILM (PPF)",
        subtitle: "The Ultimate Invisible Armor",
        desc: "Our high-grade PPF provides a thick, transparent barrier against physical damage. It features self-healing properties that make swirl marks and light scratches disappear with heat.",
        benefits: ["Stone Chip Resistance", "Self-Healing Technology", "10-Year Warranty", "Non-Yellowing Formula"],
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
      },
      ceramic: {
        title: "CERAMIC COATING",
        subtitle: "Molecular Level Protection",
        desc: "We apply multi-layer ceramic coatings that bond to your paint, creating a hard, hydrophobic shield. This enhances gloss and makes maintenance effortless.",
        benefits: ["Extreme Hydrophobicity", "Chemical Resistance", "Deep Mirror Gloss", "UV Protection"],
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
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precision Restoration",
        desc: "From deep interior sanitization to multi-stage paint correction, our detailing services are about restoring every square inch of your vehicle to perfection.",
        benefits: ["Paint Correction", "Interior Sanitization", "Engine Bay Detailing", "Leather Conditioning"],
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
      details: "Service Details"
    },
    contactPage: {
      title: "GET IN TOUCH.",
      desc: "Ready to elevate your vehicle's protection? Fill out the form or reach us directly.",
      call: "Call Us",
      whatsapp: "WhatsApp",
      visit: "Visit Studio",
      labels: {
        name: "Full Name",
        phone: "Phone",
        vehicle: "Vehicle Model & Year",
        service: "Service Required",
        message: "Message"
      },
      services: ["PPF Protection", "Ceramic Coating", "Full Detailing", "Paint Correction"],
      button: "Send Inquiry",
      success: {
        title: "INQUIRY SENT",
        desc: "Thank you for choosing Prime Garage. Our team will contact you within 2 hours.",
        back: "Send another message"
      }
    },
    galleryPage: {
      title: "GALLERY.",
      desc: "A showcase of precision and perfection. Explore our recent automotive transformations."
    },
    aboutPage: {
      title: "ABOUT US.",
      subtitle: "Precision is not a goal. It is our standard.",
      desc1: "Founded in Belgrade, Prime Garage was born from a singular passion: automotive perfection. We realized that standard car washes and detailing shops often lacked the technical precision required for high-end vehicles.",
      desc2: "Today, we are a certified studio specializing in advanced surface protection. We don't just clean cars; we preserve investments using the world's most advanced materials and techniques.",
      stats: ["In-House Work", "Certified Technicians"]
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
      about: 'O nama',
      contact: 'Kontakt',
      bookNow: 'Zakažite',
    },
    footer: {
      desc: "Vodeći studio za zaštitu automobila u Beogradu. Specijalizovani smo za očuvanje vrednosti i estetike luksuznih vozila.",
      services: "Usluge",
      studio: "Studio",
      newsletter: "Bilten",
      newsletterDesc: "Dobijajte savete o održavanju i ekskluzivne ponude.",
      rights: "Sva prava zadržana.",
      privacy: "Politika Privatnosti",
      terms: "Uslovi Korišćenja"
    },
    home: {
      hero: {
        subtitle: "Vodeći Detailing Studio u Beogradu",
        title: "UMETNOST OČUVANJA.",
        desc: "Više od pranja automobila. Pružamo vrhunsku zaštitu i precizan detailing za one koji zahtevaju apsolutno savršenstvo.",
        book: "Zakažite Termin",
        explore: "Istražite Usluge"
      },
      trust: {
        exp: "Godina Iskustva",
        cars: "Zaštićenih Vozila",
        precision: "Precizan Rad",
        rating: "Ocena Klijenata"
      },
      services: {
        subtitle: "Naša Ekspertiza",
        title: "BESKOMPROMISNA ZAŠTITA.",
        viewAll: "Sve Usluge",
        learnMore: "Saznajte Više",
        ppf: {
          title: "PPF ZAŠTITA",
          desc: "Vrhunski nevidljivi štit od udaraca kamenčića, ogrebotina i UV zračenja. Samozaceljujuća tehnologija za potpuni mir."
        },
        ceramic: {
          title: "KERAMIČKA ZAŠTITA",
          desc: "Trajna zaštita tečnim staklom. Ekstremna hidrofobnost, dubok sjaj i otpornost na hemikalije koja traje godinama."
        },
        detailing: {
          title: "AUTO DETAILING",
          desc: "Precizno čišćenje i korekcija boje. Vraćamo vaše vozilo u salonsko stanje, iznutra i spolja."
        }
      },
      transformation: {
        title: "TRANSFORMACIJA.",
        desc: "Uverite se u razliku koju donose precizna korekcija boje i zaštita.",
        before: "Pre",
        after: "Posle"
      },
      process: {
        subtitle: "Naša Metodologija",
        title: "PROCES RADA.",
        steps: [
          { title: "Inspekcija", desc: "Detaljna dijagnostika stanja laka i površina." },
          { title: "Priprema", desc: "Višefazna dekontaminacija i dubinsko čišćenje." },
          { title: "Korekcija", desc: "Stručno mašinsko poliranje za uklanjanje nesavršenosti." },
          { title: "Zaštita", desc: "Nanošenje PPF folije ili slojeva keramičke zaštite." },
          { title: "Isporuka", desc: "Finalna kontrola kvaliteta i primopredaja klijentu." }
        ]
      },
      testimonials: {
        title: "GLASOVI IZVRSNOSTI.",
        desc: "Naša reputacija je izgrađena na zadovoljstvu najprobirljivijih vlasnika automobila u Beogradu.",
        items: [
          { text: '"Nivo detalja koji Prime Garage ulaže u svoj rad je neprevaziđen. Moj Porsche izgleda bolje nego onog dana kada sam ga preuzeo iz salona."', author: "Marko V., Porsche 911 GT3" },
          { text: '"Izabrao sam kompletan PPF paket za svoj G-Wagon. Instalacija je nevidljiva, a mir koji imam vredi svakog evra."', author: "Stefan D., Mercedes G63 AMG" }
        ]
      },
      cta: {
        title: "SPREMNI ZA SAVRŠENSTVO?",
        desc: "Ograničen broj termina za april. Osigurajte zaštitu svog vozila danas.",
        button: "Zatražite Ponudu"
      }
    },
    servicesPage: {
      title: "USLUGE.",
      desc: "Sveobuhvatan set usluga zaštite i restauracije dizajniran za moderne ljubitelje automobila.",
      ppf: {
        title: "PPF ZAŠTITA (PAINT PROTECTION FILM)",
        subtitle: "Vrhunski Nevidljivi Oklop",
        desc: "Naš visokokvalitetni PPF pruža debeo, providan sloj zaštite od fizičkih oštećenja. Poseduje svojstva samozaceljivanja koja čine da tragovi pranja i lagane ogrebotine nestanu pod toplotom.",
        benefits: ["Otpornost na Kamenčiće", "Samozaceljujuća Tehnologija", "10 Godina Garancije", "Formula koja ne žuti"],
        pricing: [
          { label: "Front End paket", price: "€900" },
          { label: "Kompletno vozilo", price: "€2,500" },
          { label: "Track paket", price: "€1,400" }
        ],
        process: [
          { title: "Digitalno sečenje", desc: "Precizni šabloni sečeni specifično za vaš model automobila." },
          { title: "Instalacija", desc: "Ekspertsko nanošenje sa podvučenim ivicama za besprekoran izgled." },
          { title: "Finalna inspekcija", desc: "Period od 24 sata za sušenje i provera ivica." }
        ],
        faq: [
          { q: "Da li se vidi?", a: "Kada se pravilno instalira sa podvučenim ivicama, praktično je nevidljiva golim okom." },
          { q: "Može li se ukloniti?", a: "Da, može se bezbedno ukloniti bez oštećenja originalne fabričke boje." }
        ]
      },
      ceramic: {
        title: "KERAMIČKA ZAŠTITA",
        subtitle: "Zaštita na Molekularnom Nivou",
        desc: "Nanosimo višeslojne keramičke premaze koji se vezuju za vaš lak, stvarajući tvrd, hidrofobni štit. Ovo pojačava sjaj i čini održavanje lakim.",
        benefits: ["Ekstremna Hidrofobnost", "Otpornost na Hemikalije", "Duboki Sjaj Ogledala", "UV Zaštita"],
        pricing: [
          { label: "2 godine zaštite", price: "€400" },
          { label: "5 godina zaštite", price: "€750" },
          { label: "Zaštita felni i stakala", price: "€150" }
        ],
        process: [
          { title: "Priprema površine", desc: "Osiguravanje da je lak 100% čist i korigovan pre nanošenja." },
          { title: "Nanošenje", desc: "Precizno nanošenje keramičke tečnosti, panel po panel." },
          { title: "Sušenje", desc: "Infracrveno sušenje za maksimalnu vezu i tvrdoću." }
        ],
        faq: [
          { q: "Da li sprečava ogrebotine?", a: "Pruža otpornost na blage tragove pranja, ali nije otporan na duboke ogrebotine. Za fizičku zaštitu preporučujemo PPF." },
          { q: "Kako se održava keramička zaštita?", a: "Dobićete kompletan vodič. Uglavnom zahteva pH-neutralne šampone i beskontaktno sušenje." }
        ]
      },
      detailing: {
        title: "AUTO DETAILING",
        subtitle: "Precizna Restauracija",
        desc: "Od dubinske sanitacije enterijera do višefazne korekcije boje, naše detailing usluge su usmerene na vraćanje svakog kvadratnog centimetra vašeg vozila u savršenstvo.",
        benefits: ["Korekcija Boje", "Sanitacija Enterijera", "Detailing Motora", "Kondicioniranje Kože"],
        pricing: [
          { label: "Essential Detailing", price: "€150" },
          { label: "Premium restauracija", price: "€350" },
          { label: "Korekcija laka (Step 1)", price: "€250" }
        ],
        process: [
          { title: "Dekontaminacija", desc: "Hemijsko i mehaničko uklanjanje čestica gvožđa, katrana i smole." },
          { title: "Korekcija laka", desc: "Mašinsko poliranje za uklanjanje holograma i blagih ogrebotina." },
          { title: "Osvežavanje enterijera", desc: "Čišćenje parom i kondicioniranje svih površina." }
        ],
        faq: [
          { q: "Koliko traje proces?", a: "Kompletan detailing obično traje 1-2 dana u zavisnosti od stanja vozila." },
          { q: "Da li radite na terenu?", a: "Ne, radimo isključivo u našem studiju kako bismo osigurali apsolutni kvalitet." }
        ]
      },
      details: "Detalji Usluge"
    },
    contactPage: {
      title: "STUPITE U KONTAKT.",
      desc: "Spremni da podignete zaštitu svog vozila na viši nivo? Popunite formu ili nas kontaktirajte direktno.",
      call: "Pozovite Nas",
      whatsapp: "WhatsApp",
      visit: "Posetite Studio",
      labels: {
        name: "Ime i Prezime",
        phone: "Telefon",
        vehicle: "Model i Godište Vozila",
        service: "Potrebna Usluga",
        message: "Poruka"
      },
      services: ["PPF Zaštita", "Keramička Zaštita", "Kompletan Detailing", "Korekcija Boje"],
      button: "Pošaljite Upit",
      success: {
        title: "UPIT POSLAT",
        desc: "Hvala vam što ste izabrali Prime Garage. Naš tim će vas kontaktirati u roku od 2 sata.",
        back: "Pošaljite novu poruku"
      }
    },
    galleryPage: {
      title: "GALERIJA.",
      desc: "Prikaz preciznosti i savršenstva. Istražite naše nedavne transformacije automobila."
    },
    aboutPage: {
      title: "O NAMA.",
      subtitle: "Preciznost nije cilj. To je naš standard.",
      desc1: "Osnovan u Beogradu, Prime Garage je nastao iz jedne strasti: automobilske perfekcije. Shvatili smo da standardnim perionicama i detailing radnjama često nedostaje tehnička preciznost potrebna za luksuzna vozila.",
      desc2: "Danas smo sertifikovani studio specijalizovan za naprednu zaštitu površina. Mi ne čistimo samo automobile; mi čuvamo investicije koristeći najnaprednije materijale i tehnike na svetu.",
      stats: ["Sopstveni Rad", "Sertifikovani Tehničari"]
    }
  }
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('en');
  
  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result && result[key]) result = result[key];
      else return path;
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => useContext(LanguageContext);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { 
      name: t('nav.services'), 
      path: '/services',
      dropdown: [
        { name: t('nav.detailing'), path: '/detailing' },
        { name: t('nav.ceramic'), path: '/ceramic' },
        { name: t('nav.ppf'), path: '/ppf' },
      ]
    },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2">
          <span className="text-white">PRIME</span>
          <span className="text-zinc-500">GARAGE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <div className="flex items-center gap-1 cursor-pointer">
                  <Link 
                    to={link.path} 
                    className={`text-xs uppercase tracking-widest font-medium hover:text-white transition-colors ${location.pathname.startsWith(link.path) ? 'text-white' : 'text-zinc-400'}`}
                  >
                    {link.name}
                  </Link>
                  <ChevronDown size={12} className="text-zinc-500 group-hover:text-white transition-colors" />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300">
                    <div className="bg-dark border border-white/10 p-4 w-48 shadow-2xl backdrop-blur-xl">
                      {link.dropdown.map((sub) => (
                        <Link 
                          key={sub.name} 
                          to={sub.path} 
                          className={`block py-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors ${location.pathname === sub.path ? 'text-white' : 'text-zinc-500'}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to={link.path} 
                  className={`text-xs uppercase tracking-widest font-medium hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : 'text-zinc-400'}`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="flex items-center gap-2 border-l border-white/10 pl-8 ml-4">
            <button 
              onClick={() => setLang('en')} 
              className={`text-[10px] uppercase tracking-widest ${lang === 'en' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              EN
            </button>
            <span className="text-zinc-700">/</span>
            <button 
              onClick={() => setLang('sr')} 
              className={`text-[10px] uppercase tracking-widest ${lang === 'sr' ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              SR
            </button>
          </div>

          <Link to="/contact" className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            {t('nav.bookNow')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex items-center gap-2 mr-4">
            <button onClick={() => setLang('en')} className={`text-[10px] ${lang === 'en' ? 'text-white' : 'text-zinc-500'}`}>EN</button>
            <span className="text-zinc-700">/</span>
            <button onClick={() => setLang('sr')} className={`text-[10px] ${lang === 'sr' ? 'text-white' : 'text-zinc-500'}`}>SR</button>
          </div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-b border-white/5 lg:hidden overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  <Link 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-display uppercase tracking-widest ${location.pathname === link.path ? 'text-white' : 'text-zinc-400'}`}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                      {link.dropdown.map((sub) => (
                        <Link 
                          key={sub.name} 
                          to={sub.path} 
                          onClick={() => setIsOpen(false)}
                          className={`text-sm uppercase tracking-widest ${location.pathname === sub.path ? 'text-white' : 'text-zinc-500'}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-darker border-t border-white/5 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <h3 className="text-xl font-display font-bold mb-6">PRIME GARAGE</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">
            {t('footer.desc')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">{t('footer.services')}</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><Link to="/detailing" className="hover:text-white transition-colors">{t('nav.detailing')}</Link></li>
            <li><Link to="/ceramic" className="hover:text-white transition-colors">{t('nav.ceramic')}</Link></li>
            <li><Link to="/ppf" className="hover:text-white transition-colors">{t('nav.ppf')}</Link></li>
            <li><Link to="/detailing" className="hover:text-white transition-colors">{t('contactPage.services.3')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">{t('footer.studio')}</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>Bulevar Oslobođenja 123,<br />Belgrade, Serbia</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="flex-shrink-0" />
              <span>+381 60 123 4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="flex-shrink-0" />
              <span>Mon - Sat: 09:00 - 18:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">{t('footer.newsletter')}</h4>
          <p className="text-sm text-zinc-500 mb-4">{t('footer.newsletterDesc')}</p>
          <div className="flex">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-white/30" />
            <button className="bg-white text-black px-4 py-2 hover:bg-zinc-200 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-zinc-600">
        <p>© 2026 Prime Garage Belgrade. {t('footer.rights')}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-white">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/381601234567" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
  >
    <MessageSquare size={24} />
  </a>
);

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Prime Garage Belgrade`;
  }, [title]);
};

// --- Pages ---

const Home = () => {
  const { t } = useTranslation();
  usePageTitle(t('home.hero.subtitle'));
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Car Detailing" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 mb-6 block"
          >
            {t('home.hero.subtitle')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-none"
          >
            {t('home.hero.title').split('.')[0]}. <br />
            <span className="text-zinc-500">{t('home.hero.title').split('.')[1]}.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            {t('home.hero.desc')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/contact" className="btn-primary">{t('home.hero.book')}</Link>
            <Link to="/services" className="btn-outline">{t('home.hero.explore')}</Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-darker py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-display font-bold mb-1">10+</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('home.trust.exp')}</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">2500+</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('home.trust.cars')}</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('home.trust.precision')}</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">5/5</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('home.trust.rating')}</div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">{t('home.services.subtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-bold">{t('home.services.title').split(' ')[0]} <br />{t('home.services.title').split(' ')[1]}</h2>
          </div>
          <Link to="/services" className="text-sm uppercase tracking-widest flex items-center gap-2 hover:text-zinc-400 transition-colors">
            {t('home.services.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('home.services.ppf.title'),
              desc: t('home.services.ppf.desc'),
              path: "/ppf",
              img: "https://images.unsplash.com/photo-1507136566006-bb71ef586eb1?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: t('home.services.ceramic.title'),
              desc: t('home.services.ceramic.desc'),
              path: "/ceramic",
              img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: t('home.services.detailing.title'),
              desc: t('home.services.detailing.desc'),
              path: "/detailing",
              img: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=800"
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card group"
            >
              <div className="aspect-video overflow-hidden mb-8">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">{service.desc}</p>
              <Link to={service.path} className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                {t('home.services.learnMore')} <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-darker py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('home.transformation.title')}</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">{t('home.transformation.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" alt="Before" className="w-full h-[400px] object-cover opacity-50" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/80 px-4 py-1 text-[10px] uppercase tracking-widest">{t('home.transformation.before')}</div>
            </div>
            <div className="relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" alt="After" className="w-full h-[400px] object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 text-[10px] uppercase tracking-widest font-bold">{t('home.transformation.after')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">{t('home.process.subtitle')}</span>
          <h2 className="text-4xl md:text-6xl font-bold">{t('home.process.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {(t('home.process.steps') as any[]).map((item, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-display font-bold text-white/5 mb-6">0{i + 1}</div>
              <h4 className="text-lg font-bold mb-3">{item.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              {i < 4 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-[1px] bg-white/10"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-darker py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-white text-white" />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">{t('home.testimonials.title').split(' ')[0]} <br />{t('home.testimonials.title').split(' ')[1]}</h2>
              <p className="text-zinc-500 text-lg">{t('home.testimonials.desc')}</p>
            </div>
            <div className="space-y-12">
              {(t('home.testimonials.items') as any[]).map((item, i) => (
                <div key={i} className="border-l border-white/10 pl-8">
                  <p className="text-xl italic mb-6 text-zinc-300">{item.text}</p>
                  <div className="text-xs uppercase tracking-widest font-bold">— {item.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold mb-8">{t('home.cta.title')}</h2>
          <p className="text-zinc-400 text-lg mb-12">{t('home.cta.desc')}</p>
          <Link to="/contact" className="btn-primary">{t('home.cta.button')}</Link>
        </div>
      </section>
    </div>
  );
};

const ServicesOverview = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.services'));
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="mb-20">
      <h1 className="text-5xl md:text-8xl font-bold mb-8">{t('servicesPage.title')}</h1>
      <p className="text-zinc-500 text-xl max-w-2xl">{t('servicesPage.desc')}</p>
    </div>
    
    <div className="grid grid-cols-1 gap-32">
      {[
        {
          title: t('servicesPage.ppf.title'),
          subtitle: t('servicesPage.ppf.subtitle'),
          desc: t('servicesPage.ppf.desc'),
          benefits: t('servicesPage.ppf.benefits'),
          img: "https://images.unsplash.com/photo-1507136566006-bb71ef586eb1?auto=format&fit=crop&q=80&w=1200",
          path: "/ppf"
        },
        {
          title: t('servicesPage.ceramic.title'),
          subtitle: t('servicesPage.ceramic.subtitle'),
          desc: t('servicesPage.ceramic.desc'),
          benefits: t('servicesPage.ceramic.benefits'),
          img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200",
          path: "/ceramic"
        },
        {
          title: t('servicesPage.detailing.title'),
          subtitle: t('servicesPage.detailing.subtitle'),
          desc: t('servicesPage.detailing.desc'),
          benefits: t('servicesPage.detailing.benefits'),
          img: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=1200",
          path: "/detailing"
        }
      ].map((s, i) => (
        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">{s.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{s.title}</h2>
            <p className="text-zinc-500 mb-8 leading-relaxed">{s.desc}</p>
            <ul className="grid grid-cols-2 gap-4 mb-12">
              {(s.benefits as string[]).map((b, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-white" /> {b}
                </li>
              ))}
            </ul>
            <Link to={s.path} className="btn-outline">{t('servicesPage.details')}</Link>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

const ServiceDetail = ({ title, subtitle, desc, benefits, process, pricing, faq }: any) => {
  const { t } = useTranslation();
  usePageTitle(title);
  return (
    <div className="pt-32">
    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">{subtitle}</span>
        <h1 className="text-5xl md:text-8xl font-bold mb-12">{title}</h1>
        <p className="text-zinc-400 text-xl leading-relaxed mb-12">{desc}</p>
        <div className="flex flex-wrap gap-4">
          {benefits.map((b: string, i: number) => (
            <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest">{b}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-darker py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight">{t('home.process.title')}</h2>
          <div className="space-y-12">
            {process.map((p: any, i: number) => (
              <div key={i} className="flex gap-6">
                <div className="text-zinc-700 font-display font-bold text-2xl">{i + 1}</div>
                <div>
                  <h4 className="text-lg font-bold mb-2">{p.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card h-fit">
          <h3 className="text-xl font-bold mb-8">Investment</h3>
          <div className="space-y-6 mb-12">
            {pricing.map((p: any, i: number) => (
              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-zinc-400">{p.label}</span>
                <span className="font-bold">{p.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mb-8 italic">* Prices vary based on vehicle size and condition. Contact us for a precise quote.</p>
          <Link to="/contact" className="btn-primary w-full text-center">{t('nav.bookNow')}</Link>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <h2 className="text-3xl font-bold mb-16 text-center uppercase tracking-tight">FAQ</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {faq.map((f: any, i: number) => (
          <div key={i} className="border-b border-white/5 pb-8">
            <h4 className="text-lg font-bold mb-4">{f.q}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.contact'));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8">{t('contactPage.title').split(' ')[0]} <br />{t('contactPage.title').split(' ')[1]}</h1>
          <p className="text-zinc-500 text-xl mb-12">{t('contactPage.desc')}</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('contactPage.call')}</div>
                <div className="text-lg font-bold">+381 60 123 4567</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <MessageSquare size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('contactPage.whatsapp')}</div>
                <div className="text-lg font-bold">Available 24/7</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('contactPage.visit')}</div>
                <div className="text-lg font-bold">Bulevar Oslobođenja 123, Belgrade</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('contactPage.success.title')}</h3>
              <p className="text-zinc-500">{t('contactPage.success.desc')}</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-xs uppercase tracking-widest text-zinc-400 hover:text-white">{t('contactPage.success.back')}</button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">{t('contactPage.labels.name')}</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">{t('contactPage.labels.phone')}</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">{t('contactPage.labels.vehicle')}</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">{t('contactPage.labels.service')}</label>
                <select className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 appearance-none">
                  {(t('contactPage.services') as string[]).map((s, i) => (
                    <option key={i} className="bg-dark">{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">{t('contactPage.labels.message')}</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">{t('contactPage.button')}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.gallery'));
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="mb-20">
      <h1 className="text-5xl md:text-8xl font-bold mb-8">{t('galleryPage.title')}</h1>
      <p className="text-zinc-500 text-xl max-w-2xl">{t('galleryPage.desc')}</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
        "https://images.unsplash.com/photo-1542362567-b055002b91f4",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
        "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b"
      ].map((img, i) => (
        <div key={i} className="aspect-square overflow-hidden group">
          <img src={`${img}?auto=format&fit=crop&q=80&w=800`} alt="Gallery" className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
        </div>
      ))}
    </div>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.about'));
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-5xl md:text-8xl font-bold mb-8">{t('aboutPage.title')}</h1>
        <h3 className="text-2xl font-bold mb-6">{t('aboutPage.subtitle')}</h3>
        <p className="text-zinc-500 text-lg leading-relaxed mb-8">
          {t('aboutPage.desc1')}
        </p>
        <p className="text-zinc-500 text-lg leading-relaxed mb-12">
          {t('aboutPage.desc2')}
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('aboutPage.stats.0')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">Certified</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{t('aboutPage.stats.1')}</div>
          </div>
        </div>
      </div>
      <div className="aspect-[4/5] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=1200" alt="Studio" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
      </div>
    </div>
    </div>
  );
};

// --- Main App ---

const MainContent = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/detailing" element={
          <ServiceDetail 
            title={t('servicesPage.detailing.title')}
            subtitle={t('servicesPage.detailing.subtitle')}
            desc={t('servicesPage.detailing.desc')}
            benefits={t('servicesPage.detailing.benefits')}
            pricing={t('servicesPage.detailing.pricing')}
            process={t('servicesPage.detailing.process')}
            faq={t('servicesPage.detailing.faq')}
          />
        } />
        <Route path="/ceramic" element={
          <ServiceDetail 
            title={t('servicesPage.ceramic.title')}
            subtitle={t('servicesPage.ceramic.subtitle')}
            desc={t('servicesPage.ceramic.desc')}
            benefits={t('servicesPage.ceramic.benefits')}
            pricing={t('servicesPage.ceramic.pricing')}
            process={t('servicesPage.ceramic.process')}
            faq={t('servicesPage.ceramic.faq')}
          />
        } />
        <Route path="/ppf" element={
          <ServiceDetail 
            title={t('servicesPage.ppf.title')}
            subtitle={t('servicesPage.ppf.subtitle')}
            desc={t('servicesPage.ppf.desc')}
            benefits={t('servicesPage.ppf.benefits')}
            pricing={t('servicesPage.ppf.pricing')}
            process={t('servicesPage.ppf.process')}
            faq={t('servicesPage.ppf.faq')}
          />
        } />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MessageSquare, Shield, Sparkles, 
  ChevronRight, Instagram, Facebook, MapPin, Clock,
  CheckCircle2, ArrowRight, Star
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Detailing', path: '/detailing' },
    { name: 'Ceramic Coating', path: '/ceramic' },
    { name: 'PPF', path: '/ppf' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
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
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-xs uppercase tracking-widest font-medium hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : 'text-zinc-400'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-b border-white/5 lg:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-darker border-t border-white/5 pt-20 pb-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
      <div>
        <h3 className="text-xl font-display font-bold mb-6">PRIME GARAGE</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          Belgrade's premier automotive protection studio. We specialize in preserving the value and aesthetics of luxury vehicles.
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
        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">Services</h4>
        <ul className="space-y-4 text-sm text-zinc-500">
          <li><Link to="/detailing" className="hover:text-white transition-colors">Auto Detailing</Link></li>
          <li><Link to="/ceramic" className="hover:text-white transition-colors">Ceramic Coating</Link></li>
          <li><Link to="/ppf" className="hover:text-white transition-colors">PPF Protection</Link></li>
          <li><Link to="/detailing" className="hover:text-white transition-colors">Paint Correction</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">Studio</h4>
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
        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-zinc-400">Newsletter</h4>
        <p className="text-sm text-zinc-500 mb-4">Get maintenance tips and exclusive offers.</p>
        <div className="flex">
          <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-white/30" />
          <button className="bg-white text-black px-4 py-2 hover:bg-zinc-200 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-zinc-600">
      <p>© 2026 Prime Garage Belgrade. All rights reserved.</p>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </footer>
);

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
  usePageTitle('Premium Auto Detailing & Protection');
  return (
    <div className="overflow-hidden">
      {/* ... existing Home content ... */}
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
            Belgrade's Premier Detailing Studio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-none"
          >
            THE ART OF <br />
            <span className="text-zinc-500">PRESERVATION.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            Beyond a car wash. We provide expert-level protection and precision detailing for those who demand absolute perfection.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/contact" className="btn-primary">Book Your Session</Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-darker py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-display font-bold mb-1">10+</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">2500+</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Cars Protected</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Precision Work</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold mb-1">5/5</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Client Rating</div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold">UNCOMPROMISING <br />PROTECTION.</h2>
          </div>
          <Link to="/services" className="text-sm uppercase tracking-widest flex items-center gap-2 hover:text-zinc-400 transition-colors">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "PPF PROTECTION",
              desc: "The ultimate invisible shield against stone chips, scratches, and UV damage. Self-healing technology for absolute peace of mind.",
              path: "/ppf",
              img: "https://images.unsplash.com/photo-1507136566006-bb71ef586eb1?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "CERAMIC COATING",
              desc: "Permanent liquid glass protection. Extreme hydrophobicity, deep gloss, and chemical resistance that lasts for years.",
              path: "/ceramic",
              img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "AUTO DETAILING",
              desc: "Precision cleaning and paint correction. We restore your vehicle to a showroom condition, inside and out.",
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
                Learn More <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-darker py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">THE TRANSFORMATION.</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Witness the difference that precision paint correction and protection can make.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" alt="Before" className="w-full h-[400px] object-cover opacity-50" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/80 px-4 py-1 text-[10px] uppercase tracking-widest">Before</div>
            </div>
            <div className="relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" alt="After" className="w-full h-[400px] object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 text-[10px] uppercase tracking-widest font-bold">After</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest text-zinc-500 mb-4 block">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-bold">THE PROCESS.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { step: "01", title: "Inspection", desc: "Detailed diagnostic of paint condition and surfaces." },
            { step: "02", title: "Preparation", desc: "Multi-stage decontamination and deep cleaning." },
            { step: "03", title: "Correction", desc: "Expert machine polishing to remove imperfections." },
            { step: "04", title: "Protection", desc: "Application of PPF or Ceramic Coating layers." },
            { step: "05", title: "Delivery", desc: "Final quality control and handover to the client." }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-display font-bold text-white/5 mb-6">{item.step}</div>
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
              <h2 className="text-4xl md:text-6xl font-bold mb-8">VOICES OF <br />EXCELLENCE.</h2>
              <p className="text-zinc-500 text-lg">Our reputation is built on the satisfaction of Belgrade's most discerning car owners.</p>
            </div>
            <div className="space-y-12">
              <div className="border-l border-white/10 pl-8">
                <p className="text-xl italic mb-6 text-zinc-300">"The level of detail Prime Garage puts into their work is unmatched. My Porsche looks better than the day I picked it up from the dealership."</p>
                <div className="text-xs uppercase tracking-widest font-bold">— Marko V., Porsche 911 GT3</div>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-xl italic mb-6 text-zinc-300">"I chose the full PPF package for my G-Wagon. The installation is invisible and the peace of mind is worth every penny."</p>
                <div className="text-xs uppercase tracking-widest font-bold">— Stefan D., Mercedes G63 AMG</div>
              </div>
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
          <h2 className="text-4xl md:text-7xl font-bold mb-8">READY FOR PERFECTION?</h2>
          <p className="text-zinc-400 text-lg mb-12">Limited slots available for April. Secure your vehicle's protection today.</p>
          <Link to="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
};

const ServicesOverview = () => {
  usePageTitle('Our Services');
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="mb-20">
      <h1 className="text-5xl md:text-8xl font-bold mb-8">SERVICES.</h1>
      <p className="text-zinc-500 text-xl max-w-2xl">A comprehensive suite of protection and restoration services designed for the modern automotive enthusiast.</p>
    </div>
    
    <div className="grid grid-cols-1 gap-32">
      {[
        {
          title: "PAINT PROTECTION FILM (PPF)",
          subtitle: "The Ultimate Invisible Armor",
          desc: "Our high-grade PPF provides a thick, transparent barrier against physical damage. It features self-healing properties that make swirl marks and light scratches disappear with heat.",
          benefits: ["Stone Chip Resistance", "Self-Healing Technology", "10-Year Warranty", "Non-Yellowing Formula"],
          img: "https://images.unsplash.com/photo-1507136566006-bb71ef586eb1?auto=format&fit=crop&q=80&w=1200",
          path: "/ppf"
        },
        {
          title: "CERAMIC COATING",
          subtitle: "Molecular Level Protection",
          desc: "We apply multi-layer ceramic coatings that bond to your paint, creating a hard, hydrophobic shield. This enhances gloss and makes maintenance effortless.",
          benefits: ["Extreme Hydrophobicity", "Chemical Resistance", "Deep Mirror Gloss", "UV Protection"],
          img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200",
          path: "/ceramic"
        },
        {
          title: "AUTO DETAILING",
          subtitle: "Precision Restoration",
          desc: "From deep interior sanitization to multi-stage paint correction, our detailing services are about restoring every square inch of your vehicle to perfection.",
          benefits: ["Paint Correction", "Interior Sanitization", "Engine Bay Detailing", "Leather Conditioning"],
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
              {s.benefits.map((b, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-white" /> {b}
                </li>
              ))}
            </ul>
            <Link to={s.path} className="btn-outline">Service Details</Link>
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
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight">The Process</h2>
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
                <span className="font-bold">Starting from {p.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mb-8 italic">* Prices vary based on vehicle size and condition. Contact us for a precise quote.</p>
          <Link to="/contact" className="btn-primary w-full text-center">Book Now</Link>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <h2 className="text-3xl font-bold mb-16 text-center">FREQUENTLY ASKED QUESTIONS</h2>
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
  usePageTitle('Contact & Bookings');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8">GET IN <br />TOUCH.</h1>
          <p className="text-zinc-500 text-xl mb-12">Ready to elevate your vehicle's protection? Fill out the form or reach us directly.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Call Us</div>
                <div className="text-lg font-bold">+381 60 123 4567</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <MessageSquare size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">WhatsApp</div>
                <div className="text-lg font-bold">Available 24/7</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Visit Studio</div>
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
              <h3 className="text-2xl font-bold mb-4">INQUIRY SENT</h3>
              <p className="text-zinc-500">Thank you for choosing Prime Garage. <br />Our team will contact you within 2 hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-xs uppercase tracking-widest text-zinc-400 hover:text-white">Send another message</button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Phone</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Vehicle Model & Year</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Service Required</label>
                <select className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 appearance-none">
                  <option className="bg-dark">PPF Protection</option>
                  <option className="bg-dark">Ceramic Coating</option>
                  <option className="bg-dark">Full Detailing</option>
                  <option className="bg-dark">Paint Correction</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Send Inquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  usePageTitle('Portfolio');
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="mb-20">
      <h1 className="text-5xl md:text-8xl font-bold mb-8">GALLERY.</h1>
      <p className="text-zinc-500 text-xl max-w-2xl">A showcase of precision and perfection. Explore our recent automotive transformations.</p>
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
  usePageTitle('Our Story');
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-5xl md:text-8xl font-bold mb-8">ABOUT US.</h1>
        <h3 className="text-2xl font-bold mb-6">Precision is not a goal. It is our standard.</h3>
        <p className="text-zinc-500 text-lg leading-relaxed mb-8">
          Founded in Belgrade, Prime Garage was born from a singular passion: automotive perfection. We realized that standard car washes and detailing shops often lacked the technical precision required for high-end vehicles.
        </p>
        <p className="text-zinc-500 text-lg leading-relaxed mb-12">
          Today, we are a certified studio specializing in advanced surface protection. We don't just clean cars; we preserve investments using the world's most advanced materials and techniques.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">In-House Work</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">Certified</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Technicians</div>
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

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/detailing" element={
          <ServiceDetail 
            title="AUTO DETAILING"
            subtitle="Precision Restoration"
            desc="Our detailing service is a multi-stage process designed to restore your vehicle's aesthetic value. We go beyond the surface to ensure every detail is perfect."
            benefits={["Paint Correction", "Interior Sanitization", "Leather Care", "Engine Detailing"]}
            pricing={[
              { label: "Essential Detailing", price: "€150" },
              { label: "Premium Restoration", price: "€350" },
              { label: "Paint Correction (Stage 1)", price: "€250" }
            ]}
            process={[
              { title: "Decontamination", desc: "Chemical and mechanical removal of iron, tar, and sap." },
              { title: "Paint Correction", desc: "Machine polishing to remove swirls and light scratches." },
              { title: "Interior Refresh", desc: "Steam cleaning and conditioning of all surfaces." }
            ]}
            faq={[
              { q: "How long does it take?", a: "A full detailing session typically takes 1-2 days depending on the vehicle condition." },
              { q: "Do you offer mobile detailing?", a: "No, we operate exclusively from our controlled studio environment to ensure absolute quality." }
            ]}
          />
        } />
        <Route path="/ceramic" element={
          <ServiceDetail 
            title="CERAMIC COATING"
            subtitle="Molecular Protection"
            desc="Ceramic coating provides a permanent bond with your paint, creating a hard, glass-like layer that protects against UV, chemicals, and environmental fallout."
            benefits={["9H Hardness", "Extreme Gloss", "Hydrophobic Effect", "UV Resistance"]}
            pricing={[
              { label: "2-Year Protection", price: "€400" },
              { label: "5-Year Protection", price: "€750" },
              { label: "Wheel & Glass Coating", price: "€150" }
            ]}
            process={[
              { title: "Surface Prep", desc: "Ensuring the paint is 100% clean and corrected before application." },
              { title: "Application", desc: "Precise, panel-by-panel application of the ceramic liquid." },
              { title: "Curing", desc: "Infrared curing to ensure maximum bond and hardness." }
            ]}
            faq={[
              { q: "Does it prevent scratches?", a: "It provides resistance against light swirls, but it is not scratch-proof. For physical impact protection, we recommend PPF." },
              { q: "How do I wash a coated car?", a: "We provide a full maintenance guide. Generally, it requires pH-neutral soaps and touchless drying." }
            ]}
          />
        } />
        <Route path="/ppf" element={
          <ServiceDetail 
            title="PPF PROTECTION"
            subtitle="The Invisible Armor"
            desc="Paint Protection Film (PPF) is the ultimate solution for stone chips and physical damage. Our films are self-healing and virtually invisible."
            benefits={["Stone Chip Proof", "Self-Healing", "10-Year Warranty", "UV Protection"]}
            pricing={[
              { label: "Front End Package", price: "€900" },
              { label: "Full Vehicle Wrap", price: "€2,500" },
              { label: "Track Package", price: "€1,400" }
            ]}
            process={[
              { title: "Digital Cutting", desc: "Precision templates cut specifically for your car model." },
              { title: "Installation", desc: "Expert application with tucked edges for a seamless look." },
              { title: "Final Inspection", desc: "24-hour settling period and edge check." }
            ]}
            faq={[
              { q: "Is it visible?", a: "When installed correctly with tucked edges, it is virtually invisible to the naked eye." },
              { q: "Can it be removed?", a: "Yes, it can be removed safely without damaging the original factory paint." }
            ]}
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
}

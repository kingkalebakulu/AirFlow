import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Star, ArrowRight, Check, Award, Clock, Shield, Users, Wind, Snowflake, Flame, Fan, Droplets, Building2, MessageCircle, Facebook, Instagram, Linkedin, Twitter, Calendar, Tag } from 'lucide-react';

// --- CONFIGURATION & CONSTANTS ---
const WHATSAPP_NUMBER = "27619229670";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const generateWhatsAppMessage = (service) => {
  const message = encodeURIComponent(`Hi AirFlow Pro, I'm interested in your ${service} service. Please provide more details.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

const SERVICES_DATA = [
  { id: 'ac-install', title: 'AC Installation', description: 'Professional installation of energy-efficient split and central air conditioning systems.', icon: Snowflake, image: 'https://images.unsplash.com/photo-1599933310631-1f66d21469e8?auto=format&fit=crop&q=80&w=800' },
  { id: 'heating', title: 'Heating Solutions', description: 'Modern heating systems and heat pumps to keep your space warm during the winter.', icon: Flame, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800' },
  { id: 'maintenance', title: 'Preventative Maintenance', description: 'Regular check-ups and cleaning to extend the life of your HVAC systems.', icon: Fan, image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800' },
  { id: 'repair', title: 'Emergency Repairs', description: '24/7 rapid response for urgent cooling or heating system failures.', icon: Droplets, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800' },
  { id: 'commercial', title: 'Commercial HVAC', description: 'Comprehensive cooling and ventilation solutions for offices and retail spaces.', icon: Building2, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { id: 'air-quality', title: 'Indoor Air Quality', description: 'Advanced filtration and purification systems for healthier living environments.', icon: Wind, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' }
];

const REVIEWS_DATA = [
  { name: 'Sarah Thompson', role: 'Homeowner', rating: 5, text: 'AirFlow Pro transformed our living room. Their team was professional, clean, and the new AC is incredibly quiet.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { name: 'Michael Chen', role: 'Restaurant Owner', rating: 5, text: 'Reliable commercial service. They fixed our ventilation system overnight so we could open the next day. Highly recommend!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { name: 'David Nkosi', role: 'Property Manager', rating: 5, text: 'Consistent quality and great communication. We use them for all our managed properties across Durban.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' }
];

// --- HOOKS ---
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return [ref, isVisible];
};

// --- COMPONENTS ---
const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-500 rounded-lg rotate-12 opacity-20"></div>
      <div className="absolute inset-0 bg-cyan-400 rounded-lg -rotate-6 opacity-40 animate-pulse"></div>
      <Wind className="w-6 h-6 text-cyan-400 relative z-10" />
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-tight text-white leading-none">AIRFLOW</span>
      <span className="text-xs font-medium text-cyan-500 tracking-[0.2em]">PRO</span>
    </div>
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to prevent ghosting
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Service Areas', href: '#areas' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
      style={{ zIndex: 9999 }} 
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="relative z-[10001]"><Logo /></a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            Book Now
          </a>
        </nav>

        <button 
          className="md:hidden text-white relative z-[10001] p-2 hover:bg-white/5 rounded-lg transition-colors" 
          aria-label="Toggle menu" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Higher Z-Index and proper positioning */}
      <div className={`md:hidden fixed inset-0 bg-slate-950 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible pointer-events-auto translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-4'
      }`} style={{ zIndex: 10000 }}>
        <div className="flex flex-col h-full pt-28 pb-12 px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <a 
              href={WHATSAPP_LINK} 
              className="flex items-center justify-center gap-3 w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-xl text-lg shadow-lg shadow-cyan-500/20"
            >
              <MessageCircle className="w-5 h-5" /> Book via WhatsApp
            </a>
            <p className="text-center text-gray-500 text-sm">Professional HVAC Services in Durban</p>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000" 
          alt="Professional HVAC Service"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950"></div>
      </div>

      <div ref={ref} className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            <span>Premium HVAC Services in Durban</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] text-white">
            Expert Cooling for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Perfect Climate</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            From emergency repairs to precision installations, AirFlow Pro delivers high-performance HVAC solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_LINK} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-cyan-500/20">
              Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-3 text-white">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="services" className="py-24 bg-slate-950 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-white mb-6">Complete Comfort Solutions</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => window.open(generateWhatsAppMessage(service.title), '_blank')}
              className="group relative bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 text-left"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center text-cyan-500 font-bold gap-2">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % REVIEWS_DATA.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-slate-950 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <p className="text-4xl font-bold text-white">Trusted by Durban</p>
        </div>
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-[2rem]">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {REVIEWS_DATA.map((review, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div className="bg-slate-900 border border-white/5 p-10 md:p-16 rounded-[2rem]">
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-cyan-500 text-cyan-500" />)}
                  </div>
                  <p className="text-2xl md:text-3xl font-medium text-white mb-10 italic leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/20" />
                    <div>
                      <p className="font-bold text-lg text-white">{review.name}</p>
                      <p className="text-cyan-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {REVIEWS_DATA.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`w-3 h-3 rounded-full transition-all ${activeIndex === i ? 'bg-cyan-500 w-8' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => (
  <section id="areas" className="py-24 bg-slate-900/30 scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-cyan-400 font-bold mb-4 uppercase tracking-widest">Service Areas</h2>
          <h3 className="text-4xl font-bold text-white mb-8">Greater Durban Coverage</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Durban Central", "Umhlanga", "Berea", "Morningside", "Westville", "Pinetown", "Amanzimtoti", "Ballito"].map(area => (
              <div key={area} className="flex items-center gap-3 text-white font-medium p-3 bg-white/5 rounded-lg border border-white/5">
                <MapPin className="w-5 h-5 text-cyan-500" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110660.29363065604!2d30.932467332219766!3d-29.831411589304918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7aa0b8b3c1719%3A0xd92d8d0d21d34fc7!2sDurban!5e0!3m2!1sen!2sza!4v1715424564321!5m2!1sen!2sza" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"></iframe>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="lg:col-span-1">
          <Logo className="mb-8" />
          <p className="text-gray-500 leading-relaxed mb-8">Premium cooling and heating solutions for Durban's finest spaces.</p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all"><Icon className="w-5 h-5" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            {['Services', 'About', 'Reviews', 'Areas'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-cyan-500 transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            {['Installation', 'Maintenance', 'Repairs', 'Commercial'].map(item => (
              <li key={item}><a href="#services" className="hover:text-cyan-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-gray-500">
            <li className="flex gap-4"><MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0" /> Durban, South Africa</li>
            <li className="flex gap-4"><Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" /> +27 61 922 9670</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} AirFlow Pro. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="font-sans bg-slate-950 text-gray-100 selection:bg-cyan-500/30 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <section className="py-12 border-y border-white/5 bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {[{ icon: Award, label: "Certified" }, { icon: Clock, label: "24/7 Support" }, { icon: Shield, label: "Guaranteed" }, { icon: Users, label: "Local Team" }].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3">
                  <item.icon className="w-5 h-5 text-cyan-500" />
                  <span className="font-semibold text-xs uppercase tracking-widest text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Services />
        <section id="about" className="py-24 bg-slate-900/20 scroll-mt-24">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" alt="Team" className="rounded-3xl shadow-2xl border border-white/10" />
              <div className="absolute -bottom-6 -right-6 bg-cyan-500 p-6 rounded-2xl hidden md:block">
                <p className="text-3xl font-black text-slate-950">15+</p>
                <p className="text-slate-950 text-xs font-bold uppercase tracking-widest">Years Exp</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-4">Why AirFlow Pro?</h2>
              <h3 className="text-4xl font-bold text-white mb-6">Engineered for Performance</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">We understand Durban's climate challenges. Our solutions are built to last and optimized for efficiency.</p>
              <div className="space-y-4">
                {["Durban's trusted experts", "Energy-efficient designs", "Transparent pricing", "Fast 24hr response"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-medium"><Check className="text-cyan-500 w-5 h-5" /> {text}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Reviews />
        <ServiceAreas />
      </main>
      <Footer />
      <a href={WHATSAPP_LINK} className="fixed bottom-6 right-6 z-[9998] bg-[#25D366] text-white p-4 rounded-full shadow-2xl md:hidden hover:scale-110 transition-transform shadow-green-500/20" aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default App;

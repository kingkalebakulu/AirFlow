import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, ArrowRight, Check, Award, Clock, Shield, Users, Wind, Snowflake, Flame, Fan, Droplets, Building2, MessageCircle, Facebook, Instagram, Linkedin, Twitter, Calendar, Tag } from 'lucide-react';

// --- CONFIGURATION & CONSTANTS ---
const WHATSAPP_NUMBER = "27619229670";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const generateWhatsAppMessage = (service) => {
  const message = encodeURIComponent(`Hi AirFlow Pro, I'm interested in your ${service} service. Please provide more details.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// Moved outside to prevent re-allocation on every render
const SERVICES_DATA = [
  {
    id: 'ac-install',
    title: 'AC Installation',
    description: 'Professional installation of energy-efficient split and central air conditioning systems.',
    icon: Snowflake,
    image: 'https://images.unsplash.com/photo-1599933310631-1f66d21469e8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'heating',
    title: 'Heating Solutions',
    description: 'Modern heating systems and heat pumps to keep your space warm during the winter.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'maintenance',
    title: 'Preventative Maintenance',
    description: 'Regular check-ups and cleaning to extend the life of your HVAC systems.',
    icon: Fan,
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'repair',
    title: 'Emergency Repairs',
    description: '24/7 rapid response for urgent cooling or heating system failures.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'commercial',
    title: 'Commercial HVAC',
    description: 'Comprehensive cooling and ventilation solutions for offices and retail spaces.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'air-quality',
    title: 'Indoor Air Quality',
    description: 'Advanced filtration and purification systems for healthier living environments.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  }
];

const REVIEWS_DATA = [
  {
    name: 'Sarah Thompson',
    role: 'Homeowner',
    rating: 5,
    text: 'AirFlow Pro transformed our living room. Their team was professional, clean, and the new AC is incredibly quiet.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Michael Chen',
    role: 'Restaurant Owner',
    rating: 5,
    text: 'Reliable commercial service. They fixed our ventilation system overnight so we could open the next day. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'David Nkosi',
    role: 'Property Manager',
    rating: 5,
    text: 'Consistent quality and great communication. We use them for all our managed properties across Durban.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

const NEWS_DATA = [
  {
    title: 'Energy Saving Tips for Summer',
    excerpt: 'How to keep your home cool while reducing your electricity bill during the hot Durban summer.',
    date: 'Oct 15, 2024',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'The Benefits of Smart Thermostats',
    excerpt: 'Discover how modern smart home technology can help you automate your home climate control.',
    date: 'Oct 02, 2024',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=600'
  }
];

// --- HOOKS ---
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [ref]);

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

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Service Areas', href: '#areas' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home"><Logo /></a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-cyan-400 transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            Book Now
          </a>
        </nav>

        <button className="md:hidden text-white" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/5 p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2">
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_LINK} className="mt-4 w-full py-3 bg-cyan-500 text-slate-950 text-center font-bold rounded-lg">
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000" 
          alt="Professional HVAC Service Durban"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <div ref={ref} className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            <span>Premium HVAC Services in Durban</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
            Expert Cooling for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Perfect Climate</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            From emergency repairs to precision installations, AirFlow Pro delivers high-performance HVAC solutions tailored for homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_LINK} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all flex items-center justify-center gap-3 group">
              Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-3">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBadges = () => (
  <section className="py-12 border-y border-white/5 bg-slate-950/50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
        {[
          { icon: Award, label: "Certified Professionals" },
          { icon: Clock, label: "24/7 Support" },
          { icon: Shield, label: "Full Guarantee" },
          { icon: Users, label: "Local Durban Team" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-3">
            <item.icon className="w-6 h-6 text-cyan-500" />
            <span className="font-semibold text-sm uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => {
  const [ref, isVisible] = useScrollAnimation();

  const handleBooking = (serviceName) => {
    window.open(generateWhatsAppMessage(serviceName), '_blank');
  };

  return (
    <section id="services" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <h2 className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-white mb-6">Complete Comfort Solutions</p>
          <p className="text-gray-400">Precision engineering meets customer-first service. We handle every aspect of your indoor climate.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => handleBooking(service.title)}
              className="group relative bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 text-left w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
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

const WhyChooseUs = () => {
  const [ref, isVisible] = useScrollAnimation();
  const features = [
    "Durban's most trusted HVAC experts",
    "Energy-efficient system designs",
    "Transparent pricing, no hidden fees",
    "Fast response for emergency repairs"
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div ref={ref} className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" 
                alt="AirFlow Pro Team Work"
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 bg-cyan-500 p-8 rounded-3xl hidden md:block z-20">
                <p className="text-4xl font-black text-slate-950">15+</p>
                <p className="text-slate-950 font-bold leading-tight">Years of<br />Excellence</p>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-4">Why AirFlow Pro?</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Built on Trust, Engineered for Performance</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We understand the unique climate challenges in Durban. Our solutions aren't just about cooling air; they're about creating healthy, efficient environments that last.
            </p>
            <div className="grid gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="bg-cyan-500/20 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-cyan-500" />
                  </div>
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <p className="text-4xl font-bold text-white">What Our Clients Say</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {REVIEWS_DATA.map((review, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div className="bg-slate-900 border border-white/5 p-10 md:p-16 rounded-[2rem] relative">
                  <div className="absolute top-10 right-10 opacity-10">
                    <MessageCircle className="w-20 h-20 text-cyan-500" />
                  </div>
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-cyan-500 text-cyan-500" />)}
                  </div>
                  <p className="text-2xl md:text-3xl font-medium text-white mb-10 leading-relaxed italic">"{review.text}"</p>
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
          
          <div className="flex justify-center gap-3 mt-10">
            {REVIEWS_DATA.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${activeIndex === i ? 'bg-cyan-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  const areas = ["Durban Central", "Umhlanga", "Berea", "Morningside", "Westville", "Pinetown", "Amanzimtoti", "Ballito"];
  
  return (
    <section id="areas" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-cyan-400 font-bold mb-4">SERVICE AREAS</h2>
            <h3 className="text-4xl font-bold text-white mb-8 leading-tight">Covering the Greater Durban Area</h3>
            <p className="text-gray-400 mb-10 text-lg">Whether you're in the city center or the northern suburbs, our fleet is ready to deploy to your location within 24 hours.</p>
            <div className="grid grid-cols-2 gap-4">
              {areas.map(area => (
                <div key={area} className="flex items-center gap-3 text-white font-medium">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Fixed Google Maps Embed for Durban */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110660.29363065604!2d30.932467332219766!3d-29.831411589304918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7aa0b8b3c1719%3A0xd92d8d0d21d34fc7!2sDurban!5e0!3m2!1sen!2sza!4v1715424564321!5m2!1sen!2sza"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="AirFlow Pro Service Area Map"
            ></iframe>
            <div className="absolute top-6 left-6 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">Teams available in Durban</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const News = () => (
  <section className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-cyan-400 font-bold mb-4">LATEST NEWS</h2>
          <p className="text-4xl font-bold text-white">Climate Control Insights</p>
        </div>
        <a href="#blog" className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all flex items-center gap-3 font-bold">
          View All Posts <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {NEWS_DATA.map((item, i) => (
          <div key={i} className="group bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden flex flex-col sm:flex-row hover:border-cyan-500/30 transition-all duration-500">
            <div className="sm:w-2/5 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="sm:w-3/5 p-8 flex flex-col">
              <div className="flex items-center gap-3 text-cyan-500 text-sm font-bold mb-4">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <Tag className="w-4 h-4 ml-1" />
                <span>Tips</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">{item.excerpt}</p>
              <button className="mt-auto text-white font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More <ArrowRight className="w-4 h-4 text-cyan-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Logo className="mb-8" />
            <p className="text-gray-500 leading-relaxed mb-8">
              Premium cooling and heating solutions for Durban's finest homes and commercial spaces. Engineering comfort since 2009.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="grid gap-4 text-gray-500 font-medium">
              {['Services', 'About Us', 'Reviews', 'Case Studies', 'Service Areas', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-cyan-500 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Services</h4>
            <ul className="grid gap-4 text-gray-500 font-medium">
              {['AC Installation', 'Maintenance', 'Heating Systems', 'Commercial HVAC', 'Air Quality', '24/7 Repair'].map(item => (
                <li key={item}><a href="#" className="hover:text-cyan-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Get in Touch</h4>
            <ul className="grid gap-6 text-gray-500">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <span>123 Smith Street, Durban Central, 4001, South Africa</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>+27 61 922 9670</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>info@airflowpro.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AirFlow Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="font-sans bg-slate-950 text-gray-100 selection:bg-cyan-500/30">
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Services />
        <WhyChooseUs />
        <Reviews />
        <ServiceAreas />
        <News />
      </main>
      <Footer />
      
      {/* Floating CTA for Mobile Accessibility */}
      <a 
        href={WHATSAPP_LINK}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl md:hidden flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default App;

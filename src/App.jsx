import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, ArrowRight, Check, Award, Clock, Shield, Users, Wind, Snowflake, Flame, Fan, Droplets, Building2, MessageCircle, Facebook, Instagram, Linkedin, Twitter, Calendar, Tag } from 'lucide-react';

// WhatsApp Configuration
const WHATSAPP_NUMBER = "27619229670";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Smooth Scroll Component
const SmoothScroll = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  return null;
};

// Animation Hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// New Custom Unique Logo
const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Abstract Snowflake/Flame Shield Logo */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg filter">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
        </defs>
        {/* Shield Background */}
        <path d="M50 5 L90 20 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V20 L50 5 Z" fill="url(#logoGradient)" />
        {/* Flame Element (Orange) */}
        <path d="M50 80 C50 80 65 70 65 55 C65 45 58 40 58 40 C58 40 62 48 58 55 C58 55 58 35 50 25 C42 35 42 55 42 55 C38 48 42 40 42 40 C42 40 35 45 35 55 C35 70 50 80 50 80 Z" fill="#f97316" className="animate-pulse" />
        {/* Frost Overlay */}
        <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4 4" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl font-black text-white leading-none tracking-tighter italic">
        AIR<span className="text-cyan-400">FLOW</span>
      </h1>
      <div className="flex items-center gap-1">
        <div className="h-0.5 w-4 bg-orange-500 rounded-full"></div>
        <p className="text-[10px] text-gray-300 font-bold tracking-[0.3em] uppercase">Pro Services</p>
      </div>
    </div>
  </div>
);

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'News', href: '#news' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors relative group text-sm font-bold tracking-wide uppercase"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all font-bold tracking-wide">
            Get a Quote
          </a>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 bg-slate-900 absolute left-0 right-0 px-4 shadow-xl">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-300 hover:text-cyan-400 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="block w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg text-center font-bold">
              Get a Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop" 
          alt="HVAC Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-slate-950/80 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl animate-fadeIn">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-sm tracking-wider mb-6 backdrop-blur-sm uppercase">
            ❄️ #1 Rated HVAC Team in Durban
          </div>
          <h1 className="text-5xl lg:text-8xl font-black mb-6 leading-tight tracking-tight text-white">
            MASTER YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">INDOOR CLIMATE</span>
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8 max-w-xl leading-relaxed">
            Premium residential & commercial heating, cooling & ventilation solutions. Experience absolute comfort with our 24/7 expert support system.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: Clock, text: '24/7 Support' },
              { icon: Award, text: 'Certified Pros' },
              { icon: Shield, text: 'Guaranteed Work' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                <item.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-gray-100">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all shadow-2xl shadow-orange-600/30 text-center">
              Get Free Quote
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5 text-green-400 group-hover:text-green-300" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
         <ChevronDown className="w-8 h-8 text-white/50" />
      </div>
    </section>
  );
};

// Trust Badges
const TrustBadges = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const badges = [
    { icon: Shield, title: 'Licensed & Insured', desc: 'Fully certified professionals' },
    { icon: Award, title: '15+ Years Experience', desc: 'Industry veterans' },
    { icon: Check, title: 'Warranty Guaranteed', desc: '100% satisfaction' },
    { icon: Users, title: 'Local HVAC Experts', desc: 'Community trusted' }
  ];

  return (
    <section ref={ref} className="py-16 bg-slate-900 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {badges.map((badge, i) => (
            <div
              key={i}
              className="text-center group hover:translate-y-[-5px] transition-transform duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-2xl mb-4 group-hover:bg-slate-700 border border-white/5 transition-colors shadow-lg shadow-black/20">
                <badge.icon className="w-10 h-10 text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{badge.title}</h3>
              <p className="text-gray-400 text-sm">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  // Updated with robust, correct images from Unsplash
  const services = [
    { 
      icon: Snowflake, 
      title: 'AC Installation', 
      desc: 'Expert split & ducted AC installation for homes and businesses.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      icon: Wind, 
      title: 'AC Repairs', 
      desc: 'Fast diagnostics and reliable repair services for all brands.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      icon: Flame, 
      title: 'Heating Systems', 
      desc: 'Complete heating solutions to keep you warm during winter.',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      icon: Fan, 
      title: 'Ventilation', 
      desc: 'Custom ventilation systems to improve air quality and circulation.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      icon: Droplets, 
      title: 'Duct Cleaning', 
      desc: 'Professional deep cleaning to remove allergens and dust.',
      image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      icon: Building2, 
      title: 'Commercial HVAC', 
      desc: 'Large-scale maintenance and installation for office buildings.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const handleBooking = (serviceTitle) => {
    const message = encodeURIComponent(`Hi, I'm interested in booking a service for: *${serviceTitle}*. Please let me know the next steps.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="services" ref={ref} className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">OUR PREMIUM SERVICES</h2>
          <p className="text-xl text-gray-400">Click any service card to book instantly via WhatsApp</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {services.map((service, i) => (
            <div
              key={i}
              onClick={() => handleBooking(service.title)}
              className="group bg-slate-900 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all cursor-pointer relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                 <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/0 transition-colors z-10 duration-500"></div>
                 <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl">
                    <service.icon className="w-6 h-6 text-cyan-400" />
                 </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-2">{service.desc}</p>
                
                <div className="flex items-center text-cyan-400 font-bold uppercase tracking-wide text-sm group-hover:gap-2 transition-all">
                  Book Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// News Section (NEW)
const News = () => {
  const [ref, isVisible] = useScrollAnimation();

  const newsItems = [
    {
      title: "Summer Maintenance Guide",
      date: "Oct 12, 2024",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070&auto=format&fit=crop",
      desc: "Prepare your AC for the Durban heat with these essential maintenance tips to ensure efficiency."
    },
    {
      title: "New Eco-Friendly Units",
      date: "Sep 28, 2024",
      category: "Product News",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop",
      desc: "We now stock the latest energy-saving inverter air conditioners that cut electricity costs by up to 40%."
    },
    {
      title: "The Importance of Air Quality",
      date: "Sep 15, 2024",
      category: "Health",
      image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?q=80&w=2070&auto=format&fit=crop",
      desc: "How regular filter cleaning and ventilation can significantly reduce allergens in your home."
    },
    {
      title: "Why Is My AC Leaking Water?",
      date: "Aug 30, 2024",
      category: "Troubleshooting",
      image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=2069&auto=format&fit=crop",
      desc: "Water leaks can damage your property. Discover the 3 most common causes and when to call a pro immediately."
    },
    {
      title: "Smart Thermostats Explained",
      date: "Aug 12, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2070&auto=format&fit=crop",
      desc: "Control your climate from your phone. We break down the top benefits of upgrading to a smart wifi system."
    },
    {
      title: "Commercial vs Residential HVAC",
      date: "Jul 25, 2024",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
      desc: "Understanding the key differences in maintenance schedules for large business premises versus private homes."
    },
    {
      title: "5 Signs You Need a Tune-Up",
      date: "Jul 10, 2024",
      category: "Maintenance",
      image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=1905&auto=format&fit=crop",
      desc: "Strange noises? Weak airflow? Here are the red flags that indicate your system is struggling and needs attention."
    },
    {
      title: "Going Green with HVAC",
      date: "Jun 28, 2024",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
      desc: "Eco-friendly practices and modern refrigerants that lower your carbon footprint while keeping your home comfortable."
    }
  ];

  return (
    <section id="news" ref={ref} className="py-24 bg-slate-900 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">News & Updates</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">LATEST FROM THE TEAM</h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors">
            View All Posts <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {newsItems.map((item, i) => (
            <div key={i} className="group cursor-pointer bg-slate-800 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
              <div className="h-48 relative overflow-hidden flex-shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-2">
                  <Tag className="w-3 h-3 text-orange-500" /> {item.category}
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                  <Calendar className="w-3 h-3" /> {item.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{item.desc}</p>
                <span className="text-cyan-500 text-sm font-bold uppercase tracking-wide group-hover:underline mt-auto">Read Article</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us
const WhyChooseUs = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const reasons = [
    'Transparent pricing with no hidden fees',
    'Fast turnaround and same-day service',
    'Highly skilled and certified technicians',
    'Customer-first approach every time',
    'Eco-friendly and energy-efficient solutions'
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/10 group">
              <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                alt="HVAC Technician" 
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8 z-20">
                <p className="text-white font-bold text-lg">Expert Technicians</p>
                <p className="text-cyan-400 text-sm">Dedicated to perfection</p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="text-cyan-500 font-bold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6">WHY CHOOSE AIRFLOW?</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We're not just fixing ACs; we're ensuring your environment is perfect. With over a decade of experience in Durban, we bring reliability, expertise, and a friendly face to every job.
            </p>
            <ul className="space-y-6">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-500 transition-colors">
                    <Check className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Process Section
const Process = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const steps = [
    { num: '01', title: 'Contact Us', desc: 'Reach out via WhatsApp for a quick response.' },
    { num: '02', title: 'Free Quote', desc: 'We assess your needs and give a transparent price.' },
    { num: '03', title: 'Expert Job', desc: 'Our certified team completes the work efficiently.' },
    { num: '04', title: 'Support', desc: 'We don’t leave until you are perfectly comfortable.' }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">HOW IT WORKS</h2>
          <p className="text-xl text-gray-400">Simple, straightforward process</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {steps.map((step, i) => (
            <div key={i} className="relative" style={{ transitionDelay: `${i * 150}ms` }}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-900 to-transparent z-0"></div>
              )}
              <div className="text-center group relative z-10">
                <div className="w-24 h-24 mx-auto bg-slate-900 border-2 border-cyan-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                  <span className="text-3xl font-bold text-cyan-500">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Areas
const ServiceAreas = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const areas = [
    'Durban CBD', 'Umhlanga', 'Ballito', 'Pinetown',
    'Phoenix', 'Westville', 'Kloof', 'Hillcrest',
    'Amanzimtoti', 'Chatsworth', 'Reservoir Hills', 'Newlands'
  ];

  return (
    <section id="areas" ref={ref} className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">SERVICE AREAS</h2>
          <p className="text-xl text-gray-400">Proudly serving Durban and surrounding areas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-8">Where We Operate</h3>
            <div className="grid grid-cols-2 gap-4">
              {areas.map((area, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors group">
                  <MapPin className="w-5 h-5 text-cyan-600 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-slate-800 p-2 rounded-2xl border border-white/10 shadow-2xl h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110945.1816278378!2d30.8599843!3d-29.8586804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7aa0b8b3c1719%3A0xd92d8d0d21d34fc7!2sDurban%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                title="Service Area Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const Reviews = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const reviews = [
    { name: 'Sarah M.', location: 'Umhlanga', rating: 5, text: 'Excellent service! The team was professional, arrived on time, and our AC is working perfectly. Highly recommend AirFlow Pro!' },
    { name: 'John D.', location: 'Ballito', rating: 5, text: 'Fast response for our emergency repair. The technician was knowledgeable and fixed the problem quickly. Great service!' },
    { name: 'Linda P.', location: 'Durban CBD', rating: 5, text: 'Professional installation of our new HVAC system. Clean work, fair pricing, and excellent customer service throughout.' },
    { name: 'Mike R.', location: 'Pinetown', rating: 5, text: 'Been using AirFlow Pro for maintenance for 3 years. Always reliable, always professional. Best in the business!' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">CLIENT STORIES</h2>
          <p className="text-xl text-cyan-400">Don't just take our word for it</p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-slate-800/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center ring-8 ring-slate-900">
               <span className="text-4xl text-white">❝</span>
            </div>
            
            <div className="flex justify-center mb-6 mt-4">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-0.5" />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-gray-200 italic">
              "{reviews[currentIndex].text}"
            </p>
            <div className="text-center border-t border-white/10 pt-6">
              <p className="font-bold text-lg text-white">{reviews[currentIndex].name}</p>
              <p className="text-cyan-400 text-sm">{reviews[currentIndex].location}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-cyan-500 w-8' : 'bg-slate-700 w-3 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    { q: 'How long does installation take?', a: 'Most residential installations take 4-8 hours. Commercial projects vary by size but we provide accurate timelines during the quote process.' },
    { q: 'Do you offer emergency repairs?', a: 'Yes! We provide 24/7 emergency HVAC services. Contact us anytime via phone or WhatsApp for urgent repairs.' },
    { q: 'What brands do you service?', a: 'We service all major HVAC brands including Daikin, LG, Samsung, Mitsubishi, Carrier, and more.' },
    { q: 'Do you provide warranties?', a: 'Absolutely! All our installations come with manufacturer warranties plus our own workmanship guarantee for your peace of mind.' },
    { q: 'How often should I service my HVAC system?', a: 'We recommend professional servicing every 6-12 months to maintain efficiency and prevent costly repairs.' }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">FAQ</h2>
          <p className="text-xl text-gray-400">Common questions answered</p>
        </div>

        <div className={`max-w-3xl mx-auto space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-800 transition-colors"
              >
                <span className="text-left font-semibold text-gray-200">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 py-5 bg-slate-900 border-t border-white/5">
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Emergency Banner
const EmergencyBanner = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-red-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] animate-pulse"></div>
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-pulse">
          <Clock className="w-12 h-12" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">HVAC Emergency?</h2>
        <p className="text-xl mb-10 text-orange-100 font-medium">We are available 24/7. Don't wait!</p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-xl font-bold hover:scale-105 transition-all shadow-2xl animate-bounce"
        >
          <Phone className="w-6 h-6" />
          Call Now
        </a>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    const whatsappMessage = `Hello, I'd like a quote for HVAC services.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
    window.open(`${WHATSAPP_LINK}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">GET YOUR FREE QUOTE</h2>
          <p className="text-xl text-gray-400">Let's discuss your HVAC needs today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-white/5">
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">Service Needed</label>
                <select
                  name="service"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="AC Installation">AC Installation</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Heating">Heating Systems</option>
                  <option value="Ventilation">Ventilation</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Emergency">Emergency Service</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                  placeholder="Tell us about your needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:scale-[1.02] transition-all shadow-lg shadow-cyan-900/20"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-cyan-700 to-blue-800 rounded-2xl p-10 text-white h-full flex flex-col justify-center relative overflow-hidden">
              <h3 className="text-3xl font-bold mb-10 relative z-10">Contact Information</h3>
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Phone</p>
                    <p className="text-cyan-100 text-lg tracking-wide">+27 61 922 9670</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Email</p>
                    <p className="text-cyan-100 text-lg">info@airflowpro.co.za</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Service Area</p>
                    <p className="text-cyan-100 text-lg">Durban & Surrounding Areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo className="mb-6" />
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for all HVAC needs in Durban. Quality service, reliable technicians, and fair pricing guaranteed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-600 hover:border-cyan-600 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'News', 'Reviews', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {['AC Installation', 'AC Repair', 'Heating Systems', 'Ventilation', 'Duct Cleaning', 'Commercial HVAC'].map(service => (
                <li key={service}>
                  <a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                <span>+27 61 922 9670</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                <span>Durban, KZN, SA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AirFlow Pro HVAC. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all border border-white/5"
          >
            <ChevronUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 hover:scale-110 transition-all animate-bounce"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
    </div>
  );
};

// Popup Modal
const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform scale-100 animate-scaleIn">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">New Customer Special!</h3>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4">15% OFF</p>
          <p className="text-gray-400 mb-8">
            Book your first AC service or installation this week and get an exclusive discount.
          </p>
          <a
            href={`${WHATSAPP_LINK}?text=I want to claim the 15% OFF discount!`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all mb-4 shadow-lg shadow-cyan-900/20"
          >
            Claim Your Discount
          </a>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  
  // Dynamic Favicon Setup
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    // This encoded SVG matches the new Logo component
    link.href = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwNmI2ZDQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzYjgyZjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTAgNSBMOTAgMjAgVjUwIEM5MCA3NSA1MCA5NSA1MCA5NSBDNTAgOTUgMTAgNzUgMTAgNTAgVjIwIEw1MCA1IFoiIGZpbGw9InVybCgjZykiLz48cGF0aCBkPSJNNTAgODAgQzUwIDgwIDY1IDcwIDY1IDU1IEM2NSA0NSA1OCA0MCA1OCA0MCBDNTggNDAgNjIgNDggNTggNTUgQzU4IDU1IDU4IDM1IDUwIDI1IEM0MiAzNSA0MiA1NSA0MiA1NSBDMzggNDggNDIgNDAgNDIgNDAgQzQyIDQwIDM1IDQ1IDM1IDU1IEMzNSA3MCA1MCA4MCA1MCA4MCBaIiBmaWxsPSIjZjk3MzE2Ii8+PC9zdmc+`;
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = "AirFlow Pro - HVAC Services Durban";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white">
      <SmoothScroll />
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <News />
      <WhyChooseUs />
      <Process />
      <ServiceAreas />
      <Reviews />
      <FAQ />
      <EmergencyBanner />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <PopupModal />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}

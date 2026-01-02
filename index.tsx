import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LockShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const BoltIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ChatBubbleIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

// New Icons for InvisibleCostSection
const ProhibitionIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const BrainIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const WarningTriangleIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// --- Logo ---
const LysannaLogo = ({ className = "w-8 h-8" }) => (
  <div className={`relative flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg shadow-teal-500/20 ${className}`}>
    <SparklesIcon className="w-3/5 h-3/5 text-white" />
  </div>
);

// --- Background Components ---

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
    {/* Global gradient base */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-50/10 via-white to-indigo-50/10"></div>
    
    {/* Moving Orbs - Slower and more subtle */}
    <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-teal-200/20 rounded-full blur-[120px] animate-blob mix-blend-multiply opacity-50"></div>
    <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply opacity-50"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[800px] bg-pink-100/30 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply opacity-40"></div>

    {/* Subtle Beam Effect */}
    <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -inset-[50%] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-12 animate-beam pointer-events-none"></div>
    </div>
  </div>
);

// --- Animation Component ---
function RevealOnScroll({ children, className = "", delay = 0 }: { children?: React.ReactNode; className?: string; delay?: number; key?: React.Key }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- Sections ---

function Header({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <LysannaLogo className="w-9 h-9" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Lysanna<span className="text-teal-600">.ai</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#demo" className="text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-full transition-all duration-300">Así es Lysanna</a>
          <a href="#emotional-resonance" className="hover:text-teal-600 transition-colors duration-300">El Reto</a>
          <a href="#vision" className="hover:text-teal-600 transition-colors duration-300">Nuestra Visión</a>
          <a href="#privacy" className="hover:text-teal-600 transition-colors duration-300">Seguridad</a>
        </div>

        <button 
          onClick={onJoinWaitlist}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Acceso Prioritario
        </button>
      </div>
    </nav>
  );
}

function Hero({ onJoinWaitlist }: { onJoinWaitlist: (email: string, name: string) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onJoinWaitlist(email, name);
  };

  return (
    <header className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
      {/* Soft gradient bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Optional: Small pill for "Insider is launching soon" feel */}
        <div className="animate-fade-in-up [animation-delay:0ms] inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 hover:bg-slate-200 transition-colors cursor-default">
             <SparklesIcon className="w-3 h-3 text-teal-500" />
             <span>Próximamente</span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-in-up [animation-delay:100ms] text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
          Escuchas a otros cada día.<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
             Pero, ¿quién te cuida a ti?
          </span>
        </h1>

        {/* H2 */}
        <h2 className="animate-fade-in-up [animation-delay:200ms] text-2xl md:text-3xl font-bold text-slate-900 mb-10 max-w-3xl leading-tight">
          Lysanna escucha y escribe por ti, para que tú puedas estar de verdad con tu paciente.
        </h2>

        {/* CTA Section - Minimalist & High Conversion */}
        <div className="animate-fade-in-up [animation-delay:300ms] w-full max-w-lg relative z-20">
           {/* Text above CTA */}
           <div className="mb-6">
               <h3 className="text-lg font-bold text-slate-900">Apúntate a la lista de espera</h3>
               <p className="text-slate-500 text-sm mt-1">Sé de los primeros en utilizar Lysanna y ayúdanos a construirla contigo.</p>
           </div>

           {/* Input & Button */}
           <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  className="w-full px-4 py-3.5 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input 
                  type="email" 
                  placeholder="tu@consulta.com" 
                  className="w-full px-4 py-3.5 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium text-slate-900 outline-none"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Unirme</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
             </form>
           </div>

           {/* Trust Pills */}
           <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> Gratis</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> Sin tarjeta</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> Privacidad total</span>
           </div>
        </div>

        {/* Floating Benefits Labels */}
        <div className="animate-fade-in-up [animation-delay:400ms] mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm md:text-base font-semibold text-slate-800">Menos carga mental</span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <span className="text-sm md:text-base font-semibold text-slate-800">Notas clínicas claras</span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm md:text-base font-semibold text-slate-800">Presencia plena en cada sesión</span>
          </div>
        </div>

        {/* Floating Icons / Trust Signals - Keeping them low profile as a footer to the hero */}
        <div className="animate-fade-in-up [animation-delay:500ms] mt-24 flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-40 hover:opacity-80 transition-opacity duration-500 grayscale">
           {[
             { icon: <LockShieldIcon className="w-4 h-4"/>, text: "Privacidad clínica" },
             { icon: <BrainIcon className="w-4 h-4"/>, text: "Diseño experto" },
             { icon: <CheckIcon className="w-4 h-4"/>, text: "Claridad SOAP" },
             { icon: <LockShieldIcon className="w-4 h-4"/>, text: "Seguridad por diseño" },
           ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 text-[10px] font-bold tracking-wide uppercase">
                 {item.icon}
                 <span>{item.text}</span>
              </div>
           ))}
        </div>

      </div>
    </header>
  );
}

function InvisibleCostSection() {
  return (
    <section className="py-24 md:py-28 relative z-10 bg-gradient-to-b from-white via-blue-50/30 to-blue-50/40">
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50/20 to-transparent pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll className="text-center mb-24">
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">El coste invisible de documentar</h2>
           <h3 className="text-2xl md:text-3xl font-bold text-slate-900 max-w-3xl mx-auto leading-tight mb-2">
             El burnout del terapeuta no empieza en la sesión.
           </h3>
           <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 max-w-3xl mx-auto leading-tight">
             Empieza con las notas, los correos y la carga mental.
           </h3>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
           {/* Card 1 */}
           <RevealOnScroll delay={0} className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_0_rgba(59,130,246,0.08)] hover:border-blue-200/60 transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-[0_1px_2px_0_rgba(59,130,246,0.1)]">
                 <ProhibitionIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Desconexión en sesión</h3>
              <p className="text-slate-600 leading-relaxed font-light text-[15px] md:text-base">
                "Si tomo notas, me desconecto y el paciente lo nota. Si no las tomo, temo olvidar detalles vitales para su evolución."
              </p>
           </RevealOnScroll>

           {/* Card 2 */}
           <RevealOnScroll delay={100} className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_0_rgba(59,130,246,0.08)] hover:border-blue-200/60 transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-[0_1px_2px_0_rgba(59,130,246,0.1)]">
                 <BrainIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Fatiga mental post-sesión</h3>
              <p className="text-slate-600 leading-relaxed font-light text-[15px] md:text-base">
                Terminas el día exhausto, con 6-10 notas pendientes por rehacer en tu cabeza. Te llevas a tus pacientes a casa cada noche.
              </p>
           </RevealOnScroll>

           {/* Card 3 */}
           <RevealOnScroll delay={200} className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_0_rgba(59,130,246,0.08)] hover:border-blue-200/60 transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-[0_1px_2px_0_rgba(59,130,246,0.1)]">
                 <WarningTriangleIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Inseguridad administrativa</h3>
              <p className="text-slate-600 leading-relaxed font-light text-[15px] md:text-base">
                Información dispersa en libretas, audios y hojas sueltas. El riesgo de brechas de confidencialidad o errores clínicos te preocupa.
              </p>
           </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function EmotionalResonanceSection() {
  const cards = [
    {
      title: "Sobrecarga mental constante",
      text: "Notas, resúmenes, informes, recordatorios.\nUna lista invisible que nunca se vacía del todo."
    },
    {
      title: "Presencia fragmentada en sesión",
      text: "Escuchar con el corazón\nmientras la mente intenta no olvidar nada."
    },
    {
      title: "Fatiga emocional silenciosa",
      text: "Sostener historias ajenas sin espacio real\npara procesarlas después."
    },
    {
      title: "Alejarse de la vocación",
      text: "Menos acompañar.\nMás gestionar.\nMás escribir sobre la terapia\nque estar dentro de ella."
    }
  ];

  return (
    <section id="emotional-resonance" className="py-16 md:py-20 -mt-16 md:-mt-20 relative overflow-hidden z-10 min-h-screen md:min-h-[100vh] flex items-center bg-gradient-to-b from-blue-50/40 via-blue-50/20 to-white/50">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none z-0"></div>
      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] opacity-50"></div>
         <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] opacity-40"></div>
      </div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
         {/* Section Eyebrow - Centered Above Entire Section */}
         <RevealOnScroll className="text-center mb-12">
            <div className="inline-block bg-white px-5 py-2 rounded-full border border-blue-100 shadow-sm">
               <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  La realidad invisible
               </span>
            </div>
         </RevealOnScroll>

         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column: Visual Anchor - Header Block */}
            <RevealOnScroll className="relative">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  El mayor peso del terapeuta<br />
                  <span className="text-slate-400 font-medium">no es el paciente.</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-600">Es lo que carga después.</span>
               </h2>

               <div className="text-lg md:text-xl text-slate-600 leading-relaxed space-y-6 font-light bg-white rounded-3xl p-8 md:p-10 border border-blue-100/60 shadow-[0_4px_20px_rgba(59,130,246,0.08)]">
                  <p className="border-l-4 border-blue-200 pl-6 italic">
                     "Escuchar con atención plena. Sostener historias difíciles. Recordar cada matiz clínico."
                  </p>
                  <p className="font-medium text-slate-800">
                     Cada sesión deja una huella administrativa.<br />
                     <span className="text-blue-600">Lysanna está aquí para aliviarla.</span>
                  </p>
               </div>

               {/* Closing statement - moved to left column bottom */}
               <div className="mt-12 pt-8 border-t border-blue-100">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                     No es falta de vocación.<br />
                     <span className="text-slate-400 italic font-serif">Es exceso de carga.</span>
                  </p>
               </div>
            </RevealOnScroll>

            {/* Right Column: All Pain Points - Structured Vertical Layout */}
            <RevealOnScroll delay={100} className="space-y-4">
               {cards.map((card, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 80} className="group">
                     <div className="bg-white p-6 md:p-7 rounded-2xl border border-blue-100/60 shadow-[0_2px_8px_rgba(59,130,246,0.06)] hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)] hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10 flex items-start gap-4">
                           {/* Number badge */}
                           <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm shadow-[0_1px_3px_rgba(59,130,246,0.2)] group-hover:bg-blue-100 transition-colors">
                              {idx + 1}
                           </div>
                           
                           <div className="flex-1 min-w-0">
                              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                 {card.title}
                              </h3>
                              
                              <div className="w-6 h-0.5 bg-blue-200 rounded-full mb-3 group-hover:w-10 group-hover:bg-blue-400 transition-all duration-300"></div>
                              
                              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm md:text-base font-light">
                                 {card.text}
                              </p>
                           </div>
                        </div>
                     </div>
                  </RevealOnScroll>
               ))}
            </RevealOnScroll>
         </div>
      </div>
    </section>
  );
}

// --- NEW TRANSFORMATION SECTION ---
function TransformationSection() {
  return (
    <section className="py-20 md:py-28 -mt-16 md:-mt-20 bg-gradient-to-b from-white/50 via-white/80 to-white/90 backdrop-blur-xl relative overflow-hidden z-10">
       {/* Top fade transition */}
       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0"></div>
       {/* Background Breath */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/60 to-transparent opacity-80"></div>
          <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-teal-50/40 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '8s'}}></div>
       </div>
       {/* Bottom fade transition */}
       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/40 to-transparent pointer-events-none z-0"></div>

       <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header Block - Centered, Compact */}
          <RevealOnScroll className="text-center mb-10 md:mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
               <SparklesIcon className="w-3 h-3" />
               Cuando la tecnología cuida del terapeuta
             </div>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-4">
                Lysanna <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">cuida de ti</span>, mientras tú cuidas de los demás.
             </h2>
             <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                No trabaja en tu lugar, trabaja para que puedas estar presente de verdad.
             </p>
          </RevealOnScroll>

          {/* Zig-Zag Flow Container */}
          <div className="relative max-w-4xl mx-auto">
             {/* Flow Line - Connecting all cards with gentle emphasis at end */}
             <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[85%] bg-gradient-to-b from-transparent via-slate-300/50 to-slate-300/60"></div>
                <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-b from-slate-300/60 via-teal-300/40 to-transparent"></div>
             </div>

             {/* Card 1: Escucha Plena - Left of center */}
             <RevealOnScroll delay={0} className="group mb-2 md:mb-3 relative z-10">
                <div className="w-full max-w-md md:mr-auto md:ml-0 bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(13,148,136,0.1)] transition-all duration-700 hover:-translate-y-1 relative overflow-hidden flex items-center gap-5">
                   <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Escucha plena en cada sesión</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         El "Modo Escucha Pura" captura cada palabra mientras tú te olvidas de la pantalla.
                      </p>
                   </div>
                   {/* Compact Visual: Sound Wave */}
                   <div className="flex-shrink-0 w-20 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-teal-50/30 transition-colors duration-700">
                      <div className="flex gap-1 items-center">
                         {[...Array(8)].map((_, i) => (
                           <div key={i} className="w-1.5 bg-teal-400 rounded-full animate-[bounce_1s_infinite]" style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s`, animationDuration: '1.5s' }}></div>
                         ))}
                      </div>
                   </div>
                </div>
             </RevealOnScroll>

             {/* Card 2: Notas Clínicas - Right of center */}
             <RevealOnScroll delay={100} className="group mb-2 md:mb-3 md:-mt-3 relative z-10">
                <div className="w-full max-w-md md:ml-auto md:mr-0 bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-5">
                   <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Notas SOAP automáticas</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         Transforma 50 minutos de diálogo en un informe estructurado y preciso.
                      </p>
                   </div>
                   {/* Compact Visual: Document */}
                   <div className="flex-shrink-0 w-16 h-12 bg-slate-50 rounded-xl p-2 border border-slate-100 group-hover:border-indigo-100 transition-colors">
                      <div className="space-y-1">
                         <div className="h-1 bg-indigo-200 rounded w-1/3"></div>
                         <div className="h-1 bg-slate-200 rounded w-full"></div>
                         <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                      </div>
                   </div>
                </div>
             </RevealOnScroll>

             {/* Card 3: Memoria Emocional - Left of center */}
             <RevealOnScroll delay={200} className="group mb-2 md:mb-3 md:-mt-3 relative z-10">
                <div className="w-full max-w-md md:mr-auto md:ml-0 bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-5">
                   <div className="flex-shrink-0 w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Memoria emocional</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         Nada se pierde. Frases clave, emociones sutiles y patrones recurrentes quedan registrados.
                      </p>
                   </div>
                   {/* Compact Visual: Connected Nodes */}
                   <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="flex items-center gap-1">
                         <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                         <div className="w-6 h-px bg-rose-200"></div>
                         <div className="w-3 h-3 bg-rose-500 rounded-full shadow-md shadow-rose-200"></div>
                         <div className="w-6 h-px bg-rose-200"></div>
                         <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </RevealOnScroll>

             {/* Card 4: Orden y Claridad - Right of center */}
             <RevealOnScroll delay={300} className="group mb-2 md:mb-3 md:-mt-3 relative z-10">
                <div className="w-full max-w-md md:ml-auto md:mr-0 bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-5">
                   <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Orden y claridad total</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         Toda la información clínica centralizada y accesible en segundos.
                      </p>
                   </div>
                </div>
             </RevealOnScroll>
             
             {/* Card 5: Cuidado del Terapeuta - Left of center */}
             <RevealOnScroll delay={400} className="group mb-2 md:mb-3 md:-mt-3 relative z-10">
                <div className="w-full max-w-md md:mr-auto md:ml-0 bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-5">
                   <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Tu propio cuidado</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         Lysanna reduce tu fatiga por compasión encargándose de la carga cognitiva pesada.
                      </p>
                   </div>
                </div>
             </RevealOnScroll>

             {/* Card 6: Privacidad - Right of center */}
             <RevealOnScroll delay={500} className="group mb-2 md:mb-3 md:-mt-3 relative z-10">
                <div className="w-full max-w-md md:ml-auto md:mr-0 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 p-7 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 flex items-center gap-5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                   <div className="flex-shrink-0 w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-700 relative z-10">
                      <LockShieldIcon className="w-6 h-6" />
                   </div>
                   <div className="flex-1 min-w-0 relative z-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Privacidad sin concesiones</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                         Infraestructura segura, cifrado militar y control absoluto.
                      </p>
                   </div>
                   <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center relative">
                         <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                            <CheckIcon className="w-5 h-5" />
                         </div>
                         <div className="absolute top-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></div>
                      </div>
                   </div>
                </div>
             </RevealOnScroll>
          </div>

          {/* Closing Statement */}
          <RevealOnScroll className="text-center mt-8 md:mt-10 relative z-10">
             <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                Menos tareas.<br />
                Más presencia.<br />
                <span className="text-teal-600 italic font-serif">Más humanidad.</span>
             </p>
          </RevealOnScroll>
       </div>
    </section>
  );
}

// --- NEW DEMO SECTION ---
function DemoSection() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'session' | 'note'>('dashboard');

  return (
    <section id="demo" className="py-16 md:py-20 -mt-16 md:-mt-20 bg-gradient-to-b from-slate-50/40 via-slate-50/80 to-slate-50/60 backdrop-blur-md overflow-hidden relative z-10">
      {/* Top Transition Fade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 via-slate-50/60 to-transparent pointer-events-none z-0"></div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            App Preview
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Tu consulta, ahora fluye</h2>
          <p className="text-lg text-slate-600">
            Hemos diseñado Lysanna con modo oscuro para reducir la fatiga visual, tipografías claras para lectura rápida y flujos que requieren cero aprendizaje.
          </p>
        </RevealOnScroll>

        {/* Tab Switcher */}
        <RevealOnScroll delay={200} className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'session', label: 'Sesión Activa' },
            { id: 'note', label: 'Nota Clínica' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:-translate-y-0.5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </RevealOnScroll>

        {/* Mockup Container */}
        <RevealOnScroll delay={400} className="relative max-w-5xl mx-auto">
          {/* Frame */}
          <div className="relative bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-slate-800 p-2 md:p-4 overflow-hidden aspect-[4/3] md:aspect-[16/9] transition-all duration-500">
            
            {/* Dark UI Background */}
            <div className="absolute inset-0 bg-[#0f172a] rounded-[1.8rem] overflow-y-auto custom-scrollbar">
              
              {/* === DASHBOARD VIEW === */}
              {activeTab === 'dashboard' && (
                <div className="p-6 md:p-8 animate-fade-in-up">
                  <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 p-[2px]">
                          <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=0D9488&color=fff" alt="Dr Silva" className="rounded-full w-full h-full border-2 border-slate-900" />
                        </div>
                        <div>
                           <div className="text-slate-400 text-xs uppercase tracking-wider">Buenos días,</div>
                           <h3 className="text-white text-xl font-bold">Dr. Silva</h3>
                        </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                     </div>
                  </div>

                  {/* Next Session Card */}
                  <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                           <img src="https://ui-avatars.com/api/?name=Ana+Garcia&background=6366f1&color=fff" className="w-12 h-12 rounded-xl" />
                           <div>
                              <h4 className="text-white font-bold text-lg">Ana García</h4>
                              <span className="text-teal-400 text-sm">Ansiedad Generalizada</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-white font-bold text-xl">10:00</div>
                           <div className="text-slate-500 text-sm">AM</div>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                           <PlayIcon className="w-4 h-4" /> Iniciar Sesión
                        </button>
                        <button className="px-4 bg-slate-700 rounded-xl text-slate-300 hover:bg-slate-600 transition-colors">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </button>
                     </div>
                  </div>

                  {/* List */}
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-white font-bold">Resumen anterior</h4>
                     <span className="text-blue-400 text-sm cursor-pointer hover:text-blue-300 transition-colors">Ver todo</span>
                  </div>
                  <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30 hover:border-slate-600 transition-colors cursor-pointer">
                     <div className="flex justify-between mb-2">
                        <div className="flex gap-3 items-center">
                           <img src="https://ui-avatars.com/api/?name=Carlos+Ruiz&background=334155&color=fff" className="w-8 h-8 rounded-full" />
                           <div>
                              <div className="text-white text-sm font-bold">Carlos Ruiz</div>
                              <div className="text-slate-500 text-xs">Hoy, 09:00 AM</div>
                           </div>
                        </div>
                        <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold h-fit">PROCESADO</div>
                     </div>
                     <p className="text-slate-400 text-sm line-clamp-2">
                        El paciente reportó una mejora en los patrones de sueño, aunque persiste el estrés laboral. Se identificaron nuevos desencadenantes...
                     </p>
                  </div>
                </div>
              )}

              {/* === SESSION VIEW === */}
              {activeTab === 'session' && (
                 <div className="h-full flex flex-col items-center justify-center p-8 animate-fade-in-up relative">
                    <div className="absolute top-6 left-6 text-slate-500 text-sm">9:41 AM</div>
                    <div className="absolute top-6 right-6 flex gap-2">
                       <div className="w-4 h-4 rounded-full bg-slate-700"></div>
                       <div className="w-4 h-4 rounded-full bg-slate-700"></div>
                    </div>

                    {/* Animated Circle */}
                    <div className="relative mb-12">
                       <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping"></div>
                       <div className="absolute inset-[-20px] bg-blue-600/10 rounded-full animate-pulse"></div>
                       <div className="relative w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center shadow-2xl shadow-blue-900/50">
                          <div className="flex gap-1 items-end h-8">
                             <div className="w-1 bg-blue-500 h-4 animate-[bounce_1s_infinite]"></div>
                             <div className="w-1 bg-blue-500 h-8 animate-[bounce_1.2s_infinite]"></div>
                             <div className="w-1 bg-blue-500 h-5 animate-[bounce_0.8s_infinite]"></div>
                             <div className="w-1 bg-blue-500 h-7 animate-[bounce_1.1s_infinite]"></div>
                          </div>
                       </div>
                    </div>

                    <h3 className="text-white text-2xl font-bold mb-2">Lysanna está escuchando</h3>
                    <p className="text-slate-400 mb-8">Tú solo escucha</p>

                    <div className="bg-slate-800 px-6 py-2 rounded-full border border-slate-700 text-blue-400 font-mono text-xl mb-12">
                       00:14:23
                    </div>

                    <div className="flex gap-4 w-full max-w-xs">
                       <button className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors">Pausar</button>
                       <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors">Terminar</button>
                    </div>
                 </div>
              )}

              {/* === NOTE VIEW === */}
              {activeTab === 'note' && (
                 <div className="p-6 md:p-8 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                       <div>
                          <h3 className="text-white font-bold text-lg">María González</h3>
                          <div className="text-slate-500 text-xs">Sesión #14 • En línea</div>
                       </div>
                       <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">Editar</button>
                    </div>

                    {/* Insight Card */}
                    <div className="bg-slate-800/40 rounded-xl p-4 mb-6 border border-slate-700">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="bg-indigo-500/20 p-1 rounded text-indigo-400"><SparklesIcon className="w-4 h-4"/></div>
                          <span className="text-white font-bold text-sm">Insight Clave</span>
                       </div>
                       <p className="text-slate-300 text-sm">La paciente muestra patrones de evitación al hablar de su entorno laboral. Se recomienda profundizar.</p>
                    </div>

                    {/* SOAP Sections */}
                    <div className="space-y-4">
                       <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-2 mb-3">
                             <span className="bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded text-xs font-bold border border-blue-900">S</span>
                             <span className="text-blue-400 text-xs font-bold uppercase">Subjetivo</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">
                             La paciente reporta sentirse "abrumada" por las nuevas responsabilidades. Menciona dificultades para conciliar el sueño (insomnio inicial) al menos 3 noches esta semana.
                          </p>
                       </div>
                       
                       <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-2 mb-3">
                             <span className="bg-indigo-900/50 text-indigo-400 px-2 py-0.5 rounded text-xs font-bold border border-indigo-900">O</span>
                             <span className="text-indigo-400 text-xs font-bold uppercase">Objetivo</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">
                             Paciente orientada. Contacto visual intermitente al discutir temas laborales. Inquietud motora leve (manos).
                          </p>
                       </div>

                       <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 relative overflow-hidden hover:bg-slate-700/50 transition-colors">
                           {/* Gradient fade at bottom to imply scroll */}
                           <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-800 to-transparent"></div>
                          <div className="flex items-center gap-2 mb-3">
                             <span className="bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold border border-emerald-900">A</span>
                             <span className="text-emerald-400 text-xs font-bold uppercase">Análisis</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">
                             Síntomas consistentes con episodio de ansiedad reactiva...
                          </p>
                       </div>
                    </div>

                    <div className="mt-6">
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                           Confirmar y Guardar Nota
                        </button>
                    </div>
                 </div>
              )}

            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-[80px] opacity-20 -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-20 -z-10 animate-pulse"></div>
        </RevealOnScroll>
        
        <div className="text-center mt-8 text-slate-500 text-sm">
           Interfaz en modo oscuro para reducir la fatiga visual en sesiones largas.
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Notas SOAP Inteligentes",
      description: "Generación automática de notas con estructura clínica estándar.",
      icon: <SparklesIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Cifrado de Extremo a Extremo",
      description: "Tus datos y los de tus pacientes están protegidos con seguridad de nivel bancario.",
      icon: <LockShieldIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Personalización Total",
      description: "Adapta el estilo y formato de las notas a tu práctica clínica específica.",
      icon: <BoltIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Resúmenes de Sesión",
      description: "Obtén puntos clave y tareas pendientes al instante.",
      icon: <ChatBubbleIcon className="w-6 h-6 text-white" />
    }
  ];

  return (
    <section id="vision" className="py-16 md:py-20 -mt-16 md:-mt-20 bg-gradient-to-b from-white/60 via-white to-white relative z-10">
      {/* Top Transition Fade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50/80 via-white/90 to-white pointer-events-none z-0"></div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Potencia tu práctica clínica</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Herramientas diseñadas específicamente para terapeutas modernos.
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100} className="p-6 bg-slate-50 rounded-2xl hover:bg-teal-50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacy" className="py-16 md:py-20 -mt-16 md:-mt-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900 text-white relative overflow-hidden z-10">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 via-slate-900/80 to-slate-900 pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/40 to-transparent pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <RevealOnScroll className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-bold uppercase tracking-widest">
              <LockShieldIcon className="w-4 h-4" />
              Seguridad Primero
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Tus datos nunca salen de tu control.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Cumplimos estrictamente con RGPD y HIPAA. La información de tus pacientes es sagrada, por eso utilizamos encriptación AES-256 y no entrenamos nuestros modelos con tus datos privados.
            </p>
            <ul className="space-y-4">
              {[
                "Datos encriptados en reposo y en tránsito",
                "Sin entrenamiento de IA con tus notas",
                "Acceso biométrico opcional",
                "Servidores en la UE disponibles"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <CheckIcon className="w-5 h-5 text-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll className="flex-1" delay={200}>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl relative">
              <div className="absolute top-4 right-4 text-slate-600">
                <LockShieldIcon className="w-12 h-12 opacity-20" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="font-bold">Certificado SOC2</div>
                    <div className="text-xs text-slate-400">En proceso de auditoría</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  </div>
                  <div>
                    <div className="font-bold">Cumplimiento RGPD</div>
                    <div className="text-xs text-slate-400">Tus derechos garantizados</div>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <div>
                    <div className="font-bold">Anonimización</div>
                    <div className="text-xs text-slate-400">Procesamiento PII automático</div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Lysanna graba o guarda las sesiones?",
      answer: "Lysanna procesa el audio para generar tus notas y, por defecto, no lo conserva. Tú decides qué se guarda y qué no. El control es siempre tuyo."
    },
    {
      question: "¿Puedo usar Lysanna sin distraerme durante la sesión?",
      answer: "Sí. Lysanna está diseñada para trabajar en segundo plano, para que puedas estar plenamente presente con tu paciente."
    },
    {
      question: "¿Las notas que genera se pueden editar?",
      answer: "Sí. Lysanna crea un borrador clínico que puedes revisar, ajustar y personalizar antes de guardarlo."
    },
    {
      question: "¿Esto sustituye mi criterio como terapeuta?",
      answer: "No. Lysanna no toma decisiones clínicas. Te ayuda a organizar, recordar y ganar claridad, pero el criterio profesional sigue siendo tuyo."
    },
    {
      question: "¿Es adecuada para salud mental y datos sensibles?",
      answer: "Sí. La privacidad y la seguridad son pilares del producto. Lysanna se construye para ofrecer confianza real en contextos clínicos."
    },
    {
      question: "¿Sirve para sesiones presenciales y online?",
      answer: "Sí. Lysanna está pensada para adaptarse a la práctica real: sesiones presenciales y sesiones online."
    },
    {
      question: "¿Me ayudará a reducir el agotamiento y la carga mental?",
      answer: "Ese es el objetivo central. Lysanna reduce la carga administrativa y el ruido mental que provocan desgaste y burnout."
    },
    {
      question: "¿Cuándo podré probar Lysanna y cuánto costará?",
      answer: "Estamos en acceso inicial. Los primeros profesionales de la lista tendrán acceso prioritario y condiciones especiales."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 -mt-16 md:-mt-20 bg-gradient-to-b from-white via-white to-white/95 relative z-10">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900/5 via-white/90 to-white pointer-events-none z-0"></div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-teal-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="max-w-3xl mx-auto px-6">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
        </RevealOnScroll>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <RevealOnScroll key={idx} delay={idx * 50}>
              <div className="border border-slate-200 rounded-2xl hover:border-teal-200 transition-colors overflow-hidden">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-slate-900 flex-1">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onJoinWaitlist }: { onJoinWaitlist: (email: string, name: string) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) onJoinWaitlist(email, name);
  };

  return (
    <section className="py-16 md:py-20 -mt-16 md:-mt-20 bg-gradient-to-b from-teal-50/30 via-teal-50 to-teal-50 flex justify-center items-center px-6 relative z-10">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 via-teal-50/50 to-teal-50 pointer-events-none z-0"></div>
      <RevealOnScroll className="w-full max-w-4xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          {/* Top Gradient Line */}
          <div className="h-2 w-full bg-gradient-to-r from-teal-400 to-indigo-500"></div>

          <div className="p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Únete a la nueva era terapéutica
            </h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Estamos construyendo Lysanna de la mano de profesionales como tú. Sé el primero en probar la beta y obtén un 50% de descuento vitalicio.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto mb-6">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent block p-4 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Tu correo profesional"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent block p-4 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Obtener acceso</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> <span className="text-teal-600 font-semibold">Gratis</span></span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> <span className="text-teal-600 font-semibold">Sin tarjeta</span></span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-3 h-3 text-teal-500"/> <span className="text-teal-600 font-semibold">Privacidad total</span></span>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <LysannaLogo className="w-8 h-8" />
              <span className="text-xl font-bold text-slate-900">Lysanna<span className="text-teal-600">.ai</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              La IA que escucha por ti para que tú escuches de verdad.
              Construida en España con amor y rigor clínico para terapeutas de todo el mundo.
            </p>
            <div className="flex gap-4">
              {/* Twitter Icon */}
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Producto</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#emotional-resonance" className="hover:text-teal-600 transition-colors">El Problema</a></li>
              <li><a href="#demo" className="hover:text-teal-600 transition-colors">Así es Lysanna</a></li>
              <li><a href="#vision" className="hover:text-teal-600 transition-colors">La Solución</a></li>
              <li><a href="#privacy" className="hover:text-teal-600 transition-colors">Seguridad</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Lista de espera</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Uso Ético de la IA</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Lysanna Technology S.L. Todos los derechos reservados.</p>
          <p className="italic text-center md:text-right">Lysanna es una herramienta de asistencia administrativa y no sustituye el diagnóstico médico o psiquiátrico.</p>
        </div>
      </div>
    </footer>
  );
}

function SurveyModal({ onClose, email, name }: { onClose: () => void; email: string; name: string }) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-8 = questions, 9 = thank you
  const [answers, setAnswers] = useState<any>({});
  const [showOtherInput, setShowOtherInput] = useState<string | null>(null);

  const displayName = name || '{{Nombre}}';
  
  const questions = [
    {
      id: 1,
      question: "¿Cuál describe mejor tu perfil?",
      type: "single-choice",
      options: ["Psicólogo/a", "Psicoterapeuta", "Coach", "Psiquiatra", "Terapeuta (otra especialidad)", "Estudiante / en prácticas", "Otro"],
      microcopy: `Gracias, ${displayName}. Esto nos ayuda a hablar tu mismo idioma.`
    },
    {
      id: 2,
      question: "¿Cómo trabajas la mayoría de tus sesiones?",
      type: "single-choice",
      options: ["Presencial", "Online", "Mixto"],
      microcopy: "Cada forma de trabajar tiene sus propios retos. Queremos entender los tuyos."
    },
    {
      id: 3,
      question: "¿Cuántas sesiones haces en una semana típica?",
      type: "single-choice",
      options: ["1–5", "6–10", "11–20", "21–30", "30+"],
      microcopy: "Esto nos ayuda a diseñar Lysanna para tu ritmo real.",
      encouragement: "Respira. No hay prisa."
    },
    {
      id: 4,
      question: "¿Qué es lo que más te agota hoy?",
      type: "single-choice",
      options: ["Tomar notas / redactar después", "La carga mental al terminar el día", "Administración (agenda, mensajes, emails)", "Ordenar info por paciente / seguimiento", "Fatiga emocional / burnout", "Otra"],
      microcopy: `No estás solo/a ${displayName}. Muchos profesionales sienten lo mismo, aunque no siempre lo digan.`,
      encouragement: "Gracias por ponerle palabras."
    },
    {
      id: 5,
      question: "¿Cómo gestionas ahora tus notas y tu organización clínica?",
      type: "single-choice",
      options: ["A mano / libreta", "Google Docs / Word", "Notion", "Excel", "Software de historia clínica / gestión (EHR/EMR)", "Lo tengo disperso / sin sistema fijo"],
      microcopy: "Lo estás haciendo bien. Y con Lysanna podrás centrarte solo en tu paciente."
    , encouragement: "Estamos contigo"},
    {
      id: 6,
      question: "¿Qué resultado te gustaría conseguir primero con Lysanna?",
      type: "single-choice",
      options: ["Salir con notas clínicas listas tras la sesión", "Llegar más presente a cada sesión (menos multitarea)", "Tener continuidad clara entre sesiones", "Reducir tareas administrativas", "Sentirme más sostenido/a emocionalmente"],
      microcopy: "Esto es clave para construir algo que realmente ayude, no una herramienta más.",
      encouragement: "Ya casi estamos."
    },
    {
      id: 7,
      question: "¿Qué te preocupa más al usar una herramienta así?",
      type: "single-choice",
      options: ["Privacidad / confidencialidad", "Consentimiento del paciente", "Precisión de las notas", "Que me distraiga en sesión", "Integración con mi forma de trabajar"],
      microcopy: "Estas preocupaciones son normales. Las tenemos muy en cuenta.",
      encouragement: "Último paso. Gracias por llegar hasta aquí."
    },
    {
      id: 8,
      question: "¿Qué sería \"alivio\" para ti al acabar el día?",
      type: "long-text",
      placeholder: "Ahora puedes desahogarte tú. Te escuchamos como tú lo harías con alguien a quien cuidas. Si necesitas escribir más, adelante. Te leemos.",
      microcopy: "Ahora puedes desahogarte tú. Te escuchamos como tú lo harías con alguien a quien cuidas. Si necesitas escribir más, adelante. Te leemos."
    }
  ];

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (answer === "Otro" || answer === "Otra") {
      setShowOtherInput(`other_${questionId}`);
    } else {
      setShowOtherInput(null);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === questions.length) {
      // Submit form - go to thank you screen
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Prepare form data
    const formData = {
      email: email,
      name: name,
      answers: answers,
      timestamp: new Date().toISOString(),
      source: 'Espacio Seguro Form'
    };

    try {
      // Option 1: Send to webhook (Zapier/Make.com)
      const webhookUrl = 'https://hooks.zapier.com/hooks/catch/25900781/uw1gu9e/';
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Option 2: Send to Formspree (uncomment and configure)
      // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Option 3: Send to your own API endpoint
      // await fetch('https://your-api.com/api/submit-form', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });

    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show thank you screen even if submission fails
    }

    setCurrentStep(9); // Thank you screen
  };

  const getEncouragementMessage = () => {
    if (currentStep === 0) return null;
    const question = questions[currentStep - 1];
    if (question?.encouragement) return question.encouragement;
    if (currentStep === 2) return "Vamos bien.";
    if (currentStep === 5) return "Ya casi estamos.";
    return null;
  };

  // Intro screen
  if (currentStep === 0) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative animate-scale-up my-auto max-h-[calc(100vh-2rem)] flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="p-8 md:p-12 overflow-y-auto flex-1">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Formulario "Espacio Seguro"
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Antes de construir Lysanna, queremos escucharte a ti.
              </h2>
              
              <div className="text-lg text-slate-600 leading-relaxed space-y-4 max-w-xl mx-auto mb-8">
                <p>
                  Si tú no estás bien, la terapia se vuelve una batalla silenciosa.
                </p>
                <p>
                  Y no podemos permitir que quienes sostienen la salud mental de otros se queden sin salud mental.
                </p>
                <p className="font-medium text-slate-800">
                  Este espacio es para ponerle palabras a lo que pesa.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>🕒 2–3 minutos. A tu ritmo.</span>
              </div>
              
              <p className="text-sm text-slate-400 mb-8">
                Sin juicios. Sin spam. Con respeto.
              </p>

              <button 
                onClick={() => setCurrentStep(1)}
                className="w-full max-w-md bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Empezar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Thank you screen
  if (currentStep === 9) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative animate-scale-up my-auto max-h-[calc(100vh-2rem)] flex flex-col">
          <div className="p-8 md:p-12 text-center overflow-y-auto flex-1">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-6">
              <CheckIcon className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Gracias, {displayName}. De verdad.
            </h2>
            
            <div className="text-lg text-slate-600 leading-relaxed space-y-4 max-w-xl mx-auto mb-8">
              <p>
                Lo que acabas de compartir es importante. No solo para nosotros, sino para muchas personas que cuidan de otros cada día.
              </p>
              <p>
                Nos alegra mucho conocerte y que formes parte de Lysanna desde el inicio. Estamos construyendo este proyecto contigo, pensando en tu realidad, tu carga y tu vocación.
              </p>
              <p className="font-medium text-slate-800">
                Tu voz cuenta. Y a partir de ahora, también camina con nosotros.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full max-w-md bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
            >
              Volver a la página
            </button>
            
            <p className="text-sm text-slate-500">
              Te avisaremos en cuanto abramos acceso prioritario.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Question screens (1-8)
  const currentQuestion = questions[currentStep - 1];
  const progress = currentStep;
  const totalSteps = 8;
  const progressPercent = (progress / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative animate-scale-up my-auto max-h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Acceso prioritario (60 segundos)</h3>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500">Tus respuestas nos ayudan a construir Lysanna para ti.</p>
            <span className="text-xs font-bold text-slate-600">{progress}/{totalSteps}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8 md:p-10 overflow-y-auto flex-1 min-h-0">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === "single-choice" && (
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option
                      ? 'border-teal-500 bg-teal-50 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {option}
                </button>
              ))}
              {showOtherInput === `other_${currentQuestion.id}` && (
                <input
                  type="text"
                  placeholder="Especifica..."
                  value={answers[`other_${currentQuestion.id}`] || ''}
                  onChange={(e) => setAnswers({ ...answers, [`other_${currentQuestion.id}`]: e.target.value })}
                  className="w-full p-4 border-2 border-teal-500 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  autoFocus
                />
              )}
            </div>
          )}

          {currentQuestion.type === "long-text" && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              placeholder={currentQuestion.placeholder}
              rows={6}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
            />
          )}

          {/* Microcopy */}
          {currentQuestion.microcopy && (
            <p className="text-sm text-slate-600 italic mb-6">
              {currentQuestion.microcopy}
            </p>
          )}

          {/* Encouragement message */}
          {getEncouragementMessage() && (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-teal-800 text-center">
                {getEncouragementMessage()}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="border-t border-slate-200 px-6 py-4 flex gap-3 flex-shrink-0">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all"
            >
              Atrás
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={currentQuestion.type !== "long-text" && !answers[currentQuestion.id]}
            className={`flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              currentQuestion.type !== "long-text" && !answers[currentQuestion.id] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentStep === totalSteps ? 'Enviar' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// SafeSpaceForm removed - functionality moved to SurveyModal

function App() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoinWaitlist = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    setShowSurvey(true);
  };

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-teal-100 selection:text-teal-900">
      <AmbientBackground />
      <Header onJoinWaitlist={() => setShowSurvey(true)} />
      <main>
        <Hero onJoinWaitlist={handleJoinWaitlist} />
        <InvisibleCostSection />
        <EmotionalResonanceSection />
        <TransformationSection />
        <DemoSection />
        <FeaturesSection />
        <PrivacySection />
        <FAQSection />
        <FinalCTA onJoinWaitlist={handleJoinWaitlist} />
      </main>
      <Footer />
      {showSurvey && <SurveyModal onClose={() => setShowSurvey(false)} email={userEmail} name={userName} />}
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

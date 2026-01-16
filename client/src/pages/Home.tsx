import { useState, useEffect, useRef } from "react";
import { RuneGrid } from "@/components/RuneGrid";
import { OracleResult } from "@/components/OracleResult";
import { CatalogSection } from "@/components/CatalogSection";
import { Footer } from "@/components/Footer";
import { useFingerprint } from "@/hooks/use-fingerprint";
import { useConsultOracle } from "@/hooks/use-oracle";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

import { LoreSection } from "@/components/LoreSection";

export default function Home() {
  const { fingerprintHash, loading: fpLoading } = useFingerprint();
  const { mutate: consult, isPending, data: result } = useConsultOracle();
  const [selectedRune, setSelectedRune] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRitual = () => {
    setHasStarted(true);
    setIsMuted(false);
    setShowVideo(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // Try to play on mount, but browsers might block it until user interaction
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay blocked, waiting for user interaction:", error);
          setIsMuted(true); // Fallback to muted if blocked
        });
      }
    }
  }, []);

  const toggleMute = () => {
    setShowVideo(!showVideo);
    setIsMuted(!isMuted);
  };

  const handleRuneSelect = (rune: string) => {
    if (!fingerprintHash) return;
    setSelectedRune(rune);
    
    // Simulate a brief "reading" moment for dramatic effect
    setTimeout(() => {
      consult({ fingerprintHash, rune });
    }, 1500);
  };

  const showGrid = !result && !isPending;
  const showLoading = isPending;
  const showResult = !!result;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-ritual">
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                onClick={startRitual}
                variant="outline"
                size="lg"
                className="relative px-12 py-8 text-lg font-display tracking-[0.3em] uppercase bg-white/5 hover:bg-white/10 border-white/20 text-white backdrop-blur-xl rounded-full transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] overflow-hidden"
              >
                <span className="relative z-10">Entrar al Ritual</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Navigation Menu */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-2 md:px-4 py-6 flex justify-center pointer-events-none">
        <div className="flex items-center gap-4 md:gap-10 px-6 md:px-12 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pointer-events-auto shadow-2xl">
          <a 
            href="#oraculo" 
            className="text-[11px] md:text-sm uppercase tracking-tight md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Oráculo
          </a>
          <a 
            href="#servicios" 
            className="text-[11px] md:text-sm uppercase tracking-tight md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Servicios
          </a>
          <a 
            href="#informacion" 
            className="text-[11px] md:text-sm uppercase tracking-tight md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('informacion')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Información
          </a>
          <a 
            href="#contacto" 
            className="text-[11px] md:text-sm uppercase tracking-tight md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          >
            Contacto
          </a>
          <div className="w-px h-5 bg-white/10 mx-1 md:mx-3" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-primary transition-colors w-8 h-8 p-0 no-default-hover-elevate"
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
          </Button>
        </div>
      </nav>

      {/* Background Music */}
      {showVideo && (
        <div className="fixed bottom-0 right-0 w-0 h-0 opacity-0 overflow-hidden pointer-events-none">
          <iframe
            width="1"
            height="1"
            src="https://www.youtube.com/embed/l08Zw-RY__Q?autoplay=1&loop=1&playlist=l08Zw-RY__Q"
            title="Wildflower"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <main className="flex-grow z-10 pt-20 px-4">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 tracking-tight">
              Fox's <span className="text-primary">spells</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground italic max-w-2xl mx-auto">
              Elige una runa para obtener un descuento 🩵
            </p>
          </motion.div>
        </div>

        {/* Interaction Area */}
        <div className="min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* 1. Rune Grid */}
            {showGrid && !fpLoading && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <RuneGrid 
                  onSelect={handleRuneSelect} 
                  disabled={isPending} 
                  selectedRune={selectedRune} 
                />
              </motion.div>
            )}

            {/* 2. Loading State */}
            {showLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-2 border-primary/20 border-t-primary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">
                    {selectedRune}
                  </div>
                </div>
                <p className="text-primary font-display text-lg animate-pulse">
                  Interpretando las señales...
                </p>
              </motion.div>
            )}

            {/* 3. Result */}
            {showResult && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <OracleResult
                  message={result.message}
                  code={result.code}
                  benefit={result.benefit}
                  alreadyClaimed={result.alreadyClaimed}
                  rune={selectedRune || "?"}
                />
              </motion.div>
            )}
            
            {/* Fallback loader for fingerprint init */}
            {fpLoading && (
              <motion.div
                key="init"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-serif">Preparando ritual...</span>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        
        {/* Catalog */}
        <CatalogSection />

        {/* Divider */}
        <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

        {/* Information Section */}
        <LoreSection />
      </main>

      <Footer />
    </div>
  );
}

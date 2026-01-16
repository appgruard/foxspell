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

export default function Home() {
  const { fingerprintHash, loading: fpLoading } = useFingerprint();
  const { mutate: consult, isPending, data: result } = useConsultOracle();
  const [selectedRune, setSelectedRune] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

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
      {/* Subtle Navigation Menu */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-2 md:px-4 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex-1 md:block hidden" />

        <div className="flex items-center gap-6 md:gap-8 px-6 md:px-8 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pointer-events-auto shadow-2xl mx-auto md:mx-0">
          <a 
            href="#oraculo" 
            className="text-xs md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Oráculo
          </a>
          <a 
            href="#servicios" 
            className="text-xs md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Servicios
          </a>
          <a 
            href="#contacto" 
            className="text-xs md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-display"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          >
            Contacto
          </a>
        </div>

        <div className="md:flex-1 flex justify-end pr-2 md:pr-8 pointer-events-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-black/40 backdrop-blur-xl border-white/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-lg w-8 h-8 md:w-10 md:h-10"
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
        
        {/* Divider */}
        <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

        {/* Catalog */}
        <CatalogSection />
      </main>

      <Footer />
    </div>
  );
}

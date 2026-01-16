import { motion } from "framer-motion";
import { Copy, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface OracleResultProps {
  benefit?: string;
  code?: string;
  message: string;
  alreadyClaimed: boolean;
  rune: string;
}

export function OracleResult({ benefit, code, message, alreadyClaimed, rune }: OracleResultProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "Código copiado",
        description: "Tu destino ha sido asegurado.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8 text-center"
    >
      <div className="mb-6 relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-9xl text-primary text-shadow-glow mb-4 inline-block relative z-10"
        >
          {rune}
        </motion.div>
        
        {/* Glow effect behind rune */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full z-0" />
      </div>

      <h3 className="text-2xl font-bold font-display text-foreground mb-2">
        {alreadyClaimed ? "Destino Revelado" : "Tu Destino"}
      </h3>
      
      <p className="text-muted-foreground mb-6 font-serif italic text-lg">
        {message}
      </p>

      {code && (
        <div className="bg-card/50 border border-primary/20 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Tu Código Sagrado
          </div>
          
          <div className="text-3xl font-display text-primary tracking-wider mb-2 font-bold">
            {code}
          </div>

          {benefit && (
            <div className="text-xl text-foreground/90 mb-6 font-serif">
              {benefit}
            </div>
          )}

          <Button 
            onClick={handleCopy}
            variant="outline" 
            className="w-full border-primary/30 hover:bg-primary/10 hover:text-primary transition-all group-hover:border-primary/50"
          >
            {copied ? (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Código
              </>
            )}
          </Button>
        </div>
      )}

      {alreadyClaimed && !code && (
        <div className="flex items-center justify-center gap-2 text-amber-500/80 mt-4 bg-amber-950/20 p-3 rounded-md border border-amber-900/50">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">Solo una consulta por alma.</span>
        </div>
      )}
    </motion.div>
  );
}

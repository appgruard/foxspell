import { Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
        
        <div className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors group">
          <Twitter className="w-5 h-5" />
          <a 
            href="https://twitter.com/mysticFoxyy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-display tracking-widest text-sm hover:underline underline-offset-4"
          >
            @mysticFoxyy
          </a>
        </div>

        <div className="max-w-md text-xs text-muted-foreground/60 space-y-2">
          <p className="uppercase tracking-widest text-[10px] opacity-70">
            Protección Anti-Fraude Activa
          </p>
          <p>
            Utilizamos huellas técnicas del navegador para asegurar que el destino hable solo una vez por alma.
            Los códigos son únicos e intransferibles.
          </p>
          <p className="pt-4">
            &copy; {new Date().getFullYear()} Fox Spells
          </p>
        </div>
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Elder Futhark Runes
const RUNES = [
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ",
  "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ",
  "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"
];

interface RuneGridProps {
  onSelect: (rune: string) => void;
  disabled: boolean;
  selectedRune: string | null;
}

export function RuneGrid({ onSelect, disabled, selectedRune }: RuneGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 sm:gap-6 p-4 max-w-4xl mx-auto">
      {RUNES.map((rune, index) => {
        const isSelected = selectedRune === rune;
        const isOthers = selectedRune && !isSelected;

        return (
          <motion.button
            key={rune}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isOthers ? 0.3 : 1, 
              scale: isOthers ? 0.9 : 1,
              filter: isOthers ? "blur(1px)" : "blur(0px)"
            }}
            transition={{ 
              delay: index * 0.03, 
              duration: 0.5,
              type: "spring" 
            }}
            whileHover={!disabled ? { scale: 1.15, color: "hsl(var(--primary))" } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={() => !disabled && onSelect(rune)}
            disabled={disabled}
            className={cn(
              "aspect-square flex items-center justify-center text-4xl sm:text-5xl select-none",
              "text-muted-foreground transition-colors duration-300",
              "hover:cursor-pointer focus:outline-none",
              isSelected && "text-primary scale-110 rune-glow text-shadow-glow",
              disabled && !isSelected && "cursor-not-allowed opacity-20"
            )}
            aria-label={`Select rune ${rune}`}
          >
            {rune}
          </motion.button>
        );
      })}
    </div>
  );
}

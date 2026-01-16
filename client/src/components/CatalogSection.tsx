import { useCatalog } from "@/hooks/use-oracle";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";
import { Scroll, Sparkles } from "lucide-react";

export function CatalogSection() {
  const { data: items, isLoading } = useCatalog();

  const spells = items?.filter(i => i.type === "spell") || [];
  const readings = items?.filter(i => i.type === "reading") || [];

  if (isLoading) {
    return <CatalogSkeleton />;
  }

  return (
    <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
          Grimorio de Servicios
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
        <p className="text-muted-foreground mt-4 font-serif text-lg italic max-w-2xl mx-auto">
          Herramientas místicas para moldear tu destino y desvelar los misterios ocultos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        {/* Spells Column */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
            <Sparkles className="text-primary w-6 h-6" />
            <h3 className="text-2xl font-display text-foreground">Hechizos</h3>
          </div>
          
          <div className="space-y-6">
            {spells.map((item, i) => (
              <CatalogItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Readings Column */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
            <Scroll className="text-primary w-6 h-6" />
            <h3 className="text-2xl font-display text-foreground">Lecturas</h3>
          </div>
          
          <div className="space-y-6">
            {readings.map((item, i) => (
              <CatalogItem key={item.id} item={item} index={i} delay={0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CatalogItem({ item, index, delay = 0 }: { item: any; index: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.1 }}
      className="group flex justify-between items-baseline border-b border-dashed border-white/5 pb-2 hover:border-primary/30 transition-colors"
    >
      <span className="text-lg font-serif text-foreground/80 group-hover:text-primary transition-colors">
        {item.name}
      </span>
      <span className="font-display text-primary/80 font-bold ml-4 whitespace-nowrap">
        ${item.price} USD
      </span>
    </motion.div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto bg-white/5" />
        <Skeleton className="h-4 w-96 mx-auto bg-white/5" />
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-8 w-full bg-white/5" />
          ))}
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-8 w-full bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

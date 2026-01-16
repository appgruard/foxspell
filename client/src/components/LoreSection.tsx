import { motion } from "framer-motion";
import { Book, Flame, Compass } from "lucide-react";

export function LoreSection() {
  const loreItems = [
    {
      title: "La Magia Nórdica",
      icon: <Flame className="w-8 h-8 text-primary" />,
      content: "La magia nórdica, o Seiðr, es una forma ancestral de sabiduría y poder. Se basa en la conexión profunda con los hilos del destino (Wyrd) y la capacidad de influir en el flujo de la realidad a través del conocimiento espiritual."
    },
    {
      title: "El Poder de las Runas",
      icon: <Compass className="w-8 h-8 text-primary" />,
      content: "Las runas no son solo letras, son símbolos que contienen la esencia de las fuerzas del universo. Odín las obtuvo a través de un sacrificio sagrado, entregándolas a la humanidad como herramientas de adivinación y protección."
    },
    {
      title: "Hechizos y Rituales",
      icon: <Book className="w-8 h-8 text-primary" />,
      content: "Nuestros hechizos se hilan siguiendo las tradiciones antiguas. Cada ritual es único y utiliza la energía de las runas para armonizar tu camino, protegiendo tu espíritu o abriendo puertas a nuevas oportunidades."
    }
  ];

  return (
    <section id="lore" className="py-24 px-4 max-w-6xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 tracking-wider uppercase">
          Sabiduría Ancestral
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {loreItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="p-8 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm hover:border-primary/20 transition-all group"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              {item.title}
            </h3>
            <p className="text-muted-foreground font-serif leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

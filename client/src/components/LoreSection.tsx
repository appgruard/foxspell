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
    <section id="informacion" className="py-24 px-4 max-w-6xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 tracking-wider uppercase">
          Información
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

      {/* Payment Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-8 md:p-12 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-display font-bold text-primary mb-6">
            Información de Pago
          </h3>
          <p className="text-lg font-serif text-foreground mb-8">
            Los hechizos se agendan una vez que has realizado un pago parcial o completo.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-display font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Internacional
              </h4>
              <div className="space-y-2 font-serif text-sm">
                <p className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Paypal:</span>
                  <span className="text-foreground">ytatianagomez05@gmail.com</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-display font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                México (BBVA)
              </h4>
              <div className="space-y-2 font-serif text-sm">
                <p className="text-foreground font-mono">4152314395088746</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Naomi Carrillo</p>
                <p className="flex justify-between items-center border-t border-white/5 pt-2 mt-2">
                  <span className="text-muted-foreground">Llave BBVA:</span>
                  <span className="text-foreground font-mono">3104462860</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-display font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Mercado Pago
              </h4>
              <div className="space-y-2 font-serif text-sm">
                <p className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Usuario:</span>
                  <span className="text-foreground">celef.e</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-display font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Colombia (Nequi)
              </h4>
              <div className="space-y-2 font-serif text-sm">
                <p className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-muted-foreground">Nequi:</span>
                  <span className="text-foreground">3104462860</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-muted-foreground">Llave Nequi:</span>
                  <span className="text-foreground text-[10px] md:text-sm">jesúsgarcía2k51@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

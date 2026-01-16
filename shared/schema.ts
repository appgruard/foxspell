import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  fingerprintHash: text("fingerprint_hash").notNull().unique(),
  ipHash: text("ip_hash").notNull(),
  rune: text("rune").notNull(),
  discountCode: text("discount_code").notNull().unique(),
  benefit: text("benefit").notNull(),
  status: text("status").notNull().default("active"), // 'active', 'used'
  createdAt: timestamp("created_at").defaultNow(),
});

export const attempts = pgTable("attempts", {
  id: serial("id").primaryKey(),
  ipHash: text("ip_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClaimSchema = createInsertSchema(claims).pick({
  fingerprintHash: true,
  ipHash: true,
  rune: true,
  discountCode: true,
  benefit: true,
});

export const catalogItems = [
  { id: 1, name: "Enlace del destino", price: 25, type: "spell" },
  { id: 2, name: "Mal Karma", price: 28, type: "spell" },
  { id: 3, name: "Mi futuro ideal", price: 25, type: "spell" },
  { id: 4, name: "Cortar el hilo", price: 25, type: "spell" },
  { id: 5, name: "Hilar el camino", price: 35, type: "spell" },
  { id: 6, name: "Pesadilla", price: 28, type: "spell" },
  { id: 7, name: "Lectura de mascota", price: 3, type: "reading" },
  { id: 8, name: "Lectura de amor verdadero", price: 8, type: "reading" },
  { id: 9, name: "Hazme 5 preguntas", price: 5, type: "reading" },
  { id: 10, name: "Pregunta 30 minutos", price: 15, type: "reading" },
  { id: 11, name: "Personalizada", price: "15-40", type: "reading" },
];

export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;

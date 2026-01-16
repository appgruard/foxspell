import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import crypto from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Helper to hash IP
  const hashIp = (ip: string) => crypto.createHash('sha256').update(ip).digest('hex');

  // Probability Logic
  function determineBenefit(isSuspicious: boolean, rune: string): string {
    const rand = Math.random() * 100;

    // Rune-based multipliers (mystical variance)
    const runeMultipliers: Record<string, number> = {
      "Fehu": 1.2,    // Runa de la riqueza (+20% suerte)
      "Uruz": 0.8,    // Runa de la fuerza (más difícil obtener premios altos)
      "Thurisaz": 0.5, // Runa del caos (suerte reducida)
      "Ansuz": 1.5,   // Runa de la sabiduría/dioses (+50% suerte)
      "Raido": 1.0,   // Runa del viaje (estándar)
      "Kenaz": 1.3,   // Runa de la antorcha (+30% suerte)
      "Gebo": 2.0,    // Runa del regalo (¡Doble de suerte!)
      "Wunjo": 1.4    // Runa de la alegría (+40% suerte)
    };

    let luckFactor = runeMultipliers[rune] || 1.0;

    // Drastic reduction for suspicious behavior
    if (isSuspicious) {
      luckFactor *= 0.05; // 95% reduction in luck
    }

    // Adjusted thresholds
    const freeSpellThreshold = 0.5 * luckFactor;
    const p25Threshold = (0.5 + 5) * luckFactor;
    const p20Threshold = (5.5 + 10) * luckFactor;
    const p15Threshold = (15.5 + 20) * luckFactor;
    const p10Threshold = (35.5 + 30) * luckFactor;

    if (rand < freeSpellThreshold) return "Hechizo Gratis";
    if (rand < p25Threshold) return "25%";
    if (rand < p20Threshold) return "20%";
    if (rand < p15Threshold) return "15%";
    if (rand < p10Threshold) return "10%";
    
    return "5%";
  }

  app.post(api.oracle.consult.path, async (req, res) => {
    try {
      const input = api.oracle.consult.input.parse(req.body);
      const ip = req.ip || req.connection.remoteAddress || "unknown";
      const ipHash = hashIp(ip);

      // Check existing claim
      const existing = await storage.getClaimByFingerprint(input.fingerprintHash);
      if (existing) {
        return res.json({
          message: "Este oráculo ya te ha revelado tu destino.",
          code: existing.discountCode,
          benefit: existing.benefit,
          alreadyClaimed: true
        });
      }

      // Check IP rate limit (24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const attemptsCount = await storage.getAttemptsCountByIp(ipHash, oneDayAgo);
      
      // Record this attempt
      await storage.recordAttempt(ipHash);

      // Farming detection: High frequency or repetitive IP behavior
      const isSuspicious = attemptsCount > 3; // More sensitive threshold

      const benefit = determineBenefit(isSuspicious, input.rune);
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();

      const claim = await storage.createClaim({
        fingerprintHash: input.fingerprintHash,
        ipHash,
        rune: input.rune,
        discountCode: code,
        benefit,
      });

      res.json({
        message: "El destino ha hablado.",
        code: claim.discountCode,
        benefit: claim.benefit,
        alreadyClaimed: false
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del oráculo." });
    }
  });

  app.post(api.discounts.verify.path, async (req, res) => {
    const input = api.discounts.verify.input.parse(req.body);
    const claim = await storage.getClaimByCode(input.code);
    
    if (!claim) {
      return res.status(404).json({ message: "Código no encontrado." });
    }

    if (claim.status === "used") {
      return res.json({ valid: false, message: "Este código ya ha sido usado.", status: "used" });
    }

    // Mark as used (simulated checkout)
    // await storage.updateClaimStatus(claim.id, "used");

    res.json({ valid: true, benefit: claim.benefit, status: "active" });
  });

  app.get(api.catalog.list.path, async (req, res) => {
    const items = await storage.getCatalog();
    res.json(items);
  });

  return httpServer;
}

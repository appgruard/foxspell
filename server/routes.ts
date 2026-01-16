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
  function determineBenefit(isSuspicious: boolean): string {
    if (isSuspicious) {
      return "5%"; // Force lowest tier
    }

    const rand = Math.random() * 100;
    // 0.5% Free Spell
    if (rand < 0.5) return "Hechizo Gratis";
    // 5% -> 25% (0.5 to 5.5)
    if (rand < 5.5) return "25%";
    // 10% -> 20% (5.5 to 15.5)
    if (rand < 15.5) return "20%";
    // 20% -> 15% (15.5 to 35.5)
    if (rand < 35.5) return "15%";
    // 30% -> 10% (35.5 to 65.5)
    if (rand < 65.5) return "10%";
    // Remaining -> 5%
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

      // If too many attempts (e.g., > 10 distinct fingerprints from same IP), reduce luck
      // Prompt says "Límite de intentos... Si sospechoso... reducir probabilidad"
      // If STRICT limit is needed, we could return 429. But prompt says "Reducir silenciosamente".
      const isSuspicious = attemptsCount > 5;

      const benefit = determineBenefit(isSuspicious);
      const code = `NORDIC-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

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

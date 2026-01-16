import { type Claim, type InsertClaim } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getClaimByFingerprint(hash: string): Promise<Claim | undefined>;
  getClaimByCode(code: string): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
  recordAttempt(ipHash: string): Promise<void>;
  getAttemptsCountByIp(ipHash: string, since: Date): Promise<number>;
  updateClaimStatus(id: number, status: string): Promise<void>;
  getCatalog(): Promise<any[]>;
}

import { catalogItems } from "@shared/schema";

export class MemStorage implements IStorage {
  private claims: Map<number, Claim>;
  private attempts: { ipHash: string; createdAt: Date }[];
  private currentId: number;

  constructor() {
    this.claims = new Map();
    this.attempts = [];
    this.currentId = 1;
  }

  async getClaimByFingerprint(hash: string): Promise<Claim | undefined> {
    return Array.from(this.claims.values()).find((c) => c.fingerprintHash === hash);
  }

  async getClaimByCode(code: string): Promise<Claim | undefined> {
    return Array.from(this.claims.values()).find((c) => c.discountCode === code);
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const id = this.currentId++;
    const claim: Claim = {
      ...insertClaim,
      id,
      status: "active",
      createdAt: new Date(),
    };
    this.claims.set(id, claim);
    return claim;
  }

  async recordAttempt(ipHash: string): Promise<void> {
    this.attempts.push({ ipHash, createdAt: new Date() });
  }

  async getAttemptsCountByIp(ipHash: string, since: Date): Promise<number> {
    return this.attempts.filter((a) => a.ipHash === ipHash && a.createdAt > since).length;
  }

  async updateClaimStatus(id: number, status: string): Promise<void> {
    const claim = this.claims.get(id);
    if (claim) {
      this.claims.set(id, { ...claim, status });
    }
  }

  async getCatalog(): Promise<any[]> {
    return catalogItems;
  }
}

export const storage = new MemStorage();

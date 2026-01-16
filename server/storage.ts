import { type Claim, type InsertClaim } from "@shared/schema";
import fs from "fs";
import path from "path";

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

export class FileStorage implements IStorage {
  private claims: Map<number, Claim>;
  private attempts: { ipHash: string; createdAt: string }[];
  private currentId: number;
  private dataDir: string;
  private claimsFile: string;
  private attemptsFile: string;

  constructor() {
    this.dataDir = path.resolve(process.cwd(), "data");
    this.claimsFile = path.join(this.dataDir, "claims.json");
    this.attemptsFile = path.join(this.dataDir, "attempts.json");

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    this.claims = new Map();
    this.attempts = [];
    this.currentId = 1;

    this.loadData();
  }

  private loadData() {
    if (fs.existsSync(this.claimsFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.claimsFile, "utf-8"));
        data.forEach((c: any) => {
          const claim = { ...c, createdAt: new Date(c.createdAt) };
          this.claims.set(claim.id, claim);
          if (claim.id >= this.currentId) this.currentId = claim.id + 1;
        });
      } catch (e) {
        console.error("Error loading claims:", e);
      }
    }

    if (fs.existsSync(this.attemptsFile)) {
      try {
        this.attempts = JSON.parse(fs.readFileSync(this.attemptsFile, "utf-8"));
      } catch (e) {
        console.error("Error loading attempts:", e);
      }
    }
  }

  private saveData() {
    try {
      fs.writeFileSync(this.claimsFile, JSON.stringify(Array.from(this.claims.values()), null, 2));
      fs.writeFileSync(this.attemptsFile, JSON.stringify(this.attempts, null, 2));
    } catch (e) {
      console.error("Error saving data:", e);
    }
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
    this.saveData();
    return claim;
  }

  async recordAttempt(ipHash: string): Promise<void> {
    this.attempts.push({ ipHash, createdAt: new Date().toISOString() });
    this.saveData();
  }

  async getAttemptsCountByIp(ipHash: string, since: Date): Promise<number> {
    return this.attempts.filter((a) => a.ipHash === ipHash && new Date(a.createdAt) > since).length;
  }

  async updateClaimStatus(id: number, status: string): Promise<void> {
    const claim = this.claims.get(id);
    if (claim) {
      this.claims.set(id, { ...claim, status });
      this.saveData();
    }
  }

  async getCatalog(): Promise<any[]> {
    return catalogItems;
  }
}

export const storage = new FileStorage();

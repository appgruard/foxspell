import { db } from "./db";
import { claims, attempts, type InsertClaim, type Claim } from "@shared/schema";
import { eq, count, gt, and } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getClaimByFingerprint(hash: string): Promise<Claim | undefined> {
    const [claim] = await db.select().from(claims).where(eq(claims.fingerprintHash, hash));
    return claim;
  }

  async getClaimByCode(code: string): Promise<Claim | undefined> {
    const [claim] = await db.select().from(claims).where(eq(claims.discountCode, code));
    return claim;
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const [claim] = await db.insert(claims).values(insertClaim).returning();
    return claim;
  }

  async recordAttempt(ipHash: string): Promise<void> {
    await db.insert(attempts).values({ ipHash });
  }

  async getAttemptsCountByIp(ipHash: string, since: Date): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(attempts)
      .where(and(eq(attempts.ipHash, ipHash), gt(attempts.createdAt, since)));
    return result.count;
  }

  async updateClaimStatus(id: number, status: string): Promise<void> {
    await db.update(claims).set({ status }).where(eq(claims.id, id));
  }

  async getCatalog(): Promise<any[]> {
    return catalogItems;
  }
}

export const storage = new DatabaseStorage();

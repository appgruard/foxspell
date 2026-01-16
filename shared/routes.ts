import { z } from "zod";
import { insertClaimSchema, claims } from "./schema";

export const api = {
  oracle: {
    consult: {
      method: "POST" as const,
      path: "/api/oracle/consult",
      input: z.object({
        fingerprintHash: z.string(),
        rune: z.string(),
      }),
      responses: {
        200: z.object({
          message: z.string(),
          code: z.string().optional(),
          benefit: z.string().optional(),
          alreadyClaimed: z.boolean(),
        }),
        429: z.object({ message: z.string() }), // Rate limit
      },
    },
  },
  discounts: {
    verify: {
      method: "POST" as const,
      path: "/api/discounts/verify",
      input: z.object({
        code: z.string(),
      }),
      responses: {
        200: z.object({
          valid: z.boolean(),
          benefit: z.string().optional(),
          status: z.string().optional(),
        }),
        404: z.object({ message: z.string() }),
      },
    },
  },
  catalog: {
    list: {
      method: "GET" as const,
      path: "/api/catalog",
      responses: {
        200: z.array(z.object({
          id: z.number(),
          name: z.string(),
          price: z.union([z.number(), z.string()]),
          type: z.string(),
        })),
      },
    },
  },
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Types derived from schema via routes
type ConsultInput = z.infer<typeof api.oracle.consult.input>;
type ConsultResponse = z.infer<typeof api.oracle.consult.responses[200]>;
type CatalogResponse = z.infer<typeof api.catalog.list.responses[200]>;

export function useConsultOracle() {
  return useMutation<ConsultResponse, Error, ConsultInput>({
    mutationFn: async (data) => {
      const res = await fetch(api.oracle.consult.path, {
        method: api.oracle.consult.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle 429 specifically for dramatic effect if needed
        if (res.status === 429) {
          throw new Error("El destino ya ha sido escrito. Inténtalo mañana.");
        }
        const error = await res.json();
        throw new Error(error.message || "El oráculo guarda silencio.");
      }

      return api.oracle.consult.responses[200].parse(await res.json());
    },
  });
}

export function useCatalog() {
  return useQuery<CatalogResponse>({
    queryKey: [api.catalog.list.path],
    queryFn: async () => {
      const res = await fetch(api.catalog.list.path);
      if (!res.ok) throw new Error("Failed to fetch catalog");
      return api.catalog.list.responses[200].parse(await res.json());
    },
  });
}

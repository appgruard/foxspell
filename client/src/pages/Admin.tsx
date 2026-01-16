import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminDashboard() {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const verifyMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await apiRequest("POST", api.discounts.verify.path, { code });
      return res.json();
    },
    onSuccess: (data) => {
      if (!data.valid) {
        toast({
          title: "Código inválido",
          description: data.message || "El código no es válido o ya fue usado.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo verificar el código.",
        variant: "destructive",
      });
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    verifyMutation.mutate(code);
  };

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <h1 className="text-3xl font-display text-primary mb-8">Panel de Administración</h1>
      
      <Card className="w-full max-w-md bg-secondary/20 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Validar Código</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa el código..."
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="bg-background/50 border-primary/20"
              />
              <Button type="submit" disabled={verifyMutation.isPending}>
                {verifyMutation.isPending ? <Loader2 className="animate-spin" /> : "Validar"}
              </Button>
            </div>
          </form>

          {verifyMutation.data && verifyMutation.data.valid && (
            <div className="mt-6 p-4 rounded-md bg-primary/10 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">Código Válido</span>
              </div>
              <p className="text-lg">Beneficio: <span className="text-primary font-bold">{verifyMutation.data.benefit}</span></p>
              <p className="text-sm text-muted-foreground">Estado: {verifyMutation.data.status}</p>
            </div>
          )}

          {verifyMutation.data && !verifyMutation.data.valid && (
            <div className="mt-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <span>{verifyMutation.data.message || "Código inválido"}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

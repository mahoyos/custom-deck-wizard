import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, User } from "lucide-react";

interface Step2ClientNameProps {
  clientType: "new" | "existing";
  clientName: string;
  onClientNameChange: (name: string) => void;
}

export const Step2ClientName = ({ 
  clientType, 
  clientName, 
  onClientNameChange 
}: Step2ClientNameProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Identifica a tu Cliente
        </h2>
        <p className="text-muted-foreground">
          Ingresa el nombre o razón social de la persona o empresa para la cual estás creando la presentación
        </p>
      </div>

      <Card className="p-8">
        <div className="flex items-center justify-center mb-6">
          {clientType === "new" ? (
            <User className="w-16 h-16 text-primary" />
          ) : (
            <Building2 className="w-16 h-16 text-primary" />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName" className="text-base">
              {clientType === "new" 
                ? "Nombre del Cliente" 
                : "Razón Social o Nombre del Cliente"}
            </Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Este nombre se usará para personalizar la presentación y aparecerá en los documentos generados
            </p>
            <Input
              id="clientName"
              type="text"
              placeholder={clientType === "new" 
                ? "Ej: Juan Pérez González" 
                : "Ej: Corporación Empresarial S.A."}
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              className="text-lg h-12"
              autoFocus
            />
          </div>

          {clientName && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Vista previa:</span> La presentación se creará para{" "}
                <span className="font-semibold text-primary">{clientName}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

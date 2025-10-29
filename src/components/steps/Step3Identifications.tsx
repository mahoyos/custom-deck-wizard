import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, User, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { PresentationViewer } from "@/components/PresentationViewer";
import { toast } from "sonner";

type UserType = "RM" | "DB";

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface Step3IdentificationsProps {
  userType: UserType;
  identifications: string[];
  onIdentificationsChange: (identifications: string[]) => void;
  reportGenerated: boolean;
  onConfirmGeneration: (confirmed: boolean) => void;
  performanceSlides: Slide[];
  selectedSlides: number[];
  onSlideToggle: (id: number) => void;
}

export const Step3Identifications = ({ 
  userType,
  identifications,
  onIdentificationsChange,
  reportGenerated,
  onConfirmGeneration,
  performanceSlides,
  selectedSlides,
  onSlideToggle
}: Step3IdentificationsProps) => {
  const [currentId, setCurrentId] = useState("");
  const [rmEmail, setRmEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addIdentification = () => {
    if (currentId.trim() && !identifications.includes(currentId.trim())) {
      const newIdentifications = [...identifications, currentId.trim()];
      onIdentificationsChange(newIdentifications);
      setCurrentId("");
    }
  };

  const removeIdentification = (id: string) => {
    const newIdentifications = identifications.filter(i => i !== id);
    onIdentificationsChange(newIdentifications);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIdentification();
    }
  };

  const handleConfirmIdentifications = async () => {
    if (identifications.length === 0) {
      toast.error("Agrega al menos una identificación antes de confirmar");
      return;
    }

    setIsGenerating(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsGenerating(false);
    onConfirmGeneration(true);
    toast.success("Reporte de desempeño generado exitosamente");
  };

  // Show loading state
  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Generando Reporte de Desempeño
              </h3>
              <p className="text-muted-foreground">
                Procesando {identifications.length} identificación(es)...
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show preview after generation
  if (reportGenerated && performanceSlides.length > 0) {
    return (
      <PresentationViewer
        slides={performanceSlides}
        selectedSlides={selectedSlides}
        onSlideToggle={onSlideToggle}
        mode="delete"
        title="Reporte de Desempeño Generado"
        subtitle="Revisa el reporte generado con la información de los clientes. Puedes eliminar slides si lo deseas."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Documentos de Identificación del Cliente
        </h2>
        <p className="text-muted-foreground">
          Ingresa los números de documento del cliente existente para consultar y generar su reporte de desempeño. Esto nos permitirá incluir información histórica en la presentación.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="identification" className="text-base">
              Número de Documento
            </Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Solo números. Si es NIT, ingrésalo sin el dígito de verificación
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              id="identification"
              type="text"
              placeholder="Ej: 1234567890 o 900123456"
              value={currentId}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setCurrentId(value);
              }}
              onKeyPress={handleKeyPress}
              className="flex-1"
              maxLength={15}
            />
            <Button onClick={addIdentification} size="lg" disabled={!currentId.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Puedes agregar múltiples documentos si el cliente tiene diferentes identificaciones
          </p>
        </div>
      </Card>

      {identifications.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Identificaciones Agregadas ({identifications.length})
          </h3>
          
          <div className="grid gap-3">
            {identifications.map((id, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-slide-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{id}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIdentification(id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {userType === "DB" && identifications.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Correo del RM Asignado
          </h3>
          <div className="space-y-2">
            <Label htmlFor="rm-email">Correo electrónico del RM</Label>
            <Input
              id="rm-email"
              type="email"
              placeholder="rm@ejemplo.com"
              value={rmEmail}
              onChange={(e) => setRmEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Ingresa el correo del RM que gestionará esta presentación.
            </p>
          </div>
        </Card>
      )}

      {identifications.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            No hay identificaciones agregadas aún. Comienza agregando la primera.
          </p>
        </Card>
      )}

      {identifications.length > 0 && (
        <div className="mt-6">
          <Button 
            size="lg" 
            className="w-full gap-2"
            onClick={handleConfirmIdentifications}
            disabled={userType === "DB" && !rmEmail.trim()}
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirmar Identificaciones y Generar Reporte
          </Button>
        </div>
      )}
    </div>
  );
};

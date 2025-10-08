import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, User } from "lucide-react";
import { useState } from "react";

export const Step3Identifications = () => {
  const [identifications, setIdentifications] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState("");

  const addIdentification = () => {
    if (currentId.trim() && !identifications.includes(currentId.trim())) {
      setIdentifications([...identifications, currentId.trim()]);
      setCurrentId("");
    }
  };

  const removeIdentification = (id: string) => {
    setIdentifications(identifications.filter(i => i !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIdentification();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Identificaciones de Usuario
        </h2>
        <p className="text-muted-foreground">
          Agrega las identificaciones de los usuarios para personalizar la presentación.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Ingresa una identificación (ej: CC 123456789, NIT 900123456)"
            value={currentId}
            onChange={(e) => setCurrentId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={addIdentification} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </Card>

      {identifications.length > 0 && (
        <Card className="p-6">
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

      {identifications.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            No hay identificaciones agregadas aún. Comienza agregando la primera.
          </p>
        </Card>
      )}
    </div>
  );
};

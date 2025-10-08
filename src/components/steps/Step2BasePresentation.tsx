import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  preview: string;
}

interface Step2BasePresentationProps {
  clientType: "new" | "existing";
}

export const Step2BasePresentation = ({ clientType }: Step2BasePresentationProps) => {
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  // Mock slides - different based on client type
  const slides: Slide[] = clientType === "new" 
    ? [
        { id: 1, title: "Bienvenida", preview: "Slide 1: Introducción para nuevos clientes" },
        { id: 2, title: "Nuestra Empresa", preview: "Slide 2: Quiénes somos" },
        { id: 3, title: "Servicios", preview: "Slide 3: Nuestros servicios principales" },
        { id: 4, title: "Propuesta de Valor", preview: "Slide 4: Por qué elegirnos" },
        { id: 5, title: "Proceso de Onboarding", preview: "Slide 5: Primeros pasos" },
        { id: 6, title: "Contacto", preview: "Slide 6: Información de contacto" },
      ]
    : [
        { id: 1, title: "Actualización de Cuenta", preview: "Slide 1: Estado actual" },
        { id: 2, title: "Servicios Actuales", preview: "Slide 2: Servicios contratados" },
        { id: 3, title: "Nuevas Oportunidades", preview: "Slide 3: Servicios adicionales" },
        { id: 4, title: "Casos de Éxito", preview: "Slide 4: Resultados obtenidos" },
        { id: 5, title: "Plan de Crecimiento", preview: "Slide 5: Próximos pasos" },
        { id: 6, title: "Soporte", preview: "Slide 6: Canales de atención" },
      ];

  const toggleSlide = (id: number) => {
    setSelectedSlides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Presentación Base - {clientType === "new" ? "Cliente Nuevo" : "Cliente Existente"}
        </h2>
        <p className="text-muted-foreground">
          Selecciona los slides que deseas mantener en tu presentación. Los slides no seleccionados serán eliminados.
        </p>
      </div>

      <div className="grid gap-4">
        {slides.map((slide) => {
          const isSelected = selectedSlides.includes(slide.id);
          
          return (
            <Card 
              key={slide.id}
              className={`p-4 transition-all duration-200 cursor-pointer border-2 ${
                isSelected 
                  ? 'border-destructive bg-destructive/5' 
                  : 'border-slide-border hover:border-primary hover:shadow-md'
              }`}
              onClick={() => toggleSlide(slide.id)}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSlide(slide.id)}
                  className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                />
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground">{slide.preview}</p>
                  </div>
                  
                  <span className="text-2xl font-bold text-muted-foreground/50">
                    {slide.id}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedSlides.length > 0 && (
        <Card className="mt-6 p-4 bg-destructive/10 border-destructive">
          <p className="text-sm text-center">
            <span className="font-semibold">{selectedSlides.length}</span> slide(s) marcado(s) para eliminar
          </p>
        </Card>
      )}
    </div>
  );
};

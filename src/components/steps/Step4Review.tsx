import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Image } from "lucide-react";
import { PresentationViewer } from "@/components/PresentationViewer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Step4ReviewProps {
  onAddProduct: () => void;
  onAddSlide: () => void;
}

interface Slide {
  id: number;
  title: string;
  description: string;
}

export const Step4Review = ({ onAddProduct, onAddSlide }: Step4ReviewProps) => {
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  // Mock consolidated presentation slides
  const slides: Slide[] = [
    { id: 1, title: "Portada", description: "Presentación de la empresa" },
    { id: 2, title: "Servicios", description: "Nuestros servicios principales" },
    { id: 3, title: "Productos", description: "Catálogo de productos" },
    { id: 4, title: "Casos de Éxito", description: "Testimonios y resultados" },
    { id: 5, title: "Contacto", description: "Información de contacto" },
  ];

  const toggleSlide = (id: number) => {
    setSelectedSlides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <PresentationViewer
        slides={slides}
        selectedSlides={selectedSlides}
        onSlideToggle={toggleSlide}
        mode="delete"
        title="Revisa y Personaliza tu Presentación"
        subtitle="Navega por la presentación generada, elimina los slides que no necesites o agrega contenido adicional de productos específicos y slides personalizados."
      />

      <div className="max-w-6xl mx-auto px-4">
        <TooltipProvider>
          <div className="grid md:grid-cols-2 gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary group"
                  onClick={onAddProduct}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                      <Plus className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Adicionar Producto</h3>
                      <p className="text-sm text-muted-foreground">
                        Agrega slides de productos del catálogo
                      </p>
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-sm">
                  Explora nuestro catálogo de productos financieros y agrega slides detallados sobre productos específicos como CDT, cuentas de ahorro, tarjetas de crédito, fondos de inversión y más a tu presentación.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary group"
                  onClick={onAddSlide}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                      <Image className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Adicionar Slide</h3>
                      <p className="text-sm text-muted-foreground">
                        Sube imágenes personalizadas
                      </p>
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-sm">
                  Carga tus propias imágenes para incluir slides completamente personalizados en la presentación. Ideal para agregar gráficos, logos o contenido especial que no esté en nuestro catálogo.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

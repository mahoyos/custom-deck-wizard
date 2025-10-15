import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Image } from "lucide-react";
import { PresentationViewer } from "@/components/PresentationViewer";

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
        title="Revisión de Presentación"
        subtitle="Navega por tu presentación consolidada y elimina slides si es necesario. También puedes agregar productos o slides personalizados."
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
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
                  Agrega slides de productos adicionales del catálogo
                </p>
              </div>
            </div>
          </Card>

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
                  Sube imágenes personalizadas a tu presentación
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

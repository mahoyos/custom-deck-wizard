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

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface Step4ReviewProps {
  onAddProduct: () => void;
  onAddSlide: () => void;
  slides: Slide[];
  onSlidesReorder: (newSlides: Slide[]) => void;
  onDeleteSlides: (slidesToDelete: number[]) => void;
  deletedSlides: number[];
}

export const Step4Review = ({ 
  onAddProduct, 
  onAddSlide, 
  slides,
  onSlidesReorder,
  onDeleteSlides,
  deletedSlides
}: Step4ReviewProps) => {
  const toggleSlide = (id: number) => {
    const newDeletedSlides = deletedSlides.includes(id) 
      ? deletedSlides.filter(s => s !== id) 
      : [...deletedSlides, id];
    onDeleteSlides(newDeletedSlides);
  };

  return (
    <div className="space-y-6">
      <PresentationViewer
        slides={slides}
        selectedSlides={deletedSlides}
        onSlideToggle={toggleSlide}
        onSlidesReorder={onSlidesReorder}
        mode="delete"
        title="Revisa y Personaliza tu Presentación"
        subtitle="Navega por la presentación generada, elimina los slides que no necesites, reorganiza arrastrando las miniaturas o agrega contenido adicional de productos específicos y slides personalizados."
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

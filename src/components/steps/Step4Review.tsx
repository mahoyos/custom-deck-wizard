import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Plus, Image } from "lucide-react";

interface Step4ReviewProps {
  onAddProduct: () => void;
  onAddSlide: () => void;
}

export const Step4Review = ({ onAddProduct, onAddSlide }: Step4ReviewProps) => {
  // Mock current presentation state
  const currentSlides = 5;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Revisión de Presentación
        </h2>
        <p className="text-muted-foreground">
          Vista previa de tu presentación actual. Puedes agregar productos o slides personalizados.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-secondary to-background">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Vista Previa
            </h3>
            <span className="text-sm text-muted-foreground">
              {currentSlides} slides
            </span>
          </div>
          
          <div className="aspect-video bg-card rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Aquí se mostrará la vista previa de tu presentación
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card 
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary group"
            onClick={onAddProduct}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                <Plus className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Adicionar Producto</h3>
                <p className="text-sm text-muted-foreground">
                  Agrega slides de productos adicionales
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary group"
            onClick={onAddSlide}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
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
        </div>
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-center text-muted-foreground">
          Una vez estés satisfecho con la presentación, continúa al siguiente paso para consolidar.
        </p>
      </Card>
    </div>
  );
};

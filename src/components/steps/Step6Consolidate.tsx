import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Download } from "lucide-react";

interface Step6ConsolidateProps {
  onConsolidate: () => void;
  baseSlides: number;
  productSlides: number;
  customSlides: number;
}

export const Step6Consolidate = ({ 
  onConsolidate, 
  baseSlides, 
  productSlides, 
  customSlides 
}: Step6ConsolidateProps) => {
  const totalSlides = baseSlides + productSlides + customSlides;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Revisión Final
        </h2>
        <p className="text-muted-foreground">
          Revisa tu presentación antes de consolidar. Una vez consolidada, se generará el archivo final.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Vista Previa Final
            </h3>
            <span className="text-sm text-muted-foreground">
              {totalSlides} slides totales
            </span>
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-secondary to-background rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <FileText className="w-20 h-20 mx-auto mb-4 text-primary" />
              <p className="text-lg font-semibold text-foreground mb-2">
                Presentación Lista
              </p>
              <p className="text-muted-foreground">
                Tu presentación personalizada está lista para consolidar
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-step-complete" />
              <h3 className="font-semibold text-foreground mb-2">
                Todo Listo
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tu presentación ha sido preparada con éxito
              </p>
              <div className="space-y-2 text-left bg-card/50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slides Base:</span>
                  <span className="font-semibold">{baseSlides}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Productos:</span>
                  <span className="font-semibold">{productSlides}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Personalizados:</span>
                  <span className="font-semibold">{customSlides}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">{totalSlides}</span>
                </div>
              </div>
            </div>
          </Card>

          <Button
            size="lg"
            className="w-full text-lg py-6"
            onClick={onConsolidate}
          >
            <Download className="w-5 h-5 mr-2" />
            Consolidar Presentación
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-center text-muted-foreground">
          Al consolidar, se generará tu presentación final en formato PDF lista para descargar.
        </p>
      </Card>
    </div>
  );
};

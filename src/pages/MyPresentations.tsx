import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserHeader } from "@/components/UserHeader";
import { PresentationViewer } from "@/components/PresentationViewer";
import { ArrowLeft, FileText, Calendar, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock data for presentations
const mockPresentations = [
  {
    id: 1,
    clientName: "Empresa ABC S.A.",
    clientType: "existing",
    createdAt: "2025-10-15",
    slides: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1} - Empresa ABC S.A.`,
      description: `Contenido del slide ${i + 1} de la presentación`,
    })),
  },
  {
    id: 2,
    clientName: "Juan Pérez",
    clientType: "new",
    createdAt: "2025-10-14",
    slides: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1} - Juan Pérez`,
      description: `Contenido del slide ${i + 1} de la presentación`,
    })),
  },
  {
    id: 3,
    clientName: "Corporación XYZ Ltda.",
    clientType: "existing",
    createdAt: "2025-10-10",
    slides: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1} - Corporación XYZ Ltda.`,
      description: `Contenido del slide ${i + 1} de la presentación`,
    })),
  },
];

const MyPresentations = () => {
  const navigate = useNavigate();
  const [viewingPresentation, setViewingPresentation] = useState<typeof mockPresentations[0] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (clientName: string) => {
    setIsDownloading(true);
    toast({
      title: "Descargando presentación",
      description: `Preparando la presentación de ${clientName}...`,
    });
    
    // Simular descarga
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Descarga completada",
      description: `La presentación de ${clientName} se ha descargado exitosamente.`,
    });
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mis Presentaciones
          </h1>
          <p className="text-muted-foreground">
            Revisa y gestiona las presentaciones que has creado anteriormente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPresentations.map((presentation) => (
            <Card key={presentation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {presentation.clientName}
                </CardTitle>
                <CardDescription>
                  {presentation.clientType === "new" ? "Cliente Nuevo" : "Cliente Existente"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Creada el {new Date(presentation.createdAt).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{presentation.slides.length} slides</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => setViewingPresentation(presentation)}
                  >
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(presentation.clientName)}
                    disabled={isDownloading}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockPresentations.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No hay presentaciones
            </h3>
            <p className="text-muted-foreground mb-6">
              Aún no has creado ninguna presentación
            </p>
            <Button onClick={() => navigate("/")}>
              Crear nueva presentación
            </Button>
          </Card>
        )}
      </main>

      {/* Dialog para visualizar presentación */}
      <Dialog open={!!viewingPresentation} onOpenChange={() => setViewingPresentation(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Previsualización de Presentación</DialogTitle>
          </DialogHeader>
          {viewingPresentation && (
            <PresentationViewer
              slides={viewingPresentation.slides}
              mode="view"
              title={viewingPresentation.clientName}
              subtitle={`Creada el ${new Date(viewingPresentation.createdAt).toLocaleDateString('es-ES')}`}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPresentations;

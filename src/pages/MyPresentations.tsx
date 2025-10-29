import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserHeader } from "@/components/UserHeader";
import { PresentationViewer } from "@/components/PresentationViewer";
import { ArrowLeft, FileText, Calendar, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for presentations
const mockPresentations = [
  {
    id: 1,
    clientName: "Empresa ABC S.A.",
    clientType: "existing",
    createdAt: "2025-10-15",
    rmName: "Carlos Rodríguez",
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
    rmName: "María González",
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
    rmName: "Carlos Rodríguez",
    slides: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1} - Corporación XYZ Ltda.`,
      description: `Contenido del slide ${i + 1} de la presentación`,
    })),
  },
  {
    id: 4,
    clientName: "Tech Solutions Inc.",
    clientType: "new",
    createdAt: "2025-10-20",
    rmName: "Ana Martínez",
    slides: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1} - Tech Solutions Inc.`,
      description: `Contenido del slide ${i + 1} de la presentación`,
    })),
  },
];

const MyPresentations = () => {
  const navigate = useNavigate();
  const [viewingPresentation, setViewingPresentation] = useState<typeof mockPresentations[0] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Simulamos el userType - en producción vendría del contexto/props
  const [userType, setUserType] = useState<"RM" | "DB">("RM");
  
  // Filtros
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedClient, setSelectedClient] = useState<string>("all");
  const [selectedRM, setSelectedRM] = useState<string>("all");

  // Obtener listas únicas para los filtros
  const uniqueClients = Array.from(new Set(mockPresentations.map(p => p.clientName)));
  const uniqueRMs = Array.from(new Set(mockPresentations.map(p => p.rmName)));

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

  // Aplicar filtros
  const filteredPresentations = mockPresentations.filter(presentation => {
    // Filtro por fecha
    if (dateFrom && new Date(presentation.createdAt) < new Date(dateFrom)) {
      return false;
    }
    if (dateTo && new Date(presentation.createdAt) > new Date(dateTo)) {
      return false;
    }
    
    // Filtro por cliente
    if (selectedClient !== "all" && presentation.clientName !== selectedClient) {
      return false;
    }
    
    // Filtro por RM (solo para DB)
    if (userType === "DB" && selectedRM !== "all" && presentation.rmName !== selectedRM) {
      return false;
    }
    
    return true;
  });

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
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Mis Presentaciones
              </h1>
              <p className="text-muted-foreground">
                Revisa y gestiona las presentaciones que has creado anteriormente
              </p>
            </div>
            
            {/* Selector de tipo de usuario (temporal para demo) */}
            <Select value={userType} onValueChange={(value: "RM" | "DB") => setUserType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RM">RM</SelectItem>
                <SelectItem value="DB">DB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Filtros</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por fecha desde */}
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Fecha desde</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            
            {/* Filtro por fecha hasta */}
            <div className="space-y-2">
              <Label htmlFor="dateTo">Fecha hasta</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            
            {/* Filtro por cliente */}
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Todos los clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los clientes</SelectItem>
                  {uniqueClients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Filtro por RM (solo para DB) */}
            {userType === "DB" && (
              <div className="space-y-2">
                <Label htmlFor="rm">RM</Label>
                <Select value={selectedRM} onValueChange={setSelectedRM}>
                  <SelectTrigger id="rm">
                    <SelectValue placeholder="Todos los RMs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los RMs</SelectItem>
                    {uniqueRMs.map((rm) => (
                      <SelectItem key={rm} value={rm}>
                        {rm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Botón para limpiar filtros */}
          {(dateFrom || dateTo || selectedClient !== "all" || (userType === "DB" && selectedRM !== "all")) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
                setSelectedClient("all");
                setSelectedRM("all");
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPresentations.map((presentation) => (
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
                  {userType === "DB" && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">RM:</span>
                      <span>{presentation.rmName}</span>
                    </div>
                  )}
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

        {filteredPresentations.length === 0 && mockPresentations.length > 0 && (
          <Card className="p-12 text-center col-span-full">
            <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No se encontraron presentaciones
            </h3>
            <p className="text-muted-foreground mb-6">
              No hay presentaciones que coincidan con los filtros aplicados
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
                setSelectedClient("all");
                setSelectedRM("all");
              }}
            >
              Limpiar filtros
            </Button>
          </Card>
        )}

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

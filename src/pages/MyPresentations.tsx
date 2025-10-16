import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserHeader } from "@/components/UserHeader";
import { ArrowLeft, FileText, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for presentations
const mockPresentations = [
  {
    id: 1,
    clientName: "Empresa ABC S.A.",
    clientType: "existing",
    createdAt: "2025-10-15",
    slides: 25,
  },
  {
    id: 2,
    clientName: "Juan Pérez",
    clientType: "new",
    createdAt: "2025-10-14",
    slides: 18,
  },
  {
    id: 3,
    clientName: "Corporación XYZ Ltda.",
    clientType: "existing",
    createdAt: "2025-10-10",
    slides: 32,
  },
];

const MyPresentations = () => {
  const navigate = useNavigate();

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
                    <span>{presentation.slides} slides</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" size="sm">
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
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
    </div>
  );
};

export default MyPresentations;

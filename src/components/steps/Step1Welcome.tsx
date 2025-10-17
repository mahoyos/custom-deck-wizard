import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import newClientImage from "@/assets/new-client.jpg";
import existingClientImage from "@/assets/existing-client.jpg";

type UserType = "RM" | "DB";

interface Step1WelcomeProps {
  onSelectClientType: (type: "new" | "existing") => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

export const Step1Welcome = ({ onSelectClientType, userType, onUserTypeChange }: Step1WelcomeProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Bienvenido a SUMI Maker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Crea presentaciones profesionales personalizadas en minutos
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <Button
          variant={userType === "RM" ? "default" : "outline"}
          onClick={() => onUserTypeChange("RM")}
          size="lg"
        >
          Modo RM
        </Button>
        <Button
          variant={userType === "DB" ? "default" : "outline"}
          onClick={() => onUserTypeChange("DB")}
          size="lg"
        >
          Modo DB
        </Button>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground">
          Selecciona el tipo de cliente para comenzar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card 
          className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
          onClick={() => onSelectClientType("new")}
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={newClientImage} 
              alt="Cliente Nuevo" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          </div>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Cliente Nuevo</h2>
            <p className="text-muted-foreground">
              Crear una presentación para un cliente nuevo
            </p>
          </div>
        </Card>

        <Card 
          className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
          onClick={() => onSelectClientType("existing")}
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={existingClientImage} 
              alt="Cliente Existente" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          </div>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Cliente Existente</h2>
            <p className="text-muted-foreground">
              Crear una presentación para un cliente existente
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

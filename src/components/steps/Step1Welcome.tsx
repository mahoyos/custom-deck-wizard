import { Card } from "@/components/ui/card";
import newClientImage from "@/assets/new-client.jpg";
import existingClientImage from "@/assets/existing-client.jpg";

interface Step1WelcomeProps {
  onSelectClientType: (type: "new" | "existing") => void;
}

export const Step1Welcome = ({ onSelectClientType }: Step1WelcomeProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Bienvenido a Maker
        </h1>
        <p className="text-xl text-muted-foreground">
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

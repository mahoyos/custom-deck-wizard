import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";

interface Step1WelcomeProps {
  onSelectClientType: (type: "new" | "existing") => void;
}

export const Step1Welcome = ({ onSelectClientType }: Step1WelcomeProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Slide Picker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Crea presentaciones personalizadas en minutos. Selecciona el tipo de cliente para comenzar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <Card 
          className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
          onClick={() => onSelectClientType("new")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <UserPlus className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Cliente Nuevo</h2>
            <p className="text-muted-foreground">
              Comienza con una presentación base para un cliente que inicia su relación con nosotros.
            </p>
          </div>
        </Card>

        <Card 
          className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
          onClick={() => onSelectClientType("existing")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <Users className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Cliente Existente</h2>
            <p className="text-muted-foreground">
              Personaliza la presentación con información de un cliente con historial previo.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

import { useState } from "react";
import { PresentationViewer } from "@/components/PresentationViewer";

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface Step2BasePresentationProps {
  clientType: "new" | "existing";
}

export const Step2BasePresentation = ({ clientType }: Step2BasePresentationProps) => {
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  const slides: Slide[] = clientType === "new" 
    ? [
        { id: 1, title: "Bienvenida", description: "Introducción para nuevos clientes" },
        { id: 2, title: "Nuestra Empresa", description: "Quiénes somos y nuestra historia" },
        { id: 3, title: "Servicios", description: "Nuestros servicios principales" },
        { id: 4, title: "Propuesta de Valor", description: "Por qué elegirnos" },
        { id: 5, title: "Proceso de Onboarding", description: "Primeros pasos con nosotros" },
        { id: 6, title: "Contacto", description: "Información de contacto" },
      ]
    : [
        { id: 1, title: "Actualización de Cuenta", description: "Estado actual de tu cuenta" },
        { id: 2, title: "Servicios Actuales", description: "Servicios que tienes contratados" },
        { id: 3, title: "Nuevas Oportunidades", description: "Servicios adicionales disponibles" },
        { id: 4, title: "Casos de Éxito", description: "Resultados que hemos obtenido" },
        { id: 5, title: "Plan de Crecimiento", description: "Próximos pasos juntos" },
        { id: 6, title: "Soporte", description: "Canales de atención disponibles" },
      ];

  const toggleSlide = (id: number) => {
    setSelectedSlides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <PresentationViewer
      slides={slides}
      selectedSlides={selectedSlides}
      onSlideToggle={toggleSlide}
      mode="delete"
      title={`Presentación Base - ${clientType === "new" ? "Cliente Nuevo" : "Cliente Existente"}`}
      subtitle="Navega por los slides y selecciona los que deseas eliminar de tu presentación."
    />
  );
};

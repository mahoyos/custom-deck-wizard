import { PresentationViewer } from "@/components/PresentationViewer";

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface Step2BasePresentationProps {
  clientType: "new" | "existing";
  slides: Slide[];
  selectedSlides: number[];
  onSlideToggle: (id: number) => void;
}

export const Step2BasePresentation = ({ 
  clientType, 
  slides,
  selectedSlides,
  onSlideToggle
}: Step2BasePresentationProps) => {

  return (
    <PresentationViewer
      slides={slides}
      selectedSlides={selectedSlides}
      onSlideToggle={onSlideToggle}
      mode="delete"
      title={`Presentación Base - ${clientType === "new" ? "Cliente Nuevo" : "Cliente Existente"}`}
      subtitle="Navega por los slides y selecciona los que deseas eliminar de tu presentación."
    />
  );
};

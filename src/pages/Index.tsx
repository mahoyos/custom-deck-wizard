import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { UserHeader } from "@/components/UserHeader";
import { Step1Welcome } from "@/components/steps/Step1Welcome";
import { Step2ClientName } from "@/components/steps/Step2ClientName";
import { Step2BasePresentation } from "@/components/steps/Step2BasePresentation";
import { Step3Identifications } from "@/components/steps/Step3Identifications";
import { Step4Review } from "@/components/steps/Step4Review";
import { Step5AddProduct } from "@/components/steps/Step5AddProduct";
import { Step5AddSlide } from "@/components/steps/Step5AddSlide";
import { Step6Consolidate } from "@/components/steps/Step6Consolidate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ClientType = "new" | "existing" | null;
type Step5Mode = "review" | "addProduct" | "addSlide";
type UserType = "RM" | "DB";

interface Slide {
  id: number;
  title: string;
  description: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>("RM");
  const [clientType, setClientType] = useState<ClientType>(null);
  const [clientName, setClientName] = useState("");
  const [step5Mode, setStep5Mode] = useState<Step5Mode>("review");
  const [identifications, setIdentifications] = useState<string[]>([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  // Step2 base presentation slides
  const [step2DeletedSlides, setStep2DeletedSlides] = useState<number[]>([]);
  
  // Step3 performance report slides
  const [step3PerformanceSlides, setStep3PerformanceSlides] = useState<Slide[]>([]);
  const [step3DeletedSlides, setStep3DeletedSlides] = useState<number[]>([]);
  
  // Additional slides from Step5
  const [addedProductSlides, setAddedProductSlides] = useState<Slide[]>([]);
  const [addedCustomSlides, setAddedCustomSlides] = useState<Slide[]>([]);
  
  const { toast } = useToast();

  // Generate Step2 base slides based on clientType
  const getStep2BaseSlides = (): Slide[] => {
    if (!clientType) return [];
    
    return clientType === "new" 
      ? [
          { id: 101, title: "Bienvenida", description: "Introducción para nuevos clientes" },
          { id: 102, title: "Nuestra Empresa", description: "Quiénes somos y nuestra historia" },
          { id: 103, title: "Servicios", description: "Nuestros servicios principales" },
          { id: 104, title: "Propuesta de Valor", description: "Por qué elegirnos" },
          { id: 105, title: "Proceso de Onboarding", description: "Primeros pasos con nosotros" },
          { id: 106, title: "Contacto", description: "Información de contacto" },
        ]
      : [
          { id: 201, title: "Actualización de Cuenta", description: "Estado actual de tu cuenta" },
          { id: 202, title: "Servicios Actuales", description: "Servicios que tienes contratados" },
          { id: 203, title: "Nuevas Oportunidades", description: "Servicios adicionales disponibles" },
          { id: 204, title: "Casos de Éxito", description: "Resultados que hemos obtenido" },
          { id: 205, title: "Plan de Crecimiento", description: "Próximos pasos juntos" },
          { id: 206, title: "Soporte", description: "Canales de atención disponibles" },
        ];
  };

  // Compute all presentation slides
  const presentationSlides: Slide[] = [
    ...getStep2BaseSlides().filter(slide => !step2DeletedSlides.includes(slide.id)),
    ...step3PerformanceSlides.filter(slide => !step3DeletedSlides.includes(slide.id)),
    ...addedProductSlides,
    ...addedCustomSlides,
  ];

  const totalSteps = 6;

  const handleClientTypeSelection = (type: "new" | "existing") => {
    setClientType(type);
    setStep2DeletedSlides([]); // Reset when changing client type
    setCurrentStep(2);
  };

  const handleStep2SlideToggle = (id: number) => {
    setStep2DeletedSlides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleStep3SlideToggle = (id: number) => {
    setStep3DeletedSlides(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleConfirmGeneration = (confirmed: boolean) => {
    setReportGenerated(confirmed);
    if (confirmed) {
      // Generate performance slides when confirmed
      setStep3PerformanceSlides([
        { id: 301, title: "Resumen Ejecutivo", description: "Resumen general del desempeño" },
        { id: 302, title: "Métricas de Rendimiento", description: "KPIs principales del periodo" },
        { id: 303, title: "Análisis de Mercado", description: "Posicionamiento y tendencias" },
        { id: 304, title: "Oportunidades", description: "Áreas de mejora identificadas" },
        { id: 305, title: "Proyecciones", description: "Estimaciones para próximo periodo" },
      ]);
    }
  };

  const handleNext = () => {
    // Validate client name in step 2
    if (currentStep === 2) {
      if (!clientName.trim()) {
        toast({
          title: "Nombre requerido",
          description: "Debes ingresar el nombre del cliente para continuar.",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate identifications for existing clients in step 4
    if (currentStep === 4 && clientType === "existing") {
      if (identifications.length === 0) {
        toast({
          title: "Documentos requeridos",
          description: "Debes ingresar al menos un documento de identificación para continuar.",
          variant: "destructive",
        });
        return;
      }
      if (!reportGenerated) {
        toast({
          title: "Reporte no generado",
          description: "Debes confirmar las identificaciones y generar el reporte de desempeño antes de continuar.",
          variant: "destructive",
        });
        return;
      }
    }

    // Skip step 4 (identifications) if client is new
    if (currentStep === 3 && clientType === "new") {
      setCurrentStep(5);
    } else if (currentStep === 5 && step5Mode !== "review") {
      // After adding products or slides, go back to review mode
      setStep5Mode("review");
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    // If in add modes in step 5, go back to review mode
    if (currentStep === 5 && step5Mode !== "review") {
      setStep5Mode("review");
      return;
    }

    // Skip step 4 (identifications) if going back and client is new
    if (currentStep === 5 && clientType === "new") {
      setCurrentStep(3);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddProduct = () => {
    setStep5Mode("addProduct");
  };

  const handleAddSlide = () => {
    setStep5Mode("addSlide");
  };

  const handleProductSlidesAdded = (slides: Slide[]) => {
    setAddedProductSlides(prev => [...prev, ...slides]);
  };

  const handleCustomSlidesAdded = (slides: Slide[]) => {
    setAddedCustomSlides(prev => [...prev, ...slides]);
  };

  const handleConsolidate = () => {
    toast({
      title: "¡Presentación Consolidada!",
      description: "Tu presentación ha sido generada exitosamente.",
    });
    
    // Reset to initial state
    setTimeout(() => {
      setCurrentStep(1);
      setUserType("RM");
      setClientType(null);
      setClientName("");
      setStep5Mode("review");
      setIdentifications([]);
      setReportGenerated(false);
      setStep2DeletedSlides([]);
      setStep3PerformanceSlides([]);
      setStep3DeletedSlides([]);
      setAddedProductSlides([]);
      setAddedCustomSlides([]);
    }, 2000);
  };

  const handleSlidesReorder = (newSlides: Slide[]) => {
    // Need to update the individual arrays based on slide IDs
    const step2Ids = getStep2BaseSlides().map(s => s.id);
    const step3Ids = step3PerformanceSlides.map(s => s.id);
    const productIds = addedProductSlides.map(s => s.id);
    const customIds = addedCustomSlides.map(s => s.id);

    // Reorder within each category
    const newStep2Slides: Slide[] = [];
    const newStep3Slides: Slide[] = [];
    const newProductSlides: Slide[] = [];
    const newCustomSlides: Slide[] = [];

    newSlides.forEach(slide => {
      if (step2Ids.includes(slide.id)) {
        newStep2Slides.push(slide);
      } else if (step3Ids.includes(slide.id)) {
        newStep3Slides.push(slide);
      } else if (productIds.includes(slide.id)) {
        newProductSlides.push(slide);
      } else if (customIds.includes(slide.id)) {
        newCustomSlides.push(slide);
      }
    });

    // For now, just accept the reorder as-is since it's complex to maintain
    // In a real app, you'd update the individual arrays
  };

  const handleDeleteSlides = (slidesToDelete: number[]) => {
    // Determine which category each slide belongs to and update accordingly
    const step2Ids = getStep2BaseSlides().map(s => s.id);
    const step3Ids = step3PerformanceSlides.map(s => s.id);
    const productIds = addedProductSlides.map(s => s.id);
    const customIds = addedCustomSlides.map(s => s.id);

    slidesToDelete.forEach(slideId => {
      if (step2Ids.includes(slideId)) {
        setStep2DeletedSlides(prev => prev.includes(slideId) ? prev : [...prev, slideId]);
      } else if (step3Ids.includes(slideId)) {
        setStep3DeletedSlides(prev => prev.includes(slideId) ? prev : [...prev, slideId]);
      } else if (productIds.includes(slideId)) {
        setAddedProductSlides(prev => prev.filter(s => s.id !== slideId));
      } else if (customIds.includes(slideId)) {
        setAddedCustomSlides(prev => prev.filter(s => s.id !== slideId));
      }
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onSelectClientType={handleClientTypeSelection} userType={userType} onUserTypeChange={setUserType} />;
      case 2:
        return (
          <Step2ClientName 
            clientType={clientType!} 
            clientName={clientName}
            onClientNameChange={setClientName}
          />
        );
      case 3:
        return (
          <Step2BasePresentation 
            clientType={clientType!}
            slides={getStep2BaseSlides()}
            selectedSlides={step2DeletedSlides}
            onSlideToggle={handleStep2SlideToggle}
          />
        );
      case 4:
        return (
          <Step3Identifications 
            userType={userType}
            identifications={identifications}
            onIdentificationsChange={setIdentifications}
            reportGenerated={reportGenerated}
            onConfirmGeneration={handleConfirmGeneration}
            performanceSlides={step3PerformanceSlides}
            selectedSlides={step3DeletedSlides}
            onSlideToggle={handleStep3SlideToggle}
          />
        );
      case 5:
        if (step5Mode === "addProduct") {
          return <Step5AddProduct onSlidesAdded={handleProductSlidesAdded} />;
        } else if (step5Mode === "addSlide") {
          return <Step5AddSlide onSlidesAdded={handleCustomSlidesAdded} />;
        }
        return (
          <Step4Review 
            onAddProduct={handleAddProduct} 
            onAddSlide={handleAddSlide}
            slides={presentationSlides}
            onSlidesReorder={handleSlidesReorder}
            onDeleteSlides={handleDeleteSlides}
            deletedSlides={[]}
          />
        );
      case 6:
        const step2ActiveSlides = getStep2BaseSlides().filter(s => !step2DeletedSlides.includes(s.id));
        const step3ActiveSlides = step3PerformanceSlides.filter(s => !step3DeletedSlides.includes(s.id));
        const totalBaseSlides = step2ActiveSlides.length + step3ActiveSlides.length;
        
        return (
          <Step6Consolidate 
            onConsolidate={handleConsolidate}
            baseSlides={totalBaseSlides}
            productSlides={addedProductSlides.length}
            customSlides={addedCustomSlides.length}
          />
        );
      default:
        return null;
    }
  };

  const showNavigation = currentStep > 1;
  const showPrevious = currentStep > 1;
  const showNext = currentStep < totalSteps && currentStep !== 1;

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      
      {currentStep > 1 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}

      <main className="pb-24">
        {renderStep()}
      </main>

      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              {showPrevious && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground font-medium">
              Paso {currentStep} de {totalSteps}
            </div>

            <div>
              {showNext && (
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
